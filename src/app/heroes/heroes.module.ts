import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { SharedComponentsModule } from '../shared/shared-components.module';

@NgModule({
  declarations: [
    HeroesComponent,
    HeroListComponent,
    HeroDetailComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    SharedComponentsModule
  ]
})
export class HeroesModule { }
