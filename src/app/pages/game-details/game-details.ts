import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import MetaData from '../../core/interfaces/metadata.interface';
import { GameService } from '../../core/services/game.service';
import { Gallery } from '../../shared/gallery/gallery';
import { Screenshot } from '../../core/interfaces/screenshot.interface';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-game-details',
  imports: [Gallery, MatProgressBarModule],
  templateUrl: './game-details.html',
  styleUrl: './game-details.scss'
})
export class GameDetails implements OnInit{
  highlightedMedia: string | null = null;
  appid: string | null = null;
  gameData: MetaData | null = null;
  media: Screenshot[] = [];
  steamid: string | null = null;
  userGameData: any;
  completionPercentage: number | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
  ) {
    this.appid = this.activatedRoute.snapshot.paramMap.get('id');
    this.steamid = localStorage.getItem('steam_id');
  }

  getData(){
    this.gameService.getGameMetadata(this.appid, this.steamid ? this.steamid : undefined).subscribe(sub => {
      this.gameData = sub.metadata;
      this.userGameData = sub.userData;
      this.media = sub.metadata.screenshots;
      this.highlightedMedia = sub.metadata.header_image;
      this.calculatePercentage();
    })
  }

  ngOnInit(): void {
    this.getData();
    window.scrollTo(0, 0);
  }

  calculatePercentage(){
    this.completionPercentage = ((this.userGameData.playtime_minutes / 60) / this.gameData?.hltb_main_story! ) * 100;
    return this.completionPercentage;
  }

  setHighlight(image: Screenshot) {
    console.log(image);
    this.highlightedMedia = image.path_full;
  }

}
