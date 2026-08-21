import { Routes } from '@angular/router';

import { HomeComponent } from './component/home-component/home-component';

import { AtletaComponent } from './component/atleta-component/atleta-component';

import { AtletaListComponent } from './component/atleta-list-component/atleta-list-component';

import { CorridaComponent } from './component/corrida-component/corrida-component';

import { CorridaListComponent } from './component/corrida-list-component/corrida-list-component';

import { CadastroInscricoesComponent } from './component/cadastro-inscricoes-component/cadastro-inscricoes-component';


export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'atleta',
    component: AtletaComponent
  },

  {
    path: 'atletas',
    component: AtletaListComponent
  },

  {
    path: 'corrida',
    component: CorridaComponent
  },

  {
    path: 'corridas',
    component: CorridaListComponent
  },

  {
    path: 'cadastro-inscricoes',
    component: CadastroInscricoesComponent
  }

];