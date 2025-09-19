import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-icon',
  imports: [FaIconComponent],
  templateUrl: './profile-icon.html',
  styleUrl: './profile-icon.scss'
})
export class ProfileIcon implements OnInit, OnDestroy{
  imgUrl: string = '';
  isMenuOpen: boolean = false;
  invisible = false;
  private storageListener = (event: StorageEvent) => {
    if (event.key === 'avatar') {
      this.updateAvatar(event.newValue);
    }
  };

  faUser = faUser;
  faHandsHelping = faFlag;
  faIdBadge = faCertificate;
  faUserFriends = faUserFriends;
  faRankingStar = faRankingStar;
  faSignOut = faSignOut;

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    this.updateAvatar(localStorage.getItem('avatar'));
    window.addEventListener('storage', this.storageListener);
  }

  private updateAvatar(url: string | null) {
    this.imgUrl = url ? url : 'steam-button.png';
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  logOut() {
    localStorage.clear();
    window.location.href = '';
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageListener);
  }
}
