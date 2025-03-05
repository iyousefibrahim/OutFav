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
  @Input({ required: true }) textColorClass!: string;
  @Input({ required: true }) buttonWidth: string = 'auto';
  @Input({ required: true }) buttonPadding: string = '12px 24px';
  @Input({ required: true }) imageSrc: string = '';
  @Input({ required: true }) bgColor!: string;
  @Input({ required: true }) routerLink!: string;
}
