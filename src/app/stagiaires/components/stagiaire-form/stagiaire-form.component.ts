import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';

@Component({
  selector: 'app-stagiaire-form',
  templateUrl: './stagiaire-form.component.html',
  styleUrls: ['./stagiaire-form.component.scss']
})
export class StagiaireFormComponent implements OnInit {

  stagiaireForm: FormGroup = new FormGroup({            //  cf https://angular.io/guide/reactive-forms pout tuto
    firstName: new FormControl('', Validators.required),  // cf  https://angular.io/guide/form-validation
    lastName: new FormControl('', Validators.required),    // avant: lastName: FormControl = new FormControl('') 
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.pattern("^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$")),
    birthDate: new FormControl(null),
  })

  constructor(private stagiaireService: StagiaireService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log("Read from form: ", this.stagiaireForm.value);
    const stagiaire: Stagiaire = new Stagiaire()
    stagiaire.setLastName(this.stagiaireForm.value.lastName)
    stagiaire.setFirstName(this.stagiaireForm.value.firstName)
    stagiaire.setEmail(this.stagiaireForm.value.email)
    stagiaire.setPhoneNumber(this.stagiaireForm.value.phoneNumber)
    if (this.stagiaireForm.value.birthDate != null) {   //  permet de régler le cas bithdate non indiquée en supprimant le paramètre birthdate dans l'objet stagiaire
      stagiaire.setBirthDate(new Date(this.stagiaireForm.value.birthDate))
    }
    console.log("Delegate add stagiaire ", stagiaire)
    this.stagiaireService.addStagiaire(stagiaire)
  }

}
