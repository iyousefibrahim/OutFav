import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [NgClass, NgStyle,RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input({ required: true }) title!: string;
  @Input() textColorClass: string = "white";
  @Input() buttonWidth: string = 'auto';
  @Input() buttonPadding: string = '12px 24px';
  @Input() imageSrc: string = '';
  @Input() bgColor: string = "bg-(--neutral-800)";
  @Input() routerLink!: string;
}
