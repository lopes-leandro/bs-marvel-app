import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ContactsComponent,
    CardComponent,
    SearchComponent,
    LoaderComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ContactsComponent,
    CardComponent,
    SearchComponent,
    LoaderComponent,
    AboutComponent,
  ]
})
export class SharedComponentsModule { }
