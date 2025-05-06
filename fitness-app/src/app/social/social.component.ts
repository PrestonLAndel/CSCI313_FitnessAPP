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
export class SocialComponent implements OnInit {
  name: string = '';
  bio: string = '';
  newFriend: string = '';
  friends: Friend[] = [];

  ngOnInit() {
    const savedProfile = localStorage.getItem('socialProfile');
    const savedFriends = localStorage.getItem('friendsList');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      this.name = profile.name;
      this.bio = profile.bio;
    }
    this.friends = savedFriends ? JSON.parse(savedFriends) : [];
  }

  saveProfile() {
    localStorage.setItem('socialProfile', JSON.stringify({ name: this.name, bio: this.bio }));
  }

  addFriend() {
    if (!this.newFriend.trim()) return;
    this.friends.push({ name: this.newFriend.trim() });
    this.newFriend = '';
    this.saveFriends();
  }

  deleteFriend(index: number) {
    this.friends.splice(index, 1);
    this.saveFriends();
  }

  saveFriends() {
    localStorage.setItem('friendsList', JSON.stringify(this.friends));
  }
}
