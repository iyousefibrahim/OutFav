import { Component } from '@angular/core';
import { NotificationBarComponent } from "../../components/notification-bar/notification-bar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MainHeroComponent } from "../../components/main-hero/main-hero.component";

@Component({
  selector: 'app-user-layout',
  imports: [NotificationBarComponent, NavbarComponent, FooterComponent, MainHeroComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
