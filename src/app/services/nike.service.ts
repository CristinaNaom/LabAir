import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';//operatore di RxJS usato per trasformare i dati di un Observable.
import { Categoria, Prodotto } from '../models/prodotti';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NikeService {

  constructor(private http: HttpClient, private authService: AuthService) { } // il costruttore accetta un'istanza di HttpClient tramite dependency injection, 
  //che viene utilizzata per effettuare richieste HTTP.

  prodottiACarrello: Prodotto[] = [];

  getProdotti(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(`${environment.apiUrl}/prodotti`);
  }

  getCategorie(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${environment.apiUrl}/categorie`);
  }

  getProdottiByCategoria(categoria: string): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(`${environment.apiUrl}/prodotti`).pipe(
      map((prodotti: Prodotto[]) => prodotti.filter(prodotto => prodotto.categoria === categoria))
    );
    /*Filtra i prodotti ricevuti dall'API in base alla categoria specificata. 
    Utilizza l'operatore map per trasformare la risposta e il metodo filter per restituire solo i prodotti della categoria richiesta. */
  }

  getProdottiById(id: number): Observable<Prodotto> {
    return this.http.get<Prodotto>(`${environment.apiUrl}/prodotti/` + id);
  }
  getNuoviArrivi(nuovo_arrivi: boolean): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(`${environment.apiUrl}/prodotti`).pipe(
      map((prodotti: Prodotto[]) => prodotti.filter(prodotto => prodotto.nuovo_arrivi === nuovo_arrivi))
    );
    /*Filtra i prodotti per il campo nuovo_arrivi. Se nuovo_arrivi è true, restituisce solo i nuovi arrivi. */
  }


  getBestSeller(best_seller: number): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(`${environment.apiUrl}/prodotti`).pipe(
      map((prodotti: Prodotto[]) => {
        console.log('Prodotti ricevuti dal server:', prodotti); // Log dei prodotti ricevuti
        return prodotti.filter(prodotto => prodotto.best_seller >= 4);
      })
    );
    /*Filtra i prodotti in base alla loro valutazione di best seller. 
     Restituisce solo i prodotti che hanno una valutazione best_seller maggiore o uguale a 4. */
  }
  getProdottiByNome(nome: string): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(`${environment.apiUrl}/prodotti`).pipe(
      map((prodotti: Prodotto[]) =>
        prodotti.filter(prodotto => prodotto.nome.toLowerCase().includes(nome.toLowerCase()))
      )
    );
    /*Cerca i prodotti in base al nome. Utilizza il metodo includes() per controllare 
    se il nome del prodotto contiene la stringa di ricerca (ignorando le differenze tra maiuscole e minuscole). */
  }
  getColori(): Observable<string[]> {
    return this.getProdotti().pipe(
      map(prodotti =>
        Array.from(new Set(prodotti.flatMap(prodotto => prodotto.colori_disponibili)))
      )
    );
    /*Viene richiamato il metodo getProdotti(), che a sua volta restituisce un Observable<Prodotto[]>
     map(): trasforma i dati emessi dall'Observable.In questo caso, prende l'array di Prodotto[] e lo trasforma in un array di colori.
     Ogni prodotto ha un array di colori disponibili (colore_disponibili). Con flatMap(), 
     tutti i colori disponibili per tutti i prodotti vengono uniti in un unico array.
     Set: è una struttura dati JavaScript che memorizza solo valori unici. Viene utilizzato per eliminare i duplicati dal risultato.
     Array.from(): trasforma un Set di valori unici nuovamente in un array.  */
  }
  getProdottiByColore(colore: string): Observable<Prodotto[]> {
    return this.getProdotti().pipe(
      map(prodotti =>
        prodotti.filter(prodotto => prodotto.colori_disponibili.includes(colore))
      )
    );
    /*Filtra i prodotti in base al colore specificato. 
    Controlla se il colore è presente nell'array colori_disponibili di ciascun prodotto. */
  }
  getProdottiByPrezzo(prezzo: number): Observable<Prodotto[]> {
    return this.getProdotti().pipe(map(prodotti => prodotti.filter(prodotto => prodotto.prezzo === prezzo)))
  }
  /*Filtra i prodotti che hanno un prezzo esattamente uguale a quello fornito. */

  getDashboard() {
    return this.http.get(`${environment.apiUrl}?auth=${this.authService.user}`)
  }
}

