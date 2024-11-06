import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NikeService } from '../../services/nike.service';
import { CarrelloService } from '../../services/carrello.service';
import { Prodotto, ProdottoCarrello } from '../../models/prodotti';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-carello-mini',
  templateUrl: './carello-mini.component.html',
  styleUrl: './carello-mini.component.css'
})
export class CarelloMiniComponent implements OnInit {

  prodottiACarrello: ProdottoCarrello[] = [];
  totale: number = 0;

  constructor(public ns: NikeService, public cs: CarrelloService,public authService:AuthService) { }

  @Input() isVisible: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();//Può essere utilizzato per notificare al componente genitore che è avvenuto un evento,
  // come la chiusura di una finestra modale.

  ngOnInit(): void {
    this.prodottiACarrello = this.cs.getProdottiACarrello();
    this.getTotalPrice(); // Calcola il totale iniziale

    // Svuotamento del carrello
    this.cs.carrelloSvuotato.subscribe(() => {
      this.prodottiACarrello = [];
      this.totale = 0; // Imposta il totale a zero quando il carrello viene svuotato
    });
  }

  aggiornaQuantita(item: ProdottoCarrello) {
    const prodottoNelCarrello = this.prodottiACarrello.find(p =>
      p.prodotto.id === item.prodotto.id &&
      p.taglia === item.taglia &&
      p.colore === item.colore
    );

    if (prodottoNelCarrello) {
      prodottoNelCarrello.quantita = item.quantita;
      this.getTotalPrice(); // Ricalcola il totale
    }
  }

  aggiungiAlCarrello(nuovoItem: ProdottoCarrello) {
    nuovoItem.quantita = 1; // Imposta la quantità iniziale
    this.prodottiACarrello.push(nuovoItem); // Aggiungi il nuovo articolo
    this.getTotalPrice(); // Aggiorna il totale subito dopo aver aggiunto un prodotto
    console.log("Articoli nel carrello:", this.prodottiACarrello);
  }

  close() {
    this.isVisible = false;//si nasconde il componente
    this.closeModalEvent.emit();// Notifica il genitore che la modale è stata chiusa
  }

  rimuoviDalCarrello(item: ProdottoCarrello): void {
    // Se la quantità è maggiore di 1, riducila di 1
    if (item.quantita > 1) {
      item.quantita--;
      this.cs.aggiornaQuantita(item.prodotto.id, item.taglia ?? '', item.colore ?? '', item.quantita);
      // ho utilizzato l'operatore di coalescenza (??) per assicurarmi che venga passata una stringa vuota in caso di null.
    } else {
      // Se la quantità è 1, rimuovi l'articolo dal carrello
      const index = this.prodottiACarrello.indexOf(item);
      if (index !== -1) {
        this.cs.rimuoviDalCarrello(index);
      }
    }

    // Aggiorna il carrello e ricalcola il totale
    this.prodottiACarrello = this.cs.getProdottiACarrello();
    this.getTotalPrice();
  }


  getOptions(): number[] {
    return [1, 2, 3, 4, 5]; // Opzioni di quantità disponibili
  }

  // Funzione migliorata per calcolare il totale
  getTotalPrice(): number {
    this.totale = this.prodottiACarrello.reduce((total, item) =>
      total + item.prodotto.prezzo * item.quantita,
      0
    );

    return parseFloat(this.totale.toFixed(2)); // Restituisce il totale come numero con due decimali
  }

  /*reduce è un metodo degli array in JavaScript (e TypeScript) che applica una funzione di riduzione su ogni elemento dell'array, 
  accumulando un valore finale. In questo caso, la funzione di riduzione calcola il prezzo totale.
  item.prodotto.prezzo * item.quantita calcola il costo totale per l'articolo corrente.
 total + ... somma il costo dell'articolo corrente al totale accumulato.
  */
}
