import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatchStatus } from '../models/matchStatus';
import { MatchStatusService } from '../services/matchStatus.service';
import { PrincipalComponent } from '../principal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'match-status-service',
  templateUrl: './match-status-service.component.html',
  styleUrls: ['./match-status-service.component.scss']
})
export class MatchStatusServiceComponent extends PrincipalComponent implements OnInit {

  /***************************
          GENERAL
  ***************************/

// selected match
  @Input()
  url: string = ''

  // close modal
  @Output()
  close_modal = new EventEmitter<boolean>()

  form: FormGroup;

  statusOptions = [
    { value: 'STA', label: 'Start' },
    { value: 'BRE', label: 'Break' },
    { value: 'RES', label: 'Resumption' },
    { value: 'GOA', label: 'Goal' },
    { value: 'END', label: 'End' },
    { value: 'OTH', label: 'Other' },
  ];

  // list of matchStatus
  my_matchStatus: Array<MatchStatus> = []

  // selected match to edit
  selected_matchStatus: any = null

  // select my team
  //my_Team: Team = new Team('','','','','','','','',0,'','','','',new Date(),'',0)

  // HH:mm actual
  currentTime: string | null = null;

  /***************************
          CONSTRUCTOR
  ***************************/


  constructor(private matchStatus: MatchStatusService, private http: HttpClient) {
    super()
    setInterval(() => {
      let now = new Date();
      this.currentTime = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    }, 1000);

    this.form = new FormGroup({
      status_type: new FormControl(''),
      matchId: new FormControl(''),
      user_id: new FormControl(''),
      info: new FormControl(''),
      date: new FormControl(''),
      scoreboard: new FormControl(''),
      uidPlayer: new FormControl('')
    });

  }

  ngOnInit(): void {
    this.form.patchValue({ matchId: this.url });

    // this.loadMyMatchStatus()
  }

  //  loadMyMatchStatus() {
  //   this.matchStatus.getMatchStatusById("asd").subscribe({
  //       next: (n) => {
  //           this.containError = false
  //           this.my_matchStatus = n
  //       },
  //       error: (e) => {
  //           this.returnPrincipalError(e)
  //       }
  //   })
  // } 

  onSubmit() {

    let now = new Date();
    // this.my_matchStatus.values = this.selected_matchStatus;
    this.form.patchValue({ date: now });
    //let matchStatus = new MatchStatus('', this.form.value.status_type, this.url, this.form.value.info, this.form.value.date, this.form.value.scoreboard)

    this.matchStatus.postMatchStatus(this.form).subscribe(

      (response: any) => console.log(response),

      (error: any) => console.log(error)

    );
    this.form.reset();
    this.close_modal.emit(true)
    this.closeModal();
  }

}
