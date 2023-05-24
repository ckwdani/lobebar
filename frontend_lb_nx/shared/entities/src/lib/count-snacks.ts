export interface CountSnacks{
    date: Date;
    snacks: {
        count: number;
        name: string;
        booked: boolean;
        id: {uid: string}
    }[];
}
