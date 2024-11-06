import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlRegister = 'http://localhost:3000/register';
  urlLogin = 'http://localhost:3000/login';
  urlLogout = 'http://localhost:3000/logout';
  urlUserData = 'http://localhost:3000/user';
  urlOrders = 'http://localhost:3000/orders';
  isLoggedIn = false;
  user: User | null = null;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  getSessionId(): string {
    return localStorage.getItem('sessionId') || '';
  }

  // Metodo per la registrazione
  signUp(body: { email: string; password: string; firstName: string; lastName: string; address: string, phone: number }) {
    return this.http.post(this.urlRegister, body);
  }

  // Metodo per il login
  signIn(email: string, password: string) {
    return this.http.post<{ sessionId: string, user: User }>(this.urlLogin, { email, password }).pipe(
      tap((data) => {
        const expirationDate = new Date(new Date().getTime() + 15 * 60 * 1000); // 15 minuti di scadenza
        this.createUser(
          data.user.firstName, data.user.lastName, data.user.address, data.user.phone,
          data.user.email, data.user.id, data.sessionId, expirationDate
        );

        this.autoLogout(15 * 60 * 1000); // Imposta il logout automatico dopo 15 minuti

        localStorage.setItem('user', JSON.stringify(this.user)); // Salva l'utente nel localStorage

        // Salva separatamente anche il sessionId nel localStorage
        localStorage.setItem('sessionId', data.sessionId);

        this.isLoggedIn = true;
      })
    );
  }

  // Metodo per creare un oggetto utente
  createUser(
    firstName: string,
    lastName: string,
    address: string,
    phone: number,
    email: string,
    id: string,
    token: string,
    expirationDate: Date
  ) {
    this.user = new User(email, id, token, expirationDate, firstName, lastName, address, phone);
  }

  // Metodo per eseguire il login automatico all'avvio dell'app
  autoLogin() {
    const userData = localStorage.getItem('user');
    if (!userData) {
      return;
    }

    const parsedUser = JSON.parse(userData);
    const expirationDate = new Date(parsedUser._expirationDate);

    // Ricrea l'utente se il token non è scaduto
    if (expirationDate > new Date()) {
      this.user = new User(
        parsedUser.email, parsedUser.id, parsedUser._token, expirationDate,
        parsedUser.firstName, parsedUser.lastName, parsedUser.address, parsedUser.phone
      );
      this.isLoggedIn = true;
      this.autoLogout(expirationDate.getTime() - new Date().getTime()); // Logout automatico quando il token scade
    } else {
      this.logout(); // Se il token è scaduto, esegui il logout
    }
  }

  // Logout automatico alla scadenza del token
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // Metodo per il logout
  logout() {
    localStorage.removeItem('user'); // Rimuovi i dati dell'utente da localStorage
    this.isLoggedIn = false; // Disconnette l'utente
    this.user = null; // Resetta l'oggetto user
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer); // Ferma il timer di auto-logout
    }
    this.router.navigate(['/login']); // Reindirizza al login dopo il logout
  }

  // Metodo per verificare se l'utente è autenticato
  isAuthenticated() {
    return this.isLoggedIn;
  }

  createOrder(cartItems: any[], userId: string): Observable<any> {
    return this.http.post(this.urlOrders, {
      userId: userId,     // Invia l'ID dell'utente
      cartItems: cartItems // Invia gli articoli del carrello
    });
  }

  getOrders(userId: number): Observable<any> {
    return this.http.get(`${this.urlOrders}?userId=${userId}`);
  }

}
