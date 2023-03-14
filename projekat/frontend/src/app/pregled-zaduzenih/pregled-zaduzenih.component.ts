import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Citalac } from '../model/citalac';
import { Knjiga } from '../model/knjiga';
import { Zaduzenje } from '../model/zaduzenje';
import { KnjigaService } from '../services/knjiga.service';
import { ZaduzenjeService } from '../services/zaduzenje.service';

@Component({
  selector: 'app-pregled-zaduzenih',
  templateUrl: './pregled-zaduzenih.component.html',
  styleUrls: ['./pregled-zaduzenih.component.css']
})
export class PregledZaduzenihComponent implements OnInit {

  constructor(private zaduzenjeService : ZaduzenjeService, private knjigaService: KnjigaService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.message = "";
    this.currUser = JSON.parse(sessionStorage.getItem("currUser"));
    this.zaduzenjeService.getAllZaduzenja().subscribe((data: Zaduzenje[])=>{
      this.svaZaduzenja = data
      for(var zaduzenje of this.svaZaduzenja){
        if(zaduzenje.username == this.currUser.username && zaduzenje.datumVracanja == ""){
          this.mojaZaduzenja.push(zaduzenje);
        }
      }
      if(this.mojaZaduzenja.length == 0) {
        this.message = "Nemate nijednu zaduzenu knjigu";
      }
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
  message:string

  izabrano(idF){

  }

  checkRet(idF){
    for(var zaduzenje of this.mojaZaduzenja){
      if(zaduzenje.idKnjige == idF){
        var sad = new Date().getTime();
        var rok = new Date(zaduzenje.rokVracanja).getTime();
        var diff = rok - sad;
        return diff >= 0;
      }
    }
    return false;
  }

  proveri(idF){
    for(var zaduzenje of this.mojaZaduzenja){
      if(zaduzenje.idKnjige == idF){
        var sad = new Date().getTime();
        var rok = new Date(zaduzenje.rokVracanja).getTime();
        var diff = rok - sad;
        if(diff < 0) diff = -diff;
        return Math.floor(diff / 1000 / 60 / 60 / 24);
      }
    }
    return 0;
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

  razduzi(idF){
    var date = new Date();
    let strDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    for(var knjiga of this.sveZaduzeneKnjige){
      if(knjiga.id == idF){
        this.zaduzenjeService.razduziKnjigu(this.currUser.username, knjiga.id, strDate).subscribe(resp=>{
          if(resp['message']=='ok'){
            this.message = 'User added'
          }else{
            this.message = 'Error'
          }
          window.location.reload();
        })
      }
    }
  }

  checkPic(knjiga: Knjiga){
    if(knjiga.slika == "http://localhost:4000/uploads/") return "/assets/defaultBook.png";
    else return knjiga.slika;
  }
}
