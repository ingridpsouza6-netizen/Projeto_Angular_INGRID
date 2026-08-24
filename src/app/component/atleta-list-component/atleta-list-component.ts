import { Component, ChangeDetectorRef } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
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

  constructor(
    private atletaService: AtletaService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {

    console.log('========== INÍCIO DA LISTA ==========');

    this.listar();

  }

  listar() {

    this.atletaService.listarAtletas().subscribe({

      next: (dadosAtletas: Atleta[]) => {

        console.log('ATLETAS RECEBIDOS DA API:', dadosAtletas);

        console.log('QUANTIDADE RECEBIDA:', dadosAtletas.length);

        this.atletas = dadosAtletas;

        console.log(
          'ATLETAS DEPOIS DE this.atletas = dadosAtletas:',
          this.atletas
        );

        this.cdr.detectChanges();

      },

      error: (erro) => {

        console.error('ERRO AO LISTAR ATLETAS:', erro);

      }

    });

  }

  excluir(idAtleta: number) {

    this.atletaService.excluirAtleta(idAtleta).subscribe({

      next: () => {

        console.log('ATLETA EXCLUÍDO COM SUCESSO');

        this.listar();

      },

      error: (erro) => {

        console.error('ERRO AO EXCLUIR ATLETA:', erro);

      }

    });

  }

  editar(idAtleta: number) {

    console.log('EDITAR ATLETA:', idAtleta);

    this.router.navigate(['/atleta'], {

      queryParams: {
        id: idAtleta
      }

    });

  }
  calcularIdade(dataNascimento: string): number {

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
  
    let idade = hoje.getFullYear() - nascimento.getFullYear();
  
    const mes = hoje.getMonth() - nascimento.getMonth();
  
    if (
      mes < 0 ||
      (mes === 0 && hoje.getDate() < nascimento.getDate())
    ) {
      idade--;
    }
  
    return idade;
  }

}