import { Component, Input, OnInit, HostListener } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from '../../interfaces/post';
import { AuthService } from '../../services/auth/auth.service';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-tool-tip',
  templateUrl: './tool-tip.component.html',
  styleUrls: ['./tool-tip.component.scss']
})
export class ToolTipComponent implements OnInit {

  @Input() post: Post
  userUID: string
  isAdmin: boolean

  constructor(
    public postsService: PostsService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if(user)
      this.userUID = user.uid      
    })
    this.authService.isAdmin.subscribe((x) => {
      this.isAdmin = x
    })
  }

  displayTooltip = false

  @HostListener('document:mousedown', ['$event.target'])
  clickout(event: HTMLElement) {
    if (event.classList[0] == "tooltiptext" || event.classList[0] == "action") { }
    else
      this.displayTooltip = false
  }

  adminOrOwner(): boolean {
    if (this.isAdmin || this.userUID == this.post.createdByUserUID)
      return true
    return false
  }

  toggle() {
    this.displayTooltip = !this.displayTooltip
  }

  deletePost(): void {
    this.postsService.deletePost(this.post.id)
  }

}
