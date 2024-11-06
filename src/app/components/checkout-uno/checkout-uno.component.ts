import { Component } from '@angular/core';
import { CarrelloService } from '../../services/carrello.service';
import { Prodotto } from '../../models/prodotti';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-uno',
  templateUrl: './checkout-uno.component.html',
  styleUrls: ['./checkout-uno.component.css']
})
export class CheckoutUnoComponent {
  prodottiACarrello: { prodotto: Prodotto; taglia: string | null; colore: string | null; }[] = [];
  totale: number = 0;
  spedizione: number = 0;
  isVisibile: boolean = false;
  datiForm: any;

  constructor(private cs: CarrelloService, private router: Router) { }

  // Form per le info di consegna
  frmConsegna = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cognome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    indirizzo: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.pattern('^\\+?\\d{10,15}$')])
  });

  get nome() { return this.frmConsegna.get('nome'); }
  get cognome() { return this.frmConsegna.get('cognome'); }
  get indirizzo() { return this.frmConsegna.get('indirizzo'); }
  get email() { return this.frmConsegna.get('email'); }
  get telefono() { return this.frmConsegna.get('telefono'); }

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
    this.totale = this.cs.getTotalePrezzo();
    this.calcolaSpedizione();
    if (this.prodottiACarrello.length === 0) {
      this.router.navigate(['/homepage']);
    }
  }

  calcolaSpedizione(): void {
    this.spedizione = this.totale > 150 ? 0 : 6.99;
  }

  onSubmit() {
    this.isVisibile = true;
    this.datiForm = this.frmConsegna.value;
  }

  
}
