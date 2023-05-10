export interface Achievement {
    title: string,
    description: string,
    imageUrl: string,
    achieved: boolean,
    extraString?: string,
}

export interface AchievementBackend{
    shiftsScore: number,
    negativeBalance: number,
    shiftStreak: number
}

export class AchievementStreak implements Achievement{
    achieved= false;
    description= "";
    extraString?: string;
    imageUrl= "assets/trophy-48.png";
    title= "Streak";

    constructor(b: boolean, s?: string) {
        this.achieved = b
        if(s!=undefined){
            this.description= "Du hast in "+ s +" hintereinander folgenden Monaten, Schichten übernommen."
        }else{
            this.description= "Absolviere eine Schicht pro Monat um eine Streak aufzubauen."
        }
        this.extraString=s
    }
}

export class AchievementSchichtenAnzahl implements Achievement{
    achieved= false;
    description= "";
    extraString?: string;
    imageUrl= "assets/stern-64.png";
    title= "Schichten";
    constructor(b: boolean, s?: string) {
        this.achieved = b
        if(s!=undefined){
            this.description= "Du hast "+ s +" Schichten übernommen."
        }else{
            this.description= "Absolviere deine erste Schicht um dieses Achievement zu erhalten."
        }
        this.extraString=s
    }
}