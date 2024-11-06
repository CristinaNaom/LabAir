import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../../models/prodotti';
import { NikeService } from '../../services/nike.service';
import { ActivatedRoute } from '@angular/router';
import { CarrelloService } from '../../services/carrello.service';

@Component({
  selector: 'app-nuovi-arrivi',
  templateUrl: './nuovi-arrivi.component.html',
  styleUrl: './nuovi-arrivi.component.css'
})
export class NuoviArriviComponent implements OnInit {
  prodotti: Prodotto[] = [];
  nuovo_arrivi?: boolean;
  prodotto?: Prodotto

  constructor(public ns: NikeService, private route: ActivatedRoute, private cs: CarrelloService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.nuovo_arrivi = params.get('nuovo_arrivi') === 'true';//Recupera il parametro della route chiamato nuovo_arrivi. 
      //Questo parametro è una stringa, quindi viene confrontato con la stringa 'true' per determinare se nuovo_arrivi 
      //deve essere impostato su true o false.
      this.loadNuoviArrivi();// carica i nuovi arrivi in base al valore di nuovo_arrivi.
    });
  }

  loadNuoviArrivi(): void {//carica i nuovi arrivi e aggiornare l'array prodotti con i dati ottenuti.
    this.ns.getNuoviArrivi(this.nuovo_arrivi!).subscribe(p => {
      this.prodotti = p;
      console.log(this.prodotti);
    })
  }
}