import { Component, OnInit } from '@angular/core';
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
export class ProfileIcon implements OnInit{
  imgUrl: string = '';
  isMenuOpen: boolean = false;

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
    const url = localStorage.getItem('avatar');
    if(!url){
      this.imgUrl = 'steam-button.png'
    } else {
      this.imgUrl = url;
    }
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }
}
