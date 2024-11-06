import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;  // Variabile per memorizzare i dati dell'utente
  ordini: any[] = []; // Array per memorizzare gli ordini
  userId: string = '' // Variabile per memorizzare la sessione corrente

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    // Controllo se l'utente è autenticato
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      this.user = JSON.parse(storedUser);  // Recupera l'utente dal localStorage
    } else {
      // Se l'utente non è loggato, reindirizza alla pagina di login
      this.router.navigate(['/login']);
    }
    console.log(localStorage.getItem('user'))
    this.loadOrders(); // Carica gli ordini

  } 
  loadOrders(): void {
    const userId = this.authService.user?.id; // Recupera l'ID dell'utente dall'AuthService
    if (userId) {
      this.authService.getOrders(Number(userId)).subscribe(response => {
        this.ordini = response; // Salva gli ordini nella variabile
        console.log('Ordini recuperati:', this.ordini);
      }, error => {
        console.error('Errore nel recupero degli ordini:', error);
        alert('Errore nel recupero degli ordini.');
      });
    } else {
      console.error('ID utente non trovato.');
      alert('Errore: ID utente non trovato. Effettua il login nuovamente.');
    }
  }

  onLogout() {
    // Effettua il logout, rimuove l'utente dal localStorage e reindirizza al login
    this.authService.logout();  // Metodo nel service per gestire il logout
    this.router.navigate(['/login']);  // Reindirizza al login
  }
}
