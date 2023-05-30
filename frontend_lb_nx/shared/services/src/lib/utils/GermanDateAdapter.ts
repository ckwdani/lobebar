import { NativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {Inject, Injectable} from '@angular/core';

@Injectable(
    {providedIn: 'root'}
)
export class GermanDateProvider extends NativeDateAdapter {
    constructor(@Inject(MAT_DATE_LOCALE) matDateLocale: string) {
        super(matDateLocale);
    }


    override format(date: Date, displayFormat: string): string {
        const options = { day: '2-digit', month: 'long', year: "numeric" } as const;
        console.log("adsadad")
        return date.toLocaleDateString(this.locale, options);
    }

    override parse(value: any): Date | null {

        if (typeof value === 'string') {
            const dateParts = value.split('.');
            if (dateParts.length === 3) {
                const day = +dateParts[0];
                const month = +dateParts[1] - 1;
                const year = +dateParts[2];
                console.log(day, month, year, "dateParts")
                return new Date(year, month, day);
            }
        }
        return super.parse(value);
    }
}
