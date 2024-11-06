import { Component, OnInit } from '@angular/core';
import { NikeService } from '../../services/nike.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria, Prodotto } from '../../models/prodotti';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent implements OnInit {
  prodotti: Prodotto[] = [];
  categoria?: string;

  constructor(
    private route: ActivatedRoute,
    private ns: NikeService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoria = params.get('categoria') ?? ''
      this.loadProdottiByCategoria();
    });
  }
  /* recuperare il valore del parametro categoria dalla route (URL).
   Tuttavia, non sempre potrebbe essere presente. Se il parametro non esiste o è null, restituirà null.
   quindi viene assegnata una stringa vuota se è null
   */

  loadProdottiByCategoria(): void {
    this.ns.getProdottiByCategoria(this.categoria!).subscribe(
      prodotti => this.prodotti = prodotti
    );
    // quando la chiamata a getProdottiByCategoria() 
    //restituisce la lista dei prodotti, questi vengono memorizzati nella proprietà prodotti del componente corrente 
  }

}
