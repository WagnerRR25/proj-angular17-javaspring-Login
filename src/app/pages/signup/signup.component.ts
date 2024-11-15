import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../component/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../component/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  toastService: any;

  constructor(
    private readonly router: Router,
    private readonly LoginService: LoginService
  ){
    this.signupForm = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('',[Validators.required, Validators.minLength(6)])

    })
  }

  submit(){
    this.LoginService.login(this.signupForm.value.email, this.signupForm.value.password).subscribe({
    next: () => this.toastService.success("Login feito com sucesso!"),
    error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
  })
}

  navigate(){
    this.router.navigate(["signup"])
  }
}
