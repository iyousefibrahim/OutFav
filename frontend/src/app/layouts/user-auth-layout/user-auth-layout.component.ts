import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationBarComponent } from "../../components/notification-bar/notification-bar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-user-auth-layout',
  imports: [RouterOutlet, NotificationBarComponent, NavbarComponent],
  templateUrl: './user-auth-layout.component.html',
  styleUrl: './user-auth-layout.component.css'
})
export class UserAuthLayoutComponent {

}
