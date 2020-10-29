import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component'
import { AboutComponent } from './views/about/about.component'
import { PostComponent } from './views/post/post.component';
import { NewPostComponent } from './views/new-post/new-post.component';
import { EditPostComponent } from './views/edit-post/edit-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'post', component: PostComponent },
  { path: 'newpost', component: NewPostComponent },
  { path: 'editpost', component: EditPostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
