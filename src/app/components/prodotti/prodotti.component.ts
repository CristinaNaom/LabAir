import { Component, OnInit } from '@angular/core';
import { Categoria, Prodotto } from '../../models/prodotti';
import { NikeService } from '../../services/nike.service';
import { ActivatedRoute } from '@angular/router'; //ActivatedRoute viene utilizzato per accedere ai parametri di routing,
// utili per capire su quale rotta si trova l'utente o per ottenere parametri dalla URL

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css'
})
export class ProdottiComponent implements OnInit {
  prodotto?: Prodotto;
  colori: string[] = [];
  prodotti: Prodotto[] = [];
  prodottiFiltrati: Prodotto[] = [];
  categorie: Categoria[] = [];

  primaFascia: Prodotto[] = [];
  secondaFascia: Prodotto[] = [];
  terzaFascia: Prodotto[] = [];
  quartaFascia: Prodotto[] = [];

  constructor(public ns: NikeService, private route: ActivatedRoute) { }
  ngOnInit(): void {

    this.ns.getCategorie().subscribe(categorie => {
      this.categorie = categorie;
    });
    this.ns.getColori().subscribe(colori => {
      this.colori = colori;
    });

    this.ns.getProdotti().subscribe(prodotti => {
      this.prodotti = prodotti;
      this.prodottiFiltrati = prodotti;
      this.fasciePrezzi();
      /* I prodotti vengono memorizzati in this.prodotti e inizialmente copiati in this.prodottiFiltrati
      (che serve per la visualizzazione filtrata)
       fasciePrezzi(): suddivido i prodotti nelle quattro fasce di prezzo.*/
    })


  }
  filtraPerCategorie(categoria: string) {
    if (categoria) {
      this.prodottiFiltrati = this.prodotti.filter(prodotto =>
        prodotto.categoria === categoria /* se esiste una categoria dei prodotti uguale alla catgoria selezionata,
         mostra i prodotti che ne fanno parte  */
      );
    } else {
      // Se non c'è una categoria selezionata, mostra tutti i prodotti
      this.prodottiFiltrati = this.prodotti;
    }
  }
  filtraPerColore(colore: string) {
    if (colore) {
      this.prodottiFiltrati = this.prodotti.filter(prodotto =>
        prodotto.colori_disponibili.includes(colore) //se nei prodotti nei colori disponibili esiste un colore
        // come quello selezionato,mi mostra i prodotii che hanno quel colore
      );
    } else {
      // Se non c'è un colore selezionato, mostra tutti i prodotti
      this.prodottiFiltrati = this.prodotti;
    }
  }

  fasciePrezzi() {
    this.prodotti.forEach(prodotto => {//scorre ogni elemento dell'array e permette di eseguire una funzione su ciascun elemento.
      if (prodotto.prezzo < 50) {
        this.primaFascia.push(prodotto);
      }
      else if (prodotto.prezzo >= 50 && prodotto.prezzo < 100) {
        this.secondaFascia.push(prodotto);
      }
      else if (prodotto.prezzo >= 100 && prodotto.prezzo < 150) {
        this.terzaFascia.push(prodotto);
      }
      else if (prodotto.prezzo >= 150) {
        this.quartaFascia.push(prodotto);
      }
      else {
        this.prodottiFiltrati = this.prodotti;
      }
    })
  }
  filtraPerPrezzo(fascia: string) {
    switch (fascia) {
      case 'inferioreA50':
        this.prodottiFiltrati = this.primaFascia;
        break;
      case 'tra50e100':
        this.prodottiFiltrati = this.secondaFascia;
        break;
      case 'tra100e150':
        this.prodottiFiltrati = this.terzaFascia;
        break;
      case 'maggioreDi150':
        this.prodottiFiltrati = this.quartaFascia;
        break;
      default:
        this.prodottiFiltrati = this.prodotti;
    }
  }

}
