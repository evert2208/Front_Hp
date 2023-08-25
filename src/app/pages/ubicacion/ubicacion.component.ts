import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personaje, Result } from 'src/app/interfaces/personaje.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
  page=1
  total=0;
  disabledPrev=true;
  disabledNext=false;
  public id = 0;
  cargando= true;
  public temp: Result[]=[];
  public location: any| undefined;
  busqpersonaje=[];
  public ubicacion:Result[]=[];

  constructor(private apiService: ApiService,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.getUbicacion();
  }


  getUbicacion() {
    this.cargando=true;
    this.apiService.getUbicacion(this.page).subscribe(
      (resp: any) => {
        this.cargando=false;
        this.ubicacion=resp.results;
        this.temp=resp.results;
        this.total=resp.info.pages;

      }
    )
  }

  verMax(ubicacion: Result|any){
    this.location= ubicacion;
  }

  getBusqueda(termino: string){
    if(termino.length===0){
      return this.ubicacion=this.temp;
}
    this.apiService.buscarUbicacion(termino).subscribe(
      (resp: any) => {
        //console.log(resp);
        this.ubicacion=resp.results;
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
    this.getUbicacion();

  }
}
