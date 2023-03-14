import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Citalac } from '../model/citalac';
import { ZahtevService } from '../services/zahtev.service';
import { CitalacService } from '../services/citalac.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private citalacService: CitalacService, private zahtevService: ZahtevService, private router: Router) { }

  ngOnInit(): void {
    this.forma = new FormGroup({
      slika: new FormControl(null)
    });
    this.unamePattern = ("^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$");
    this.citalacService.getAllCitaoce().subscribe((data: Citalac[])=>{
      this.sviCitaoci = data;
    })
  }
  
  unamePattern : string;
  sviCitaoci: Citalac[] = [];
  username: string; //proveri da li je jedinstveno
  password: string;
  passwordcheck: string;
  ime: string;
  prezime: string;
  adresa: string;
  telefon: string;
  email: string;
  //slika: ?;
  tip: string;
  message: string;
  slika: string;
  forma: FormGroup

  posaljiZahtev(){
    if(this.password != this.passwordcheck){
      this.message = "Sifre se ne poklapaju";
      return;
    }
    for(var citalac of this.sviCitaoci){
      if(citalac.username == this.username){
        this.message = "Username vec postoji";
        return;
      }
    }
    for(var citalac of this.sviCitaoci){
      if(citalac.email == this.email){
        this.message = "Korisnik sa ovim emailom vec postoji";
        return;
      }
    }
    if(this.username == null || this.password == null || this.ime == null || this.prezime == null 
      || this.adresa == null || this.telefon == null || this.email == null || this.tip == null){
        this.message = "Unesite sva obavezna polja!";
        return;
      }

    /*this.formdata.append("username", this.username);
    this.formdata.append("password", this.password);
    this.formdata.append("ime", this.ime);
    this.formdata.append("prezime", this.prezime);
    this.formdata.append("adresa", this.adresa);
    this.formdata.append("telefon", this.telefon);
    this.formdata.append("email", this.email);
    this.formdata.append("tip", this.tip);*/
    if(this.forma.value.slika == null) {
      this.zahtevService.dodajZahtev(this.username ,this.password, this.ime, this.prezime, this.adresa, this.telefon, this.email, this.tip, null ,"").subscribe(respObj=>{
        if(respObj['message']=='ok'){
          this.message = 'User added'
        }else{
          this.message = 'Error'
        }
        this.router.navigate([''])
      })
    }
    else {
      this.zahtevService.dodajZahtev(this.username ,this.password, this.ime, this.prezime, this.adresa, this.telefon, this.email, this.tip, this.forma.value.slika ,this.forma.value.slika.name).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          this.message = 'User added'
        }else{
          this.message = 'Error'
        }
        this.router.navigate([''])
      })
      this.forma.reset();
      this.slika = null;
    //ubaci sliku
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
}
