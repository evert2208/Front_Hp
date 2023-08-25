import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonajesComponent } from './pages/personajes/personajes.component';
import { EpisodiosComponent } from './pages/episodios/episodios.component';
import { UbicacionComponent } from './pages/ubicacion/ubicacion.component';

const routes: Routes = [

  {path: '', redirectTo: '/personajes', pathMatch: 'full'},
  {path: 'personajes', component: PersonajesComponent},
  {path: 'episodios', component: EpisodiosComponent},
  {path: 'ubicacion', component: UbicacionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
