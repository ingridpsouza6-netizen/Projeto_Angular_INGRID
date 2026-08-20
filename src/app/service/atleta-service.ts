import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atleta } from '../component/Atleta';

@Injectable({
  providedIn: 'root'
})
export class AtletaService {

  private urlApi =
    'https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta';

  constructor(private http: HttpClient) {}

  // LISTAR ATLETAS
  listarAtletas(): Observable<Atleta[]> {
    return this.http.get<Atleta[]>(this.urlApi);
  }

  // BUSCAR UM ATLETA
  listarAtleta(idAtleta: number): Observable<Atleta> {
    return this.http.get<Atleta>(
      `${this.urlApi}/${idAtleta}`
    );
  }

  // CADASTRAR ATLETA
  salvarAtleta(atleta: Atleta): Observable<Atleta> {
    return this.http.post<Atleta>(
      this.urlApi,
      atleta
    );
  }

  // EXCLUIR ATLETA
  excluirAtleta(idAtleta: number): Observable<Atleta> {
    return this.http.delete<Atleta>(
      `${this.urlApi}/${idAtleta}`
    );
  }

  // ALTERAR ATLETA
  alterarAtleta(atleta: Atleta): Observable<Atleta> {
    return this.http.put<Atleta>(
      `${this.urlApi}/${atleta.id}`,
      atleta
    );
  }

}