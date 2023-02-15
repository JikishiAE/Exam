import { Component, ElementRef, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  scrolled: boolean = true;
  nombre: string | undefined;

  constructor(
    private el: ElementRef,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.usuariosService.obtenerUsuario$().subscribe(usuario => {
      this.nombre = usuario.nombre;
    })
  }

  abrirMenu(){
    let myTag = this.el.nativeElement.querySelector("#menu_movil");
    let myNav = this.el.nativeElement.querySelector("#linksMenu");

    if(!myTag.classList.contains('active'))
    {
      myTag.classList.add('active'); 
      myNav.classList.add('active'); 
    }
    else{
      myTag.classList.remove('active'); 
      myNav.classList.remove('active'); 
    }
  }

}
