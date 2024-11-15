import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../component/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../component/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  toastService: any;

  constructor(
    private readonly router: Router,
    private readonly LoginService: LoginService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    this.LoginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
    next: () => this.toastService.success("Login feito com sucesso!"),
    error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
  })
}

  navigate(){
    this.router.navigate(["signup"])
  }
}
