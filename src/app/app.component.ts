import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'seconda-prova';

  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.autoLogin(); // Verifica l'utente al caricamento dell'app
  }
}
