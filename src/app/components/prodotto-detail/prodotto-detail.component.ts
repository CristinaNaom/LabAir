import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../../models/prodotti';
import { NikeService } from '../../services/nike.service';
import { ActivatedRoute } from '@angular/router';
import { CarrelloService } from '../../services/carrello.service';

@Component({
  selector: 'app-prodotto-detail',
  templateUrl: './prodotto-detail.component.html',
  styleUrl: './prodotto-detail.component.css'
})
export class ProdottoDetailComponent implements OnInit {
  prodotto?: Prodotto;
  prodotti: Prodotto[] = [];
  isModalVisible: boolean = false;
  coloriDisponibili: string[] = [];
  coloreSelezionato: string = "";
  taglieDisponibili: string[] = [];
  tagliaSelezionata: string | null = null;//All'inizio è impostata a null, suggerendo che inizialmente non è stata selezionata alcuna taglia.
  constructor(public ns: NikeService, private route: ActivatedRoute, private cs: CarrelloService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ns.getProdottiById(+id!).subscribe(p => {
      this.prodotto = p;
      this.coloriDisponibili = this.prodotto.colori_disponibili;//la scelta del colori fra i colori disponibili
      this.taglieDisponibili = this.prodotto.taglie_disponibili;//la scelta delle taglie fra quelle disponibili
    })
  }

  selezionaTaglia(taglia: string): void {
    this.tagliaSelezionata = taglia;
  }

  selezionaColore(event: Event): void {
    const target = event.target as HTMLSelectElement;
    //event.target si riferisce all'elemento che ha scatenato l'evento -> l'elemento <select>
    /*In TypeScript, stiamo "castando" (as HTMLSelectElement) l'oggetto event.target per specificare
     che si tratta di un elemento di tipo <select> (che è un HTMLSelectElement nel DOM).
    Questo permette a TypeScript di sapere che target è un <select>, dandoci accesso alle proprietà 
    pecifiche di questo tipo di elemento, come value.*/
    this.coloreSelezionato = target.value;
  }

  openModal() {
    this.isModalVisible = true;
  }

  handleCloseModal() {
    this.isModalVisible = false;//indica che la modale viene nascosta o chiusa.
    this.tagliaSelezionata = "";//qualsiasi selezione di taglia e colore fatta dall'utente viene azzerata o cancellata.
    this.coloreSelezionato = "";
  }

  addToCart() {
    //controlli per assicurarsi che l'utente abbia selezionato sia 
    //una taglia che un colore prima di procedere con l'aggiunta del prodotto al carrello
    if (this.tagliaSelezionata && this.coloreSelezionato) {//verifica se sia la taglia (this.tagliaSelezionata) 
      //                                                     sia il colore (this.coloreSelezionato) sono stati selezionati.

      this.cs.aggiungiAlCarrello(this.prodotto!, this.tagliaSelezionata, this.coloreSelezionato);//aggiungo al carrello il prodotto 
      //                                                                                 con la taglia ed il colore selezionato
      this.isModalVisible = true;
    }

    else if (!!this.tagliaSelezionata) {
      alert('Seleziona un colore')
    }
    else if (!!this.coloreSelezionato) {
      alert('Seleziona una taglia')
    }

    else {
      alert('Seleziona una taglia ed un colore prima di aggiungere al carrello')
    }
  }
}




