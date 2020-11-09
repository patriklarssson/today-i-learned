import { Component, Input, OnInit } from '@angular/core';
import { DateTimeHelperService } from '../../helpers/date-time-helper.service';
import { Post } from '../../interfaces/post';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {

  @Input() postsList: Post[]

  constructor(
    private dateTimeSecvice: DateTimeHelperService,
    public authService: AuthService 
    ) { }

  ngOnInit(): void {
  }

  cleanBody(body) {
    return body.replace(/<[^>]*>/g, '')
  }

  getDate(date: any) {
    return this.dateTimeSecvice.toYYYYMMDD(date.toDate())
  }



}
