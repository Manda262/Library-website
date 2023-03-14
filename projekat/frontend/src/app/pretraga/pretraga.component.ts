import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Citalac } from '../model/citalac';
import { Knjiga } from '../model/knjiga';
import { KnjigaService } from '../services/knjiga.service';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  constructor(private knjigaService: KnjigaService, private router: Router) { }

  ngOnInit(): void {
    this.currUser = JSON.parse(sessionStorage.getItem("currUser"));
    this.param = sessionStorage.getItem("param");
      var pos = this.param.indexOf(",");
    var param1; // parametar za autore
    if(pos != -1){
      param1 = this.param.substring(pos + 1);
      this.param = this.param.substring(0, pos);
    }else{
      param1 = this.param;
    }
    this.knjigaService.searchKnjigePoNazivu(this.param).subscribe((dataN: Knjiga[])=>{
      this.sveNadjenePoNazivu = dataN;
      this.knjigaService.getAllKnjige().subscribe((dataA: Knjiga[])=>{
        this.sveKnjige = dataA;
        if(this.param == "") {
          for(var knjiga of this.sveKnjige){
            this.sveNadjeneKnjige.push(knjiga);
          }
          return;
        }
        var i = 0;
        for(var knjiga of this.sveKnjige){
          for(var autor of knjiga.autori){
            if(autor.ime.includes(param1) || autor.prezime.includes(param1)){
              this.sveNadjenePrekoAutora.push(knjiga);
              break;
            }
            i = i + 1;
          }
          i = 0;
        }
        for(var knjiga of this.sveNadjenePoNazivu){
          this.sveNadjeneKnjige.push(knjiga)
        }
        for(var knjiga of this.sveNadjenePrekoAutora){
          var flag = false;
          for(var knjiga1 of this.sveNadjeneKnjige){
            if(knjiga.id == knjiga1.id) flag = true;
          }
          if(!flag) this.sveNadjeneKnjige.push(knjiga);
        }
      })
    })
  }

  sveKnjige : Knjiga[] = [];
  param: string;
  sveNadjeneKnjige: Knjiga[] = [];
  sveNadjenePrekoAutora: Knjiga[] = [];
  sveNadjenePoNazivu: Knjiga[] = [];
  currUser: Citalac;

  izabrano(idF){
    if(this.currUser == null) return;
    for(var knjiga of this.sveNadjeneKnjige){
      if(knjiga.id == idF){
        sessionStorage.setItem("currKnjiga", JSON.stringify(knjiga));
        break;
      }
    }
    this.router.navigate(['knjiga info']);
  }

  checkPic(knjiga: Knjiga){
    if(knjiga.slika == "http://localhost:4000/uploads/") return "/assets/defaultBook.png";
    else return knjiga.slika;
  }

}
