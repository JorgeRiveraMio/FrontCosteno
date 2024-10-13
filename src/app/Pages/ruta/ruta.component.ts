import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ruta } from '../../Interfaces/Ruta';
import { RutaService } from '../../Services/ruta.service';
import { CommonModule } from '@angular/common';
import { TerminalService } from '../../Services/terminal.service';
import { Terminal } from '../../Interfaces/Terminal';

@Component({
  selector: 'app-ruta',
  standalone: true,
  imports: [HeaderComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './ruta.component.html',
  styleUrl: './ruta.component.css'
})
export class RutaComponent {
  private rutaService=inject(RutaService);
private formBuild = inject(FormBuilder);
private terminalService=inject(TerminalService);

  rutas: Ruta[] = [];
  terminal:Terminal[]=[];
  idEditado: number | null = null;
  filtro:string="activo";

  cambiarFiltro(filtro:string	){
    this.filtro=filtro;
    console.log(this.filtro)
    this.listar(this.filtro)
  
  }
  ngOnInit(): void {
    this.listar(this.filtro)
    this.combo();
  }
  listar(filtro:string) {
    this.rutaService.listarRutas().subscribe((data: Ruta[]) => {
      if (filtro === 'activo') {
        this.rutas = data.filter(ruta => ruta.estadoRuta === 'activo');
      } else if (filtro === 'inactivo') {
        this.rutas = data.filter(ruta => ruta.estadoRuta === 'inactivo');
      } else {
        this.rutas = data; // En caso de que el filtro no sea válido
      }
      console.log(this.rutas); // Mover aquí para asegurarte de que muestre los datos correctos
    }, error => {
      console.error('Error al listar las terminales:', error); // Manejar el error
    });
  }
  
  combo(){
    this.terminalService.listarTerminales().subscribe((data: Terminal[]) => {
      this.terminal = data.filter(ruta => ruta.estado === 'activo');
      console.log(this.terminal);

    }, error => {
      console.error('Error al obtener los terminales:', error);
    });
  }

rutaForm = this.formBuild.group({ 
  origen: ['', Validators.required],
  destino: ['', Validators.required],
  distancia: ['', Validators.required],
  duracion: ['', Validators.required]

});
  


  guardar(){
  //   if(this.rutaForm.valid){
  //     const formData: Ruta = {
  //       idRuta: 0,  // Puedes ajustar este valor según tu lógica
  //      terminalOrigen: this.rutaForm.get('origen')?.value ?? '',
  //      terminalDestino: this.rutaForm.get('direccion')?.value ?? '',
  //      distancia: this.rutaForm.get('departamento')?.value ?? '',
  //      duracion: this.rutaForm.get('provincia')?.value ?? '',
  //      administrador: this.rutaForm.get('distrito')?.value ?? '',      
  //       estado:'activo'
  //  }
  //     if(this.idEditado != null){
  //       console.log(this.idEditado)
  //       //se edita
  //         this.rutaService.actualizarRuta(this.idEditado,formData).subscribe({
  //       next: (response) => {
  //         console.log('Terminal actualizado correctamente', response);
  //         this.listar(this.filtro)
  //         this.alertaCorrecto()
  //       },
  //       error: (error) => {
  //         console.error('Error al actualizar el terminal', error);
  //       }
  //     })
    
        
  //     }else{
      
  //    this.rutaService.registrarRuta(formData).subscribe({
  //      next: (response) => {
  //        console.log('Se registro correctamente', response);    
  //        this.listar(this.filtro)  
  //        this.alertaCorrecto()
  //      },
  //      error: (error) => {
  //        console.error('No se registro correctamente', error);
  //      }
  //    });
  //     }            
  // }
  }
  editar(id: number) {
    // console.log(id);
    // this.idEditado=id;
    // this.rutaService.buscarRuta(id).subscribe({
    //   next: (terminal: Terminal) => {
    //     console.log('Terminal encontrado', terminal);
    //     // Aquí puedes llenar los valores del formulario
    //     this.terminalForm.patchValue({
    //       nombre: terminal.nombre,
    //       direccion: terminal.direccion,
    //       departamento: terminal.departamento,
    //       provincia: terminal.provincia,
    //       distrito: terminal.distrito,
    //       coordenadaLatitud: terminal.coordenadaLatitud,
    //       coordenadaLongitud: terminal.coordenadaLongitud,
        
    //     });
    //   },
    //   error: (error) => {
    //     console.error('Error al buscar el terminal', error);
    //   }
    // });

  
}
actualizarEstado(id:number){
  // this.terminalService.actualizarEstado(id).subscribe({
  //   next: (response) => {
  //     console.log('Estado actualizado correctamente', response);
  //     this.listar(this.filtro)
  //     this.alertaCorrecto()
  //   },
  //   error: (error) => {
  //     console.error('Error al actualizar el estado', error);
  //   }
  // });
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
