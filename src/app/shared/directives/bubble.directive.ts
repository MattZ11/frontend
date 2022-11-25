import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBubble]'
})
export class BubbleDirective implements OnInit {

  private _defaultConfig: any = {
    height: '2em',
    width: '2em',
    lineHeight: '2em', // equiv css : line-height
    backgroundColor: 'rgba(20, 20, 150, .7)',
    borderRadius: '50%',
    fontWeight: 'bold',
    verticalAlign: 'middle',
    textAlign: 'center',
    display: 'inline-block'
  }

  /**
   * Object that merge default and config passed as @Input()
   */
  private _config: any = {};

  @Input()  // y revenir pour bien comprendre
  // on indique ici que les éléments de la configuration par défaut ne se manifesteront que s'ils ne sont pas définis dans le bloc où on l'utilise
  public set config(inputConfig: any) { //définition de la méthode config, qui était un attribut avant
    // Boucler sur les propriétés de l'attribut defaultConfig de la directive
    for (const property in this._defaultConfig) {
      if (inputConfig.hasOwnProperty(property)) {
        this._config[property] = inputConfig[property];
      } else {
        this._config[property] = this._defaultConfig[property];
      }
    }

    // Boucler sur l'objet passé en paramètre pour ajouter les autres éventuelles propriétés
    for (const property in inputConfig) {
      if (!this._defaultConfig.hasOwnProperty(property)) {
        this._config[property] = inputConfig[property];
      }
    }
  }

  /*private _parentCall: any;
  @Input() set onBubbleClick(functionToCall: any) {
    this._parentCall = functionToCall
  };*/

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    for (const property in this._config) {
      this.renderer.setStyle(nativeElement, property, this._config[property]); // à essayer de comprendre
    }
  }
    // this.renderer.setStyle(nativeElement, 'fontWeight', 'bold'); // Good practice

    //nativeElement.style.fontWeight = 'bold'; fonctionne mais pas bonne pratique

    /* ne fonctionnait pas car contenu du innerHTML non-disponible à ce stade:
    console.log('app Bubble is running !');
    let content: string = this.elementRef.nativeElement.innerHTML;
    content = '<strong>' + content + '</strong>';
    this.elementRef.nativeElement.innerHTML = content;*/

  
    @HostListener('click') public onClick() { 
      const nativeElement: HTMLElement = this.elementRef.nativeElement; //je ne comprends pas la syntaxe, à regarder si temps
      this.renderer.addClass(nativeElement, 'zoom-in');
      setTimeout(
        () => {
          this.renderer.removeClass(nativeElement, 'zoom-in')
        },
        1000
      );
    }
}
