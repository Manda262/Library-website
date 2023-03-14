import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gallery } from '../model/gallery';

@Injectable({
  providedIn: 'root'
})
export class ZahtevService {

  constructor(private http: HttpClient) { }

  getAllZahtevi(){
    return this.http.get('http://localhost:4000/zahtev/getAllZahtevi');
  }

  dodajZahtev(usernameF, passwordF, imeF, prezimeF, adresaF, telefonF, emailF, tipF, slika: File, imeSlike){
    const data = new FormData()
      data.append("username",usernameF);
      data.append("password",passwordF)
      data.append("ime",imeF)
      data.append("prezime", prezimeF)
      data.append("adresa",adresaF)
      data.append("telefon",telefonF)
      data.append("email",emailF)
      data.append("tip",tipF)
      data.append("slikafajl",slika)
      data.append("slika",imeSlike)
    return this.http.post('http://localhost:4000/zahtev/dodajZahtev', data);
  }

  ukloniZahtev(usernameF){
    const data = {
      username: usernameF
    }
    return this.http.post('http://localhost:4000/zahtev/ukloniZahtev', data)
  }
}
