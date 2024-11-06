import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {

  @Input() sliderId!: string;
  @Input() images: string[] = [];//Questo array sarà usato per memorizzare gli URL delle immagini da visualizzare nello slider.

  imageChunks: string[][] = [];//Una proprietà per memorizzare gli array di immagini suddivisi in blocchi (chunks).
  // Utilizzerà il metodo chunk per creare questi blocchi.

  constructor() {
    this.updateImageChunks();//chiamo il metodo updateImageChunks per inizializzare imageChunks
    window.addEventListener('resize', () => this.updateImageChunks()); // Ricalcola i chunk quando la finestra viene ridimensionata
  }

  ngOnInit(): void {
    this.imageChunks = this.chunk(this.images, 3);// suddivido in blocchi di 3 immagini.
  }

  chunk(arr: any[], chunkSize: number): any[][] {//suddivido un array (arr) in blocchi di dimensione chunkSize.
    //: any[][]: Il tipo di ritorno è un array di array (any[][]).
    // Ogni elemento di questo array principale è un sotto-array (chunk).
    const chunks = [];//verrà utilizzato per memorizzare i blocchi di array creati.
    for (let i = 0; i < arr.length; i += chunkSize) {//: Un ciclo for che itera su arr, con i che parte da 0 e aumenta 
      //di chunkSize ad ogni iterazione.
      //Il ciclo continua fino a quando i è minore della lunghezza dell'array arr.
      chunks.push(arr.slice(i, i + chunkSize));/*    slice(start, end):  estrae una sezione dell'array da start (inclusivo) a
       end (esclusivo). Crea un nuovo array con gli elementi estratti.
      i: L'indice di inizio del chunk corrente.
      i + chunkSize: L'indice di fine del chunk corrente. Questo valore è esclusivo, 
      quindi il chunk conterrà elementi dall'indice i fino a i + chunkSize - 1.
       chunks.push(...): Aggiunge il sotto-array ottenuto con slice all'array chunks. */
    }
    return chunks;//Restituisce l'array chunks che contiene tutti i blocchi creati.
  }
  updateImageChunks() {
    this.imageChunks = this.chunk(this.images, this.isMobileDevice() ? 1 : 3);//Se isMobileDevice() restituisce true (dispositivo mobile),
    // i blocchi saranno di 1 immagine; altrimenti, saranno di 3 immagini.
  }

  isMobileDevice(): boolean {
    return window.matchMedia("(max-width: 768px)").matches;
  }
}
