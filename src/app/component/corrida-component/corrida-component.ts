import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CorridaService } from '../../service/corrida-service';
import { Corrida } from '../corrida';

@Component({
  selector: 'app-corrida-component',
  imports: [FormsModule],
  templateUrl: './corrida-component.html',
  styleUrl: './corrida-component.css'
})
export class CorridaComponent {

  descricao_corrida = '';
  data_corrida = '';

  distancia5km = false;
  distancia10km = false;
  distancia25km = false;

  idCorridaEditando = '';

  constructor(
    private corridaService: CorridaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      const id = params['id'];

      console.log(
        'ID RECEBIDO PARA EDIÇÃO:',
        id
      );

      if (
        id !== undefined &&
        id !== null &&
        id !== ''
      ) {

        this.carregaDados(String(id));

      }

    });

  }

  limparDados() {

    this.descricao_corrida = '';
    this.data_corrida = '';

    this.distancia5km = false;
    this.distancia10km = false;
    this.distancia25km = false;

    this.idCorridaEditando = '';

  }

  salvar() {

    const corrida = new Corrida();

    corrida.id = this.idCorridaEditando;

    corrida.descricao_corrida =
      this.descricao_corrida;

    corrida.data_corrida =
      this.data_corrida;

    corrida.distancia5km =
      this.distancia5km;

    corrida.distancia10km =
      this.distancia10km;

    corrida.distancia25km =
      this.distancia25km;


    if (this.idCorridaEditando === '') {

      this.corridaService
        .salvarCorrida(corrida)
        .subscribe({

          next: (dadosCorrida) => {

            console.log(
              'CORRIDA SALVA COM SUCESSO:',
              dadosCorrida
            );

            this.limparDados();

          },

          error: (erro) => {

            console.error(
              'ERRO AO SALVAR CORRIDA:',
              erro
            );

          }

        });

    } else {

      this.corridaService
        .alterarCorrida(corrida)
        .subscribe({

          next: (dadosCorrida) => {

            console.log(
              'CORRIDA ALTERADA COM SUCESSO:',
              dadosCorrida
            );

            this.limparDados();

          },

          error: (erro) => {

            console.error(
              'ERRO AO ALTERAR CORRIDA:',
              erro
            );

          }

        });

    }

  }

  carregaDados(idCorrida: string) {

    console.log(
      'BUSCANDO CORRIDA COM ID:',
      idCorrida
    );

    this.corridaService
      .listarCorrida(Number(idCorrida))
      .subscribe({

        next: (dadosCorrida) => {

          console.log(
            'CORRIDA ENCONTRADA:',
            dadosCorrida
          );

          this.idCorridaEditando =
            String(dadosCorrida.id);

          this.descricao_corrida =
            dadosCorrida.descricao_corrida;

          this.data_corrida =
            dadosCorrida.data_corrida;

          this.distancia5km =
            dadosCorrida.distancia5km;

          this.distancia10km =
            dadosCorrida.distancia10km;

          this.distancia25km =
            dadosCorrida.distancia25km;

        },

        error: (erro) => {

          console.error(
            'ERRO AO BUSCAR CORRIDA:',
            erro
          );

        }

      });

  }

}