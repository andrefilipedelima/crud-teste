import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../shared/cliente.model';
import { Validacoes } from '../shared/validacoes.service';
import { ClientesService } from '../cliente-list/clientes.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {


  formCadastro: FormGroup;
  cliente: Cliente = new Cliente(0, "", "", "", new Date(), new Date("2005-01-01"), 0);
  dataNascimento: string;
  dataCadastro: string;
  mask: any = {
    mask: '000.000.000-00',
    lazy: true
  };
  validar: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private clientesService: ClientesService)
  {
      let data = this.cliente.dataNascimento.toLocaleString("pt-BR", {dateStyle:"short"});
      this.dataNascimento = data.split("/").reverse().join("-")
      data = this.cliente.dataCadastro.toLocaleString("pt-BR", {dateStyle:"short"});
      this.dataCadastro = data.split("/").reverse().join("-")
  }

  ngOnInit() {
    this.createForm(this.cliente);
  }

  onSubmit() {
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
        window.alert("Cliente adicionado com sucesso!")
        this.formCadastro.reset();
      },
      error: () => {
        window.alert("ERRO!! Não foi possível adicionar novo cliente, tente novamente mais tarde!")

      }
    })
  }

  createForm(cliente: Cliente) {
    this.formCadastro = this.formBuilder.group({
      nome: new FormControl(cliente.nome, [Validators.required, Validacoes.nomeCompleto]),
      cpf: new FormControl(cliente.cpf, [Validators.required, Validators.minLength(11), Validacoes.ValidaCpf]),
      email: new FormControl(cliente.email, [Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*")]),
      dataNascimento: new FormControl(this.dataNascimento, [Validators.required, Validacoes.maiorQue18AnosMenoQue60Anos]),
      rendaMensal: new FormControl(cliente.rendaMensal, [Validators.required]),
      dataCadastro: new FormControl(this.dataCadastro, [Validators.required])
    })
  }

  checkForm() {
      const invalid = [];
      const controls = this.formCadastro.controls;
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
