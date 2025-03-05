
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild('mobileMenu') menu!: ElementRef;

  ngAfterViewInit(): void {
    this.menu.nativeElement.classList.add('hidden');
  }

  toggleMenu() {
    this.menu.nativeElement.classList.toggle('hidden');
  }

}
