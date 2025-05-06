import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Friend {
  name: string;
}

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})

export class SocialComponent {
  name: string = 'John Doe';
  bio: string = 'This is my bio.';
  newFriend: string = '';
  friends: any[] = [];
  isEditing: boolean = false;  // To toggle between Edit and View mode

  editProfile() {
    this.isEditing = true;
  }

  saveProfile() {
    // Logic to save the profile (e.g., save to local storage, API, etc.)
    console.log('Profile saved:', this.name, this.bio);
    this.isEditing = false;
  }

  addFriend() {
    if (this.newFriend) {
      this.friends.push({ name: this.newFriend });
      this.newFriend = '';  // Clear the input after adding
    }
  }

  deleteFriend(index: number) {
    this.friends.splice(index, 1);
  }
}
