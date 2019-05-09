import {Component, OnInit} from '@angular/core';
import {TranscriptService} from '../../../../Services/Transcript/transcript.service';
import {CurrentUserService} from '../../../../Services/Users/CurrentUser/current-user.service';
import {UserInfo} from '../../../../Models/User/userinfo';

@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss']
})
export class TranscriptComponent implements OnInit {
  transcript = [];
  overallGPA;
  user: UserInfo;

  constructor(private transcriptService: TranscriptService,
              private currentUserService: CurrentUserService) {
  }

  ngOnInit() {
    this.getTranscript();
  }

  getTranscript() {
    this.currentUserService.getCurrentUser().then(user => {
      if (!user) {
        return;
      }
      this.user = user;
      this.transcriptService.getTranscript(user.id).subscribe(result => {
        this.transcript = result;

        let overall = 0.0;
        let counter = 0;
        for (let course of result) {
          switch (course.grade.toLowerCase()) {
            case 'a':
              counter += 1;
              overall += 4.0;
              break;
            case 'a-':
              counter += 1;
              overall += 3.66;
              break;
            case 'b+':
              counter += 1;
              overall += 3.33;
              break;
            case 'b':
              counter += 1;
              overall += 3.0;
              break;
            case 'b-':
              counter += 1;
              overall += 2.66;
              break;
            case 'c+':
              counter += 1;
              overall += 2.33;
              break;
            case 'c':
              counter += 1;
              overall += 2.0;
              break;
            case 'c-':
              counter += 1;
              overall += 1.66;
              break;
            case 'd+':
              counter += 1;
              overall += 1.33;
              break;
            case 'd':
              counter += 1;
              overall += 1.0;
              break;
            default:
              counter += 1;
              overall += 0.0;
          }

        }
        // console.log(overall);
        this.overallGPA = overall / counter;
      });
    });
  }

}
