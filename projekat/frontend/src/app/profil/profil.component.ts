import { Component, OnInit } from '@angular/core';
import { Admin } from '../model/admin';
import { Citalac } from '../model/citalac';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.currUser = JSON.parse(sessionStorage.getItem("currUser"));
    this.admin = JSON.parse(sessionStorage.getItem("admin"));
  }

  currUser : Citalac;
  admin: Admin

  checkPicUser(){
    if(this.currUser.slika == "http://localhost:4000/uploads/") return "/assets/defaultUser.png";
    else return this.currUser.slika;
  }

  checkPicAdmin(){
    if(this.admin.slika == "http://localhost:4000/uploads/") return "/assets/defaultUser.png";
    else return this.currUser.slika;
  }
}
