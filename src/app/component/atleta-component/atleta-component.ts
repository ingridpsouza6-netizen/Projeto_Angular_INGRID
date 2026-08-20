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
  sexo = '';
  cep = 0;
  ruaLogradouro = '';
  bairro = '';
  cidade = '';
  uf = '';

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
    this.cep = 0;
    this.ruaLogradouro = '';
    this.bairro = '';
    this.cidade = '';
    this.uf = '';

    this.idAtletaEditando = 0;

  }

  salvar() {

    const atleta = new Atleta();

    atleta.id = this.idAtletaEditando;
    atleta.nome = this.nome;
    atleta.cpf = this.cpf;
    atleta.sexo = this.sexo;
    atleta.cep = this.cep;
    atleta.ruaLogradouro = this.ruaLogradouro;
    atleta.bairro = this.bairro;
    atleta.cidade = this.cidade;
    atleta.uf = this.uf;

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
        this.idAtletaEditando = dadosAtleta.id;

        // PREENCHE O FORMULÁRIO
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

        console.log(
          'ERRO AO BUSCAR ATLETA:',
          erro
        );

      }

    });

  }

}