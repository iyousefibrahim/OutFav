import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stock-status',
  imports: [NgClass],
  templateUrl: './stock-status.component.html',
  styleUrl: './stock-status.component.css'
})
export class StockStatusComponent {
  @Input({ required: true }) stockStatus!: string;
}
