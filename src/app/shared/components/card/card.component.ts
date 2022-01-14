import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public cardClicked(): void {
    this.router.navigate([`/heroes/detail/123`]);
  }

}
