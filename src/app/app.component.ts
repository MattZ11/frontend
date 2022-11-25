import { Component } from '@angular/core';
import { Stagiaire } from './core/models/stagiaire';
import { StagiaireService } from './core/services/stagiaire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Suivi des stagiaires';

  public stagiaires: Array<Stagiaire> = this.stagiaireService.getStagiaires();

  public inputType: string = 'password';

  public abbrHTML: string = 'Hyper Text Markup Language - attribute directive version'; //pour exemple

  public constructor(
    private stagiaireService: StagiaireService
  ) {}

  public toggleTitle(): void {
    if (this.title === 'Suivi des stagiaires') {
      this.title = 'Trainees survey';
    } else {
      this.title = 'Suivi des stagiaires';
    }
  }

  public showPassword(): void {
    if (this.inputType === 'password') {
      this.inputType = 'text';
      setTimeout(                       // déclenchement retardé
        () => {
          this.inputType = 'password'
        },
        800                             // temps en msec
      )
    }else {
      this.inputType = 'password';
    }
  }
  public addStagiaire(): void {}
}
