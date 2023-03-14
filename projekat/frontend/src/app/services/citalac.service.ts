import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitalacService {

  constructor(private http: HttpClient) { }

  login(usernameF, passwordF){
    const data = {
      username: usernameF,
      password: passwordF
    }

    return this.http.post('http://localhost:4000/citalac/login', data);
  }

  register(usernameF, passwordF, imeF, prezimeF, adresaF , telefonF, emailF, tipF, slika: File, imeSlike){
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
      return this.http.post('http://localhost:4000/citalac/register', data);
  }

  getAllCitaoce(){
    return this.http.get('http://localhost:4000/citalac/getAllCitaoce');
  }

  promeniSifru(usernameF, passwordF){
    const data = {
      username : usernameF,
      password : passwordF
    }
    return this.http.post('http://localhost:4000/citalac/promeniSifru', data);
  }

  azurirajSliku(usernameF, slika: File, imeSlike){
    const data = new FormData()
    data.append("username", usernameF);
    data.append("slikafajl",slika);
    data.append("slika",imeSlike);
    return this.http.post('http://localhost:4000/citalac/azurirajSliku', data);
  }

  updateCitaoca(usernameF, passwordF, imeF, prezimeF, adresaF , telefonF, emailF, tipF){
    const data = {
      username: usernameF,
      password: passwordF,
      ime: imeF,
      prezime: prezimeF,
      adresa: adresaF,
      telefon: telefonF,
      email: emailF,
      tip: tipF
    }
    return this.http.post('http://localhost:4000/citalac/updateCitaoca', data);
  }

  izbrisiCitaoca(usernameF){
    const data = {
      username: usernameF
    }
    return this.http.post('http://localhost:4000/citalac/izbrisiCitaoca', data)
  }
}
