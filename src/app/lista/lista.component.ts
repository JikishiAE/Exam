import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  pokemons: any[] = [];
  totalPokemons: number | undefined;

  constructor(private apiService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    let useri: any;
    if(localStorage.getItem("usuario")){
      useri = JSON.parse(localStorage.getItem("usuario") || '{}');

      if(useri == undefined){
        this.router.navigateByUrl("/login");
      }
    }

    this.getPokemons();
  }

  //obtener datos
  getPokemons(){
    this.apiService.getPokemon(100, 100).subscribe(
      (res: any) => {
        this.totalPokemons = res.count;

        res.results.forEach((element: { name: string; }) => {
          this.apiService.getPokeData(element.name).subscribe(
            (uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
            }
          )
        });
      }
    )

    console.log(this.pokemons);
    
  }

}
