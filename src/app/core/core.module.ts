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

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PostPreviewComponent,
    PostFilterComponent,
    PostCalendarComponent,
    PostComponent,
    NewPostComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,

  ]
})
export class CoreModule { }
