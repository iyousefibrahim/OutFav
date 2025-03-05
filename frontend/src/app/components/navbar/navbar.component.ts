import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from "../logo/logo.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('mobileMenu') menu!: ElementRef;
  isLoggedIn: boolean = localStorage.getItem('token') ? true : false;

  ngAfterViewInit(): void {
    this.menu.nativeElement.classList.add('hidden');
  }

  toggleMenu() {
    if (this.menu && this.menu.nativeElement) {
      this.menu.nativeElement.classList.toggle('hidden');
    }
  }
  

}
