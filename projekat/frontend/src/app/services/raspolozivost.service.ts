import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RaspolozivostService {

  constructor(private http: HttpClient) { }

  getAllRaspolozivost(){
    return this.http.get('http://localhost:4000/raspolozivost/getAllRaspolozivost');
  }

  updateRaspolozivost(idKnjigeF, raspolozivostF){
    const data = {
      idKnjige : idKnjigeF,
      raspolozivost: raspolozivostF
    }
    return this.http.post('http://localhost:4000/raspolozivost/updateRaspolozivost',data);
  }

  dodajRaspolozivost(idKnjigeF, raspolozivostF){
    const data = {
      idKnjige : idKnjigeF,
      raspolozivost: raspolozivostF
    }
    return this.http.post('http://localhost:4000/raspolozivost/dodajRaspolozivost',data);
  }

  izbrisiRaspolozivost(idKnjigeF){
    const data = {
      idKnjige : idKnjigeF
    }
    return this.http.post('http://localhost:4000/raspolozivost/izbrisiRaspolozivost',data);
  }
}
