import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { BreadcrumbsComponent } from "../breadcrumbs/breadcrumbs.component";
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-contact',
  imports: [ButtonComponent, BreadcrumbsComponent, Toast],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  providers: [MessageService]
})
export class ContactComponent {
  private readonly _MessageService = inject(MessageService);

  submit(event: Event): void {
    event.preventDefault();
    this._MessageService.add({ severity: 'success', summary: 'Success', detail: "Your message sent!" });
  }
}
