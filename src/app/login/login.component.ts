import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../servicios/auth.service';
import { TokenService } from '../servicios/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  isValidationFail = false;
  loginUsuario!: LoginUsuario;
  roles: string[] = [];
  errMsj!: string;
  form: FormGroup;

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router, private FormBuilder:FormBuilder) { 
    this.form = this.FormBuilder.group({
      nombreUsuario: ['',[Validators.required]],
      password: ['',[Validators.required]],
    })
  }

  get nombreUsuario(){
    return this.form.get('nombreUsuario');
  }

  get password(){
    return this.form.get('password');
  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    if(this.nombreUsuario?.errors || this.password?.errors){
      this.isValidationFail = true;
      return;
    }
    this.loginUsuario = new LoginUsuario(this.form.value.nombreUsuario, this.form.value.password); 
    this.authService.login(this.loginUsuario).subscribe(data => {
      this.isLogged = true;
      this.isLoginFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate(['']).then(() => {
        window.location.reload();
     });
    }, err => {
      this.isLogged = false;
      this.isLoginFail = true;
      this.errMsj = err.error.mensaje;
      console.log(this.errMsj);
    })
  }

}
