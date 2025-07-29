import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { faSteam } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { interval, Subscription, switchMap } from 'rxjs';
import { Gamecard } from '../../shared/gamecard/gamecard';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { GameService } from '../../core/services/game.service';


type SteamJwtPayload = {
  steam_id: string;
  personaname: string;
  avatar: string;
  profileUrl: string;
  iat?: number;
  exp?: number;
};

@Component({
  selector: 'app-callback',
  imports: [FontAwesomeModule, Gamecard, MatPaginatorModule],
  templateUrl: './callback.html',
  styleUrl: './callback.scss'
})
export class Callback implements OnInit{
  @ViewChild('gamesList') gameListRef?: ElementRef;
  token: string = '';
  steam_id: string | undefined;
  avatar: string | undefined;
  personaname: string | undefined;
  profileUrl: string | undefined;
  profileUrlName: string | undefined = '';
  gameData: any = null;
  games: any = null;
  totalPages: number | null = null;
  total: number | null = null;
  page: number = 0;
  size: number = 50;
  genres: any | null = null;
  private pollSub?: Subscription;

  faSteam = faSteam;

  constructor(private route: ActivatedRoute, private http: HttpClient, private gameService: GameService) {
  }

  loadUserData() {
    const storageToken = localStorage.getItem('token');
    if (!storageToken) {
      const tokenFromUrl = this.route.snapshot.queryParamMap.get('token');
      if (!tokenFromUrl) {
        console.error('No token found in URL');
        return;
      }

      this.token = tokenFromUrl;
      localStorage.setItem('token', this.token);
    } else {
      this.token = storageToken;
    }

    try {
      const decoded = jwtDecode<SteamJwtPayload>(this.token);
      const { steam_id, avatar, personaname, profileUrl } = decoded;
      this.steam_id = steam_id;
      this.avatar = avatar;
      this.personaname = personaname;
      this.profileUrl = profileUrl;

      localStorage.setItem('steam_id', steam_id);
      localStorage.setItem('personaname', personaname);
      localStorage.setItem('profileUrl', profileUrl);
      localStorage.setItem('avatar', avatar);
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }

  ngOnInit(): void {
    this.loadUserData();
    this.getGenres();
    if (this.route.snapshot.queryParamMap.get('token')) {
      this.triggerSteamSync().then(() => this.startPolling()); 
    } else {
      this.loadGameDataFromDb(this.page, this.size);
      this.startPolling();
    }

    const split = this.profileUrl?.split('/');
    if (split) this.profileUrlName = split[split.length - 2];
  }

  async triggerSteamSync() {
  try {
      await this.gameService.triggerSteamSync(this.steam_id);
      console.log('Steam sync triggered');
    } catch (err) {
      console.error('Failed to sync with Steam', err);
    }
  }

  loadGameDataFromDb(page: number, size: number, filter?: string, genre?: string, category?: string) {
    const params = new URLSearchParams();

    params.set('page', page.toString());
    params.set('size', size.toString());

    if (filter) params.set('filter', filter);
    if (genre) params.set('genre', genre); 
    if (category) params.set('category', category);
    this.gameService.loadGameDataFromDB(this.steam_id, params)
      .subscribe({
        next: (data) => {
          this.gameData = data;
          this.games = data.games;
          this.totalPages = data.totalPages;
          this.total = data.total;
          console.log('Loaded from DB:', this.gameData);
        },
        error: (err) => console.error('Failed to load from DB', err)
      });
  }

  startPolling() {
    if (!this.steam_id) return;

    this.pollSub = interval(5000).pipe(
      switchMap(() => this.gameService.startPolling(this.steam_id, this.page, this.size))
    ).subscribe({
      next: (data) => {
        this.gameData = data;
        this.games = data.games;
        this.totalPages = data.totalPages;
        this.total = data.total;
        if (this.games.every((g: any) => !g.loadingMetadata)) {
          console.log('All metadata loaded, stopping polling.');
          this.pollSub?.unsubscribe();
        }
      },
      error: (err) => console.error('Polling failed', err)
    });
  }

  onChangePage(event: PageEvent){
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.page = pageIndex;
    this.size = pageSize;
    this.loadGameDataFromDb(pageIndex, pageSize);
    this.gameListRef?.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  filterNeverPlayed() {
    this.page = 0;
    this.size = 50;
    this.loadGameDataFromDb(this.page, this.size, "0");
  }

  filterLessThan3Hrs() {
    this.page = 0;
    this.size = 50;
    this.loadGameDataFromDb(this.page, this.size, "180");
  }

  getGenres(): void {
    this.gameService.fetchGenres(this.steam_id).subscribe(data => {
      this.genres = data.genres;
    })
  }

  queryByGenre(genre: string){
    this.page = 0;
    this.size = 50;
    return this.loadGameDataFromDb(this.page, this.size, undefined, genre);
  }

  queryByFilter(filter: number){
    this.page = 0;
    this.size = 50;
    return this.loadGameDataFromDb(this.page, this.size, String(filter), undefined);
  }

  queryByCategory(category: string) {
    this.page = 0;
    this.size = 50;
    return this.loadGameDataFromDb(this.page, this.size, undefined, undefined, category);
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe(); 
  }
}