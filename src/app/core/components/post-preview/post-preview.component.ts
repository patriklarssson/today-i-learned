import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {

  @Input() postsList: Post[]

  constructor() { }

  ngOnInit(): void {
  }

}
