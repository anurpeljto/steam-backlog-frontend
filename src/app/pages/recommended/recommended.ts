import { Component, OnInit } from '@angular/core';
import { GameService } from '../../core/services/game.service';
import { Gamecard } from '../../shared/gamecard/gamecard';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormField, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-recommended',
  imports: [Gamecard, MatPaginatorModule, MatSelectModule, MatFormField],
  templateUrl: './recommended.html',
  styleUrl: './recommended.scss'
})
export class Recommended implements OnInit{
  games: any[] = [];
  token: string | null = null;
  amount = 10;
  options: number[] = [10, 20, 30, 40, 50, 75, 100];
  steam_id: string | null = null;

  constructor(
    private gameService: GameService
  ){
      this.steam_id = localStorage.getItem('steam_id')!;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(!this.token){
      alert('User is not logged in, please log in');
      window.location.href='/'
    };

    try {
      this.gameService.fetchRecommended(this.steam_id!, this.amount).subscribe(sub => {
        this.games = sub;
      });
    } catch (error){
      console.error(error);
    }
  }

  fetchGames(amount: number) {
    this.gameService.fetchRecommended(this.steam_id!, this.amount).subscribe(sub => {
      this.games = sub;
    });
  }
}
