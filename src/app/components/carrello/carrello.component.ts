import { Component, OnInit } from '@angular/core';
import { Prodotto, ProdottoCarrello } from '../../models/prodotti';
import { CarrelloService } from '../../services/carrello.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css'
})
export class CarrelloComponent implements OnInit {
  totale: number = 0;
  spedizione: number = 0;
  prodottiACarrello: ProdottoCarrello[] = [];

  constructor(private cs: CarrelloService, private router: Router, public authService:AuthService) { }

  ngOnInit(): void {
    this.prodottiACarrello = this.cs.getProdottiACarrello();
    this.calcolaTotale();
    this.calcolaSpedizione();
  }

  calcolaTotale(): number {
    this.totale = this.prodottiACarrello.reduce((total, item) => total + item.prodotto.prezzo * item.quantita, 0);
    return this.totale;
  }

  calcolaSpedizione(): void {
    this.spedizione = this.totale > 150 ? 0 : 6.99;
  }

  rimuoviDaCarrello(item: ProdottoCarrello): void {
    // Se la quantità è maggiore di 1, riducila di 1
    if (item.quantita > 1) {
      item.quantita--;
      this.cs.aggiornaQuantita(item.prodotto.id, item.taglia ?? '', item.colore ?? '', item.quantita);
    } else {
      // Se la quantità è 1, rimuovi l'articolo dal carrello
      const index = this.prodottiACarrello.indexOf(item);
      if (index !== -1) {
        this.cs.rimuoviDalCarrello(index);
      }
    }

    // Aggiorna il carrello e ricalcola il totale e la spedizione
    this.prodottiACarrello = this.cs.getProdottiACarrello();
    this.calcolaTotale();
    this.calcolaSpedizione();
  }


  aggiornaQuantita(item: ProdottoCarrello): void {
    // Controlla se taglia e colore sono null e gestiscili di conseguenza
    const taglia = item.taglia ?? ''; // Usa una stringa vuota se taglia è null
    const colore = item.colore ?? ''; // Usa una stringa vuota se colore è null perchè se sono null, non verrebbe passato un valore di tipo string ma un valore null.
    // Molti metodi o API si aspettano una stringa come input,
    // quindi passare null potrebbe causare errori o comportamenti indesiderati. 

    this.cs.aggiornaQuantita(item.prodotto.id, taglia, colore, item.quantita);
    this.prodottiACarrello = this.cs.getProdottiACarrello();
    this.calcolaTotale();
    this.calcolaSpedizione();
  }

  getOptions(): number[] {
    return [1, 2, 3, 4, 5]; // Opzioni di quantità disponibili
  }

}
