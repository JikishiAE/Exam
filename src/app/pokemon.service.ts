import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  //Obtener todos los pokemon necesarios
  getPokemon(limit: number, offset: number) {
    //console.log("limit: " + limit + ", offset: " + offset);
    
    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=' + limit + '&offset=' + offset);
  }

  //Obtener la información de cada pokemon
  getPokeData(name: string){
    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + name);
  }
}
