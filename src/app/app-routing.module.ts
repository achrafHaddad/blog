import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostListComponent } from "./post-list/post-list.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AllPostsService } from "./all-posts.service";
import { NewPostComponent } from "./new-post/new-post.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "postList", component: PostListComponent },
  { path: "newPost", component: NewPostComponent },
  { path: "post/:id", component: PostDetailComponent },
  { path: "post-detail", component: PostDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AllPostsService],
  exports: [RouterModule]
})
export class AppRoutingModule {}
