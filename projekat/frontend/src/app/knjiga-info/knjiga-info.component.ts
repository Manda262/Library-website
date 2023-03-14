import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Citalac } from '../model/citalac';
import { Knjiga } from '../model/knjiga';
import { Ocena } from '../model/ocena';
import { Raspolozivost } from '../model/raspolozivost';
import { Zaduzenje } from '../model/zaduzenje';
import { KnjigaService } from '../services/knjiga.service';
import { OcenaService } from '../services/ocena.service';
import { RaspolozivostService } from '../services/raspolozivost.service';
import { ZaduzenjeService } from '../services/zaduzenje.service';

@Component({
  selector: 'app-knjiga-info',
  templateUrl: './knjiga-info.component.html',
  styleUrls: ['./knjiga-info.component.css']
})
export class KnjigaInfoComponent implements OnInit {

  constructor(private raspolozivostService: RaspolozivostService, private zaduzenjeService: ZaduzenjeService, private datePipe: DatePipe, private router: Router, private ocenaService: OcenaService, private knjigaService: KnjigaService) { }

  ngOnInit(): void {
    this.forma = new FormGroup({
      slika: new FormControl(null)
    });
    this.uslov = true;
    this.currKnjiga = JSON.parse(sessionStorage.getItem("currKnjiga"));
    this.currUser = JSON.parse(sessionStorage.getItem('currUser'));
    this.raspolozivostService.getAllRaspolozivost().subscribe((data: Raspolozivost[])=>{
      this.svaRaspolozivost = data;
      for(var rasp of this.svaRaspolozivost){
        if(rasp.idKnjige == this.currKnjiga.id){
          this.trenutnaRaspolozivost = rasp.raspolozivost;
          if(this.trenutnaRaspolozivost == 0) this.uslov = false;
        }
      }
    })
    this.zaduzenjeService.getAllZaduzenja().subscribe((data: Zaduzenje[])=>{
      this.svaZaduzenja = data
      for(var zaduzenje of this.svaZaduzenja){
        if(zaduzenje.username == this.currUser.username) {
          this.mojaZaduzenja.push(zaduzenje);
          if(zaduzenje.idKnjige == this.currKnjiga.id && zaduzenje.datumVracanja == ""){
            this.uslov = false;
          }
        }
      }
    })
    this.ocenaService.getAllOcene().subscribe((ocene: Ocena[])=>{
      var sveOcene = ocene;
      for(var ocena of sveOcene){
        if(ocena.idKnjige == this.currKnjiga.id){
          this.oceneOveKnjige.push(ocena);
        }
      }
      this.oceneOveKnjige.sort((ocena1, ocena2)=>{
        var dat1 = new Date(ocena1.datum);
        var dat2 = new Date(ocena2.datum);
        if(dat1 < dat2) return 1;
        else if(dat1 == dat2) return 0;
        else return -1;
      })
    })
  }

  oceneOveKnjige: Ocena[] = []
  trenutnaRaspolozivost: number
  svaRaspolozivost: Raspolozivost[] = []
  currKnjiga: Knjiga
  svaZaduzenja: Zaduzenje[] = []
  mojaZaduzenja: Zaduzenje[] = []
  currUser: Citalac;
  uslov: boolean
  message: string;
  rok: Date
  novaOcena: number
  novKomentar: string
  message1: string
  azuriranje: boolean;
  slika: string;
  forma: FormGroup
  message2: string

  zaduzi(){
    for(var zaduzenje of this.mojaZaduzenja){
      const str = zaduzenje.rokVracanja;
      const date = new Date(str);
      if((date < (new Date())) && zaduzenje.datumVracanja == ""){
        this.message = 'Molimo vas da prvo vratite knjige kojima je prosao rok vracanja';
        return;
      }
    }
    var i = 0;
    for(var zaduzenje of this.mojaZaduzenja){
      const str = zaduzenje.datumVracanja;
      if(str == ""){
        i++;
      }
    }
    if(i >= 3) {
      this.message = 'Imate vec 3 zaduzene knjige';
      return;
    }
    var date = new Date();
    let strDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.rok = new Date();
    this.rok.setDate( this.rok.getDate() + 14 );
    let strRok = this.datePipe.transform(this.rok, 'yyyy-MM-dd')
    this.zaduzenjeService.dodajZaduzenje(this.currUser.username, this.currKnjiga.id, strDate, strRok, "").subscribe(respObj => {
      if(respObj['message']=='ok'){
        this.message = 'User added'
      }else{
        this.message = 'Error'
      }
      this.raspolozivostService.updateRaspolozivost(this.currKnjiga.id, this.trenutnaRaspolozivost - 1).subscribe(resp =>{
        if(respObj['message']=='ok'){
          this.message = 'User added'
        }else{
          this.message = 'Error'
        }
        this.router.navigate([''])
      })
    })
  }

  prosecna(){
    if(this.oceneOveKnjige.length == 0) return "Nema ocena"
    var sum = 0;
    var num = 0;
    for(var ocena of this.oceneOveKnjige){
      sum += ocena.ocena
      num++;
    }
    var br = sum/num;
    return br.toFixed(2)
  }

  dodaj(){
    if(this.novKomentar.length > 1000){
      this.message1 = "Komentar prevazilazi velicinu od 1000 karaktera";
      return;
    }
    if(!this.novaOcena){
      this.message1 = "Unesite ocenu";
      return;
    }
    var date = new Date();
    let dat = this.datePipe.transform(date, 'yyyy-MM-dd')
    this.ocenaService.dodajOcenu(this.currUser.username, this.currKnjiga.id, this.novaOcena, this.novKomentar, dat).subscribe(respObj =>{
      if(respObj['message']=='ok'){
        this.message = 'User added'
      }else{
        this.message = 'Error'
      }
      window.location.reload();
    })  
  }

  proverizaduzenje(){
    for(var zaduzenje of this.mojaZaduzenja){
      if(zaduzenje.idKnjige == this.currKnjiga.id){
        return true;
      }
    }
    this.message1 = "Samo ljudi koji su zaduzili knjigu mogu da je ocene"
    return false;
  }

  vecOstavio(){
    for(var ocena of this.oceneOveKnjige){
      if(ocena.username == this.currUser.username){
        return false;
      }
    }
    return true;
  }

  isModerator(){
    return this.currUser.tip == "m";
  }

  azuriranjeUToku(){
    this.azuriranje = true;
  }

  updatuj(){
    this.azuriranje = false;
    this.knjigaService.azurirajKnjigu(this.currKnjiga.id, this.currKnjiga.naziv, this.currKnjiga.autori, this.currKnjiga.zanrovi, this.currKnjiga.izdavac, this.currKnjiga.godina, this.currKnjiga.jezik).subscribe(resp=>{
      if(resp['message']=='ok'){
        this.message = 'User added'
      }else{
        this.message = 'Error'
      }
      this.raspolozivostService.updateRaspolozivost(this.currKnjiga.id, this.trenutnaRaspolozivost).subscribe(resp=>{
        if(resp['message']=='ok'){
          this.message = 'User added'
        }else{
          this.message = 'Error'
        }
        if(this.forma.value.slika != null){
          this.knjigaService.azurirajSliku(this.currKnjiga.id ,this.forma.value.slika ,this.forma.value.slika.name).subscribe(resp=>{
            if(resp['message']=='ok'){
              this.message = 'User added'
            }else{
              this.message = 'Error'
            }
            sessionStorage.removeItem("currKnjiga");
            sessionStorage.setItem("currKnjiga", JSON.stringify(this.currKnjiga))
            window.location.reload();
          })
        }else{
          sessionStorage.removeItem("currKnjiga");
          sessionStorage.setItem("currKnjiga", JSON.stringify(this.currKnjiga))
          window.location.reload();
        }
      })
    })
  }

  checkPic(){
    if(this.currKnjiga.slika == "http://localhost:4000/uploads/") return "/assets/defaultBook.png";
    else return this.currKnjiga.slika;
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

    this.currKnjiga.slika = "http://localhost:4000/uploads/" + this.forma.value.slika.name;
  }
}
