import { Stagiaire } from "src/app/core/models/stagiaire";
import { InitialsPipe } from "./initials.pipe";

describe('InitialsPipe', () => {
  
  it('create an instance', () => {
    const pipe = new InitialsPipe();
    expect(pipe).toBeTruthy();
  });


  it(`Should return JA with no args`, () => {
    const stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setLastName('Aubert');      //set : on injecte des valeurs de test
    stagiaire.setFirstName('Jean-Luc');

    const pipe = new InitialsPipe();

    expect(pipe.transform(stagiaire)).toBe('JA'); //"JA" résultat attendu du test de pipe simple
  });


  it(`Should return AJ with firstNameFirst sets to false`, () => {
    const stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setLastName('Aubert');
    stagiaire.setFirstName('Jean-Luc');

    const pipe = new InitialsPipe();

    const variation: any = { firstNameFirst: false };

    expect(pipe.transform(stagiaire, variation)).toBe('AJ');  //"AJ" résultat attendu du test de avec paramètre d'inversion
  });


  it(`Should return JLA with full property sets to true`, () => {
    const stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setLastName('Aubert');
    stagiaire.setFirstName('Jean-Luc');

    const pipe = new InitialsPipe();
    const variation: any = { full: true };
    expect(pipe.transform(stagiaire, variation)).toBe('JLA'); //"JLA" résultat attendu du test de pipe avec prénom composé
  });


  it(`Should return AJL with full property sets to true and firstNameFirst to false`, () => {
    const stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setLastName('Aubert');
    stagiaire.setFirstName('Jean-Luc');

    const pipe = new InitialsPipe();
    const variation: any = { firstNameFirst: false, full: true };
    expect(pipe.transform(stagiaire, variation)).toBe('AJL'); //"AJL" résultat attendu du test de pipe avec paramètre d'inversion ET prénom composé
  });


  it(`Should throw an Error if value is not a Stagiaire instance`, () => {
    const stagiaire: any = 'something wrong';

    const pipe = new InitialsPipe();

    expect(() => pipe.transform(stagiaire)).toThrowError();
  });


  it(`Should return JB even if full is set to true`, () => {
    const stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setLastName('Bond');
    stagiaire.setFirstName('James')

    const pipe = new InitialsPipe();
    const variation: any = {full: true}

    expect(pipe.transform(stagiaire, variation)).toBe('JB');
  });

});
