import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Citalac } from '../model/citalac';
import { CitalacService } from '../services/citalac.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private citalacService: CitalacService, private router: Router) { }

  ngOnInit(): void {
    this.currUser = JSON.parse(sessionStorage.getItem('currUser'));
  }

  currUser: Citalac;
  sviCitaoci: Citalac[] = [];
  stara: string;
  nova: string;
  novaponovo: string;
  message: string;

  potvrdi(){
    if(this.currUser.password != this.stara){
      this.message = "Stara sifra nije ispravna";
      return;
    }
    if(this.nova != this.novaponovo){
      this.message = "Nova sifra nije ista u oba unosa";
      return;
    }
    this.citalacService.promeniSifru(this.currUser.username, this.nova).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.message = 'Promenjena sifra';
        sessionStorage.removeItem("currUser");
        this.router.navigate(['']).then(()=>{
          window.location.reload();
        });;
      }else{
        this.message = 'Error'
      }
    })
  }

}
