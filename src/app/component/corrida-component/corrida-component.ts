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

  // ATRIBUTOS DA CORRIDA
  nome = '';
  data = '';
  local = '';
  distancia = 0;
  horario = '';

  // ID DA CORRIDA QUE ESTÁ SENDO EDITADA
  idCorridaEditando = 0;

  constructor(
    private corridaService: CorridaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      const id = params['id'];

      console.log('ID RECEBIDO PARA EDIÇÃO:', id);

      if (id) {

        this.carregaDados(Number(id));

      }

    });

  }

  limparDados() {

    this.nome = '';
    this.data = '';
    this.local = '';
    this.distancia = 0;
    this.horario = '';

    this.idCorridaEditando = 0;

  }

  salvar() {

    const corrida = new Corrida();

    corrida.id = this.idCorridaEditando;
    corrida.nome = this.nome;
    corrida.data = this.data;
    corrida.local = this.local;
    corrida.distancia = this.distancia;
    corrida.horario = this.horario;

    // CADASTRAR NOVA CORRIDA
    if (this.idCorridaEditando === 0) {

      this.corridaService.salvarCorrida(corrida).subscribe({

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

    }

    // ALTERAR CORRIDA EXISTENTE
    else {

      this.corridaService.alterarCorrida(corrida).subscribe({

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

  carregaDados(idCorrida: number) {

    this.corridaService.listarCorrida(idCorrida).subscribe({

      next: (dadosCorrida) => {

        console.log(
          'CORRIDA CARREGADA PARA EDIÇÃO:',
          dadosCorrida
        );

        this.idCorridaEditando = dadosCorrida.id;

        this.nome = dadosCorrida.nome;
        this.data = dadosCorrida.data;
        this.local = dadosCorrida.local;
        this.distancia = dadosCorrida.distancia;
        this.horario = dadosCorrida.horario;

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