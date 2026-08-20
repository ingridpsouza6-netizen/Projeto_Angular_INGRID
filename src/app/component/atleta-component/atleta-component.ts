import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtletaService } from '../../service/atleta-service';
import { Atleta } from '../Atleta';

@Component({
  selector: 'app-atleta-component',
  imports: [FormsModule],
  templateUrl: './atleta-component.html',
  styleUrl: './atleta-component.css',
})
export class AtletaComponent {

  // ATRIBUTOS
  nome = '';
  cpf = 0;
  sexo = '';
  cep = 0;
  ruaLogradouro = '';
  bairro = '';
  cidade = '';
  uf = '';

  constructor(private atletaService: AtletaService) {}

  limparDados() {
    this.nome = '';
    this.cpf = 0;
    this.sexo = '';
    this.cep = 0;
    this.ruaLogradouro = '';
    this.bairro = '';
    this.cidade = '';
    this.uf = '';
  }

  salvar() {

    const atleta = new Atleta();

    atleta.nome = this.nome;
    atleta.cpf = this.cpf;
    atleta.sexo = this.sexo;
    atleta.cep = this.cep;
    atleta.ruaLogradouro = this.ruaLogradouro;
    atleta.bairro = this.bairro;
    atleta.cidade = this.cidade;
    atleta.uf = this.uf;

    this.atletaService.salvarAtleta(atleta).subscribe({
      next: (dadosAtleta) => {

        console.log('ATLETA SALVO COM SUCESSO:', dadosAtleta);

        this.limparDados();

      },

      error: (erro) => {

        console.log('ERRO AO SALVAR ATLETA:', erro);

      }
    });
  }

  carregaDados(idAtleta: number) {

    this.atletaService.listarAtleta(idAtleta).subscribe({

      next: (dadosAtleta) => {

        this.nome = dadosAtleta.nome;
        this.cpf = dadosAtleta.cpf;
        this.sexo = dadosAtleta.sexo;
        this.cep = dadosAtleta.cep;
        this.ruaLogradouro = dadosAtleta.ruaLogradouro;
        this.bairro = dadosAtleta.bairro;
        this.cidade = dadosAtleta.cidade;
        this.uf = dadosAtleta.uf;

      },

      error: (erro) => {

        console.log('ERRO AO BUSCAR ATLETA:', erro);

      }

    });
  }

}