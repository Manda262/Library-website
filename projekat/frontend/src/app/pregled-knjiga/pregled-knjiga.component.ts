import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { Raspolozivost } from '../model/raspolozivost';
import { Zaduzenje } from '../model/zaduzenje';
import { KnjigaService } from '../services/knjiga.service';
import { OcenaService } from '../services/ocena.service';
import { RaspolozivostService } from '../services/raspolozivost.service';
import { ZaduzenjeService } from '../services/zaduzenje.service';

@Component({
  selector: 'app-pregled-knjiga',
  templateUrl: './pregled-knjiga.component.html',
  styleUrls: ['./pregled-knjiga.component.css']
})
export class PregledKnjigaComponent implements OnInit {

  constructor(private knigaService: KnjigaService, private router: Router, private zaduzenjeService: ZaduzenjeService, private raspolozivostService: RaspolozivostService, private ocenaService : OcenaService) { }

  ngOnInit(): void {
    this.forma = new FormGroup({
      slika: new FormControl(null)
    });
    this.knigaService.getAllKnjige().subscribe((knjige: Knjiga[])=>{
      this.sveKnjige = knjige;
      for(var i = 0; i < this.sveKnjige.length; i++){
        this.flagovi.push(true);
      }
    })
    this.zaduzenjeService.getAllZaduzenja().subscribe((zaduzenja: Zaduzenje[])=>{
      this.svaZaduzenja = zaduzenja;
    })
    this.raspolozivostService.getAllRaspolozivost().subscribe((rasp: Raspolozivost[])=>{
      this.svaRaspolozivost = rasp;
    })
  }

  svaRaspolozivost: Raspolozivost[] = []
  svaZaduzenja: Zaduzenje[] = [];
  sveKnjige: Knjiga[] = [];
  flagovi: boolean[] = [];
  message: string
  naziv: string
  autori: string
  zanrovi: string
  izdavac: string
  godina: string
  jezik: string
  slika: string;
  forma: FormGroup
  raspolozivost: number

  azuriraj(idF){
    for(var i = 0; i < this.sveKnjige.length; i++){
      if(this.sveKnjige[i].id == idF){
        this.flagovi[i] = false;
      }
    }
  }

  izbrisi(idF){
    for(var zaduzenje of this.svaZaduzenja){
      if(zaduzenje.idKnjige == idF && zaduzenje.datumVracanja == ""){
        this.message = "Ne moze se obrisati knjiga koja je zaduzena";
        return;
      }
    }
    this.knigaService.izbrisiKnjigu(idF).subscribe(resp=>{
      this.ocenaService.izbrisiOceneKnjige(idF).subscribe(resp=>{
        this.zaduzenjeService.izbrisiZaduzenjeKnjige(idF).subscribe(resp=>{
          this.raspolozivostService.izbrisiRaspolozivost(idF).subscribe(resp=>{
            window.location.reload();
          })
        })
      })
    })
  }

  getFlag(idF){
    for(var i = 0; i < this.sveKnjige.length; i++){
      if(this.sveKnjige[i].id == idF){
        return this.flagovi[i];
      }
    }
    return false;
  }

  zavrsiAzuriranje(idF){
    for(var i = 0; i < this.sveKnjige.length; i++){
      if(this.sveKnjige[i].id == idF){
        this.knigaService.azurirajKnjigu(this.sveKnjige[i].id, this.sveKnjige[i].naziv, this.sveKnjige[i].autori, this.sveKnjige[i].zanrovi, this.sveKnjige[i].izdavac, this.sveKnjige[i].godina, this.sveKnjige[i].jezik).subscribe(resp=>{
          if(resp['message']=='ok'){
            this.message = 'User added'
          }else{
            this.message = 'Error'
          }
          if(this.forma.value.slika != null) {
            this.knigaService.azurirajSliku(idF, this.forma.value.slika ,this.forma.value.slika.name).subscribe(resp=>{
              if(resp['message']=='ok'){
                this.message = 'User added'
              }else{
                this.message = 'Error'
              }
              this.raspolozivostService.updateRaspolozivost(idF, this.raspolozivost).subscribe(resp=>{
                window.location.reload();
              })
            })
          }else {
            this.raspolozivostService.updateRaspolozivost(idF, this.raspolozivost).subscribe(resp=>{
              window.location.reload();
            })
          }
        })
        this.flagovi[i] = true;
      }
    }
  }

  dodajKnjigu(){
    this.router.navigate(['dodaj knjigu'])
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

  checkPic(knjiga: Knjiga){
    if(knjiga.slika == "http://localhost:4000/uploads/") return "/assets/defaultBook.png";
    else return knjiga.slika;
  }

  getRasp(knjiga: Knjiga){
    for(var r of this.svaRaspolozivost){
      if(knjiga.id == r.idKnjige){
        return r.raspolozivost;
      }
    }
    return 0;
  }
}
