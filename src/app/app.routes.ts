import { Routes } from '@angular/router';

import { HomeComponent } from './component/home-component/home-component';

import { AtletaComponent } from './component/atleta-component/atleta-component';

import { AtletaListComponent } from './component/atleta-list-component/atleta-list-component';

import { CorridaListComponent } from './component/corrida-list-component/corrida-list-component';

import { CadastroCorridasComponent } from './component/cadastro-corridas-component/cadastro-corridas-component';

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
    path: 'cadastro-corridas',
    component: CadastroCorridasComponent
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