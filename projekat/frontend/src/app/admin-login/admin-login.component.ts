import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../model/admin';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  login(){
    this.adminService.login(this.username, this.password).subscribe((adminDB : Admin)=>{
      if(adminDB != null){
        sessionStorage.setItem("admin", JSON.stringify(adminDB));
        this.router.navigate(['']).then(()=>{
          window.location.reload();
        });
      }else{
        this.message = "Neispravna lozinka ili username";
      }
    })
  }

}
