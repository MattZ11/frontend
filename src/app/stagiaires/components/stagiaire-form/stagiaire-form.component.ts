import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable, subscribeOn, Subscription } from 'rxjs';
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

  public addMode: boolean = true;

  constructor(
    private stagiaireService: StagiaireService,
    private formBuilderService: FormBuilderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const data: any = this.route.snapshot.data;
    console.log(`${data.form instanceof FormGroup ? 'OK' : 'KO'}`)
    
    this.stagiaireForm = data.form;


    if (this.stagiaireForm.value.id !== 0) {
      this.addMode = false;
    } else {
      this.addMode = true;
    }
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

    let subscription: Observable<any>;

    if (this.addMode) {
      subscription = this.stagiaireService.addStagiaire(dto)
      
        
      } else {
        // Invoke service update method
        subscription = this.stagiaireService.update(this.stagiaireForm.value)
      }
      subscription.subscribe(() => this.goHome())
    }
  public goHome(): void {
    this.router.navigate(['/', 'home']);
  }
}


