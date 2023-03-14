import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  login(usernameF, passwordF){
    const data = {
      username: usernameF,
      password: passwordF
    }
    return this.http.post('http://localhost:4000/admin/login', data);
  }

  promeniBrDana(un, br){
    const data = {
      username: un,
      brDana: br
    }
    return this.http.post('http://localhost:4000/admin/promeniBrDana', data);
  }
}
