import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactMessageService } from '../../services/contact-message.service';
import { ContactMessage } from '../../interfaces/contact-message';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ModalConfirmationComponent } from '../../components/modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css'],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ModalConfirmationComponent, 
  ]
})
export class MensajesComponent implements OnInit {
  messages: ContactMessage[] = [];
  selectedMessage: ContactMessage | null = null;
  showModal: boolean = false; 
  currentMessageId: number | null = null; 

  constructor(private messageService: ContactMessageService, private router: Router) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getMessages().subscribe({
      next: (data) => (this.messages = data),
      error: (err) => console.error('Error al obtener mensajes:', err)
    });
  }

  selectMessage(message: ContactMessage): void {
    this.selectedMessage = message;
  }

  deleteMessage(id: number | null | undefined): void {
    if (id == null) return; 

    
    this.currentMessageId = id;
    this.showModal = true;
  }

  onConfirmDelete(confirm: boolean): void {
    if (confirm && this.currentMessageId) {
      this.messageService.deleteMessage(this.currentMessageId).subscribe({
        next: () => {
          this.messages = this.messages.filter((m) => m.id !== this.currentMessageId);
          this.selectedMessage = null;
          this.showModal = false; 
        },
        error: (err) => {
          console.error('Error al eliminar mensaje:', err);
          this.showModal = false; 
        }
      });
    } else {
      this.showModal = false; 
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
