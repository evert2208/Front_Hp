import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personaje, Result } from 'src/app/interfaces/personaje.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.css']
})
export class EpisodiosComponent implements OnInit {

  page=1
  total=0;
  public id = 0;
  cargando= true;
  disabledPrev=true;
  disabledNext=false;
  public temp: Result[]=[];
  busqpersonaje=[];
  public episodio: any| undefined;
  public episodios:Result[]=[];
  constructor(private apiService: ApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getEpisodios();
  }

  getEpisodios(){
    this.cargando=true;
    this.apiService.getEpisodios(this.page).subscribe(
      (resp: any) => {
        this.cargando=false;
        this.episodios=resp.results;
        this.temp=resp.results;
        this.total=resp.info.pages;

      }
    )
  }


   verMax(episodio: Result|any){
    this.episodio= episodio;
  }

  getBusqueda(termino: string){
    if(termino.length===0){
      return this.episodios=this.temp;
}
    this.apiService.buscarEpisodio(termino).subscribe(
      (resp: any) => {

        this.episodios=resp.results;
      }
    );
    return;
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
    this.getEpisodios();

  }
}
