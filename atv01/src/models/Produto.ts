export default class Produto{
    public nome: String
    public descricao: String
    private valor: number

    constructor(nome: String, descricao: String, valor: number){
        this.nome = nome,
        this.descricao = descricao
        this.valor = valor
    }

    public get getValor(): number{
        return this.valor
    }

    public set setValor(valor: number){
        this.valor = valor
    }
}