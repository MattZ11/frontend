import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  birthDate: new FormControl(new Date)
})

constructor() { }

ngOnInit(): void {
}

onSubmit() {
  // TODO: Use EventEmitter with form value
  console.log(this.stagiaireForm.value);
 
}

}
