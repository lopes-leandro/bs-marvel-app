import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="row" style="min-height: 285px;">
      <div class="col d-flex justify-content-center align-self-center">
        <div class="spinner-border text-primary" style="width: 5rem; height: 5rem;" role="status"></div>
      </div>
    </div>
  `,
  styles: [``]
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
