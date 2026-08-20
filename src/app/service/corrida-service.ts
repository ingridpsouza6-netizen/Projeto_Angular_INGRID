import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Corrida } from '../component/corrida';

@Injectable({
  providedIn: 'root'
})
export class CorridaService {

  private urlApi =
    'https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida';

  constructor(private http: HttpClient) {}

  // LISTAR CORRIDAS
  listarCorridas(): Observable<Corrida[]> {
    return this.http.get<Corrida[]>(this.urlApi);
  }

  // BUSCAR UMA CORRIDA
  listarCorrida(idCorrida: number): Observable<Corrida> {
    return this.http.get<Corrida>(
      `${this.urlApi}/${idCorrida}`
    );
  }

  // CADASTRAR CORRIDA
  salvarCorrida(corrida: Corrida): Observable<Corrida> {
    return this.http.post<Corrida>(
      this.urlApi,
      corrida
    );
  }

  // EXCLUIR CORRIDA
  excluirCorrida(idCorrida: number): Observable<Corrida> {
    return this.http.delete<Corrida>(
      `${this.urlApi}/${idCorrida}`
    );
  }

  // ALTERAR CORRIDA
  alterarCorrida(corrida: Corrida): Observable<Corrida> {
    return this.http.put<Corrida>(
      `${this.urlApi}/${corrida.id}`,
      corrida
    );
  }

}