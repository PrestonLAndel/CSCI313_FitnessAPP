import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  darkMode: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.darkMode = this.themeService.isDarkMode();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
    this.darkMode = this.themeService.isDarkMode();
  }
}
