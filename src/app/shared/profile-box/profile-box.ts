import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSteam } from '@fortawesome/free-brands-svg-icons';
import { UserService } from '../../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Share } from "../share/share";


@Component({
  selector: 'app-profile-box',
  imports: [FontAwesomeModule, FormsModule, Share],
  templateUrl: './profile-box.html',
  styleUrl: './profile-box.scss'
})
export class ProfileBox implements OnInit{
  @Input('buttonsVisible') buttonsVisible: boolean = true;
  @Input('edit') edit: boolean = false;
  avatar: string | null = '';
  personaname: string | null = '';
  profileUrl: string | null = '';
  profileUrlName: string | null = '';
  faSteam = faSteam;
  description: string | null = '';
  steam_id: string | null = '';
  visible: boolean = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ){
  }

  ngOnInit(): void {
      this.personaname = localStorage.getItem('personaname');
      this.profileUrl = localStorage.getItem('profileUrl');
      this.avatar = localStorage.getItem('avatar');
      this.profileUrlName = localStorage.getItem('profileUrl')
      this.steam_id = localStorage.getItem('steam_id');
      this.getDescription();
  }

  getDescription(){
    if(!this.steam_id){
      return
    }

    this.userService.getUser(this.steam_id).subscribe((data) => {
      this.description = data.description;
    });
  }

  updateDescription() {
    if(!this.description){
      return;
    }
    this.userService.updateDescription(this.description).subscribe(() => {
      this.snackBar.open('Successfully updated profile', 'OK', {
        duration: 5000
      });
      window.location.reload();
    })
  }

  goToEdit(){
    this.router.navigate(['profile']);
  }

  toggleShareDialog(){
    this.visible = !this.visible;
    document.body.classList.add('no-scroll');
    if(!this.visible){
      document.body.classList.remove('no-scroll')
    }
  }
}
