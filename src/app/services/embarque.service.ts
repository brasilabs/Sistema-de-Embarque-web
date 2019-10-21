import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SORT_API } from './sort.api';
import { Embarque } from '../model/Embarque';

@Injectable()
export class EmbarqueService {

  constructor(private http: HttpClient) {}

  createOrUpdate(embarque: Embarque){
    if(embarque.id != null && embarque.id != ''){
      return this.http.put(`${SORT_API}/api/embarque`,embarque);
    } else {
      embarque.id = null;
      embarque.status = 'Carregado';
      return this.http.post(`${SORT_API}/api/embarque`,embarque);
    }
  }

  findAll(page:number,count:number){
    return this.http.get(`${SORT_API}/api/embarque/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${SORT_API}/api/embarque/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${SORT_API}/api/embarque/${id}`);
  }

  findByParams(page:number,count:number,assignedToMe:boolean,t:Embarque){
    t.numero = t.numero == null ? 0 : t.numero;
    t.client = t.client == '' ? "uninformed" : t.client;
    t.status = t.status == '' ? "uninformed" : t.status;
    t.prioridade = t.prioridade == '' ? "uninformed" : t.prioridade;
    return this.http.get(`${SORT_API}/api/embarque/${page}/${count}/${t.numero}/${t.client}/${t.status}/${t.prioridade}/${assignedToMe}`);
  }

  changeStatus(status:string,embarque:Embarque){
    return this.http.put(`${SORT_API}/api/embarque/${embarque.id}/${status}`,embarque);
  }

  summary(){
    return this.http.get(`${SORT_API}/api/embarque/summary`);
  }

}
