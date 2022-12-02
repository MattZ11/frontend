import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';

@Component({
  selector: 'app-stagiaire-table',
  templateUrl: './stagiaire-table.component.html',
  styleUrls: ['./stagiaire-table.component.scss']
})
export class StagiaireTableComponent implements OnInit {

  public stagiaires: Array<Stagiaire> = [];
  public stopDate: Date | null = new Date(1950, 11, 31);
  //public pipeVariant: any = null;                         // 1/2 remplace le const variant de initials.pipe.ts

   /**
   * if true detail is visible, hidden else
   */
  
    public isDetailHidden$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);            // à déclarer avant ngOnInit

    public selectedStagiaire: Stagiaire | null = null;

    public bubbleConfig:any = { //définition de l'attribut bubbleConfig
      height: '2em',
    width: '2em',
    lineHeight: '2em', // equiv css : line-height
    backgroundColor: 'rgba(126, 126, 199, .5)',
    borderColor: 'darken(rgba(20, 20, 200, .5)), 25%)',
    color: '#fff',
    borderRadius: '50%',
    fontWeight: 'bold',
    verticalAlign: 'middle',
    textAlign: 'center',
    display: 'inline-block'
    }
    
  constructor(
    private stagiaireService: StagiaireService,
    private handleDetailService: HandleDetailService,
    private router: Router
    ) { }




  ngOnInit(): void {
    this.stagiaireService.findAll().subscribe((stagiaires : Stagiaire [])=>{
      this.stagiaires = stagiaires;
    });
    this.isDetailHidden$ = this.handleDetailService.isDetailHidden; //on appelle par référence l'observateur du service
    // this.pipeVariant.firstNameFirst = true;                 // 2/2 remplace le const variant de initials.pipe.ts
    
    /*this.handleDetailService.isDetailHidden.subscribe((isDetailHidden: boolean) => {
      //  le paramètre de la fonction suscribe est la donnée observée
      console.log(isDetailHidden ? 'Caché' : 'Affiché');
      
        this.isDetailHidden = isDetailHidden;
      
    });*/
  }

  public getVisibleStagiaireNumber(): number {
    return this.stagiaireService.getVisibleStagiaireNumber(this.stopDate);
  }

  public onRemove(stagiaire: Stagiaire): void {
    console.log(`L'utilisateur souhaite supprimer ${stagiaire.getLastName()}`);
    this.stagiaireService.delete(stagiaire)
    .subscribe({
      next: (response: HttpResponse<any>) => {
        this.stagiaires.splice(
          this.stagiaires.findIndex((s: Stagiaire) => s.getId() === stagiaire.getId()),
          1
        )
        // Here goes the snackbar
      },
      error: (error: any) => {
        // Something went wrong, deal with it
        console.log("Achtung ! Error was intercepted.")
      },
      complete:() => {
        console.log
      }
    })
}



  public onClick(stagiaire: Stagiaire): void {    // Il faut que j'arrive à afficher un composant
    this.router.navigate(['/', 'stagiaire', stagiaire.getId()]);
      
      //conduisait directement au tableau sans passer par bdd
     // this.selectedStagiaire = stagiaire;
     // this.handleDetailService.setIsDetailHidden(false);  //  change la valeur de l'observable

  }
  public onUpdate(stagiaire: Stagiaire): void {    // Il faut que j'arrive à afficher un composant
    this.router.navigate(['/', 'stagiaire', 'update', stagiaire.getId()]);
  }


  public filterChanged(event: Date | null): void {
    console.log(`Filter as changed to : ${event}`);
    this.stopDate = event;
  }

  public changeView(stagiaire: Stagiaire): boolean {
    if (this.stopDate === null) {
      return true;
    }

    if (this.stopDate.getDate() === 31) {
      return stagiaire.getBirthDate() > this.stopDate;
    }

    return stagiaire.getBirthDate() < this.stopDate;
  }


}

