import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <h4 class="text-white">Sobre</h4>
    <p class="text-muted">Projeto criado com o objetivo de aplicar meus conhecimentos em alguns recursos que o framework Angular 12 oferece!</p>
  `,
  styles: [
  ]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
