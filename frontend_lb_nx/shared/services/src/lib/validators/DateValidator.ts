import {AbstractControl} from "@angular/forms";

export class DateValidator {
    static dateAfter(dateControlName: string, afterDateControlName: string) {

        return (control: AbstractControl) => {
            const date = control.get(dateControlName)?.value;
            const afterDate = control.get(afterDateControlName)?.value;

            if (date && afterDate && new Date(date) >= new Date(afterDate)) {

                return { dateAfter: true };
            }

            return null;
        };
    }
}


export class DateAfterConstantDateValidator{
    static dateAfter(constantDate: Date, errorname: string) {

        return (control: AbstractControl) => {
            const date = control?.value;

            if (date && new Date(date) < constantDate) {
                const errorObj = {};
                (errorObj as any)[errorname] = true;
                return errorObj;
                // return { errorname: true };
            }

            return null;
        };
    }

}
