import { Pipe, PipeTransform } from "@angular/core";
import { Cliente } from "./cliente.model";


@Pipe({name: 'filtro'})
export class FiltroPipe implements PipeTransform {


  transform(lista: Cliente[], filtro: any): Cliente[] {

    let retorno: Cliente[] = lista;

    if(filtro.filtro !== "") {
       retorno = lista.filter(cliente => cliente.nome.normalize("NFD")
                                                           .toLocaleUpperCase()
                                                           .includes(filtro.filtro.toLocaleUpperCase())||
                                               cliente.cpf.includes(filtro.filtro) ||
                                               cliente.dataCadastro.toString().includes(filtro.filtro))
       if(filtro.ordenacao) {
        this.sort(retorno, filtro.ordenacao)
       }

       return retorno;
    }
    else {
      if(filtro.ordenacao) {
          this.sort(retorno, filtro.ordenacao)
       }
      return retorno;
    }
  }

  sort(lista: Cliente[], filtro: string): Cliente[]{
    switch(filtro) {
      case 'Nome':
        lista.sort(function(a,b) {
          return a.nome.normalize("NFD")
                       .replace(/\s/g, '')
                       .toLocaleUpperCase() <
                 b.nome.normalize("NFD")
                       .replace(/\s/g, '')
                       .toLocaleUpperCase() ? -1 :
                 a.nome.normalize("NFD")
                       .replace(/\s/g, '')
                       .toLocaleUpperCase() >
                 b.nome.normalize("NFD")
                       .replace(/\s/g, '')
                       .toLocaleUpperCase() ? 1 : 0;
        });
        break;
      case 'Data Cadastro':
        lista = lista.sort(function(a,b) {
          return a.dataCadastro > b.dataCadastro ? 1 : a.dataCadastro < b.dataCadastro ? -1 : 0;
        });
        break;
      case 'Renda Mensal':
        lista = lista.sort(function(a,b) {
          return a.rendaMensal < b.rendaMensal ? 1 : a.rendaMensal > b.rendaMensal ? -1 : 0;
      });
        break;
      default:
        break;
    }
    return lista;
  }
}
