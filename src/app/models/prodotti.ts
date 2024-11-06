export interface Prodotto {
  id: number;
  nome: string;
  categoria: string;
  prezzo: number;
  taglie_disponibili: string[];
  colori_disponibili: string[];
  descrizione: string;
  immagine: string;
  nuovo_arrivi: boolean;
  best_seller: number;
}

export interface Categoria {
  categoria: string
  title: string
}
export interface ProdottoCarrello {
  prodotto: Prodotto
  taglia: string | null;
  colore: string | null;
  quantita: number;
}
