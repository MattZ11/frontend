import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stagiaire } from '../models/stagiaire';


@Injectable({
  providedIn: 'root'
})
export class StagiaireService {
  private stagiaires: Array<Stagiaire> = [];  //mémoire locale
  private controllerBaseUrl: string = `${environment.apiBaseUrl}/trainee`;

  constructor(
    private httpClient: HttpClient    //  injection de dépendance vers le service HttpClient
    //  permettant d'envoyer des requêtes vers un serveur quelconque
  ) {
  //  this.feedIt();    //  connexion vers feedIt
  }

  //  ~ branchement vers backend ~
  public findAll(): Observable<Stagiaire[]> {
    return this.httpClient.get<any>(
      this.controllerBaseUrl
    )
      .pipe(    // initiation d'un pipeline
        take(1),
        map((stagiaires: any[]) => {
          return stagiaires.map((inputStagiaire: any) => {
            const stagiaire: Stagiaire = new Stagiaire();
            stagiaire.setId(inputStagiaire.id);
            stagiaire.setLastName(inputStagiaire.lastName);     // en vert noms TS (front), en blanc noms json venant de JAVA (back)
            stagiaire.setFirstName(inputStagiaire.firstName);
            stagiaire.setEmail(inputStagiaire.email);
            stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
            stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
            return stagiaire;
          })
        })
      )

  }



  public getStagiaires(): Array<Stagiaire> {
    return this.stagiaires;
  }

  public delete(stagiaire: Stagiaire): void {
    console.log(`Le composant me demande de supprimer ${stagiaire.getLastName()}`);
    //  1. call backend
    this.httpClient.delete(`${this.controllerBaseUrl}/${stagiaire.getId()}` //ou this.controllerBaseUrl + "/" + stagiaire.getId()
    ).subscribe((res:any) => console.log("Delete ok. No regrets ?"));
    //  2. adapt local site
   /* const stagiaireIndex: number = this.stagiaires.findIndex(
      (obj: Stagiaire) => obj.getId() === stagiaire.getId()
    );
    this.stagiaires.splice(stagiaireIndex, 1);*/
  }

  public getVisibleStagiaireNumber(date: Date | null): number {
    if (date === null) {
      return this.stagiaires.length;
    }

    return (date.getDate() === 31) ?
      this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() > date).length :
      this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() < date).length;

    /*  let nb: number = 0;                     //alternative
    for (const stagiaire of this.stagiaires) {
      if (stagiaire.getBirthDate() > date) {
        nb = nb + 1
      }
    }
    return nb;*/                                 //alternative
  }

  private feedIt(): void {
    let stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setId(1);
    stagiaire.setLastName('Aubert');
    stagiaire.setFirstName('Jean-Luc');
    stagiaire.setPhoneNumber('+(33)6 15 15 15 15');
    stagiaire.setEmail('jla.webprojet@gmail.com');
    stagiaire.setBirthDate(new Date(1968, 3, 30));

    this.stagiaires.push(stagiaire);

    stagiaire = new Stagiaire();
    stagiaire.setId(2);
    stagiaire.setLastName('Bond');
    stagiaire.setFirstName('James');
    stagiaire.setPhoneNumber('+(33)7 07 07 07 07');
    stagiaire.setEmail('james.bond@mi6.co.uk');
    stagiaire.setBirthDate(new Date(1945, 5, 7));

    this.stagiaires.push(stagiaire);

    stagiaire = new Stagiaire();
    stagiaire.setId(3);
    stagiaire.setLastName('Goodman');
    stagiaire.setFirstName('Saul');
    stagiaire.setPhoneNumber('+(1)505-842-5662');
    stagiaire.setEmail('better.call.saul@abq.us');
    stagiaire.setBirthDate(new Date(1960, 10, 12));

    this.stagiaires.push(stagiaire);

  }
}