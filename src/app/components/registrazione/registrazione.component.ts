import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent {
  successMessage: string | null = null;  // Variabile per il messaggio di successo
  errorMessage: string | null = null;    // Variabile per il messaggio di errore

  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const address = form.value.address;
    const phone = form.value.phone; 
    const email = form.value.email;
    const password = form.value.password;
   

    // Crea il corpo della richiesta
    const userData = {
      firstName,
      lastName,
      address,
      phone,
      email,
      password
    };

    // Chiama il metodo signUp dell'AuthService
    this.authService.signUp(userData)
      .subscribe(
        data => {
          console.log('Registrazione completata:', data);
          this.successMessage = 'Registrazione completata con successo!'; // Imposta il messaggio di successo
          form.reset(); // Resetta il modulo

          // Scomparire dopo 3 secondi
          setTimeout(() => {
            this.successMessage = null; // Nascondi il messaggio dopo 3 secondi
          }, 3000);
        },
        error => {
          console.error('Errore nella registrazione:', error);
          this.errorMessage = 'Errore nella registrazione: ' + (error.error.message || 'Si è verificato un errore imprevisto'); // Imposta il messaggio di errore

          // Scomparire dopo 3 secondi
          setTimeout(() => {
            this.errorMessage = null; // Nascondi il messaggio dopo 3 secondi
          }, 3000);
        }
      );
  }
}
