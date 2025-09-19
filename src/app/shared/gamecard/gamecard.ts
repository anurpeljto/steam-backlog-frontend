import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faCheck, faBan, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameService } from '../../core/services/game.service';
import { gsap } from 'gsap';
import { BadgeService } from '../../core/services/badge.service';

@Component({
  selector: 'app-gamecard',
  imports: [FaIconComponent, MatTooltipModule, CommonModule],
  templateUrl: './gamecard.html',
  styleUrl: './gamecard.scss'
})
export class Gamecard implements AfterViewInit{
  @ViewChildren('tag') tags!: QueryList<ElementRef>;
  @Input() game: any;
  @Input() action?: (genre: string) => void;
  @Input() category?: (category: string) => void;
  @Input() playing: boolean = false;
  @Output('changeEmitter') changeEmitter: EventEmitter<Boolean> = new EventEmitter<Boolean>;
  faCheck = faCheck;
  faBan = faBan;
  faGamepad = faGamepad;
  steam_id: string | null = null;

  constructor(
    private router: Router,
    private gameService: GameService,
    private snackBar: MatSnackBar,
    private el: ElementRef,
    private badgesService: BadgeService
  ){
    this.steam_id = localStorage.getItem('steam_id');
  }

  ngAfterViewInit(): void {
    this.tags.changes.subscribe(() => {
        this.animateTags();
      });
      this.animateTags();
  }

  animateTags() {
    const tags = this.el.nativeElement.querySelectorAll('.tag');
    tags.forEach((tag: HTMLElement) => {
      tag.onmouseenter = null;
      tag.onmouseleave = null;

      tag.addEventListener('mouseenter', () => {
        gsap.to(tag, { scale: 1.1, duration: 0.2, rotate: '-2.5deg' });
      });
      tag.addEventListener('mouseleave', () => {
        gsap.to(tag, { scale: 1, duration: 0.2, rotate: '0deg' });
      });
    });
  }

  toggleExpanded() {
    this.game.expanded = !this.game.expanded;

    setTimeout(() => this.animateTags(), 0);
  }

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

  selectGame(appid: number, event: any) {
    event.stopPropagation();
    if(!this.steam_id) return;
    this.badgesService.markGameSelected(this.steam_id, appid).subscribe(() => {
      this.snackBar.open('Congratulations! Game successfully selected', 'OK', {
        duration: 5000
      });
    });
  }
}
