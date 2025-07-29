import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  scrolled: boolean = false;

  constructor(
    private router: Router
  ){
    const token = localStorage.getItem('token');
    if(token && this.router.url === '/'){
      this.router.navigate(['/dashboard']);
    }
  }

  @HostListener('window:scroll', [])
  handleScroll(){
    this.scrolled = window.scrollY > 15;
  }

  signIn(){
    window.location.href = 'http://localhost:3000/auth/steam';
  }
}
