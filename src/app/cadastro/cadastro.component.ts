import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../shared/cliente.model';
import { Validacoes } from '../shared/validacoes.service';
import { ClientesService } from '../cliente-list/clientes.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  modalRef!: BsModalRef;
  formCadastro!: FormGroup;
  cliente: Cliente = new Cliente(0, "", "", "", new Date(), new Date("2005-01-01"), 0);
  dataNascimento: string;
  dataCadastro: string;
  mask: any = {
    mask: '000.000.000-00',
    lazy: true
  };
  validar: boolean = false;
  mensagemModalCadastro: string = "";
  tituloModalCadastro: string = "";
  iconModalCadastro: string = "";

  constructor(private formBuilder: FormBuilder,
              private clientesService: ClientesService,
              private modalService: BsModalService)
  {
      let data = this.cliente.dataNascimento.toLocaleString("pt-BR", {dateStyle:"short"});
      this.dataNascimento = data.split("/").reverse().join("-")
      data = this.cliente.dataCadastro.toLocaleString("pt-BR", {dateStyle:"short"});
      this.dataCadastro = data.split("/").reverse().join("-")
  }

  ngOnInit() {
    this.createForm(this.cliente);
  }

  onSubmit(template: TemplateRef<any>) {
    let cliente = {
      nome: this.formCadastro.value.nome,
      cpf: this.formCadastro.value.cpf,
      email: this.formCadastro.value.email,
      dataNascimento: this.formCadastro.value.dataNascimento,
      rendaMensal: this.formCadastro.value.rendaMensal,
      dataCadastro: this.formCadastro.value.dataCadastro
    };

    this.clientesService.criarCliente(cliente).subscribe({
      next: () => {
        this.mensagemModalCadastro = 'Cliente adicionado com sucesso!';
        this.tituloModalCadastro = 'Sucesso';
        this.iconModalCadastro = "success-icon";
        this.openModal(template);
        this.formCadastro.reset();
      },
      error: () => {
        this.mensagemModalCadastro = 'Não foi possível adicionar novo cliente, tente novamente mais tarde!';
        this.tituloModalCadastro = 'Serviço Indisponível';
        this.iconModalCadastro = "error-icon";
        this.openModal(template);
      }
    })
  }

  createForm(cliente: Cliente) {
    this.formCadastro = this.formBuilder.group({
      nome: new FormControl(cliente.nome, [Validators.required, Validacoes.nomeCompleto]),
      cpf: new FormControl(cliente.cpf, [Validators.required, Validators.minLength(11), Validacoes.ValidaCpf]),
      email: new FormControl(cliente.email, [Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*")]),
      dataNascimento: new FormControl(this.dataNascimento, [Validators.required, Validacoes.maiorQue18AnosMenoQue60Anos]),
      rendaMensal: new FormControl(cliente.rendaMensal, [Validators.required, Validacoes.maiorQueZero]),
      dataCadastro: new FormControl(this.dataCadastro, [Validators.required])
    })
  }

  limpar() {
    this.formCadastro.controls['nome'].setValue("");
    this.formCadastro.controls['cpf'].setValue("");
    this.formCadastro.controls['email'].setValue("");
    this.formCadastro.controls['dataNascimento'].setValue(this.dataNascimento);
    this.formCadastro.controls['rendaMensal'].setValue(0);
    this.formCadastro.controls['dataCadastro'].setValue(this.dataCadastro); 
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
