import { Component, ChangeDetectorRef } from '@angular/core';
import { CorridaService } from '../../service/corrida-service';
import { Corrida } from '../corrida';

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
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    console.log('========== INÍCIO DA LISTA DE CORRIDAS ==========');

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

}