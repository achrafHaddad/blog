import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AllPostsService } from "../all-posts.service";
import { SubService } from "../sub.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.css"]
})
export class NewPostComponent implements OnInit {
  constructor(
    private allP: AllPostsService,
    private sub: SubService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  users = this.sub.getSub();
  returnUrl: string;
  posts: any = [];

  postGroup = new FormGroup({
    title: new FormControl("", Validators.required),
    imageUrl: new FormControl("", Validators.required),
    content: new FormControl("", Validators.required)
  });

  submit() {
    let date = new Date();
    let token = JSON.parse(localStorage.getItem("token"));
    if (this.postGroup.valid && token) {
      let user = this.users.find(u => u.name == token.name);
      let post = {
        title: this.postGroup.value.title,
        content: this.postGroup.value.content,
        imageUrl: this.postGroup.value.imageUrl,
        publishDate: date,
        uid: user.uid,
        name: user.name
      };

      this.posts = this.allP.setPost(post);
      this.router.navigate([this.returnUrl]);

      this.postGroup.reset();
    }
  }

  ngOnInit(): void {
    this.returnUrl = "/";
  }
}
