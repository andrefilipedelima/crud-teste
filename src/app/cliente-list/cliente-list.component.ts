import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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

  modalRef!: BsModalRef;
  filtro: string = '';
  ordenacao: string = "Nome";
  exibirLista!: number;
  nome: boolean = true;
  dataCadastro: boolean = false;
  rendaMensal: boolean = false;
  mensagemModalConfirmar: string = "Deseja excluir esse cliente?";
  mensagemModalDelete: string = "";
  tituloModalConfirmar: string = "Excluir";
  tituloModalDelete: string = "";
  iconModalDelete: string = "";
  idClienteSelecionado: number = 0;

  clientes: Cliente[] = [];

  constructor(
    private router: Router,
    private clientesService: ClientesService,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.clientesService.listarClientes().subscribe(res => {
      this.clientes = res;
      if(this.clientes.length < this.exibirLista) this.exibirLista = this.clientes.length;
      else this.exibirLista = 2;
    }, error => {
      this.exibirLista = 0;
    });

  }

  onClienteSelected(cliente: Cliente) {
    this.router.navigateByUrl('/detalhes', {
      state: { cliente }
    })
  }

  onClienteDeleted(template: TemplateRef<any>, id: number) {
    this.modalRef.hide();
     this.clientesService.deletarCliente(id).subscribe({
      next: () => {
        this.tituloModalDelete = "Sucesso";
        this.mensagemModalDelete = "Cliente deletado com sucesso!";
        this.iconModalDelete = "success-icon";
        this.openModal(template);
        this.clientesService.listarClientes().subscribe(res => {
          this.clientes = res;
        });
      },
      error: () => {
        this.tituloModalDelete = "Serviço Indisponível";
        this.mensagemModalDelete = "Não foi possível deletar o cliente, tente novamente mais tarde!";
        this.iconModalDelete = "error-icon";
        this.openModal(template);
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

  openModal(template: TemplateRef<any>, id?: number) {
    if(id) {
      this.idClienteSelecionado = id;
    }
    this.modalRef = this.modalService.show(template);
  }


}
