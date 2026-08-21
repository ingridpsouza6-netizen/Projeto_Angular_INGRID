import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Inscricao } from '../component/inscricao';

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {

  private urlApi =
    'https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/inscricao';


  constructor(
    private http: HttpClient
  ) {}


  // LISTAR INSCRIÇÕES
  listarInscricoes(): Observable<Inscricao[]> {

    return this.http.get<Inscricao[]>(
      this.urlApi
    );

  }


  // BUSCAR UMA INSCRIÇÃO
  listarInscricao(
    idInscricao: string
  ): Observable<Inscricao> {

    return this.http.get<Inscricao>(
      `${this.urlApi}/${idInscricao}`
    );

  }


  // CADASTRAR INSCRIÇÃO
  salvarInscricao(
    inscricao: Inscricao
  ): Observable<Inscricao> {

    return this.http.post<Inscricao>(
      this.urlApi,
      inscricao
    );

  }


  // ALTERAR INSCRIÇÃO
  alterarInscricao(
    inscricao: Inscricao
  ): Observable<Inscricao> {

    return this.http.put<Inscricao>(
      `${this.urlApi}/${inscricao.id}`,
      inscricao
    );

  }


  // EXCLUIR INSCRIÇÃO
  excluirInscricao(
    idInscricao: string
  ): Observable<Inscricao> {

    return this.http.delete<Inscricao>(
      `${this.urlApi}/${idInscricao}`
    );

  }

}