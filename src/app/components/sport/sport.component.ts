import { Component, OnInit } from '@angular/core';
import { Categoria, Prodotto } from '../../models/prodotti';
import { NikeService } from '../../services/nike.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrl: './sport.component.css'
})
export class SportComponent implements OnInit {
  categorie: Categoria[] = [];

  constructor(private ns: NikeService, private router: Router) { }

  ngOnInit(): void {
    this.ns.getCategorie().subscribe(categorie => {
      this.categorie = categorie;
    });
  }
}
