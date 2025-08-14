import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Screenshot } from '../../core/interfaces/screenshot.interface';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-gallery',
  imports: [FaIconComponent],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  @Input('images') images: Screenshot[] = [];
  @Output('clickedEmitter') eventEmitter: EventEmitter<any> = new EventEmitter();
  @ViewChild('scrollRow', { read: ElementRef }) scrollRow!: ElementRef;
  faLeft = faArrowLeft;
  faRight = faArrowRight;

  setHightlight(image: Screenshot){
    this.eventEmitter.emit(image);
  }

  scrollLeft(){
    this.scrollRow.nativeElement.scrollBy({ left: -300, behavior: 'smooth'});
  }

  scrollRight(){
    this.scrollRow.nativeElement.scrollBy({ left: 300, behavior: 'smooth'});
  }
}
