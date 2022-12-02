import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { StagiaireDto } from '../../dto/stagiaire-dto';
import { FormBuilderService } from '../../services/form-builder.service';

@Component({
  selector: 'app-stagiaire-form',
  templateUrl: './stagiaire-form.component.html',
  styleUrls: ['./stagiaire-form.component.scss']
})
export class StagiaireFormComponent implements OnInit {


  stagiaireForm!: FormGroup;
  // stagiaireForm: FormGroup = new FormGroup({            //  cf https://angular.io/guide/reactive-forms pout tuto
  //   firstName: new FormControl('', Validators.required),  // cf  https://angular.io/guide/form-validation
  //   lastName: new FormControl('', Validators.required),    // avant: lastName: FormControl = new FormControl('') 
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   phoneNumber: new FormControl('', Validators.pattern("^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$")),
  //   birthDate: new FormControl(null),
  // })

  constructor(
    private stagiaireService: StagiaireService,
    private formBuilderService: FormBuilderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.stagiaireForm = this.formBuilderService.build().getForm();
  }

  //  méthode "helper"
  /**
    * Returns a list of form controls
    * @usage In template : c['lastname']
    *  instead of stagiaireForm.controls['lastname']
    */

  public get c(): { [key: string]: AbstractControl } {
    return this.stagiaireForm.controls;
  }

  onSubmit() {
    console.log("Delegate add stagiaire:", this.stagiaireForm.value)
    const dto: StagiaireDto = new StagiaireDto(this.stagiaireForm.value)
    this.stagiaireService.addStagiaire(dto)
    .subscribe(()=> {
      this.goHome();
    })

    // TODO: Use EventEmitter with form value
    // console.log("Read from form: ", this.stagiaireForm.value);
    // const stagiaire: Stagiaire = new Stagiaire()
    // stagiaire.setLastName(this.stagiaireForm.value.lastName)
    // stagiaire.setFirstName(this.stagiaireForm.value.firstName)
    // stagiaire.setEmail(this.stagiaireForm.value.email)
    // stagiaire.setPhoneNumber(this.stagiaireForm.value.phoneNumber)
    // if (this.stagiaireForm.value.birthDate != null) {   //  permet de régler le cas birthdate non indiquée en supprimant le paramètre birthdate dans l'objet stagiaire
    //   stagiaire.setBirthDate(new Date(this.stagiaireForm.value.birthDate))
    // }
    // console.log("Delegate add stagiaire ", stagiaire)
    // this.stagiaireService.addStagiaire(stagiaire)
  }

  public goHome(): void {
    this.router.navigate(['/', 'home']);
  }
}


