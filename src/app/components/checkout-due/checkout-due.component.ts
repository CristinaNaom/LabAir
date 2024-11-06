import { Component, OnInit } from '@angular/core';
import { CarrelloService } from '../../services/carrello.service';
import { CarelloMiniComponent } from '../carello-mini/carello-mini.component';

@Component({
  selector: 'app-checkout-due',
  templateUrl: './checkout-due.component.html',
  styleUrl: './checkout-due.component.css'
})
export class CheckoutDueComponent implements OnInit{

  constructor(private cs:CarrelloService) { }
  ngOnInit(): void {
   this.cs.svuotaCarrello();
  }

}
