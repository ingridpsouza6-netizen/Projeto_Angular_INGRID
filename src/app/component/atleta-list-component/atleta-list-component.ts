import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AtletaService } from '../../service/atleta-service';
import { Atleta } from '../Atleta';

@Component({
  selector: 'app-atleta-list-component',
  imports: [JsonPipe],
  templateUrl: './atleta-list-component.html',
  styleUrl: './atleta-list-component.css'
})
export class AtletaListComponent {

  atletas: Atleta[] = [];

  constructor(private atletaService: AtletaService) {}

  ngOnInit() {

    console.log('ENTROU NA LISTA');

    this.atletaService.listarAtletas().subscribe({

      next: (dadosAtletas) => {

        console.log('DADOS DA API:', dadosAtletas);

        this.atletas = dadosAtletas;

      },

      error: (erro) => {

        console.error('ERRO DA API:', erro);

      }

    });

  }

}