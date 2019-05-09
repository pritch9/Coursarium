import { Component, OnInit } from '@angular/core';
import {TranscriptService} from "../../../../Services/Transcript/transcript.service";

@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss']
})
export class TranscriptComponent implements OnInit {
  transcript = [];
  overallGPA;
  constructor(private transcriptService: TranscriptService) { }

  ngOnInit() {
    this.getTranscript();
  }

  getTranscript() {
    this.transcriptService.getTranscript(localStorage.getItem('user_id')).subscribe(result => {
      this.transcript = result;

      var overall = 0.0;
      var counter = 0;
      for(let course of result) {
        // course.grade = null;
        switch(course.grade) {
          case 'A':
          case 'a':
            counter += 1;
            overall += 4.0;
          case 'A-':
          case 'a-':
            counter += 1;
            overall += 3.66;
          case 'B+':
          case 'b+':
            counter += 1;
            overall += 3.33;
          case 'B':
          case 'b':
            counter += 1;
            overall += 3.0;
          case 'B-':
          case 'b-':
            counter += 1;
            overall += 2.66;
          case 'C+':
          case 'c+':
            counter += 1;
            overall += 2.33;
          case 'C':
          case 'c':
            counter += 1;
            overall += 2.0;
          case 'C-':
          case 'c-':
            counter += 1;
            overall += 1.66;
          case 'D+':
          case 'd+':
            counter += 1;
            overall += 1.33;
          case 'D':
          case 'd':
            counter += 1;
            overall += 1.0;
            break;
        }
      }
      console.log(overall);
      this.overallGPA = overall / counter;
    });
  }

}
