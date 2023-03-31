export class Cliente {
  constructor(
    public id: number,
    public nome: string,
    public cpf: string,
    public email: string,
    public dataCadastro: Date,
    public dataNascimento: Date,
    public rendaMensal: number) {}
}
