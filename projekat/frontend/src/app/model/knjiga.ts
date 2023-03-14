import { Autor } from "./autor";
import { Zanr } from "./zanr";

export class Knjiga{
    id:number;
    naziv:string;
    autori: Array<Autor>
    zanrovi: Array<Zanr>
    izdavac: string;
    godina: string
    jezik: string;
    slika: string;
}