import { Component, ChangeDetectorRef } from '@angular/core';

import { CorridaService } from '../../service/corrida-service';
import { Corrida } from '../corrida';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corrida-list-component',
  imports: [],
  templateUrl: './corrida-list-component.html',
  styleUrl: './corrida-list-component.css'
})
export class CorridaListComponent {

  corridas: Corrida[] = [];

  constructor(
    private corridaService: CorridaService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {

    this.listar();

  }

  listar() {

    this.corridaService.listarCorridas().subscribe({

      next: (dadosCorridas: Corrida[]) => {

        console.log(
          'CORRIDAS RECEBIDAS DA API:',
          dadosCorridas
        );

        console.log(
          'QUANTIDADE DE CORRIDAS:',
          dadosCorridas.length
        );

        this.corridas = dadosCorridas;

        this.cdr.detectChanges();

      },

      error: (erro) => {

        console.error(
          'ERRO AO LISTAR CORRIDAS:',
          erro
        );

      }

    });

  }

  editar(corrida: Corrida) {

    console.log(
      'CORRIDA SELECIONADA PARA EDIÇÃO:',
      corrida
    );

    this.router.navigate(
      ['/cadastro-corridas'],
      {
        queryParams: {
          id: corrida.id
        }
      }
    );

  }

  excluir(corrida: Corrida) {

    const confirmar = confirm(
      'Tem certeza que deseja excluir esta corrida?'
    );

    if (!confirmar) {
      return;
    }

    this.corridaService
      .excluirCorrida(Number(corrida.id))
      .subscribe({

        next: () => {

          console.log(
            'CORRIDA EXCLUÍDA COM SUCESSO!'
          );

          this.listar();

        },

        error: (erro) => {

          console.error(
            'ERRO AO EXCLUIR CORRIDA:',
            erro
          );

        }

      });

  }

}