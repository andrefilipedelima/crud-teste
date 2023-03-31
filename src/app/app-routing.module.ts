import { ClienteDetalhesComponent } from './cliente-list/cliente-detalhes/cliente-detalhes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/lista-cliente', pathMatch: 'full'},
  { path: 'cadastro', component: CadastroComponent },
  { path: 'lista-cliente', component: ClienteListComponent },
  { path: 'detalhes', component: ClienteDetalhesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
