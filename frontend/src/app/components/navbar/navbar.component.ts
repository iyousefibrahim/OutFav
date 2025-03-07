import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
  isDropdownOpen: boolean = false;

  ngAfterViewInit(): void {
    this.menu.nativeElement.classList.add('hidden');
  }

  toggleMenu() {
    if (this.menu && this.menu.nativeElement) {
      this.menu.nativeElement.classList.toggle('hidden');
    }
  }

  logOut() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const dropdown = document.querySelector('.relative.cursor-pointer');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }

}
