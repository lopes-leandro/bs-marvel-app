import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroesComponent } from './heroes.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,    
    children: [
      {
        path: '',
        redirectTo: '/heroes/list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: HeroListComponent
      },
      {
        path: 'detail/:charactereId',
        component: HeroDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
