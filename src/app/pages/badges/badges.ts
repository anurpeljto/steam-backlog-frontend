import { Component, OnInit } from '@angular/core';
import { BadgeService } from '../../core/services/badge.service';
import { Badge } from '../../core/interfaces/badge.interface';
import { forkJoin, of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Lenis from 'lenis';

@Component({
  selector: 'app-badges',
  imports: [MatProgressSpinnerModule],
  templateUrl: './badges.html',
  styleUrl: './badges.scss'
})
export class Badges implements OnInit{
  badges: Badge[] = [];
  dataLoaded = false;
  topBadges = ['gifs/bronze-gif.gif', 'gifs/gold-gif.gif'];
  usersBadges: Badge[] = [];
  steam_id: string | null = null;
  nextBadge: any = null;

  constructor(
    private badgeService: BadgeService
  ){}

  ngOnInit(): void {
    this.steam_id = localStorage.getItem('steam_id');
      this.loadData();
  }

  loadData() {
    const observables = [
      this.badgeService.getAllBadges(),
    ];

    if (this.steam_id) {
      observables.push(this.badgeService.getUserBadges(this.steam_id));
      observables.push(this.badgeService.getProgressToNextBadge(this.steam_id));
    } else {
      observables.push(of([])); 
    }

    forkJoin(observables).subscribe(([allBadges, userBadges, nextBadge]) => {
      this.badges = allBadges;
      this.nextBadge = nextBadge;
      this.usersBadges = userBadges;
      this.dataLoaded = true;
    });
  }
}
