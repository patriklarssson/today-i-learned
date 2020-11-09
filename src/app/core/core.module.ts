import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';

import { PostFilterComponent } from './components/post-filter/post-filter.component';
import { PostCalendarComponent } from './components/post-calendar/post-calendar.component';
import { PostComponent } from './views/post/post.component';
import { NewPostComponent } from './views/new-post/new-post.component';

import { QuillModule } from 'ngx-quill'

import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolTipComponent } from './components/tool-tip/tool-tip.component';
import { EditPostComponent } from './views/edit-post/edit-post.component';

import { MatIconModule } from '@angular/material/icon';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './views/auth/login/login.component';
import { EditProfileComponent } from './views/profile/edit-profile/edit-profile.component';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PostPreviewComponent,
    PostFilterComponent,
    PostCalendarComponent,
    PostComponent,
    NewPostComponent,
    ToolTipComponent,
    EditPostComponent,
    LoginComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, 
    ReactiveFormsModule,
    QuillModule.forRoot(),
    TagInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ]
})
export class CoreModule { }
