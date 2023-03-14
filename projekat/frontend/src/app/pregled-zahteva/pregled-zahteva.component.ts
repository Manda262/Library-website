import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Citalac } from '../model/citalac';
import { CitalacService } from '../services/citalac.service';
import { ZahtevService } from '../services/zahtev.service';

@Component({
  selector: 'app-pregled-zahteva',
  templateUrl: './pregled-zahteva.component.html',
  styleUrls: ['./pregled-zahteva.component.css']
})
export class PregledZahtevaComponent implements OnInit {

  constructor(private zahtevService: ZahtevService, private citalacService: CitalacService, private router: Router) { }

  ngOnInit(): void {
    this.zahtevService.getAllZahtevi().subscribe((zaht: Citalac[])=>{
      this.sviZahtevi = zaht;
    })
  }

  sviZahtevi: Citalac[] = [];
  message: string

  prihvati(un){
    for(var zahtev of this.sviZahtevi){
      if(zahtev.username == un){
        this.citalacService.register(zahtev.username, zahtev.password, zahtev.ime, zahtev.prezime, zahtev.adresa, zahtev.telefon, zahtev.email, zahtev.tip,null, zahtev.slika.substring(30)).subscribe(resp=>{
          if(resp['message']=='ok'){
            this.message = 'User added'
          }else{
            this.message = 'Error'
          }
          this.odbij(un)
          window.location.reload()
        })
      }
    }
  }

  odbij(un){ // namesti da odbija jednog a ne sve sa tim usernameom
    for(var zahtev of this.sviZahtevi){
      if(zahtev.username == un){
        this.zahtevService.ukloniZahtev(zahtev.username).subscribe(resp=>{
          if(resp['message']=='ok'){
            this.message = 'User added'
          }else{
            this.message = 'Error'
          }
          window.location.reload()
        })
      }
    }
  }

  checkPic(citalac: Citalac){
    if(citalac.slika == "http://localhost:4000/uploads/") return "/assets/defaultUser.png";
    else return citalac.slika;
  }
}
