import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-new-post-pop-up',
  templateUrl: './new-post-pop-up.component.html',
  styleUrls: ['./new-post-pop-up.component.css']
})
export class NewPostPopUpComponent {
  recipeTitle: string = '';
  ingredients: string = '';
  steps: string = '';
  cookingTime: number = 0;
  servings: number = 0;
  imageArray: File[] = [];
  videoArray: File[] = [];
  isButtonDisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<NewPostPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) { }

  private getAuthToken(): string | null  {
        console.log(localStorage.getItem('token'));
        return localStorage.getItem('token');
  }

  onSubmit(): void {
    const postBody = {
      post: {
        title: this.recipeTitle,
        ingredients: this.ingredients,
        instructions: this.steps,
        cooking_time: this.cookingTime,
        servings: this.servings,
        images: this.imageArray.map((image) => image.name), 
        videos: this.videoArray.map((video) => video.name) 
      }
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`
    });

    // Make the HTTP POST request
    this.http.post('http://localhost:3000/api/posts', postBody, { headers })
      .subscribe({
        next: (response: any) => {
          if (response) {
            console.log('Post created successfully:', response);
            this.dialogRef.close();
          }
        },
        error: (err: any) => {
          if (err.status === 201) {
            console.log('Post created successfully:', err);
            this.dialogRef.close();
          } else {
            console.error('Error creating post:', err);
          }
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onImageSelected(event: any): void {
    const files: FileList = event.target.files;

    if (files && files.length > 0) {
      this.imageArray.push(files[0]);
    }
  }

  removeImage(index: number): void {
    this.imageArray.splice(index, 1);
  }

  onVideoSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.videoArray.push(file);
      }
    }
  }

  removeVideo(index: number): void {
    this.videoArray.splice(index, 1);
  }

  checkCompletion(): void {
    if (
      this.recipeTitle.trim() !== '' &&
      this.ingredients.trim() !== '' &&
      this.steps.trim() !== '' &&
      this.cookingTime > 0 &&
      this.servings > 0 &&
      this.cookingTime.toString() !== '' &&
      this.servings.toString() !== ''
    ) {
      this.isButtonDisabled = false; // Enable the button
    } else {
      this.isButtonDisabled = true; // Disable the button
    }
  }
}
