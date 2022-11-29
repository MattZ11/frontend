import { Inject, Injectable } from '@angular/core'; // Inject pour injecter des "tokens" (ce n'est pas un service)
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core'; // Un adaptateur pour les dates et les locales (langues)
import { Stagiaire } from 'src/app/core/models/stagiaire';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  private form!: FormGroup;  //  ! = si non-nul
  private stagiaire: Stagiaire = new Stagiaire();

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

  public build(): FormBuilderService {
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

    return this; // To chain methods
  }
}