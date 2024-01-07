import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cliente } from 'src/app/shared/cliente.model';


@Component({
  selector: 'app-cliente-item',
  templateUrl: './cliente-item.component.html',
  styleUrls: ['./cliente-item.component.css']
})
export class ClienteItemComponent {
  @Input() cliente!: Cliente;
  @Output() clienteSelected = new EventEmitter<Cliente>();
  @Output() clienteDeleted = new EventEmitter<number>();
  sigla!: string;

  ngOnInit() {
    this.sigla = this.cliente.nome.split(' ').map(word => word.charAt(0)).join('').toLocaleUpperCase().substring(0,2);
  }

  onSelected(cliente: Cliente) {
    this.clienteSelected.emit(cliente);
  }

  onDeleted(id: number) {
    this.clienteDeleted.emit(id);
  }
}
