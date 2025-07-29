import { Component, Input } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gamecard',
  imports: [FaIconComponent, MatTooltipModule, CommonModule],
  templateUrl: './gamecard.html',
  styleUrl: './gamecard.scss'
})
export class Gamecard {
  @Input() game: any;
  @Input() action!: (genre: string) => void;
  faCheck = faCheck;
  faBan = faBan;
}
