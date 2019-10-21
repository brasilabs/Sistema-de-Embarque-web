import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { SORT_API } from './sort.api';


@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    login(user: User){
      return this.http.post(`${SORT_API}/api/auth`,user);
    }
  
    createOrUpdate(user: User){
      if(user.id != null && user.id != ''){
        return this.http.put(`${SORT_API}/api/user`,user);
      } else {
        user.id = null;
        return this.http.post(`${SORT_API}/api/user`, user);
      }
    }
  
    findAll(page:number,count:number){
      return this.http.get(`${SORT_API}/api/user/${page}/${count}`);
    }
  
    findById(id:string){
      return this.http.get(`${SORT_API}/api/user/${id}`);
    }
  
    delete(id:string){
      return this.http.delete(`${SORT_API}/api/user/${id}`);
    }
    
   
}
