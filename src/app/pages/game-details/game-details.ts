import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import MetaData from '../../core/interfaces/metadata.interface';
import { GameService } from '../../core/services/game.service';
import { Gallery } from '../../shared/gallery/gallery';

@Component({
  selector: 'app-game-details',
  imports: [Gallery],
  templateUrl: './game-details.html',
  styleUrl: './game-details.scss'
})
export class GameDetails implements OnInit{
  highlightedMedia: string | null = null;
  appid: string | null = null;
  gameData: MetaData | null = null;
  media: string | null = null;
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
      this.media = sub.metadata.header_image;
      this.highlightedMedia = this.media;
      this.calculatePercentage();
    })
  }

  ngOnInit(): void {
    this.getData();
  }

  calculatePercentage(){
    this.completionPercentage = ((this.userGameData.playtime_minutes / 60) / this.gameData?.hltb_main_story! ) * 100;
  }

  setHighlight(image: string) {
    console.log(image);
    this.highlightedMedia = image;
  }
}
