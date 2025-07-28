import { Component, Input } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-gamecard',
  imports: [FaIconComponent, MatTooltipModule],
  templateUrl: './gamecard.html',
  styleUrl: './gamecard.scss'
})
export class Gamecard {
  @Input() game: any;
  faCheck = faCheck;
  faBan = faBan;
}
