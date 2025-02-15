import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private countryService : CountriesService
  ) {}

  ngOnInit(): void {
      this.activatedRoute.params
        .pipe(
          //switchMap devuelve un nuevo observable
          switchMap( ({ id }) => this.countryService.searchCountryByAlphaCode( id ))
        )//Ahora estamos suscritos al resultado del switchMap
        .subscribe( country => {

          if ( !country ) return this.router.navigateByUrl('');
          return this.country = country;

        });
  }
}
