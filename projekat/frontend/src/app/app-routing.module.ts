import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DodajKnjiguComponent } from './dodaj-knjigu/dodaj-knjigu.component';
import { IstorijaZaduzenjaComponent } from './istorija-zaduzenja/istorija-zaduzenja.component';
import { KnjigaInfoComponent } from './knjiga-info/knjiga-info.component';
import { LoginComponent } from './login/login.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PregledKnjigaComponent } from './pregled-knjiga/pregled-knjiga.component';
import { PregledKorisnikaComponent } from './pregled-korisnika/pregled-korisnika.component';
import { PregledZaduzenihComponent } from './pregled-zaduzenih/pregled-zaduzenih.component';
import { PregledZahtevaComponent } from './pregled-zahteva/pregled-zahteva.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { ProfilComponent } from './profil/profil.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegisterComponent } from './register/register.component';
import { OcenaService } from './services/ocena.service';

const routes: Routes = [
  {path: "", component : PocetnaComponent},
  {path : "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "promena lozinka", component: PromenaLozinkeComponent},
  {path: "profil", component: ProfilComponent},
  {path: "adminLogin", component: AdminLoginComponent},
  {path: "pretraga", component: PretragaComponent},
  {path: "knjiga info", component: KnjigaInfoComponent},
  {path: "pregled zaduzenih", component: PregledZaduzenihComponent},
  {path: "istorija zaduzenja", component: IstorijaZaduzenjaComponent},
  {path: "ocena", component: OcenaService},
  {path: "dodaj knjigu", component: DodajKnjiguComponent},
  {path: "pregled zahteva", component: PregledZahtevaComponent},
  {path: "pregled korisnika", component: PregledKorisnikaComponent},
  {path: "pregled knjiga", component: PregledKnjigaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
