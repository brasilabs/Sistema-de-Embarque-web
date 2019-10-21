import { User } from './user';

export class Embarque {
    constructor(
        public id: string,
        public numero: number,
        public rota: string,
        public endereco: string,
        public motorista: string,
        public client: string,
        public vendedor: string,
        public romaneiolog: string,
        public tipoNfe: string,
        public nfeNfce: string,
        public totalNfe: string,
        public formPag: string,
        public status: string,
        public prioridade: string,
        public descricao: string,
        public user: User,
        public assignedUser: User,
        public date: string,
        public auteracoes: Array<string>
    ) {}

    public equals(obj: Embarque) : boolean { 
        return this.numero === obj.numero;
    } 

  }
	 