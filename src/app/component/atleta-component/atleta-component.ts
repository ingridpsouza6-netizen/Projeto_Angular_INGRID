import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  dataNascimento = '';
  sexo = '';
  cep = 0;
  ruaLogradouro = '';
  bairro = '';
  cidade = '';
  uf = '';
  peso = 0;
  altura = 0;

  // ID DO ATLETA QUE ESTÁ SENDO EDITADO
  idAtletaEditando = 0;

  constructor(
    private atletaService: AtletaService,
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
    this.cpf = 0;
    this.sexo = '';
    this.dataNascimento = '';
    this.cep = 0;
    this.ruaLogradouro = '';
    this.bairro = '';
    this.cidade = '';
    this.uf = '';
    this.peso = 0;
    this.altura = 0;

    this.idAtletaEditando = 0;
  }

  salvar() {

    const atleta: Atleta = {

      id: this.idAtletaEditando,

      nome: this.nome,

      cpf: Number(this.cpf),

      data_nascimento: this.dataNascimento,

      peso: Number(this.peso),

      altura: Number(this.altura),

      sexo: this.sexo,

      cep: Number(this.cep),

      rua_logradouro: this.ruaLogradouro,

      bairro: this.bairro,

      cidade: this.cidade,

      uf: this.uf

    };

    // CADASTRAR NOVO ATLETA
    if (this.idAtletaEditando === 0) {

      this.atletaService.salvarAtleta(atleta).subscribe({

        next: (dadosAtleta) => {

          console.log(
            'ATLETA SALVO COM SUCESSO:',
            dadosAtleta
          );

          this.limparDados();

        },

        error: (erro) => {

          console.log(
            'ERRO AO SALVAR ATLETA:',
            erro
          );

        }

      });

    }

    // ALTERAR ATLETA EXISTENTE
    else {

      this.atletaService.alterarAtleta(atleta).subscribe({

        next: (dadosAtleta) => {

          console.log(
            'ATLETA ALTERADO COM SUCESSO:',
            dadosAtleta
          );

          this.limparDados();

        },

        error: (erro) => {

          console.log(
            'ERRO AO ALTERAR ATLETA:',
            erro
          );

        }

      });

    }

  }

  carregaDados(idAtleta: number) {

    this.atletaService.listarAtleta(idAtleta).subscribe({

      next: (dadosAtleta) => {

        console.log(
          'ATLETA CARREGADO PARA EDIÇÃO:',
          dadosAtleta
        );

        // GUARDA O ID
        this.idAtletaEditando = dadosAtleta.id ?? 0;

        // PREENCHE O FORMULÁRIO
        this.nome = dadosAtleta.nome;

        this.cpf = dadosAtleta.cpf;

        this.dataNascimento = dadosAtleta.data_nascimento;

        this.peso = dadosAtleta.peso;

        this.altura = dadosAtleta.altura;

        this.sexo = dadosAtleta.sexo;

        this.cep = dadosAtleta.cep;

        this.ruaLogradouro = dadosAtleta.rua_logradouro;

        this.bairro = dadosAtleta.bairro;

        this.cidade = dadosAtleta.cidade;

        this.uf = dadosAtleta.uf;

      },

      error: (erro) => {

        console.log(
          'ERRO AO BUSCAR ATLETA:',
          erro
        );

      }

    });

  }

}