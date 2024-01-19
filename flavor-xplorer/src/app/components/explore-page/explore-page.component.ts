import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments';
import { Post } from 'src/app/models/post.interface';
import { PostServiceComponent } from 'src/app/services/post-service/post-service.component';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit{
  postList : Post[];

  constructor(private postService : PostServiceComponent,
    private http: HttpClient
    ) {}

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

  receivePostIdAndSaveToBookmarks(postId: number) {
    console.log(postId);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    this.http.post(environment.baseUrl + `/posts/${postId}/bookmark`, null, { headers })
      .subscribe({
        next: (response: any) => {
          if (response) {
            console.log('Post added to bookmarks successfully:', response);
          }
        },
        error: (err: any) => {
          if (err.status === 201) {
            console.log('Post added to bookmarks successfully:', err);
          } else {
            console.error('Error adding post:', err);
          }
        },
      });
  }
}
