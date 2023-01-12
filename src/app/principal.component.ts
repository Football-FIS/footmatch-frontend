import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms"

@Injectable()
export class PrincipalComponent {

    /***************************
        AUXILIAR: MODALS
    ***************************/
    show_modal = false

    closeModal() {
        this.show_modal = false
    }


    /***************************
        AUXILIAR: TIME
    ***************************/

    actualDate: any

    getFormatedDateTimeLikeInput(date: Date) {
        return this.getFormatedDate(date, 'yyyy-MM-ddTHH:mm:ss')
    }

    transformNumberToString(n: number, integers: number, fraction: number): string {
        return n.toLocaleString('en-US', {
            minimumIntegerDigits: integers,
            minimumFractionDigits: fraction
        })
    }

    timeToDoubleString(number: number): string {
        if (number == null) number = 0
        return (number % 1 ? number.toFixed(3) : number) + ''
    }

    getDifferenceFormatted(d1: any, d2: any): string {
        let time: number = Math.abs((new Date(d1)).getTime() - (new Date(d2)).getTime())
        return this.transformNumberToString(Math.floor(time / 3600000), 1, 0) + ':' + this.transformNumberToString((Math.floor(time / 60000)) % 60, 2, 0) + ':' + this.transformNumberToString((Math.floor(time / 1000)) % 60, 2, 0)
    }

    formatDate(date: Date): any {
        return this.getFormatedDate(date, 'dd/MM/yyyy')
    }

    formatTime(date: Date): any {
        return this.getFormatedDate(date, 'HH:mm:ss')
    }

    getFormatedDate(date: Date, format: string) {
        let datePipe = new DatePipe('en-US');
        return datePipe.transform(date, format);
    }

    loadActualDate() {
        let dtToday = new Date()

        let month: string = String(dtToday.getMonth() + 1)
        let day: string = String(dtToday.getDate())
        let year: string = String(dtToday.getFullYear())

        if (Number(month) < 10)
            month = '0' + month.toString();
        if (Number(day) < 10)
            day = '0' + day.toString();

        this.actualDate = year + '-' + month + '-' + day;
    }


    /***************************
            ERRORS
    ***************************/

    containError: boolean = false
    messageError: string | undefined

    inputClass(form: FormGroup, property: string) {
        if (form?.get(property)?.touched && form?.get(property)?.valid) {
            return "is-valid"
        } else if (form?.get(property)?.touched && form?.get(property)?.invalid) {
            return "is-invalid"
        } else {
            return ""
        }
    }

    returnPrincipalError(err: any) {
        let r = err.message
        if (r == undefined) {
            r = 'Error produced'
        }
        this.messageError = r;
        this.containError = true
    }

}