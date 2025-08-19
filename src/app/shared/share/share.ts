import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faClose, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGoogle, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { MatIconButton } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-share',
  imports: [FaIconComponent, MatIconButton, MatTooltipModule],
  templateUrl: './share.html',
  styleUrl: './share.scss',
  encapsulation: ViewEncapsulation.None
})
export class Share {
  @Input('visible') visible: boolean = false;
  @Output('visibilityEmitter') visibilityEmitter: EventEmitter<boolean> = new EventEmitter<boolean>;
  faClose = faClose;
  faPaperclip = faPaperclip;
  faTwitter = faTwitter;
  faGoogle = faGoogle;
  faWhatsapp = faWhatsapp;

  close(){
    this.visibilityEmitter.emit(true);
  }
}
