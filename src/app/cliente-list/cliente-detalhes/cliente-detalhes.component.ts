
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/cliente.model';
import { Validacoes } from 'src/app/shared/validacoes.service';
import { ClientesService } from '../clientes.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cliente-detalhes',
  templateUrl: './cliente-detalhes.component.html',
  styleUrls: ['./cliente-detalhes.component.css']
})
export class ClienteDetalhesComponent implements OnInit {

  modalRef!: BsModalRef;
  formCliente!: FormGroup;
  cliente: Cliente;
  dataNascimento: string;
  dataCadastro: string;
  mask: any = {
    mask: '000.000.000-00',
    lazy: false
  };
  tituloModalAtualizar: string = "";
  mensagemModalAtualizar: string = "";
  iconModalAtualizar: string = "";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private modalService: BsModalService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.cliente = nav?.extras?.state?.['cliente'];
    let data = this.cliente.dataNascimento.toLocaleString("pt-BR", {dateStyle:"short"});
    this.dataNascimento = data.split("/").reverse().join("-");
    data = this.cliente.dataCadastro.toLocaleString("pt-BR", {dateStyle:"short"});
    this.dataCadastro = data.split("/").reverse().join("-")

  }

  ngOnInit() {
    this.createForm(this.cliente);
    this.formCliente.controls['cpf'].disable();
  }

  onSubmit(template: TemplateRef<any>) {
    let clienteAtualizado = {
      id: this.formCliente.value.id,
      nome: this.formCliente.value.nome,
      cpf: this.cliente.cpf,
      email: this.formCliente.value.email,
      dataNascimento: this.formCliente.value.dataNascimento,
      rendaMensal: this.formCliente.value.rendaMensal,
      dataCadastro: this.formCliente.value.dataCadastro
    };

    this.clientesService.updateCliente(clienteAtualizado).subscribe({
      next: () => {
        this.mensagemModalAtualizar = 'Cliente alterado com sucesso!';
        this.tituloModalAtualizar = 'Sucesso';
        this.iconModalAtualizar = 'success-icon';
        this.openModal(template);
      },
      error: () => {
        this.mensagemModalAtualizar = 'Não foi possível atualizar esse cliente, tente novamente mais tarde!';
        this.tituloModalAtualizar = 'Serviço Indisponível';
        this.iconModalAtualizar = 'error-icon';
        this.openModal(template);
      }
    })

  }

  voltarFormulario() {
    this.router.navigate(['/lista-cliente']);
  }

  voltar() {
    this.modalRef.hide();
    this.router.navigate(['/lista-cliente']);
  }

  createForm(cliente: Cliente) {
    this.formCliente = this.formBuilder.group({
      id: new FormControl(cliente.id),
      nome: new FormControl(cliente.nome, [Validators.required, Validacoes.nomeCompleto]),
      cpf: new FormControl(cliente.cpf, [Validators.required, Validators.minLength(14), Validacoes.ValidaCpf]),
      email: new FormControl(cliente.email, [Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*")]),
      dataNascimento: new FormControl(cliente.dataNascimento, [Validators.required, Validacoes.maiorQue18AnosMenoQue60Anos]),
      rendaMensal: new FormControl(cliente.rendaMensal, [Validators.required, Validacoes.maiorQueZero]),
      dataCadastro: new FormControl(cliente.dataCadastro, [Validators.required])
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
