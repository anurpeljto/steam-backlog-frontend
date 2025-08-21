import { Component, OnInit } from '@angular/core';
import { BadgeService } from '../../core/services/badge.service';
import { Badge } from '../../core/interfaces/badge.interface';

@Component({
  selector: 'app-badges',
  imports: [],
  templateUrl: './badges.html',
  styleUrl: './badges.scss'
})
export class Badges implements OnInit{
  badges: Badge[] = [];
  dataLoaded = false;
  topBadges = ['gifs/bronze-gif.gif', 'gifs/gold-gif.gif'];

  constructor(
    private badgeService: BadgeService
  ){}

  ngOnInit(): void {
      this.loadData();
  }

  loadData(){
    this.badgeService.getAllBadges().subscribe(sub => {
      this.badges = sub;
      this.dataLoaded = true;
    });
  }
}
