import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClienteService } from '../../Services/cliente.service';

@Component({
  selector: 'app-nueva-contrasena',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './nueva-contrasena.component.html',
  styleUrl: './nueva-contrasena.component.css'
})
export class NuevaContrasenaComponent {
  public formBuild = inject(FormBuilder);
  private router = inject(Router);
  private clienteService = inject(ClienteService);

  contrasenaForm = this.formBuild.group({  
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmarPassword: ['', Validators.required]
  }, { validators: this.passwordsMatchValidator });
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmarPassword = form.get('confirmarPassword')?.value;
    return password === confirmarPassword ? null : { mismatch: true };
  }
  get password() {
    return this.contrasenaForm.get('password');
  }

  get confirmarPassword() {
    return this.contrasenaForm.get('confirmarPassword');
  }

}
