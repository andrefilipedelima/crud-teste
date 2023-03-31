
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/cliente.model';
import { Validacoes } from 'src/app/shared/validacoes.service';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-cliente-detalhes',
  templateUrl: './cliente-detalhes.component.html',
  styleUrls: ['./cliente-detalhes.component.css']
})
export class ClienteDetalhesComponent implements OnInit {
  formCliente: FormGroup;
  cliente: Cliente;
  dataNascimento: string;
  dataCadastro: string;
  mask: any = {
    mask: '000.000.000-00',
    lazy: false
  };

  constructor(private router: Router, private formBuilder: FormBuilder, private clientesService: ClientesService) {
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

  onSubmit() {
    let cliente = {
      id: this.formCliente.value.id,
      nome: this.formCliente.value.nome,
      cpf: this.cliente.cpf,
      email: this.formCliente.value.email,
      dataNascimento: this.formCliente.value.dataNascimento,
      rendaMensal: this.formCliente.value.rendaMensal,
      dataCadastro: this.formCliente.value.dataCadastro
    };

   this.clientesService.updateCliente(this.formCliente.value).subscribe({
      next: () => {
        window.alert("Cliente alterado com sucesso!")
      },
      error: () => {
        window.alert("ERRO!! Não foi possível alterar o cliente, tente novamente mais tarde!")      }
    })

  }

  createForm(cliente: Cliente) {
    this.formCliente = this.formBuilder.group({
      id: new FormControl(cliente.id),
      nome: new FormControl(cliente.nome, [Validators.required, Validacoes.nomeCompleto]),
      cpf: new FormControl(cliente.cpf, [Validators.required, Validators.minLength(14), Validacoes.ValidaCpf]),
      email: new FormControl(cliente.email, [Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*")]),
      dataNascimento: new FormControl(cliente.dataNascimento, [Validators.required, Validacoes.maiorQue18AnosMenoQue60Anos]),
      rendaMensal: new FormControl(cliente.rendaMensal, [Validators.required]),
      dataCadastro: new FormControl(cliente.dataCadastro, [Validators.required])
    })
  }

  checkForm() {
    const invalid = [];
    const controls = this.formCliente.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    if(invalid[0] === 'dataNascimento' && invalid[1] === 'dataCadastro') {
      return false;
    }
    else return true;
}
}
