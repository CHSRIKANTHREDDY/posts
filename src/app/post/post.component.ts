import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  public posts = [];
  public comment = '';
  public apicalled = false;
  constructor(
    public commonService: CommonService,
    public apiService: ApiService
  ) {}

  ngOnInit(): void {}

  public commenttext(value) {
    this.comment = value;
  }
  public commentsSubmit(post, index) {
    console.log('asasdfsadfsg', this.comment);
    if (this.comment && !this.apicalled) {
      this.apicalled = true;
      this.apiService
        .addComments({
          comment: this.comment,
          postId: post._id,
          userId: this.commonService.userDetails._id,
        })
        .subscribe((res) => {
          if (res) {
            this.commonService.userDetails.postLists[index].commentId.push({
              comment: this.comment,
              userId: {
                ...this.commonService.userDetails,
              },
            });
          }
          this.apicalled = true;
        });
    }
  }
  public deleteComments(id, index) {
    this.apiService.deleteComments(id).subscribe((res) => {
      if (res) {
        this.commonService.userDetails.postLists[index].commentId.splice(
          index,
          1
        );
      }
    });
  }
}
