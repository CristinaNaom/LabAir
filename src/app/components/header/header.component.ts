import { Component, OnInit } from '@angular/core';
import { NikeService } from '../../services/nike.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria, Prodotto } from '../../models/prodotti';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  categorie: Categoria[] = [];
  prodotti: Prodotto[] = [];
  isModalVisible: boolean = false;
  isDropdownDonnaOpen = false;
  isDropdownUomoOpen = false;
  isDropdownKidsOpen = false;
  prodotti$: Observable<Prodotto[]> | undefined;/*prodotti$ rappresenta uno stream asincrono (o un flusso di dati) che contiene un array di oggetti di tipo Prodotto.
  /Ogni volta che nuovi dati relativi ai prodotti vengono ricevuti, questo stream li fornisce.
  In RxJS e in Angular, il simbolo $ viene utilizzato per indicare che una variabile è un Observable o uno stream di dati. 
  Questa convenzione aiuta a distinguere chiaramente 
  le variabili che rappresentano dati asincroni o flussi di dati da altre variabili che contengono dati sincroni o valori immediati.*/
  searchControl = new FormControl();


  constructor(private ns: NikeService, private router: Router, private route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit(): void {
    this.ns.getCategorie().subscribe(categorie => {
      this.categorie = categorie;
    });

    this.prodotti$ = this.searchControl.valueChanges.pipe( //una pipeline è una serie di operatori applicati a un Observable.
      //che trasformano, filtrano, o combinano i dati emessi da un Observable
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(nome => nome ? this.ns.getProdottiByNome(nome) : of([]))
    );
    /* valueChanges: Ogni volta che l'input cambia, viene emesso un nuovo valore.
      debounceTime(300): Introduce un ritardo di 300 millisecondi per evitare aggiornamenti troppo frequenti.
      distinctUntilChanged(): Evita di elaborare valori identici consecutivi.
      switchMap(): Cambia il flusso dei dati a seconda del valore dell'input:

       Se l'input non è vuoto, recupera i prodotti corrispondenti dal servizio.
       Se l'input è vuoto, restituisce un array vuoto.*/
  }

  openModal() {
    this.isModalVisible = true;
  }

  handleCloseModal() {
    this.isModalVisible = false;
  }
}
