import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../model/admin';
import { Autor } from '../model/autor';
import { Knjiga } from '../model/knjiga';
import { Zanr } from '../model/zanr';
import { KnjigaService } from '../services/knjiga.service';
import { RaspolozivostService } from '../services/raspolozivost.service';

@Component({
  selector: 'app-dodaj-knjigu',
  templateUrl: './dodaj-knjigu.component.html',
  styleUrls: ['./dodaj-knjigu.component.css']
})
export class DodajKnjiguComponent implements OnInit {

  constructor(private router: Router, private knjigaService: KnjigaService, private raspolozivostService: RaspolozivostService) { }

  ngOnInit(): void {
    this.admin = JSON.parse(sessionStorage.getItem('admin'));
    this.forma = new FormGroup({
      slika: new FormControl(null)
    });
  }

  admin: Admin
  naziv: string
  autor: Autor
  zanr: Zanr
  autori: Autor[] = [];
  zanrovi: Zanr[] = [];
  izdavac: string;
  godina: string;
  jezik: string;
  brojAutora: Number
  ime: string;
  prezime: string;
  zanrstr: string
  message: string
  slika: string;
  forma: FormGroup
  raspolozivost: number

  Dodajautora(){
    this.autor = new Autor();
    this.autor.ime = this.ime
    this.autor.prezime = this.prezime
    this.autori.push(this.autor)
    this.ime = null;
    this.prezime = null
  }

  dodajzanr(){
    this.zanr = new Zanr()
    this.zanr.zanr = this.zanrstr;
    this.zanrovi.push(this.zanr)
    this.zanrstr = null
  }

  unesi(){
    var sveKnjige : Knjiga[] = [];
    this.knjigaService.getAllKnjige().subscribe((allB: Knjiga[])=>{
      sveKnjige = allB;
      if(this.forma.value.slika != null){
        var novId = 1;
        if(sveKnjige.length != 0) novId = sveKnjige[sveKnjige.length - 1].id + 1;
        this.knjigaService.dodajKnjigu(novId, this.naziv, this.autori, this.zanrovi, this.izdavac, this.godina, this.jezik, this.forma.value.slika ,this.forma.value.slika.name).subscribe(resp=>{
          if(resp['message']=='ok'){
            this.message = 'User added'
          }else{
            this.message = 'Error'
          }
          this.knjigaService.dodajOstalo(novId, this.autori, this.zanrovi).subscribe(resp=>{
            if(resp['message']=='ok'){
              this.message = 'User added'
            }else{
              this.message = 'Error'
            }
            this.raspolozivostService.dodajRaspolozivost(novId, this.raspolozivost).subscribe(resp=>{
              if(resp['message']=='ok'){
                this.message = 'User added'
              }else{
                this.message = 'Error'
              }
              if(this.admin != null) this.router.navigate(['pregled knjiga']);
              else window.location.reload()
            })
          })
        })
      }else{
        var novId = 1;
        if(sveKnjige.length != 0) novId = sveKnjige[sveKnjige.length - 1].id + 1;
        this.knjigaService.dodajKnjigu(novId, this.naziv, this.autori, this.zanrovi, this.izdavac, this.godina, this.jezik, null ,"").subscribe(resp=>{
          if(resp['message']=='ok'){
            this.message = 'User added'
          }else{
            this.message = 'Error'
          }
          this.knjigaService.dodajOstalo(novId, this.autori, this.zanrovi).subscribe(resp=>{
            if(resp['message']=='ok'){
              this.message = 'User added'
            }else{
              this.message = 'Error'
            }
            this.raspolozivostService.dodajRaspolozivost(novId, this.raspolozivost).subscribe(resp=>{
              if(resp['message']=='ok'){
                this.message = 'User added'
              }else{
                this.message = 'Error'
              }
              if(this.admin != null) this.router.navigate(['pregled knjiga']);
              else window.location.reload()
            })
          })
        })
      }
    })
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

}
