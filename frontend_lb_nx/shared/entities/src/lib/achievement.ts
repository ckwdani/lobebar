export interface Achievement {
    achievementCode: number,
    title: string,
    description: string,
    imageUrl: string,
    achieved: boolean,
    extraString?: string,
    selected: boolean
}

//1001 emils ecke mitglied
//X002 schichten übernommen
//X003 shiftstreak

export interface AchievementBackend{
    shiftsScore: number,
    negativeBalance: number,
    shiftStreak: number
}

//{title: "Mitglied", description: "Mitglied von EmilsEcke", imageUrl: "assets/emilsecke_logo.png", achieved: true, selected: false
export class AchievementMitglied implements Achievement{
    achievementCode= 1;
    achieved= true;
    description="Mitglied von EmilsEcke";
    extraString?: string;
    imageUrl= "assets/emilsecke_logo.png";
    title= "Mitglied";
    selected = false
}

export function genSelectedAchievement(achievementCode?: number, extraString?: string): Achievement|undefined{
    const allAchievementsArray = [new AchievementMitglied(), new AchievementStreak(false, true, extraString), new AchievementSchichtenAnzahl(false, true, extraString)]
    const selectedAchievement = allAchievementsArray.find(a => a.achievementCode===achievementCode)
    return <Achievement>selectedAchievement
}

export class AchievementStreak implements Achievement{
    achievementCode= 3;
    achieved= false;
    description= "";
    extraString?: string;
    imageUrl= "assets/trophy-48.png";
    title= "Streak";
    selected = false

    constructor(selected: boolean,b: boolean, s?: string) {
        this.achieved = b
        if(s!=undefined){
            this.description= "In "+s +" hintereinander folgenden Monaten, Schichten übernommen."
        }else{
            this.description= "Absolviere eine Schicht pro Monat um eine Streak aufzubauen."
        }
        this.extraString=s
        this.selected=selected
    }
}

export class AchievementSchichtenAnzahl implements Achievement{
    achievementCode= 2;
    achieved= false;
    description= "";
    extraString?: string;
    imageUrl= "assets/stern-64.png";
    title= "Schichten";
    selected = false
    constructor(selected:boolean ,b: boolean, s?: string) {
        this.achieved = b
        if(s!=undefined){
            this.description= s +" Schichten übernommen."
        }else{
            this.description= "Absolviere deine erste Schicht um dieses Achievement zu erhalten."
        }
        this.extraString=s
        this.selected=selected
    }
}

