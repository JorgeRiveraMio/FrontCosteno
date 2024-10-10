// modal.component.ts
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TerminalService } from '../../Services/terminal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ModalComponent {
  @Input() title: string = ''; // Título del modal
  @Input() formFields: any[] = []; // Campos del formulario
  @Input() currentView: string = ''; // Vista actual para contexto
  @Output() itemCreated = new EventEmitter<any>(); // Evento para emitir el item creado
  
  // Definir newItem como un objeto dinámico para evitar errores de tipo
  newItem: { [key: string]: any } = {}; 
  private terminalService = inject(TerminalService);

  ngOnChanges() {
    // console.log('Form Fields:', this.formFields);
  }
  // Método para manejar la creación de un nuevo elemento
  agregarItem() {
    if (this.isValid()) {
      this.itemCreated.emit(this.newItem); // Emitir el item creado
      this.newItem = {}; // Reiniciar el formulario
    } else {
      alert('Por favor completa todos los campos requeridos.'); // Mensaje de error
    }
  }
 // Método que se ejecuta cuando se crea un nuevo item desde el modal
 agregarTerminal(newTerminal: any) {
  this.terminalService.registrarTerminal(newTerminal).subscribe(
    (response) => {
      // Manejar la respuesta del servidor
      console.log('Terminal guardada:', response);
      // Aquí puedes mostrar un mensaje de éxito o actualizar la vista
    },
    (error) => {
      // Manejar errores
      console.error('Error al guardar la terminal:', error);
    }
  );
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
