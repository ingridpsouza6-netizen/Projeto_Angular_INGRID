import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CorridaService } from '../../service/corrida-service';
import { Corrida } from '../corrida';

@Component({
  selector: 'app-cadastro-corridas-component',
  imports: [FormsModule],
  templateUrl: './cadastro-corridas-component.html',
  styleUrl: './cadastro-corridas-component.css'
})
export class CadastroCorridasComponent {

  // DADOS DA CORRIDA

  descricao_corrida = '';

  data_corrida = '';

  distancia5km = false;

  distancia10km = false;

  distancia25km = false;


  // ID DA CORRIDA QUE ESTÁ SENDO EDITADA

  idCorridaEditando = '';


  constructor(
    private corridaService: CorridaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      const id = params['id'];

      console.log(
        'ID RECEBIDO PARA EDIÇÃO:',
        id
      );


      // SE EXISTIR ID, CARREGA A CORRIDA

      if (
        id !== undefined &&
        id !== null &&
        id !== ''
      ) {

        this.idCorridaEditando = String(id);

        this.carregarCorrida(
          Number(id)
        );

      }

    });

  }


  carregarCorrida(id: number) {

    console.log(
      'BUSCANDO CORRIDA:',
      id
    );


    this.corridaService
      .listarCorrida(id)
      .subscribe({

        next: (corrida) => {

          console.log(
            'CORRIDA ENCONTRADA:',
            corrida
          );


          // COLOCA OS DADOS DA API NO FORMULÁRIO

          this.idCorridaEditando =
            String(corrida.id);


          this.descricao_corrida =
            corrida.descricao_corrida;


          this.data_corrida =
            corrida.data_corrida;


          this.distancia5km =
            corrida.distancia5km;


          this.distancia10km =
            corrida.distancia10km;


          this.distancia25km =
            corrida.distancia25km;

        },


        error: (erro) => {

          console.error(
            'ERRO AO BUSCAR CORRIDA:',
            erro
          );

        }

      });

  }


  salvar() {

    const corrida = new Corrida();


    corrida.id =
      this.idCorridaEditando;


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


    // ==========================
    // CADASTRAR NOVA CORRIDA
    // ==========================

    if (this.idCorridaEditando === '') {

      this.corridaService
        .salvarCorrida(corrida)
        .subscribe({

          next: (dados) => {

            console.log(
              'CORRIDA CADASTRADA:',
              dados
            );

            alert(
              'Corrida cadastrada com sucesso!'
            );

            this.limpar();

          },

          error: (erro) => {

            console.error(
              'ERRO AO CADASTRAR:',
              erro
            );

          }

        });

    }


    // ==========================
    // EDITAR CORRIDA EXISTENTE
    // ==========================

    else {

      this.corridaService
        .alterarCorrida(corrida)
        .subscribe({

          next: (dados) => {

            console.log(
              'CORRIDA ALTERADA:',
              dados
            );

            alert(
              'Corrida alterada com sucesso!'
            );


            // VOLTA PARA A LISTA

            this.router.navigate([
              '/corridas'
            ]);

          },

          error: (erro) => {

            console.error(
              'ERRO AO ALTERAR:',
              erro
            );

          }

        });

    }

  }


  limpar() {

    this.descricao_corrida = '';

    this.data_corrida = '';

    this.distancia5km = false;

    this.distancia10km = false;

    this.distancia25km = false;

    this.idCorridaEditando = '';

  }

}