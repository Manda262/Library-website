import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Admin } from '../model/admin';
import { Citalac } from '../model/citalac';
import { Zaduzenje } from '../model/zaduzenje';
import { CitalacService } from '../services/citalac.service';
import { OcenaService } from '../services/ocena.service';
import { ZaduzenjeService } from '../services/zaduzenje.service';

@Component({
  selector: 'app-pregled-korisnika',
  templateUrl: './pregled-korisnika.component.html',
  styleUrls: ['./pregled-korisnika.component.css']
})
export class PregledKorisnikaComponent implements OnInit {

  constructor(private citalacService: CitalacService, private zaduzenjeService: ZaduzenjeService, private ocenaService: OcenaService) { }

  ngOnInit(): void {
    this.forma = new FormGroup({
      slika: new FormControl(null)
    });
    this.citalacService.getAllCitaoce().subscribe((citaoci: Citalac[])=>{
      this.sviCitaoci = citaoci;
      for(var i = 0; i < this.sviCitaoci.length; i++){
        this.flagovi.push(true);
      }
    })
    this.zaduzenjeService.getAllZaduzenja().subscribe((zaduzenja: Zaduzenje[])=>{
      this.svaZaduzenja = zaduzenja;
    })
  }

  admin: Admin
  sviCitaoci: Citalac[] = [];
  svaZaduzenja: Zaduzenje[] = []
  flagovi: boolean[] = [];
  message: string
  username: string
  password: string
  ime: string
  prezime: string
  adresa: string
  telefon: string
  email: string
  tip: string
  passwordcheck: string
  slika: string;
  forma: FormGroup

  azuriraj(un){
    for(var i = 0; i < this.sviCitaoci.length; i++){
      if(this.sviCitaoci[i].username == un){
        this.flagovi[i] = false;
      }
    }
  }

  izbrisi(un){
    for(var zaduzenje of this.svaZaduzenja){
      if(zaduzenje.username == un && zaduzenje.datumVracanja == ""){
        this.message = "Ne moze se obrisati korisnik koji ima zaduzenu knjigu";
        return;
      }
    }
    this.citalacService.izbrisiCitaoca(un).subscribe(resp=>{
      this.ocenaService.izbrisiOceneCitaoca(un).subscribe(resp=>{
        this.zaduzenjeService.izbrisiZaduzenjeCitaoca(un).subscribe(resp=>{
          window.location.reload();
        })
      })
    })
  }

  getFlag(un){
    for(var i = 0; i < this.sviCitaoci.length; i++){
      if(this.sviCitaoci[i].username == un){
        return this.flagovi[i];
      }
    }
    return false;
  }

  zavrsiAzuriranje(un){
    for(var i = 0; i < this.sviCitaoci.length; i++){
      if(this.sviCitaoci[i].username == un){
        this.citalacService.updateCitaoca(this.sviCitaoci[i].username, this.sviCitaoci[i].password, this.sviCitaoci[i].ime, this.sviCitaoci[i].prezime, this.sviCitaoci[i].adresa, this.sviCitaoci[i].telefon, this.sviCitaoci[i].email, this.sviCitaoci[i].tip).subscribe(resp=>{
          if(resp['message']=='ok'){
            this.message = 'User added'
          }else{
            this.message = 'Error'
          }
          if(this.forma.value.slika != null) {
            this.citalacService.azurirajSliku(un, this.forma.value.slika ,this.forma.value.slika.name).subscribe(resp=>{
              if(resp['message']=='ok'){
                this.message = 'User added'
              }else{
                this.message = 'Error'
              }
              window.location.reload();
            })
          }else window.location.reload();
        })
        this.flagovi[i] = true;
      }
    }
  }

  dodajKorisnika(){
    if(this.forma.value.slika != null){
      this.citalacService.register(this.username, this.password, this.ime, this.prezime, this.adresa, this.telefon, this.email, this.tip, this.forma.value.slika ,this.forma.value.slika.name).subscribe(resp=>{
        if(resp['message']=='ok'){
          this.message = 'User added'
        }else{
          this.message = 'Error'
        }
        window.location.reload();
      })
    }else{
      this.citalacService.register(this.username, this.password, this.ime, this.prezime, this.adresa, this.telefon, this.email, this.tip, null ,"").subscribe(resp=>{
        if(resp['message']=='ok'){
          this.message = 'User added'
        }else{
          this.message = 'Error'
        }
        window.location.reload();
      })
    }
    
  }

  upload(event: Event){
    const file = (event.target as HTMLInputElement).files[0];

    this.forma.patchValue({ slika: file });

    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.slika = reader.result as string;
      
      };
      reader.readAsDataURL(file);
    }
  }

  checkPic(citalac: Citalac){
    if(citalac.slika == "http://localhost:4000/uploads/") return "/assets/defaultUser.png";
    else return citalac.slika;
  }
}
