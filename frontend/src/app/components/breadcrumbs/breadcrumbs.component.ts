import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {
  private readonly _Router = inject(Router);

  @Input({
    required: true
  }) title!: string;

  url:string = '';

  ngOnInit(): void {
    this.url = this._Router.url.slice(1).charAt(0).toUpperCase() + this._Router.url.slice(1).slice(1);
  }

}
