import { EventEmitter, Injectable } from '@angular/core';/*EventEmitter: è una classe di Angular che permette di emettere eventi 
a cui altre parti dell'applicazione possono "iscriversi" (subscribe). In questo caso è utilizzata per notificare quando il carrello 
viene svuotato.
Injectable: decoratore che indica che la classe può essere iniettata in altri componenti o servizi di Angular tramite
 dependency injection. */
import { Prodotto } from '../models/prodotti';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  carrello: { prodotto: Prodotto; taglia: string | null; colore: string | null; quantita: number }[] = [];

  /*array che memorizza gli oggetti del carrello. Ogni elemento dell'array rappresenta un prodotto con:
  quantita: la quantità del prodotto.
  prodotto: un oggetto di tipo Prodotto, che rappresenta le informazioni del prodotto.
  taglia: la taglia selezionata per il prodotto (può essere null se non applicabile).
  colore: il colore selezionato (può essere null). */
  carrelloSvuotato = new EventEmitter<void>();/*un EventEmitter che emette un evento quando il carrello viene svuotato.
   È di tipo void, quindi non emette dati, ma solo la notifica. */
  constructor() { }

  //aggiungo un prodotto al carrello
  aggiungiAlCarrello(prodotto: Prodotto, taglia: string | null, colore: string | null,): void {
    this.carrello.push({
      prodotto,
      taglia,
      colore,
      quantita: 1 // Inizializza la quantità a 1
      /* aggiungo l'oggetto prodotto con le informazioni di taglia, colore e quantità. */
    });
  }

  //ottengo tutti i prodotti nel carrello
  getProdottiACarrello() {
    return this.carrello;// restituisce l'array dei prodotti attualmente presenti nel carrello.
  }


  //rimuovo un prodotto dal carrello
  rimuoviDalCarrello(indice: number): void {
    this.carrello.splice(indice, 1);/*rimuove l'elemento all'indice dato.
    Il numero 1 è usato perché si vuole rimuovere solo un prodotto alla volta dal carrello
    array.splice(startIndex, deleteCount);*/
  }

  //calcola e restituisce il prezzo totale di tutti i prodotti nel carrello
  getTotalePrezzo(): number {
    return this.carrello.reduce((totale, item) => totale + item.prodotto.prezzo, 0);
    /*Uso il metodo reduce() per sommare il prezzo di ciascun prodotto.
     Ad ogni iterazione, somma il prezzo del prodotto corrente al totale.
    La funzione si basa sul campo prezzo presente nell'oggetto Prodotto. */
  }

  svuotaCarrello(): void {
    this.carrello = [];//imposto l'array carrello come un array vuoto.
    this.carrelloSvuotato.emit();//utile per notificare altre parti dell'applicazione che il carrello è stato svuotato.
  }

  //aggiorna la quantità di un prodotto specifico nel carrello

  aggiornaQuantita(id: number, taglia: string, colore: string, quantita: number): void {

    const prodotto = this.carrello.find(p =>
      p.prodotto.id === id &&
      p.taglia === taglia &&
      p.colore === colore
    );

    if (prodotto) {
      prodotto.quantita = quantita;
    }
  }
  /*Cerca il prodotto nel carrello confrontando id, taglia, e colore con i valori forniti. 
  Utilizza il metodo find() per trovare il primo elemento che corrisponde.
  Se il prodotto viene trovato, la sua quantità viene aggiornata al valore fornito (quantita). */

}


