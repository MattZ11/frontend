import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleDetailService {

  //  _isDetailHidden$ est l'observable
  //  BehaviorSubject est l'observateur
  private _isDetailHidden$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true); 

  constructor() { }

  public get isDetailHidden(): BehaviorSubject<boolean> {   //getter "magique" d'angular
    return this._isDetailHidden$;
  }

  public setIsDetailHidden(state: boolean): void {  //set traditionnel
    this._isDetailHidden$.next(state);
  }
}
