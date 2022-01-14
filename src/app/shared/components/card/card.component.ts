import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface ICard {
  id: number;
  description: string;
  name: string;
  thumbnail: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input('source') source: Partial<ICard> = {};
  @Input('navigate') navigateUrl: string = '';

  constructor(private router: Router) {
    console.log(this.source);

  }

  ngOnInit(): void {
  }

  public cardClicked(): void {
    if (!this.navigateUrl) {
      return;
    }
    this.router.navigate([`${this.navigateUrl}/${this.source?.id}`])
  }

}
