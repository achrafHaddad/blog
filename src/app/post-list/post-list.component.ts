import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AllPostsService } from "../all-posts.service";
import { Post } from "../post";
import { SubService } from "../sub.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
  constructor(private allP: AllPostsService, private sub: SubService) {
    this.posts = this.allP.getPosts();
  }

  posts: any[] = [];
  filteredPosts: any[] = [];
  token = JSON.parse(localStorage.getItem("token"));

  ngOnInit(): void {
    this.filteredPosts = this.posts.filter(p => p.uid == this.token.uid);
  }
}
