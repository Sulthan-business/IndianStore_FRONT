import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// Keep RouterOutlet in the import list from @angular/router
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'; 
import { LoginFormComponent } from "./shared/shared/ui/login-form/login-form.component";
import { CartSummaryComponent } from './shared/ui/cart-summary/cart-summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    RouterOutlet, // 👈 CRITICAL FIX: Include RouterOutlet here
    LoginFormComponent,
    CartSummaryComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'drop_front';
}