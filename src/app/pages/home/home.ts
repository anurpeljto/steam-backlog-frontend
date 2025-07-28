import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  scrolled: boolean = false;

  @HostListener('window:scroll', [])
  handleScroll(){
    this.scrolled = window.scrollY > 15;
  }

  signIn(){
    window.location.href = 'http://localhost:3000/auth/steam';
  }
}
