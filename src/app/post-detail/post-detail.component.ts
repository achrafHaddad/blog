import { Component, OnInit } from "@angular/core";
import { AllPostsService } from "../all-posts.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.css"]
})
export class PostDetailComponent implements OnInit {
  constructor(
    private allP: AllPostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  id;
  edit = false;
  token;
  posts;
  post;
  postGroup: FormGroup;
  delete() {
    this.allP.delete(this.id);
    this.router.navigate(["/home"]);
  }
  toEdit() {
    this.edit = !this.edit;
  }
  subEdit() {
    this.posts = this.allP.getPosts();
    this.post = this.postGroup.value;
    this.posts[this.id] = this.post;
    this.edit = !this.edit;
    localStorage.setItem("posts", JSON.stringify(this.posts));
  }
  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem("token"));
    this.id = this.route.snapshot.params["id"];

    this.post = this.allP.getPost(this.id);

    this.postGroup = new FormGroup({
      uid: new FormControl(this.post.uid),
      pid: new FormControl(this.post.pid),
      title: new FormControl(this.post.title),
      imageUrl: new FormControl(this.post.imageUrl),
      content: new FormControl(this.post.content),
      name: new FormControl(this.post.name),
      publishDate: new FormControl(this.post.publishDate)
    });
  }
}
