import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.capitalizeFirstLetter(
        this.router.url.split('/')[1]
      );
    });
  }

  capitalizeFirstLetter(route: string): string {
    if (!route) return '';
    return route.charAt(0).toUpperCase() + route.slice(1);
  }
}
