import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Match } from "../models/match";
import { PrincipalComponent } from "../principal.component";

@Component({
    selector: 'errors-footmatch',
    templateUrl: './errors.component.html',
    styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnChanges{
    

    @Input()
    containError: boolean = false

    @Input()
    messageError: string = ''

    ngOnChanges() {}

}
