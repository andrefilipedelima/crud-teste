import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../shared/cliente.model';
import { ClientesService } from './clientes.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit{

  filtro: string = '';
  ordenacao: string = "Nome";
  exibirLista: number = 5;
  deleteModalRef: BsModalRef;

  clientes: Cliente[] = [];

  constructor(private router: Router,
    private clientesService: ClientesService) {
  }

  ngOnInit() {
    this.clientesService.listarClientes().subscribe(res => {
      this.clientes = res;
    });
    if(this.clientes.length < this.exibirLista) this.exibirLista = this.clientes.length;
  }

  onClienteSelected(cliente: Cliente) {
    this.router.navigateByUrl('/detalhes', {
      state: { cliente }
    })
  }

  onClienteDeleted(id: number) {
     this.clientesService.deletarCliente(id).subscribe({
      next: () => {
        window.alert("Cliente deletado com sucesso!")
        this.clientesService.listarClientes().subscribe(res => {
          this.clientes = res;
        });
      },
      error: () => {
        window.alert("ERRO!! Não foi possível deletar o cliente, tente novamente mais tarde!")
      }
    })
  }

  setOrder(ordem: string) {
    this.ordenacao = ordem;
  }

  mostrarMais(quantidade: number) {
    this.exibirLista += quantidade;
    if(this.exibirLista > this.clientes.length) this.exibirLista = this.clientes.length;
  }

}
