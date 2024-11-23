import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { TerminalService } from '../../Services/terminal.service';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Terminal } from '../../Interfaces/Terminal';
import Swal from 'sweetalert2';

import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
  
})
export class TerminalComponent implements OnInit {
  private terminalService = inject(TerminalService);
  private formBuild = inject(FormBuilder);
  terminals: Terminal[] = [];
  idEditado: number | null = null;
  filtro: string = 'activo';
  searchTerm: string = '';

    // Propiedades para la paginación
    p: number = 1; // Página actual
    itemsPerPage: number = 10; // Número de elementos por página

  departamentos = [
    { 
      nombre: 'Lima', 
      provincias: [
        { nombre: 'Lima', distritos: ['Miraflores', 'San Isidro', 'Barranco', 'San Borja', 'Pueblo Libre', 'Lince', 'Rímac'] },
        { nombre: 'Canta', distritos: ['Canta', 'Obrajillo', 'San Buenaventura'] },
        { nombre: 'Huarochirí', distritos: ['Matucana', 'San Pedro de Casta', 'Antioquía', 'San Mateo'] },
        { nombre: 'Cañete', distritos: ['Lunahuaná', 'San Vicente de Cañete', 'Imperial', 'Asia'] }
      ]
    },
    { 
      nombre: 'Cusco', 
      provincias: [
        { nombre: 'Cusco', distritos: ['San Sebastián', 'Wanchaq', 'San Jerónimo', 'Santiago', 'Poroy'] },
        { nombre: 'Urubamba', distritos: ['Urubamba', 'Ollantaytambo', 'Machu Picchu', 'Yucay'] },
        { nombre: 'Calca', distritos: ['Pisac', 'Calca', 'Lamay', 'Lares'] },
        { nombre: 'Anta', distritos: ['Anta', 'Huarocondo'] }
      ]
    },
    { 
      nombre: 'Arequipa', 
      provincias: [
        { nombre: 'Arequipa', distritos: ['Cercado', 'Yanahuara', 'Cayma', 'Sachaca', 'Characato'] },
        { nombre: 'Camaná', distritos: ['Camaná', 'Mariscal Cáceres', 'Quilca'] },
        { nombre: 'Islay', distritos: ['Mollendo', 'Mejía'] },
        { nombre: 'Caylloma', distritos: ['Chivay', 'Cabanaconde', 'Maca'] }
      ]
    },
    { 
      nombre: 'Puno', 
      provincias: [
        { nombre: 'Puno', distritos: ['Puno', 'Chucuito', 'Capachica', 'Amantaní'] },
        { nombre: 'San Román', distritos: ['Juliaca', 'Caracoto'] },
        { nombre: 'Yunguyo', distritos: ['Yunguyo', 'Copani'] },
        { nombre: 'El Collao', distritos: ['Ilave', 'Pilcuyo'] }
      ]
    },
    { 
      nombre: 'La Libertad', 
      provincias: [
        { nombre: 'Trujillo', distritos: ['Trujillo', 'Huanchaco', 'Moche', 'Víctor Larco', 'Laredo'] },
        { nombre: 'Otuzco', distritos: ['Otuzco', 'Salpo'] },
        { nombre: 'Ascope', distritos: ['Chocope', 'Magdalena de Cao'] },
        { nombre: 'Pacasmayo', distritos: ['Pacasmayo', 'San Pedro de Lloc'] }
      ]
    },
    { 
      nombre: 'Ica', 
      provincias: [
        { nombre: 'Ica', distritos: ['Ica', 'Parcona', 'La Tinguiña', 'Subtanjalla'] },
        { nombre: 'Nazca', distritos: ['Nazca', 'Vista Alegre'] },
        { nombre: 'Pisco', distritos: ['Pisco', 'Paracas', 'San Andrés'] },
        { nombre: 'Chincha', distritos: ['Chincha Alta', 'El Carmen', 'Sunampe'] }
      ]
    },
    { 
      nombre: 'Amazonas', 
      provincias: [
        { nombre: 'Chachapoyas', distritos: ['Chachapoyas', 'Huancas'] },
        { nombre: 'Bongará', distritos: ['Jumbilla', 'Cuispes'] },
        { nombre: 'Luya', distritos: ['Lamud', 'Tingo', 'Kuelap'] }
      ]
    },
    { 
      nombre: 'San Martín', 
      provincias: [
        { nombre: 'Moyobamba', distritos: ['Moyobamba', 'Soritor'] },
        { nombre: 'Lamas', distritos: ['Lamas', 'Tabalosos'] },
        { nombre: 'Tarapoto', distritos: ['Tarapoto', 'Sauce'] }
      ]
    },
    { 
      nombre: 'Cajamarca', 
      provincias: [
        { nombre: 'Cajamarca', distritos: ['Cajamarca', 'Baños del Inca', 'Los Baños'] },
        { nombre: 'Cutervo', distritos: ['Cutervo'] },
        { nombre: 'Celendín', distritos: ['Celendín'] }
      ]
    },
    { 
      nombre: 'Ancash', 
      provincias: [
        { nombre: 'Huaraz', distritos: ['Huaraz', 'Independencia'] },
        { nombre: 'Carhuaz', distritos: ['Carhuaz', 'Acopampa'] },
        { nombre: 'Huari', distritos: ['Huari', 'Chavín de Huántar'] },
        { nombre: 'Recuay', distritos: ['Recuay', 'Catac'] }
      ]
    },
    { 
      nombre: 'Junín', 
      provincias: [
        { nombre: 'Huancayo', distritos: ['Huancayo', 'El Tambo', 'Pilcomayo'] },
        { nombre: 'Tarma', distritos: ['Tarma', 'Palca'] },
        { nombre: 'Chanchamayo', distritos: ['La Merced', 'San Ramón'] }
      ]
    },
    { 
      nombre: 'Tacna', 
      provincias: [
        { nombre: 'Tacna', distritos: ['Tacna', 'Alto de la Alianza', 'Pocollay'] },
        { nombre: 'Jorge Basadre', distritos: ['Locumba'] },
        { nombre: 'Tarata', distritos: ['Tarata'] }
      ]
    },
    { 
      nombre: 'Tumbes', 
      provincias: [
        { nombre: 'Tumbes', distritos: ['Tumbes', 'Corrales'] },
        { nombre: 'Zarumilla', distritos: ['Zarumilla', 'Aguas Verdes'] }
      ]
    },
    { 
      nombre: 'Loreto', 
      provincias: [
        { nombre: 'Maynas', distritos: ['Iquitos', 'Punchana', 'Belén', 'San Juan Bautista'] },
        { nombre: 'Mariscal Ramón Castilla', distritos: ['Caballococha'] },
        { nombre: 'Requena', distritos: ['Requena'] }
      ]
    },
    { 
      nombre: 'Madre de Dios', 
      provincias: [
        { nombre: 'Tambopata', distritos: ['Puerto Maldonado', 'Tambopata'] },
        { nombre: 'Manu', distritos: ['Salvación'] }
      ]
    }
  ];
  

  provincias: any[] = [];
  distritos: any[] = [];

  cambiarFiltro(filtro: string) {
    this.filtro = filtro;
      this.p = 1; // Reinicia a la primera página
    console.log(this.filtro);
    this.listar(this.filtro);
  }

  ngOnInit(): void {
    this.listar(this.filtro);
  }

  listar(filtro: string) {
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

   // Manejar el cambio de departamento
  onDepartamentoChange(event: any) {
    const departamentoSeleccionado = event.target.value;
    this.provincias = this.departamentos.find(dep => dep.nombre === departamentoSeleccionado)?.provincias || [];
    this.terminalForm.patchValue({ provincia: '', distrito: '' });
    this.distritos = [];
    console.log(this.provincias); 
  }                           

  // Manejar el cambio de provincia
  onProvinciaChange(event: any) {
    const provinciaSeleccionada = event.target.value;
    this.distritos = this.provincias.find(prov => prov.nombre === provinciaSeleccionada)?.distritos || [];
    this.terminalForm.patchValue({ distrito: '' }); 
    console.log(this.distritos);
  }

  filtrarTerminales() {
    this.p = 1; //Reinicia a la primera página
    this.terminalService.listarTerminales().subscribe((data: Terminal[]) => {
        let filteredTerminals = data;
        if (this.searchTerm) {
            filteredTerminals = data.filter(terminal => 
                terminal.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                terminal.direccion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                terminal.departamento.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                terminal.provincia.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                terminal.distrito.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
        this.terminals = filteredTerminals;
    }, error => {
        console.error('Error al listar las terminales:', error);
    });  
  }

  guardar() {
    if (this.terminalForm.valid) {
      const formData: Terminal = {
        idTerminal: 0, // Puedes ajustar este valor según tu lógica
        nombre: this.terminalForm.get('nombre')?.value ?? '',
        direccion: this.terminalForm.get('direccion')?.value ?? '',
        departamento: this.terminalForm.get('departamento')?.value ?? '',
        provincia: this.terminalForm.get('provincia')?.value ?? '',
        distrito: this.terminalForm.get('distrito')?.value ?? '',
        coordenadaLatitud: this.terminalForm.get('coordenadaLatitud')?.value ?? '',
        coordenadaLongitud: this.terminalForm.get('coordenadaLongitud')?.value ?? '',
        estado: 'activo'
      };

      if (this.idEditado != null) {
        this.terminalService.actualizarTerminal(this.idEditado, formData).subscribe({
          next: (response) => {
            console.log('Terminal actualizado correctamente', response);
            this.listar(this.filtro);
            this.alertaCorrecto();
          },
          error: (error) => {
            console.error('Error al actualizar el terminal', error);
          }
        });
      } else {
        this.terminalService.registrarTerminal(formData).subscribe({
          next: (response) => {
            console.log('Se registró correctamente', response);
            this.listar(this.filtro);
            this.alertaCorrecto();
          },
          error: (error) => {
            console.error('No se registró correctamente', error);
          }
        });
      }
    }
  }

  editar(id: number) {
    console.log(id);
    this.idEditado = id;
    this.terminalService.buscarTerminal(id).subscribe({
      next: (terminal: Terminal) => {
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

  actualizarEstado(id: number) {
    this.terminalService.actualizarEstado(id).subscribe({
      next: (response) => {
        this.listar(this.filtro);
        this.alertaCorrecto();
      },
      error: (error) => {
        console.error('Error al actualizar el estado', error);
      }
    });
  }

  alertaCorrecto() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Se realizó correctamente",
      showConfirmButton: false,
      timer: 1500
    });
  }
}
