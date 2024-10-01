import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ModalComponent {
  @Input() title: string = ''; // Título del modal
  @Input() formFields: any[] = []; // Campos del formulario
  @Output() itemCreated = new EventEmitter<any>(); // Evento para emitir el item creado
  newItem: any = {}; // Objeto para el nuevo elemento

  // Método para manejar la creación de un nuevo elemento
  agregarItem() {
    if (this.isValid()) {
      this.itemCreated.emit(this.newItem); // Emitir el item creado
      this.newItem = {}; // Reiniciar el formulario
    } else {
      alert('Por favor completa todos los campos requeridos.'); // Mensaje de error
    }
  }

  // Método para validar si todos los campos requeridos están llenos
  isValid(): boolean {
    return this.formFields.every(field => field.required ? !!this.newItem[field.name] : true);
  }

  // Método para llenar el formulario con datos existentes (en caso de editar)
  fillForm(item: any) {
    this.newItem = { ...item }; // Rellenar newItem con los datos del item pasado
  }
}
