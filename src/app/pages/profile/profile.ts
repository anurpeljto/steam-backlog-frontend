import { Component } from '@angular/core';
import { ProfileBox } from "../../shared/profile-box/profile-box";

@Component({
  selector: 'app-profile',
  imports: [ProfileBox],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {

}
