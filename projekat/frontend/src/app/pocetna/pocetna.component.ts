import { Component, OnInit } from '@angular/core';
import { couldStartTrivia } from 'typescript';
import { Citalac } from '../model/citalac';
import { Knjiga } from '../model/knjiga';
import { Ocena } from '../model/ocena';
import { Zaduzenje } from '../model/zaduzenje';
import { KnjigaService } from '../services/knjiga.service';
import { OcenaService } from '../services/ocena.service';
import { ZaduzenjeService } from '../services/zaduzenje.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private knjigaService: KnjigaService, private zaduzenjeService: ZaduzenjeService, private ocenaService: OcenaService) { }

  ngOnInit(): void {
    this.currUser = JSON.parse(sessionStorage.getItem("currUser"));
    this.knjigaService.getAllKnjige().subscribe((data : Knjiga[])=>{
      this.sveKnjige = data;

      this.zaduzenjeService.getAllZaduzenja().subscribe((svaZ : Zaduzenje[])=>{
        var i1 = 0;
        var i2 = 0;
        var i3 = 0;
        var cnti = 0;
        var max1 = new Knjiga();
        var max2 = new Knjiga();
        var max3 = new Knjiga();
        for(var knjiga of this.sveKnjige){
          for(var zaduzenje of svaZ){
            if(knjiga.id == zaduzenje.idKnjige){
              cnti++;
            }
          }
          if(cnti > i1){
            i1 = cnti;
            max1 = knjiga;
          }
          cnti = 0;
        }
        for(var knjiga of this.sveKnjige){
          for(var zaduzenje of svaZ){
            if(knjiga.id == zaduzenje.idKnjige && knjiga.id != max1.id){
              cnti++;
            }
          }
          if(cnti > i2){
            i2 = cnti;
            max2 = knjiga;
          }
          cnti = 0;
        }
        for(var knjiga of this.sveKnjige){
          for(var zaduzenje of svaZ){
            if(knjiga.id == zaduzenje.idKnjige && knjiga.id != max1.id && knjiga.id != max2.id){
              cnti++;
            }
          }
          if(cnti > i3){
            i3 = cnti;
            max3 = knjiga;
          }
          cnti = 0;
        }
      if(max1.slika != "http://localhost:4000/uploads/") this.image1 = max1.slika;
      else this.image1 = "/assets/defaultBook.png"
      this.ime1 = max1.naziv;
      if(max2.slika != "http://localhost:4000/uploads/") this.image2 = max2.slika;
      else this.image2 = "/assets/defaultBook.png"
      this.ime2 = max2.naziv;
      if(max3.slika != "http://localhost:4000/uploads/") this.image3 = max3.slika;
      else this.image3 = "/assets/defaultBook.png"
      this.ime3 = max3.naziv;
      })

      this.knjigaDana = this.sveKnjige[Math.floor(Math.random()*this.sveKnjige.length)];
      if(this.knjigaDana.slika == "http://localhost:4000/uploads/") this.slika =  "/assets/defaultBook.png";
      else this.slika =  this.knjigaDana.slika;
      this.ocenaService.getAllOcene().subscribe((ocene: Ocena[])=>{
        var sveOcene = ocene;
        for(var ocena of sveOcene){
          if(ocena.idKnjige == this.knjigaDana.id){
            this.oceneOveKnjige.push(ocena);
          }
        }
      })
    })
  }

  oceneOveKnjige: Ocena[] = [];
  knjigaDana : Knjiga;
  sveKnjige: Knjiga[] = [];
  slika: string;
  currUser: Citalac;
  image1: string;
  image2: string;
  image3: string;
  ime1: string;
  ime2: string;
  ime3: string;

  prosecna(){
    if(this.oceneOveKnjige.length == 0) return "";
    var sum = 0;
    var num = 0;
    for(var ocena of this.oceneOveKnjige){
      sum += ocena.ocena
      num++;
    }
    var br = sum/num;
    return br.toFixed(2)
  }
}
