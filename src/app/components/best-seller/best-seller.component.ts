import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../../models/prodotti';
import { NikeService } from '../../services/nike.service';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css']
})
export class BestSellerComponent implements OnInit {
  prodotti: Prodotto[] = [];
  prodotto?: Prodotto

  constructor(public ns: NikeService) { }

  ngOnInit(): void {

    this.ns.getProdotti().subscribe(
      p => {
        this.prodotti = p.filter(prodotto => prodotto.best_seller >= 4);//se fra i prodotti ricevuti la voce best seller e più grande
        //o uguale a 4 entra nella catgoria bestseller
        console.log('Prodotti best seller ricevuti:', this.prodotti);
      }
    );
  }

}
