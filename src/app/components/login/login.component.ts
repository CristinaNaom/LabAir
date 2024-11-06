import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string | null = null; // Variabile per gestire messaggi di errore

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      // Recupera l'utente dal localStorage e imposta lo stato di autenticazione
      this.authService.user = JSON.parse(user);
      this.authService.isLoggedIn = true; // Imposta a true se l'utente è logato
    }
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signIn(email, password).subscribe(
      (data: any) => {
        const expirationDate = new Date(new Date().getTime() + 15 * 60 * 1000); // 15 minuti di validità
        this.authService.createUser(
          data.user.firstName, data.user.lastName, data.user.address, data.user.phone, data.user.email, data.user.id, data.accessToken, expirationDate
        );
        localStorage.setItem('user', JSON.stringify(this.authService.user));

        // Reindirizza alla dashboard dopo il login
        this.router.navigate(['/dashboard']);
      },
      error => {
        // Gestisci eventuali errori di login
        console.error('Errore nel login:', error);
        this.errorMessage = 'Login fallito!'
      }
    );
    form.reset();
  }
}
