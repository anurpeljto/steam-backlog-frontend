import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { faSteam } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { interval, Subscription, switchMap } from 'rxjs';
import { Gamecard } from '../../shared/gamecard/gamecard';


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
  imports: [FontAwesomeModule, HttpClientModule, Gamecard],
  templateUrl: './callback.html',
  styleUrl: './callback.scss'
})
export class Callback implements OnInit{
  token: string = '';
  steam_id: string | undefined;
  avatar: string | undefined;
  personaname: string | undefined;
  profileUrl: string | undefined;
  profileUrlName: string | undefined = '';
  gameData: any = null;
  private pollSub?: Subscription;

  faSteam = faSteam;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
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
    if (this.route.snapshot.queryParamMap.get('token')) {
      this.triggerSteamSync().then(() => this.startPolling()); 
    } else {
      this.loadGameDataFromDb();
      this.startPolling();
    }

    const split = this.profileUrl?.split('/');
    if (split) this.profileUrlName = split[split.length - 2];
  }

  async triggerSteamSync() {
  try {
      await axios.get(`http://localhost:3000/user-search/games/${this.steam_id}`);
      console.log('Steam sync triggered');
    } catch (err) {
      console.error('Failed to sync with Steam', err);
    }
  }

  loadGameDataFromDb() {
    this.http.get<any[]>(`http://localhost:3000/user-search/games/${this.steam_id}/metadata`)
      .subscribe({
        next: (data) => {
          this.gameData = data;
          console.log('Loaded from DB:', this.gameData);
        },
        error: (err) => console.error('Failed to load from DB', err)
      });
  }

  startPolling() {
    if (!this.steam_id) return;

    this.pollSub = interval(5000).pipe(
      switchMap(() => this.http.get<any[]>(`http://localhost:3000/user-search/games/${this.steam_id}/metadata`))
    ).subscribe({
      next: (data) => {
        this.gameData = data;
        if (data.every(g => !g.loadingMetadata)) {
          console.log('All metadata loaded, stopping polling.');
          this.pollSub?.unsubscribe();
        }
      },
      error: (err) => console.error('Polling failed', err)
    });
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe(); 
  }
}
