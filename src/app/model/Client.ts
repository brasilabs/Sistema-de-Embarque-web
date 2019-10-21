import { User } from './user';

export class Client {
    constructor(
        public id: string,
        public numero: number,
        public razao:string,
        public cnpjCpf: string,
	    public inscEstadRg:string,
	    public dateNasc: string,
	    public fantasia: string,
	    public email:string,
        public inscMun: string,
	    public vendedor: string,
        public endereco: string,
        public complemento: string,
        public bairro: string,
        public cidade: string,
        public uf: string,
        public cep: string,
        public telefone: string,
        public fone: string,
        public banco: string,
        public agencia: string,
        public conta: string,
        public comercial: string,
        public telFone: string,
        public celfone: string,
        public proprietario: string,
        public prazo: string,
        public limete: string,
        public iscms: string,
        public dependente: string,
        public formaRecebimet: string,
        public atividade: string,
        public user: User,
        public assignedUser: User,
        public date: string,
        public auteracoes: Array<string>
    
    ){}

    public equals(obj: Client) : boolean { 
        return this.numero === obj.numero;
    } 

  }