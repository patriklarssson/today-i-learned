import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Post } from '../../interfaces/post';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-tool-tip',
  templateUrl: './tool-tip.component.html',
  styleUrls: ['./tool-tip.component.scss']
})
export class ToolTipComponent implements OnInit {

  @Input() key: string

  constructor(
    public postsService: PostsService
  ) { }

  ngOnInit(): void {
  }

  displayTooltip = false

  @HostListener('document:mousedown', ['$event.target'])
  clickout(event: HTMLElement) {
    
    if(event.classList[0] == "tooltiptext" || event.classList[0] == "action")
    {}
    else
      this.displayTooltip = false
 }


  toggle() {    
    this.displayTooltip = !this.displayTooltip
  }

  deletePost(): void {    
    this.postsService.deletePost(this.key)
  }

}
