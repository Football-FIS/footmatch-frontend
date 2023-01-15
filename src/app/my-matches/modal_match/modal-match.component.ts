import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Match } from "src/app/models/match";
import { PrincipalComponent } from "src/app/principal.component";
import { MatchService } from "src/app/services/match.service";

@Component({
    selector: 'modal-match',
    templateUrl: './modal-match.component.html',
    styleUrls: ['./modal-match.component.scss']
})
export class ModalMatch extends PrincipalComponent implements OnChanges {

    /***************************
            GENERAL
    ***************************/

    // selected match
    @Input()
    match: Match | null = null

    // emit one event to reload
    @Output()
    reload = new EventEmitter<boolean>()

    // close modal
    @Output()
    close_modal = new EventEmitter<boolean>()

    // match form
    matchForm: FormGroup


    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(private matchService: MatchService, public formBuilder: FormBuilder) {
        super()
        this.matchForm = this.formBuilder.group({
            opponent: ['', [Validators.required]],
            is_local: ['', []],
            alignment: ['', []],
            url: ['', []],
            city: ['', [Validators.required]],
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
        this.matchForm.reset()
        if(this.match != null) {
            this.matchForm = this.formBuilder.group({
                opponent: [this.match.opponent, []],
                is_local: [this.match.is_local, []],
                alignment: [this.match.alignment, []],
                url: [this.match.url, []],
                city: [this.match.city, []],
                start_date: [this.match.start_date ? this.getFormatedDateTimeLikeInput(this.match.start_date) : '', []],
            })
        }
    }


    /***************************
        METHODS -> UPLOAD
    ***************************/

    uploadMatch() {
        if (this.match) {
            this.updateMatch()
        } else {
            this.newMatch()
        }
    }

    getMatch(): Match {
        let m = new Match('', 0, this.matchForm.value.opponent, this.matchForm.value.is_local!=null, this.matchForm.value.alignment, this.matchForm.value.url, this.matchForm.value.city, '', new Date(this.matchForm.value.start_date), true)
        // only when update 
        if(this.match) {
            m.id = this.match.id
            m.user_id = this.match.user_id
            m.weather = this.match.weather
            m.sent_email = this.match.sent_email
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