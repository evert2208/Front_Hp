import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personaje, Result } from 'src/app/interfaces/personaje.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {

  page=1
  total=0;
  disabledPrev=true;
  disabledNext=false;
  public id = 0;
  cargando= true;
  public personaje: any| undefined;
  public temp: Result[]=[];
  busqpersonaje=[];
  constructor(private apiService: ApiService,
    private fb: FormBuilder) { }

    public personajes:Result[]=[];
  ngOnInit(): void {
    this.getPersonajes();

  }
  getPersonajes(){
    this.cargando=true;
    this.apiService.getPersonajes(this.page).subscribe(
      (resp: any) => {
        this.cargando=false;
        this.personajes=resp.results;
        this.temp=resp.results;
        this.total=resp.info.pages;
        //console.log(this.personajes);
      }
    )
  }
  getBusqueda(termino: string){
    if(termino.length===0){
      return this.personajes=this.temp;
}
    this.apiService.buscarPersonaje(termino).subscribe(
      (resp: any) => {
        //console.log(resp);
        this.personajes=resp.results;
      }
    );
    return;
  }

  verMax(personaje: Result|any){
    this.personaje= personaje;
  }

  Pagina(pagina: number){
    this.page += pagina;
    if (this.page <=1) {
      this.page = 1;
      this.disabledPrev=true;

    }else if (this.page >= this.total) {
      this.page = this.total;
      this.disabledNext=true;

    }else{

      this.disabledPrev=false;
      this.disabledNext=false;
    }
    this.getPersonajes();

  }


}
