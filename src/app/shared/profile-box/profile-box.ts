import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSteam } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-profile-box',
  imports: [FontAwesomeModule],
  templateUrl: './profile-box.html',
  styleUrl: './profile-box.scss'
})
export class ProfileBox {
  @Input('buttonsVisible') buttonsVisible: boolean = true;
  @Input('edit') edit: boolean = false;
  avatar: string | null;
  personaname: string | null;
  profileUrl: string | null;
  profileUrlName: string | null = '';
  faSteam = faSteam;

  constructor(){
    this.personaname = localStorage.getItem('personaname');
    this.profileUrl = localStorage.getItem('profileUrl');
    this.avatar = localStorage.getItem('avatar');
    this.profileUrlName = localStorage.getItem('profileUrl')
  }
}
