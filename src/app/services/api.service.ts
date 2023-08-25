import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Result } from '../interfaces/personaje.interface';


const personajeStg= 'personajes';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private personajesObj= new BehaviorSubject<Result[]>([]);
  personajeFav$= this.personajesObj.asObservable();

  constructor(private http: HttpClient) {  }

  getEpisodios(page: number){
    return this.http.get(`https://rickandmortyapi.com/api/episode?page=${page}`)
  }
  getPersonajes(page: number){
    return this.http.get(`https://rickandmortyapi.com/api/character?page=${page}`);
  }

  getUbicacion(page: number){
    return this.http.get(`https://rickandmortyapi.com/api/location?page=${page}`);
  }
  getPersonaje(id: number){
    try {
      let data: any = localStorage.getItem(personajeStg);
      const personajes= JSON.parse(data);
      this.personajesObj.next(personajes);
      return personajes
    } catch (error) {
      console.log(error );
    }
  }



  buscarPersonaje(termino: string){
    return this.http.get(`https://rickandmortyapi.com/api/character/?name=${termino}`);
  }

  buscarEpisodio(termino: string){
    return this.http.get(`https://rickandmortyapi.com/api/episode/?name=${termino}`);
  }
  buscarUbicacion(termino: string){
    return this.http.get(`https://rickandmortyapi.com/api/location/?name=${termino}`);
  }
}

