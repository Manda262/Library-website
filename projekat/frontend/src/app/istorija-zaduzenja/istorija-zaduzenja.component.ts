import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Citalac } from '../model/citalac';
import { Knjiga } from '../model/knjiga';
import { Zaduzenje } from '../model/zaduzenje';
import { KnjigaService } from '../services/knjiga.service';
import { ZaduzenjeService } from '../services/zaduzenje.service';

@Component({
  selector: 'app-istorija-zaduzenja',
  templateUrl: './istorija-zaduzenja.component.html',
  styleUrls: ['./istorija-zaduzenja.component.css']
})
export class IstorijaZaduzenjaComponent implements OnInit {

  constructor(private zaduzenjeService : ZaduzenjeService, private knjigaService: KnjigaService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.message = "";
    this.currUser = JSON.parse(sessionStorage.getItem("currUser"));
    this.zaduzenjeService.getAllZaduzenja().subscribe((data: Zaduzenje[])=>{
      this.svaZaduzenja = data
      for(var zaduzenje of this.svaZaduzenja){
        if(zaduzenje.username == this.currUser.username && zaduzenje.datumVracanja != ""){
          this.mojaZaduzenja.push(zaduzenje);
        }
      }
      if(this.mojaZaduzenja.length == 0) {
        this.message = "Nemate nijednu zaduzenu knjigu";
      }
      this.param = "datVra";
      this.mojaZaduzenja.sort((zaduzenje1, zaduzenje2)=>{
        var dat1 = new Date(zaduzenje1.datumVracanja);
        var dat2 = new Date(zaduzenje2.datumVracanja)
        if(dat1<dat2) return -1;
        else if(dat1 == dat2) return 0;
        else return 1;
      })
      this.knjigaService.getAllKnjige().subscribe((knjige: Knjiga[])=>{
        this.sveKnjige = knjige;
        for(var zaduzenje of this.mojaZaduzenja){
          for(var knjiga of this.sveKnjige){
            if(zaduzenje.idKnjige == knjiga.id){
              this.sveZaduzeneKnjige.push(knjiga);
            }
          }
        }
      })
    })
  }

  svaZaduzenja : Zaduzenje[] = [];
  mojaZaduzenja: Zaduzenje[] = [];
  sveZaduzeneKnjige: Knjiga[] = [];
  sveKnjige : Knjiga[] = [];
  currUser : Citalac;
  message:string;
  param: string;

  getDatZad(idF){
    for(var zaduzenje of this.mojaZaduzenja){
      if(zaduzenje.idKnjige == idF){
        return zaduzenje.datumZaduzenja
      }
    }
    return "";
  }

  getDatVra(idF){
    for(var zaduzenje of this.mojaZaduzenja){
      if(zaduzenje.idKnjige == idF){
        return zaduzenje.datumVracanja
      }
    }
    return "";
  }

  idi(idF){
    for(var knjiga of this.sveZaduzeneKnjige){
      if(knjiga.id == idF){
        sessionStorage.setItem("currKnjiga", JSON.stringify(knjiga));
        break;
      }
    }
    this.router.navigate(['knjiga info']);
  }

  sortiraj(){
    if(this.param == "naziv"){
      this.sveZaduzeneKnjige.sort((knjiga1, knjiga2)=>{
        if(knjiga1.naziv < knjiga2.naziv) return -1;
        else if(knjiga1.naziv == knjiga2.naziv) return 0;
        else return 1;
      })
    }else if(this.param == "autor"){
      this.sveZaduzeneKnjige.sort((knjiga1, knjiga2)=>{
        if(knjiga1.autori[0].prezime < knjiga2.autori[0].prezime) return -1;
        else if(knjiga1.autori[0].prezime == knjiga2.autori[0].prezime) return 0;
        else return 1;
      })
    }else if(this.param == "datZad"){
      this.mojaZaduzenja.sort((zaduzenje1, zaduzenje2)=>{
        var dat1 = new Date(zaduzenje1.datumZaduzenja);
        var dat2 = new Date(zaduzenje2.datumZaduzenja)
        if(dat1<dat2) return -1;
        else if(dat1 == dat2) return 0;
        else return 1;
      })
      this.sveZaduzeneKnjige.splice(0, this.sveZaduzeneKnjige.length);
      for(var zaduzenje of this.mojaZaduzenja){
        for(var knjiga of this.sveKnjige){
          if(zaduzenje.idKnjige == knjiga.id){
            this.sveZaduzeneKnjige.push(knjiga);
          }
        }
      }
    }else{
      this.mojaZaduzenja.sort((zaduzenje1, zaduzenje2)=>{
        var dat1 = new Date(zaduzenje1.datumVracanja);
        var dat2 = new Date(zaduzenje2.datumVracanja)
        if(dat1<dat2) return -1;
        else if(dat1 == dat2) return 0;
        else return 1;
      })
      this.sveZaduzeneKnjige.splice(0, this.sveZaduzeneKnjige.length);
      for(var zaduzenje of this.mojaZaduzenja){
        for(var knjiga of this.sveKnjige){
          if(zaduzenje.idKnjige == knjiga.id){
            this.sveZaduzeneKnjige.push(knjiga);
          }
        }
      }
    }
  }
}
