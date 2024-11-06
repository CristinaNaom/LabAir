import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SliderComponent } from './components/slider/slider.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { NuoviArriviComponent } from './components/nuovi-arrivi/nuovi-arrivi.component';
import { SportComponent } from './components/sport/sport.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { CarelloMiniComponent } from './components/carello-mini/carello-mini.component';
import { ProdottoDetailComponent } from './components/prodotto-detail/prodotto-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutUnoComponent } from './components/checkout-uno/checkout-uno.component';
import { CheckoutDueComponent } from './components/checkout-due/checkout-due.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagamentoComponent } from './components/pagamento/pagamento.component';



@NgModule({
  declarations: [
    AppComponent,
    ProdottiComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    SliderComponent,
    CategorieComponent,
    NuoviArriviComponent,
    SportComponent,
    BestSellerComponent,
    CarelloMiniComponent,
    ProdottoDetailComponent,
    CarrelloComponent,
    CheckoutComponent,
    CheckoutUnoComponent,
    CheckoutDueComponent,
    RegistrazioneComponent,
    LoginComponent,
    DashboardComponent,
    PagamentoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
