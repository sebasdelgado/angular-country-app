import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

const routes: Routes = [
  // {
  //   path : '',
  //   component : HomePageComponent
  // },
  // {
  //   path : 'about',
  //   component : AboutPageComponent
  // },
  // {
  //   path : 'contact',
  //   component : ContactPageComponent
  // },
  {
    path : 'countries',
    //Importamos el modulo de countries porque este ya tiene su propio routing, cuando se accesa
    //al path de countries angular y asabe que routing tiene este modulo para sus páginas internamente
    loadChildren : () => import('./countries/countries.module').then( m => m.CountriesModule )
  },
  {
    path : '**',
    redirectTo : 'countries' //Cualquier ruta que no se las atenteriores estipuladas se redireccionan a home
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
