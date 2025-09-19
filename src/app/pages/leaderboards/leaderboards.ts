import { Component, OnInit } from '@angular/core';
import { BadgeService } from '../../core/services/badge.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-leaderboards',
  imports: [MatProgressSpinner, MatTooltip],
  templateUrl: './leaderboards.html',
  styleUrl: './leaderboards.scss'
})
export class Leaderboards implements OnInit{
  streaks: any[] | null = null;
  page: number = 0;

  constructor(
    private badgesService: BadgeService,
  ){}

  ngOnInit(): void {
    this.badgesService.getLeaderboards(this.page).subscribe(sub => {
      this.streaks = sub;
    })
  }

  goToSteam(event: any){
    window.open(`http://steamcommunity.com/profiles/${event}`, 'blank');
  }
}
