import { Component, OnInit } from "@angular/core";
import { AllPostsService } from "../all-posts.service";
import { SubService } from "../sub.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private allP: AllPostsService, private sub: SubService) {
    this.posts = this.allP.getPosts();
    this.users = this.sub.getSub();
  }

  posts: any[] = [];
  users: any[] = [];

  ngOnInit(): void {}
}
