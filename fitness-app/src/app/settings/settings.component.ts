import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  darkMode: boolean = false;
  preferredUnit: string = 'Miles';
  fontSize: string = 'Normal';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.darkMode = this.themeService.isDarkMode();
    this.preferredUnit = localStorage.getItem('preferredUnit') || 'Miles';
    this.fontSize = localStorage.getItem('fontSize') || 'Normal';
    this.applyFontSize();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
    this.darkMode = this.themeService.isDarkMode();
  }

  savePreferences() {
    localStorage.setItem('preferredUnit', this.preferredUnit);
    localStorage.setItem('fontSize', this.fontSize);
    this.applyFontSize();
  }

  applyFontSize() {
    document.body.classList.remove('font-normal', 'font-large');
    document.body.classList.add(
      this.fontSize === 'Large' ? 'font-large' : 'font-normal'
    );
  }

  downloadData() {
    const confirmed = confirm(
      'Do you want to download your fitness data as a readable text file?'
    );
    if (!confirmed) return;

    const keys = {
      sleepData: 'Sleep Entries',
      weights: 'Weight Entries',
      distanceEntries: 'Distance Entries',
      nutritionEntries: 'Nutrition Entries',
      socialProfile: 'User Profile',
      friendsList: 'Friends List',
    };

    let output = '--- My Fitness App Data ---\n\n';

    for (const [key, label] of Object.entries(keys)) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        output += `=== ${label} ===\n`;

        try {
          const parsed = JSON.parse(value);

          if (Array.isArray(parsed)) {
            parsed.forEach((item, index) => {
              output += `• Entry ${index + 1}\n`;
              for (const [k, v] of Object.entries(item)) {
                output += `  ${this.formatKey(k)}: ${v}\n`;
              }
              output += `\n`;
            });
          } else if (typeof parsed === 'object') {
            for (const [k, v] of Object.entries(parsed)) {
              output += `${this.formatKey(k)}: ${v}\n`;
            }
            output += `\n`;
          } else {
            output += `${value}\n\n`;
          }
        } catch {
          output += `${value}\n\n`;
        }
      }
    }

    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'fitness-app-data.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  clearAllData() {
    const confirmed = confirm(
      'Are you sure you want to delete all your data? This cannot be undone.'
    );
    if (!confirmed) return;

    const keysToRemove = [
      'sleepData',
      'weights',
      'distanceEntries',
      'nutritionEntries',
      'socialProfile',
      'friendsList',
      'darkMode',
      'preferredUnit',
      'fontSize',
    ];

    for (const key of keysToRemove) {
      localStorage.removeItem(key);
    }

    location.reload();
  }

  private formatKey(key: string): string {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, (c) => c.toUpperCase());
  }
}
