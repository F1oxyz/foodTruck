import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private router = inject(Router); //para navegar
  private fb = inject(FormBuilder); //para construir el formulario

  loginForm!: FormGroup; //para el form 
  showPassword = false; //para mostrar la contraseña
  isLoading = false; //para mostrar el loading

  constructor(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }) 
  }

  get emailInvalid(): boolean{
    const ctrl = this.loginForm.get('email');
    return !!(ctrl?.invalid && ctrl?.touched);
  }
  get passwordInvalid(): boolean{
    const ctrl = this.loginForm.get('password');
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  async onSubmit(){
     
  }
    
    
  


}
