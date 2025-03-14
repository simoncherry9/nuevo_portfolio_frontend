import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactMessageService } from '../../services/contact-message.service';
import { ContactMessage } from '../../interfaces/contact-message';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import Swal from 'sweetalert2';  // Importando SweetAlert2

@Component({
  selector: 'app-mensajes',
  standalone: true,
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css'],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
  ]
})
export class MensajesComponent implements OnInit {
  messages: ContactMessage[] = [];
  selectedMessage: ContactMessage | null = null;
  loading: boolean = true;  // Indicador de carga

  constructor(private messageService: ContactMessageService, private router: Router) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;  // Empieza a cargar
    this.messageService.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
        this.loading = false;  // Termina la carga
      },
      error: (err) => {
        console.error('Error al obtener mensajes:', err);
        this.loading = false;  // Termina la carga, aunque haya error
      }
    });
  }

  selectMessage(message: ContactMessage): void {
    this.selectedMessage = message;
  }

  confirmDeleteMessage(id: number | null | undefined): void {
    if (id == null) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este mensaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'custom-popup',
        title: 'custom-title',
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteMessage(id);  // Si se confirma, se elimina el mensaje
      }
    });
  }

  deleteMessage(id: number): void {
    this.messageService.deleteMessage(id).subscribe({
      next: () => {
        this.messages = this.messages.filter((m) => m.id !== id);
        this.selectedMessage = null;  // Limpiar el mensaje seleccionado

        Swal.fire({
          title: '¡Éxito!',
          text: 'Mensaje eliminado con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          customClass: {
            popup: 'custom-popup',
            title: 'custom-title',
            confirmButton: 'custom-confirm-button'
          }
        });
      },
      error: (err) => {
        console.error('Error al eliminar mensaje:', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el mensaje. Inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          customClass: {
            popup: 'custom-popup',
            title: 'custom-title',
            confirmButton: 'custom-confirm-button'
          }
        });
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
