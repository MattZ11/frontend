import { Inject, Injectable } from '@angular/core'; // Inject pour injecter des "tokens" (ce n'est pas un service)
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core'; // Un adaptateur pour les dates et les locales (langues)
import { Stagiaire } from 'src/app/core/models/stagiaire';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  private form!: FormGroup;  //  ! = si non-nul
  private stagiaire: Stagiaire = new Stagiaire();
  private updateMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private locale: string
  ) {
    this.locale = 'fr';
    this.adapter.setLocale(this.locale);
  }
  public getForm(): FormGroup {
    return this.form;
  }

  public build(stagiaire: Stagiaire): FormBuilderService {   //  pas du tout compris, mais permet de remplir les champs correspondant au stagiaire à modifier
    this.stagiaire = stagiaire;
  if (this.stagiaire.getId() != 0){
    this.updateMode = true;
  }
    
    this.form = this.formBuilder.group({
    lastName: [
      this.stagiaire.getLastName(), // Default value,
      [
        Validators.required
      ]
    ],
    firstName: [
      this.stagiaire.getFirstName(),
      [
        Validators.required
      ]
    ],
    email: [
      this.stagiaire.getEmail(),
      [
        Validators.required,
        Validators.email
      ]
    ],
    phoneNumber: [
      this.stagiaire.getPhoneNumber(),
      [
        Validators.required,
        Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")
      ]
    ],
    birthDate: [
      this.stagiaire.getBirthDate() !== null ? this.stagiaire.getBirthDate() : ''
    ]
  });

  //  ajoute un contrôle avec la valeur de l'Id du stagiaire
  // donc form.value vaudra {id:1, ...} (dans le cas d'un ajout, pas d'ID, un nouveau est créé)
if(this.updateMode) {      
  const idControl : AbstractControl = new FormControl(this.stagiaire.getId());
  this.form.addControl('id', idControl);
}

return this; // To chain methods
  }
}