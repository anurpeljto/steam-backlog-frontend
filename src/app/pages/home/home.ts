import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit{
  @ViewChild('sprite') sprite!: ElementRef<HTMLImageElement>;
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

  ngAfterViewInit(): void {
    let isJumping = false;

      this.sprite.nativeElement.addEventListener('click', () => {
        if(isJumping) return;
        isJumping = true;
        this.sprite.nativeElement.src='sprite-jump.gif';
        setTimeout(() => {
          this.sprite.nativeElement.src='idle.gif';
          isJumping = false;
        }, 1000)
      })
  }
}
