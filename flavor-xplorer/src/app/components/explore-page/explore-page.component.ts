import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { PostServiceComponent } from 'src/app/services/post-service/post-service.component';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit{
  postList : any;

  constructor(private postService : PostServiceComponent) {}

  ngOnInit(): void {
    this.postService
      .getExploreFeed()
      .then(response => {
        this.postList = response
        console.log("Explore posts: ", this.postList)
      })
      .catch(error => {
        console.error('Error fetching posts:', error)
      });
  }

  reload() : void {
    window.location.reload();
  }
  
  searchText:string = '';

  onSearchTextEntered(searchValue:string){
    this.searchText = searchValue;
  }
}
