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
  imageArray: { src: string, name: string }[] = [];
  videoArray: File[] = [];
  isButtonDisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<NewPostPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) { }

  // Function to get the authentication token
  private getAuthToken(): string {
    // You may have logic to retrieve the token from storage or another source
    return 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3MDQ4ODk3Njd9.Csgy9xFHrFyPNHYb97Q0Zsc6Hu47_uJN6-EKk2zv_Xk'; // Replace with your actual access token
  }

  onSubmit(): void {
    const postBody = {
      post: {
        title: this.recipeTitle,
        ingredients: this.ingredients,
        instructions: this.steps,
        cooking_time: this.cookingTime,
        servings: this.servings,
        images: this.imageArray.map((image) => image.src), // Extracting only the image sources
        videos: this.videoArray.map((video) => video.name) // Extracting only the video names or paths
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
          } else {
            console.error('Unexpected response:', response);
            // Handle unexpected response here
          }
        },
        error: (err: any) => {
          if (err.status == 201) {
            console.log('Post created successfully:', err);
            this.dialogRef.close();
          } else {
            console.error('Error creating post:', err);
          }
          // Handle error here
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (_event) => {
          if (reader.result) {
            const imageObject = {
              src: reader.result as string,
              name: files[i].name // Save the image name in the object
            };
            this.imageArray.push(imageObject);
          }
        };
      }
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
      this.cookingTime !== 0 &&
      this.servings !== 0
    ) {
      this.isButtonDisabled = false; // Enable the button
    } else {
      this.isButtonDisabled = true; // Disable the button
    }
  }
}
