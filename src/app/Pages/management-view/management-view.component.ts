import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import bootstrap from 'bootstrap';


@Component({
  selector: 'app-management-view',
  standalone: true,
  templateUrl: './management-view.component.html',
  imports: [CommonModule, FormsModule, ModalComponent],
})
export class ManagementViewComponent {
  @Input() title!: string; // Título de la vista
  @Input() items!: any[]; // Elementos a mostrar en la lista
  @Output() addItem = new EventEmitter<any>(); // Evento para agregar un nuevo elemento
  @Output() editItem = new EventEmitter<any>(); // Evento para editar un elemento
  @Output() deleteItem = new EventEmitter<any>(); // Evento para eliminar un elemento

  openModal() {
    if (typeof document !== 'undefined') {
      const modalElement = document.getElementById('crearBusModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
    } else {
      console.error('document is not available in this environment.');
    }
  }
}
