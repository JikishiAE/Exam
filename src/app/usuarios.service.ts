import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface usuario{
  nombre: string;
  correo: string;
  contrasena: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios: usuario[];
  private usuarios$: Subject<usuario>;

  constructor() { 
    this.usuarios = [];

    if(localStorage.getItem("usuarios")){
      this.usuarios = JSON.parse(localStorage.getItem("usuarios") || '{}');
    }

    this.usuarios$ = new Subject();
  }

  agregarUsuario(newUsuario: usuario){
    this.usuarios.push(newUsuario);
    this.usuarios$.next(newUsuario);

    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

    console.log(this.usuarios);
    
  }

  logIn(email: string){
    let userLog: usuario | undefined;

    this.usuarios.forEach(user => {
      if(user.correo == email){
        userLog = user;
      }
    })
    
    this.usuarios$.next(userLog);

    return userLog;
  }

  obtenerUsuario$(){
    return this.usuarios$.asObservable();
  }
}
