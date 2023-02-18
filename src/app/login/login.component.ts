import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { usuario, UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  RegistroForm: FormGroup;
  LoginForm: FormGroup;
  user: usuario | undefined;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  constructor(public formBuilder: FormBuilder, private el: ElementRef, private usuariosService: UsuariosService, private router: Router) {
    this.RegistroForm = this.createMyForm();
    this.LoginForm = this.createMyFormLogin();
  }

  ngOnInit(): void {  }

  createMyForm(){
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      Repassword: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  createMyFormLogin(){
    return this.formBuilder.group({
      correo: ['', [Validators.required]],
      contrasena: ['', [Validators.required]]
    });
  }

  login(){
    let data = this.LoginForm.value;

    let usuario = {
      correo: data.correo,
      contrasena: data.contrasena
    }

    if(this.LoginForm.valid){
      this.user = this.usuariosService.logIn(data.correo);

      if(this.user != undefined){
        localStorage.setItem('usuario', JSON.stringify(this.user));
          
          this.LoginForm.reset();
          Swal.fire({
            title: 'Bienvenido',
            text: 'Es bueno verte de nuevo ' + this.user.nombre,
            icon: 'success',
            confirmButtonColor: '#dc3545',
          }).then(() => {
            this.router.navigateByUrl("/");
          });
      }
      else{
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrecto',
          icon: 'error',
          confirmButtonColor: '#dc3545',
        })
      }
    }
    else{
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió algún error',
        icon: 'error',
        confirmButtonColor: '#dc3545',
      })
    }

    console.log(usuario);
    
  }

  guardarRegistro(){
    let data = this.RegistroForm.value;

    let usuario = {
      nombre: data.name,
      correo: data.email,
      contrasena: data.password,
      recontrasena: data.Repassword
    }

    if(this.RegistroForm.valid){
      let existe: usuario[];
      let encontrado: boolean = false;

      existe = JSON.parse(localStorage.getItem("usuarios") || '{}');
      console.log(existe);
      

      if(JSON.stringify(existe) != '{}'){
        existe.forEach(u => {
          if(u.correo == usuario.correo){
            encontrado = true;
          }
        })
      }

      if(encontrado){
        Swal.fire({
          title: 'Error',
          text: 'Este usuario ya está registrado',
          icon: 'error',
          confirmButtonColor: '#dc3545',
        })
      }
      else{
        if(usuario.contrasena == usuario.recontrasena){
          this.usuariosService.agregarUsuario(usuario);
        }
        else{
          Swal.fire({
            title: 'Error',
            text: 'Las contraseñas no coinciden',
            icon: 'error',
            confirmButtonColor: '#dc3545',
          })
        }
        
      }
    }
    else{
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió algún error',
        icon: 'error',
        confirmButtonColor: '#dc3545',
      })
    }

    
  }

  cambiarSesion(){
    let myTag = this.el.nativeElement.querySelector(".container");
    let section = this.el.nativeElement.querySelector("section");

    if(!myTag.classList.contains('active'))
    {
      myTag.classList.add('active');
    }
    else{
      myTag.classList.remove('active');
    }

    if(!section.classList.contains('active'))
    {
      section.classList.add('active');
    }
    else{
      section.classList.remove('active');
    }
  }

}
