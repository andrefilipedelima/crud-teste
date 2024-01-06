import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../shared/cliente.model';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit{

  filtro: string = '';
  ordenacao: string = "Nome";
  exibirLista!: number;
  nome: boolean = true;
  dataCadastro: boolean = false;
  rendaMensal: boolean = false;

  clientes: Cliente[] = [];

  constructor(private router: Router,
    private clientesService: ClientesService) {
  }

  ngOnInit() {
    this.clientesService.listarClientes().subscribe(res => {
      this.clientes = res;
      if(this.clientes.length < this.exibirLista) this.exibirLista = this.clientes.length;
      else this.exibirLista = 5;
    }, error => {
      this.exibirLista = 0;
    });

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

    switch(ordem) {
      case 'Nome': {
        this.nome = true;
        this.dataCadastro = false;
        this.rendaMensal = false;
        this.ordenacao = ordem;
        break;
      }
      case 'Data Cadastro': {
        this.nome = false;
        this.dataCadastro = true;
        this.rendaMensal = false;
        this.ordenacao = ordem;
        break;
      }
      case 'Renda Mensal': {
        this.nome = false;
        this.dataCadastro = false;
        this.rendaMensal = true;
        this.ordenacao = ordem;
        break;
      }
      default:
        break;
    }
  }

  mostrarMais(quantidade: number) {
    this.exibirLista += quantidade;
    if(this.exibirLista > this.clientes.length) this.exibirLista = this.clientes.length;
  }


}
