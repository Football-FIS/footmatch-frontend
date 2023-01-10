import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms"

@Injectable()
export class PrincipalComponent {

    containError: boolean = false
    messageError: string | undefined

    /***************************
            ERRORS
    ***************************/

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
        let r = err.error.text
        if (r == undefined) {
            r = 'Error produced'
        }
        this.messageError = r;
        this.containError = true
    }

}