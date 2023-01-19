export class MatchStatus {

    START = 'STA';
    BREAK = 'BRE';
    RESUMPTION = 'RES';
    GOAL = 'GOA';
    END = 'END';
    OTHER = 'OTH';

    STATUS_OPTIONS = [
        { value: this.START, display: 'Start' },
        { value: this.BREAK, display: 'Break' },
        { value: this.RESUMPTION, display: 'Resumption' },
        { value: this.GOAL, display: 'Goal' },
        { value: this.END, display: 'End' },
        { value: this.OTHER, display: 'Other' }
    ];

    constructor(
        id: string,
        status_type: string,
        matchId: string,
        info: string,
        date: Date,
        scoreboard: string,
    ) {
        this.id = id
        this.status_type = status_type
        this.matchId = matchId
        this.info = info
        this.date = date
        this.scoreboard = scoreboard
    }
    
    id: string
    status_type: string
    matchId: string
    info: string
    date: Date
    scoreboard: string
}



export class Tweet {
    constructor(
        id: string,
        minuto: number,
        local: string,
        visitante: string,
        marcador: string,
        info: string,
    ) {

        this.id = id 
        this.minuto = minuto
        this.local = local
        this.visitante = visitante
        this.marcador = marcador
        this.info = info

    }

    id: string
    minuto: number
    local: string
    visitante: string
    marcador: string
    info: string
}



/* 
id = models.CharField(primary_key=True, max_length=24, default=get_random_string(length=24))
status_type = models.CharField(
    max_length=3,
    choices=STATUS_OPTIONS,
)
matchId = models.CharField(max_length=24)
user_id = models.IntegerField()
info = models.CharField(max_length=255)
date = models.DateTimeField()
scoreboard = models.CharField(max_length=255)
uidPlayer = models.CharField(max_length=255) */

/* 
import { Component, OnInit } from '@angular/core';

class MatchStatus {
    id: string;
    status_type: string;
    matchId: string;
    user_id: number;
    info: string;
    date: Date;
    scoreboard: string;
    uidPlayer: string;

    START = 'STA';
    BREAK = 'BRE';
    RESUMPTION = 'RES';
    GOAL = 'GOA';
    END = 'END';
    OTHER = 'OTH';

    STATUS_OPTIONS = [
        { value: this.START, display: 'Start' },
        { value: this.BREAK, display: 'Break' },
        { value: this.RESUMPTION, display: 'Resumption' },
        { value: this.GOAL, display: 'Goal' },
        { value: this.END, display: 'End' },
        { value: this.OTHER, display: 'Other' }
    ];

    constructor() {
        this.id = this.generateRandomString(24);
    }

    private generateRandomString(length: number) {
        // code to generate random string
    }
}

class Tweet {
    id: string;
    minuto: number;
    local: string;
    visitante: string;
    marcador: string;
    info: string;

    constructor() {
        this.id = this.generateRandomString(24);
    }

    private generateRandomString(length: number) {
        // code to generate random string
    }
}

@Component({
    // component configuration
})
export class MatchStatusComponent implements OnInit {
    matchStatus: MatchStatus = new MatchStatus();
    tweet: Tweet = new Tweet();

    ngOnInit() {
        // initialization code
    }
}
 */