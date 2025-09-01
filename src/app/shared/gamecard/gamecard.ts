import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameService } from '../../core/services/game.service';


@Component({
  selector: 'app-gamecard',
  imports: [FaIconComponent, MatTooltipModule, CommonModule],
  templateUrl: './gamecard.html',
  styleUrl: './gamecard.scss'
})
export class Gamecard {
  @Input() game: any;
  @Input() action?: (genre: string) => void;
  @Input() category?: (category: string) => void;
  @Output('changeEmitter') changeEmitter: EventEmitter<Boolean> = new EventEmitter<Boolean>;
  faCheck = faCheck;
  faBan = faBan;

  constructor(
    private router: Router,
    private gameService: GameService,
    private snackBar: MatSnackBar
  ){}

  goToDetails(){
    this.router.navigate(['/game', this.game.appid]);
  }

  markCompleted(genre: number, event: MouseEvent){
    event.stopPropagation();
    this.gameService.markCompleted(genre).subscribe(() => {
      this.changeEmitter.emit(true);
      this.snackBar.open('Successfully marked game completed', 'OK', {
        duration: 5000
      });
    })
  }

  markNotCompleted(genre: number, event: MouseEvent){
    event.stopPropagation();
    this.changeEmitter.emit(true);
    this.gameService.markNotCompleted(genre).subscribe(() => {
      this.snackBar.open('Successfully marked game not-completed', 'OK', {
        duration: 5000
      });
    })
  }
}
