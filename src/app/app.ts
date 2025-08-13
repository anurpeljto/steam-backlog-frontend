import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSteam } from '@fortawesome/free-brands-svg-icons';
import { filter, Subscription } from 'rxjs';
import { ProfileIcon } from "./shared/profile-icon/profile-icon";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule, RouterModule, ProfileIcon],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  faSteam = faSteam;
  protected readonly title = signal('steam-backlog-frontend');
  isHome: boolean = false;
  private routerSub!: Subscription;

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHome = event.urlAfterRedirects === '/' || event.url === '';
      });
    document.body.classList.add('cursor-pointing');
    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-closed');
    });
    document.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-closed');
    });
  }
}
