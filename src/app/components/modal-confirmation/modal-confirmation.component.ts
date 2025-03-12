import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css'],
  standalone: true,
  imports: [CommonModule]  // Agregar CommonModule a imports
})
export class ModalConfirmationComponent {
  @Input() showModal: boolean = false;
  @Input() message: string = '';
  @Output() confirm = new EventEmitter<boolean>();

  closeModal() {
    this.showModal = false;
  }

  confirmDelete() {
    this.confirm.emit(true);
    this.closeModal();
  }

  cancelDelete() {
    this.confirm.emit(false);
    this.closeModal();
  }
}
