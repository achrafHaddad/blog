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
  post;
  postGroup: FormGroup;
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];

    this.post = this.allP.getPost(this.id);

    this.postGroup = new FormGroup({
      title: new FormControl(this.post.title),
      imageUrl: new FormControl(this.post.imageUrl),
      content: new FormControl(this.post.content),
      name: new FormControl(this.post.name),
      publishDate: new FormControl(this.post.publishDate)
    });
  }
}
