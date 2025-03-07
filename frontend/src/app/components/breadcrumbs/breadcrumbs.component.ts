import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink, NgClass],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {
  private readonly _Router = inject(Router);

  @Input() title!: string;
  @Input() padding: string = "12";
  @Input() url : string = '';
  @Input() backgroundVarColor : string = "--neutral-100";

  ngOnInit(): void {
    if(this.url === ''){
      this.url = this._Router.url.slice(1).charAt(0).toUpperCase() + this._Router.url.slice(1).slice(1);
    }
  }

}
