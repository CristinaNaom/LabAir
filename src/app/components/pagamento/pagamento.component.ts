import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../../models/prodotti';
import { CarrelloService } from '../../services/carrello.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service'; // Importa AuthService

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {
  prodottiACarrello: { prodotto: Prodotto; taglia: string | null; colore: string | null; quantita: number }[] = [];
  totale: number = 0;
  spedizione: number = 0;
  pagaSuccesso: boolean = false;  // Variabile per indicare se il pagamento è avvenuto con successo
  pagamentoScelto: string = "";
  successMessage: string | null = null;  // Variabile per il messaggio di successo
  errorMessage: string | null = null;

  sessionId: string = '';
  cartItems: { nome: string; colore: string | null; taglia: string | null; prezzo: number; quantity: number; }[] = []

  // Aggiungi il costruttore per il servizio AuthService
  constructor(private cs: CarrelloService, private router: Router, private authService: AuthService) { }

  // Form pagamento con la carta
  frmPagamento = new FormGroup({
    numeroCarta: new FormControl('', [Validators.maxLength(16), Validators.required, Validators.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$')]),
    dataScadenza: new FormControl('', [Validators.maxLength(5), Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$')]),
    cvv: new FormControl('', [Validators.maxLength(3), Validators.required, Validators.pattern('^[0-9]{3,4}$')])
  });

  get numeroCarta() { return this.frmPagamento.get('numeroCarta'); }
  get dataScadenza() { return this.frmPagamento.get('dataScadenza'); }
  get cvv() { return this.frmPagamento.get('cvv'); }

  ngOnInit(): void {
    this.prodottiACarrello = this.cs.getProdottiACarrello();
    console.log('Prodotti nel carrello:', this.prodottiACarrello);
    this.totale = this.cs.getTotalePrezzo();
    this.calcolaSpedizione();
    if (this.prodottiACarrello.length === 0) {
      this.router.navigate(['/homepage']);
    }

    // Recupera il sessionId dal localStorage
    this.sessionId = localStorage.getItem('sessionId') || '';

    // Verifica che il sessionId sia valido
    if (!this.sessionId) {
      console.error('Sessione non trovata!');
      // Reindirizza l'utente alla pagina di login o mostra un messaggio
    }

    this.cartItems = this.prodottiACarrello.map(item => ({
      img: item.prodotto.immagine,
      nome: item.prodotto.nome,
      colore: item.colore,
      taglia: item.taglia,
      prezzo: item.prodotto.prezzo,
      quantity: item.quantita,
      totale: item.prodotto.prezzo * item.quantita,
    }));
  }



  calcolaSpedizione(): void {
    this.spedizione = this.totale > 150 ? 0 : 6.99;
  }

  scegliPagamento(scelta: string) {
    this.pagamentoScelto = scelta;
  }

  createOrder() {
    const userId = this.authService.user?.id; // Ottieni l'ID dell'utente

    if (userId) {
      // Passa userId e cartItems alla funzione createOrder
      this.authService.createOrder(this.cartItems, userId).subscribe(response => {
        alert('Ordine creato con successo!');
        console.log(response);

      }, error => {
        console.error('Errore durante la creazione dell\'ordine:', error);
        alert('Errore durante la creazione dell\'ordine.');
      });
    }
  }





}
