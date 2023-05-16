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
