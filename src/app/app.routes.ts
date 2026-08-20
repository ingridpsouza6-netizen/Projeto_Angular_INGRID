import { Routes } from '@angular/router';

import { HomeComponent } from './component/home-component/home-component';
import { AtletaComponent } from './component/atleta-component/atleta-component';
import { AtletaListComponent } from './component/atleta-list-component/atleta-list-component';

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
  }

];