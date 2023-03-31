import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../shared/cliente.model';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = 'http://localhost:3000/cliente';
  constructor(private http: HttpClient) { }

  listarClientes() {
    return this.http.get<Cliente[]>(this.API);
  }

  criarCliente(cliente: any) {
    return this.http.post(this.API, cliente).pipe(take(1));
  }

  updateCliente(cliente: Cliente) {
    return this.http.put(`${this.API}/${cliente.id}`, cliente).pipe(take(1));
  }

  deletarCliente(id: number) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
