import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Admin } from '../model/admin';
import { Citalac } from '../model/citalac';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.param = "";
    this.moderator = false
    this.currUser = JSON.parse(sessionStorage.getItem('currUser'));
    this.admin = JSON.parse(sessionStorage.getItem('admin'));
    if(this.currUser != null) {
      this.profilnaSlika = this.currUser.slika;
      if(this.currUser.tip == "m") this.moderator = true;
      this.ulogovan = true;
    }
    else this.ulogovan = false;
    if(this.admin != null) {
      this.profilnaSlika = this.admin.slika;
      this.brDana = this.admin.brDana;
    }
  }

  currUser: Citalac;
  ulogovan : boolean;
  param: string;
  admin: Admin;
  brDana: number;
  message: string;
  profilnaSlika: string
  moderator: boolean

  logout(){
    if(this.currUser != null) sessionStorage.removeItem("currUser");
    if(this.admin != null) sessionStorage.removeItem("admin");
    this.ngOnInit();
    this.router.navigate(['']).then(()=> {
      window.location.reload();
    });
  }

  pretraga(){
    sessionStorage.setItem("param", this.param);
    this.router.navigate(['pretraga']).then(() => {
      window.location.reload();
    });
  }

  promeni(){
    this.adminService.promeniBrDana(this.admin.username, this.brDana).subscribe(resp =>{
      if(resp['message']=='ok'){
        this.message = 'User added'
      }else{
        this.message = 'Error'
      }
    })
  }

  checkPic(){
    if(this.profilnaSlika == "http://localhost:4000/uploads/") return "/assets/defaultUser.png";
    else return this.profilnaSlika
  }
}
