import { NgModule } from '@angular/core';
import { CanActivate, Router, RouterModule, Routes } from '@angular/router';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { NuoviArriviComponent } from './components/nuovi-arrivi/nuovi-arrivi.component';
import { SportComponent } from './components/sport/sport.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { ProdottoDetailComponent } from './components/prodotto-detail/prodotto-detail.component';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutUnoComponent } from './components/checkout-uno/checkout-uno.component';
import { CheckoutDueComponent } from './components/checkout-due/checkout-due.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { PagamentoComponent } from './components/pagamento/pagamento.component';

const routes: Routes = [
  { path: '',pathMatch:'full', redirectTo:'/homepage'},
  { path: 'homepage', component: HomePageComponent },
  { path: 'prodottiTot', component: ProdottiComponent},
  { path: 'prodottiCat/:categoria', component: CategorieComponent },
  { path: 'nuoviArrivi', component: NuoviArriviComponent },
  { path: 'tuttiSport', component: SportComponent },
  { path: 'bestSeller', component: BestSellerComponent },
  { path: 'prodottoDetail/:id', component: ProdottoDetailComponent },
  { path: 'carrello', component: CarrelloComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'pagamento', component: PagamentoComponent },
  { path: 'consegna', component: CheckoutUnoComponent },
  { path: 'concluso', component: CheckoutDueComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  { path: '**', redirectTo: '/' }  // Rotta di fallback (redirect alla home)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
