import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZaduzenjeService {

  constructor(private http: HttpClient) { }

  getAllZaduzenja(){
    return this.http.get('http://localhost:4000/zaduzenje/getAllZaduzenja');
  }

  dodajZaduzenje(usernameF, idKnjigeF, datZad, rokF, datVracF){
    const data = {
      username: usernameF,
      idKnjige: idKnjigeF,
      datumZaduzenja: datZad,
      rokVracanja: rokF,
      datumVracanja: datVracF
    }
    return this.http.post('http://localhost:4000/zaduzenje/dodajZaduzenje', data)
  }

  razduziKnjigu(usernameF, idKnjigeF, datumVrF){
    const data = {
      username : usernameF,
      idKnjige: idKnjigeF,
      datumVracanja: datumVrF
    }
    return this.http.post('http://localhost:4000/zaduzenje/razduziKnjigu', data)
  }

  izbrisiZaduzenjeCitaoca(usernameF){
    const data = {
      username: usernameF
    }
    return this.http.post('http://localhost:4000/zaduzenje/izbrisiZaduzenjeCitaoca', data)
  }

  izbrisiZaduzenjeKnjige(idKnjigeF){
    const data = {
      idKnjige: idKnjigeF
    }
    return this.http.post('http://localhost:4000/zaduzenje/izbrisiZaduzenjeKnjige', data)
  }
}
