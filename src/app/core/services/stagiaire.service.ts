import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { Observable, take, map, catchError, throwError } from 'rxjs';
import { StagiaireDto } from 'src/app/stagiaires/dto/stagiaire-dto';
import { environment } from 'src/environments/environment';
import { Stagiaire } from '../models/stagiaire';


@Injectable({
  providedIn: 'root'
})
export class StagiaireService {
  private stagiaires: Array<Stagiaire> = [];  //mémoire locale
  private controllerBaseUrl!: string;

  constructor(
    private httpClient: HttpClient    //  injection de dépendance vers le service HttpClient
    //  permettant d'envoyer des requêtes vers un serveur quelconque
  ) {
    this.controllerBaseUrl = environment.apiBaseUrl + '/trainee'
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

  public findOne(id: number): Observable<Stagiaire> {
    return this.httpClient.get<any>(
      `${environment.apiBaseUrl}/trainee/${id}`
    )
      .pipe(
        take(1),
        map((inputStagiaire: any) => {
          const stagiaire: Stagiaire = new Stagiaire();
          stagiaire.setId(inputStagiaire.id);
          stagiaire.setLastName(inputStagiaire.lastName);     // en vert noms TS (front), en blanc noms json venant de JAVA (back)
          stagiaire.setFirstName(inputStagiaire.firstName);
          stagiaire.setEmail(inputStagiaire.email);
          stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
          stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
          return stagiaire;
        })
      )
  }

  public getStagiaires(): Array<Stagiaire> {
    return this.stagiaires;
  }

  public addStagiaire(stagiaire: StagiaireDto): Observable<Stagiaire> {
    console.log('add stagiaire asked: ', stagiaire)
    // Transform any to Stagiaire
    return this.httpClient.post<StagiaireDto>(
      this.controllerBaseUrl,
      stagiaire
    )
      .pipe(
        take(1),
        map((stagiaireDto: StagiaireDto) => {
          const stagiaire: Stagiaire = new Stagiaire();
          stagiaire.setId(stagiaireDto.id!);
          stagiaire.setLastName(stagiaireDto.lastName);
          stagiaire.setFirstName(stagiaireDto.firstName);
          stagiaire.setBirthDate(stagiaireDto.birthDate);
          stagiaire.setPhoneNumber(stagiaireDto.phoneNumber);
          stagiaire.setEmail(stagiaireDto.email);
          return stagiaire;
        })
      );

  }


  /* public delete(stagiaire: Stagiaire): void {
   console.log('delete stagiaire asked: ' 
       + stagiaire.getLastName()      
       + '(' + stagiaire.getId() +')')
   // 1. call backend
   this.httpClient.delete(
     `${this.controllerBaseUrl}/${stagiaire.getId()}`
     )
     .subscribe(
       _ => {
         // remote remove is done
         console.log('delete stagiaire in remote api done: ' 
           + stagiaire.getLastName()      
           + '(' + stagiaire.getId() +')')
         // 2. adapt local list
         const stagiaireIndex: number = this.stagiaires.findIndex(
           (obj: Stagiaire) => obj.getId() === stagiaire.getId()
         );
         this.stagiaires.splice(stagiaireIndex,1);
       }
     )
   
 }*/
 
 public update(stagiaire: Stagiaire): Observable<Stagiaire> {
  return this.httpClient.put<any>(
    `${this.controllerBaseUrl}`,
    stagiaire
  )
  .pipe(
    take(1),
    map((anyStagiaire: any) => {
      const stagiaire: Stagiaire = new Stagiaire();
      stagiaire.setId(anyStagiaire.id!);
      stagiaire.setLastName(anyStagiaire.lastName);
      stagiaire.setFirstName(anyStagiaire.firstName);
      stagiaire.setBirthDate(new Date(anyStagiaire.birthDate));
      stagiaire.setPhoneNumber(anyStagiaire.phoneNumber);
      stagiaire.setEmail(anyStagiaire.email);
      return stagiaire;
    })
  )
}

  public delete(stagiaire: Stagiaire): Observable<HttpResponse<any>> {
    // 1. call backend
    return this.httpClient.delete(
      `${this.controllerBaseUrl}/${stagiaire.getId()}`,
      {
        observe: 'response'
      }
    );
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