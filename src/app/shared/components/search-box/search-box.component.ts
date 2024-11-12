import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer : Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder : string = '';

  @Input()
  public initialValue : string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(300) //Si demora el observable deja de emitir valores por mas de 300 mls
                          //procede a llamar al subscribe
      )
      .subscribe( value => {
        this.onDebounce.emit( value );
      })
  }

  ngOnDestroy(): void {
    //Cerramos la suscripción cuando las suscripciones no son por medios http (get, put, post, remove)
    //Cuando se destruye el componente hacemos cerramos la suscripción
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue( value : string ) : void {
    this.onValue.emit( value );
  }

  onKeyPress( searchTerm : string ) {
    this.debouncer.next( searchTerm );

  }
}
