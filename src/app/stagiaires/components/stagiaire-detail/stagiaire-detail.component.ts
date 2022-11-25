import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';

@Component({
  selector: 'app-stagiaire-detail',
  templateUrl: './stagiaire-detail.component.html',
  styleUrls: ['./stagiaire-detail.component.scss']
})
export class StagiaireDetailComponent implements OnInit {
  
  

  @Input()   stagiaire!: Stagiaire; // pas compris le !
    // @Input() public stagiaire: Stagiaire = new Stagiaire();

    public bubbleConfig: any = {
      height: '3em',
      width: '3em',
      lineHeight: '3em', // equiv css : line-height
      backgroundColor: 'rgba(126, 126, 199, .9)',
      borderColor: 'darken(rgba(200, 20, 20, .5)), 90%)',
      borderStyle: 'solid',
      color: '#fff',
      fontFamily: 'Arial, Helvetica, sans-serif',
    }
  
  constructor(

  private handleDetailService: HandleDetailService  //injection de services dans le constructor
  ) { }

  ngOnInit(): void {
  }
    public onClose(): void {
      this.handleDetailService.setIsDetailHidden(true);
    
  }

}
