import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Citalac } from '../model/citalac';
import { PocetnaComponent } from '../pocetna/pocetna.component';
import { CitalacService } from '../services/citalac.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private citalacService: CitalacService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  login(){
    this.citalacService.login(this.username, this.password).subscribe((citalacDB: Citalac)=>{
      if(citalacDB != null){
        sessionStorage.setItem("currUser", JSON.stringify(citalacDB));
        this.router.navigate(['']).then(()=>{
          window.location.reload();
        });
      }else{
        this.message = "Neispravna lozinka ili username";
      }
    })
  }

}
