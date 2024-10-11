import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { TerminalService } from '../../Services/terminal.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Terminal } from '../../Interfaces/Terminal';
import bootstrap from 'bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [HeaderComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})
export class TerminalComponent implements OnInit {
  private terminalService=inject(TerminalService);
private formBuild = inject(FormBuilder);
  terminals: Terminal[] = [];
  idEditado: number | null = null;
  filtro:string="activo";

  cambiarFiltro(filtro:string	){
    this.filtro=filtro;
    console.log(this.filtro)
    this.listar(this.filtro)
  
  }
  ngOnInit(): void {
    this.listar(this.filtro)
  }
  listar(filtro:string) {
    this.terminalService.listarTerminales().subscribe((data: Terminal[]) => {
      if (filtro === 'activo') {
        this.terminals = data.filter(terminal => terminal.estado === 'activo');
      } else if (filtro === 'inactivo') {
        this.terminals = data.filter(terminal => terminal.estado === 'inactivo');
      } else {
        this.terminals = data; // En caso de que el filtro no sea válido
      }
      console.log(this.terminals); // Mover aquí para asegurarte de que muestre los datos correctos
    }, error => {
      console.error('Error al listar las terminales:', error); // Manejar el error
    });
  }
  
  

terminalForm = this.formBuild.group({ 
  nombre: ['', Validators.required],
  direccion: ['', Validators.required],
  departamento: ['', Validators.required],
  provincia: ['', Validators.required],
  distrito: ['', Validators.required],
  coordenadaLatitud: ['', [Validators.required]],
  coordenadaLongitud: ['', [Validators.required]],
});
  


  guardar(){
    if(this.terminalForm.valid){
      const formData: Terminal = {
        idTerminal: 0,  // Puedes ajustar este valor según tu lógica
       nombre: this.terminalForm.get('nombre')?.value ?? '',
       direccion: this.terminalForm.get('direccion')?.value ?? '',
       departamento: this.terminalForm.get('departamento')?.value ?? '',
       provincia: this.terminalForm.get('provincia')?.value ?? '',
       distrito: this.terminalForm.get('distrito')?.value ?? '',
       coordenadaLatitud: this.terminalForm.get('coordenadaLatitud')?.value ?? '',
       coordenadaLongitud: this.terminalForm.get('coordenadaLongitud')?.value ?? '',
        estado:'activo'
   }
      if(this.idEditado != null){
        console.log(this.idEditado)
        //se edita
          this.terminalService.actualizarTerminal(this.idEditado,formData).subscribe({
        next: (response) => {
          console.log('Terminal actualizado correctamente', response);
          this.listar(this.filtro)
          this.alertaCorrecto()
        },
        error: (error) => {
          console.error('Error al actualizar el terminal', error);
        }
      })
    
        
      }else{
      
     this.terminalService.registrarTerminal(formData).subscribe({
       next: (response) => {
         console.log('Se registro correctamente', response);    
         this.listar(this.filtro)  
         this.alertaCorrecto()
       },
       error: (error) => {
         console.error('No se registro correctamente', error);
       }
     });
      }            
  }
  }
  editar(id: number) {
    console.log(id);
    this.idEditado=id;
    this.terminalService.buscarTerminal(id).subscribe({
      next: (terminal: Terminal) => {
        console.log('Terminal encontrado', terminal);
        // Aquí puedes llenar los valores del formulario
        this.terminalForm.patchValue({
          nombre: terminal.nombre,
          direccion: terminal.direccion,
          departamento: terminal.departamento,
          provincia: terminal.provincia,
          distrito: terminal.distrito,
          coordenadaLatitud: terminal.coordenadaLatitud,
          coordenadaLongitud: terminal.coordenadaLongitud,
        
        });
      },
      error: (error) => {
        console.error('Error al buscar el terminal', error);
      }
    });

  
}
actualizarEstado(id:number){
  this.terminalService.actualizarEstado(id).subscribe({
    next: (response) => {
      console.log('Estado actualizado correctamente', response);
      this.listar(this.filtro)
      this.alertaCorrecto()
    },
    error: (error) => {
      console.error('Error al actualizar el estado', error);
    }
  });
}
alertaCorrecto(){
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Se realizo correctamente",
    showConfirmButton: false,
    timer: 1500
  });  
}
}