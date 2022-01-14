import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class HeroesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
