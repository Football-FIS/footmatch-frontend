import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatchStatus } from "src/app/models/matchStatus";
import { PrincipalComponent } from "src/app/principal.component";
import { MatchStatusService } from "src/app/services/matchStatus.service";

@Component({
    selector: 'modal-matchStatus',
    templateUrl: './modal-matchStatus.component.html',
    styleUrls: ['./modal-matchStatus.component.scss']
})
export class ModalMatchStatus extends PrincipalComponent implements OnChanges {

    /***************************
            GENERAL
    ***************************/

    // selected match
    @Input()
    matchStatus: MatchStatus | null = null

    // emit one event to reload
    @Output()
    reload = new EventEmitter<boolean>()

    // close modal
    @Output()
    close_modal = new EventEmitter<boolean>()

    // match form
    matchStatusForm: FormGroup


    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(private matchService: MatchStatusService, public formBuilder: FormBuilder) {
        super()
        this.matchStatusForm = this.formBuilder.group({
            status_type: ['', []],
            start_date: ['', []],
        })
    }


    /***************************
        METHODS -> GENERAL
    ***************************/

    ngOnChanges() {

        // fill form fields when update
        this.fillUpdate()
    }

    fillUpdate() {
        this.matchStatusForm.reset()
        if(this.matchStatus != null) {
            this.matchStatusForm = this.formBuilder.group({
                status_type: [this.matchStatus.status_type, []],
                start_date: [this.matchStatus.date ? this.getFormatedDateTimeLikeInput(this.matchStatus.date) : '', []],
            })
        }
    }


    /***************************
        METHODS -> UPLOAD
    ***************************/

    uploadMatchStatus() {
        if (this.matchStatus) {
            this.updateMatchStatus()
        } else {
            this.newMatchStatus()
        }
    }

    getMatchStatus(): MatchStatus {
        let m = new MatchStatus('', 0, this.matchStatusForm.value.opponent, this.matchStatusForm.value.is_local, this.matchStatusForm.value.alignment, this.matchForm.value.url, this.matchForm.value.city, '', new Date(this.matchForm.value.start_date), true)
        // only when update 
        if(this.matchStatus) {
            m.id = this.matchStatus.id
            m.user_id = this.matchStatus.user_id
        }
        return m
    }

    handleNext(n: any) {
        this.containError=false
        this.match = n
        this.reload.emit(true)
    }

    newMatch() {
        let m = this.getMatch()
        this.matchService.createMatch(m).subscribe({
            next: (n) => {
                this.handleNext(n)
            },
            error: (e) => {
                this.returnPrincipalError(e)
            },
        })
    }

    updateMatch() {
        let m = this.getMatch()
        this.matchService.updateMatch(m).subscribe({
            next: (n) => {
                this.handleNext(n)
            },
            error: (e) => {
                this.returnPrincipalError(e)
            },
        })
    }

    deleteMatch() {
        if(this.match!=null) {
            this.matchService.deleteMatch(this.match.id).subscribe({
                next: (n) => {
                    this.handleNext(n)
                    this.close_modal.emit(true)
                },
                error: (e) => {
                    this.returnPrincipalError(e)
                },
            })
        }
        
    }


    override closeModal() {
        this.close_modal.emit(true)
    }

}