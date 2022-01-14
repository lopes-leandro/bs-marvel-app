import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ContactsComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ContactsComponent,
    CardComponent
  ]
})
export class SharedComponentsModule { }
