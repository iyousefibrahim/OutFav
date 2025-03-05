import { Component, Input } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";

@Component({
  selector: 'app-footer',
  imports: [LogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input({ required: true }) footerColor: 'white' | '--neutral-100' = 'white';
}
