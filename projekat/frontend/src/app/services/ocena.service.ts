import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OcenaService {

  constructor(private http: HttpClient) { }

  getAllOcene(){
    return this.http.get('http://localhost:4000/ocena/getAllOcene')
  }

  dodajOcenu(usernameF, idKnjigeF, ocenaF, komentarF, datumF){
    const data = {
      username: usernameF,
      idKnjige: idKnjigeF,
      ocena: ocenaF,
      komentar: komentarF,
      datum: datumF
    }
    return this.http.post('http://localhost:4000/ocena/dodajOcenu', data)
  }

  izbrisiOceneCitaoca(usernameF){
    const data = {
      username: usernameF
    }
    return this.http.post('http://localhost:4000/ocena/izbrisiOceneCitaoca', data)
  }

  izbrisiOceneKnjige(idKnjigeF){
    const data = {
      idKnjige: idKnjigeF
    }
    return this.http.post('http://localhost:4000/ocena/izbrisiOceneKnjige', data)
  }
}
