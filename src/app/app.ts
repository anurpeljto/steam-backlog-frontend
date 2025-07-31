import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSteam } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  faSteam = faSteam;
  protected readonly title = signal('steam-backlog-frontend');

  ngOnInit(): void {
    document.body.classList.add('cursor-pointing');
    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-closed');
    });
    document.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-closed');
    });
  }
}
