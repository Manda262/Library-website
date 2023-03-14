import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DodajKnjiguComponent } from '../dodaj-knjigu/dodaj-knjigu.component';
import { Autor } from '../model/autor';
import { Zanr } from '../model/zanr';

@Injectable({
  providedIn: 'root'
})
export class KnjigaService {

  constructor(private http:HttpClient) { }

  getAllKnjige(){
    return this.http.get('http://localhost:4000/knjiga/getAllKnjige')
  }

  searchKnjigePoNazivu(paramF){
    const data = {
      param: paramF
    }
    return this.http.post('http://localhost:4000/knjiga/searchKnjigePoNazivu', data)
  }

  /*searchKnjigePoAutoru(paramF){
    const data = {
      param: paramF
    }
    return this.http.post('http://localhost:4000/knjiga/searchKnjigePoAutoru', data)
  }*/

  dodajKnjigu(idF, nazivF, autoriF : Autor[], zanroviF : Zanr[], izdavacF, godinaF, jezikF, slika: File, imeSlike){
    const data = new FormData()
    data.append("id", idF);
    data.append("naziv", nazivF);
    data.append("autori", "");
    data.append("zanrovi", "");
    data.append("izdavac", izdavacF);
    data.append("godina", godinaF);
    data.append("jezik", jezikF);   
    data.append("slikafajl",slika);
    data.append("slika",imeSlike) ;
    return this.http.post('http://localhost:4000/knjiga/dodajKnjigu', data)
  }

  azurirajSliku(idF, slika: File, imeSlike){
    const data = new FormData()
    data.append("id", idF);
    data.append("slikafajl",slika);
    data.append("slika",imeSlike);
    return this.http.post('http://localhost:4000/knjiga/azurirajSliku', data)
  }

  dodajOstalo(idF, autoriF, zanroviF){
    const data = {
      id: idF,
      autori: autoriF,
      zanrovi: zanroviF
    }
    return this.http.post('http://localhost:4000/knjiga/dodajOstalo', data)
  }

  azurirajKnjigu(idF,nazivF, autoriF, zanroviF, izdavacF, godinaF, jezikF ){
    const data = {
      id: idF,
      naziv: nazivF,
      autori: autoriF,
      zanrovi: zanroviF,
      izdavac: izdavacF,
      godina: godinaF,
      jezik: jezikF
    }
    return this.http.post('http://localhost:4000/knjiga/azurirajKnjigu', data)
  }

  izbrisiKnjigu(idF){
    const data = {
      id:idF
    }
    return this.http.post('http://localhost:4000/knjiga/izbrisiKnjigu', data)
  }
}
