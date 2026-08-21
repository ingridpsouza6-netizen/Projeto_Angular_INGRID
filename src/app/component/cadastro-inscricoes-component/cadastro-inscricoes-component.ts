import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AtletaService } from '../../service/atleta-service';
import { CorridaService } from '../../service/corrida-service';
import { InscricaoService } from '../../service/inscricao-service';

import { Atleta } from '../Atleta';
import { Corrida } from '../corrida';
import { Inscricao } from '../inscricao';

@Component({
  selector: 'app-cadastro-inscricoes-component',
  imports: [FormsModule],
  templateUrl: './cadastro-inscricoes-component.html',
  styleUrl: './cadastro-inscricoes-component.css'
})
export class CadastroInscricoesComponent {

  atletas: Atleta[] = [];

  corridas: Corrida[] = [];

  idAtleta: number = 0;

  idCorrida: string = '';


  constructor(
    private atletaService: AtletaService,
    private corridaService: CorridaService,
    private inscricaoService: InscricaoService
  ) {}


  ngOnInit() {

    this.listarAtletas();

    this.listarCorridas();

  }


  listarAtletas() {

    this.atletaService
      .listarAtletas()
      .subscribe({

        next: (dados) => {

          console.log(
            'ATLETAS RECEBIDOS:',
            dados
          );

          this.atletas = dados;

        },

        error: (erro) => {

          console.error(
            'ERRO AO LISTAR ATLETAS:',
            erro
          );

        }

      });

  }


  listarCorridas() {

    this.corridaService
      .listarCorridas()
      .subscribe({

        next: (dados) => {

          console.log(
            'CORRIDAS RECEBIDAS:',
            dados
          );

          this.corridas = dados;

        },

        error: (erro) => {

          console.error(
            'ERRO AO LISTAR CORRIDAS:',
            erro
          );

        }

      });

  }


  salvar() {

    if (this.idAtleta === 0) {

      alert(
        'Selecione um atleta.'
      );

      return;

    }


    if (this.idCorrida === '') {

      alert(
        'Selecione uma corrida.'
      );

      return;

    }


    const inscricao = new Inscricao();

    inscricao.idAtleta =
      this.idAtleta;

    inscricao.idCorrida =
      this.idCorrida;


    this.inscricaoService
      .salvarInscricao(inscricao)
      .subscribe({

        next: (dados) => {

          console.log(
            'INSCRIÇÃO REALIZADA COM SUCESSO:',
            dados
          );

          alert(
            'Inscrição realizada com sucesso!'
          );

          this.limpar();

        },

        error: (erro) => {

          console.error(
            'ERRO AO REALIZAR INSCRIÇÃO:',
            erro
          );

        }

      });

  }


  limpar() {

    this.idAtleta = 0;

    this.idCorrida = '';

  }

}