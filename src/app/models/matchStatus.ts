export class MatchStatus {
    constructor(
        id: string,
        status_type: string,
        matchId: string,
        info: string,
        date: Date,
        scoreboard: string,
        uidPlayer: string,
    ) {
        this.id = id
        this.status_type = status_type
        this.matchId = matchId
        this.info = info
        this.date = date
        this.scoreboard = scoreboard
        this.uidPlayer = uidPlayer
    }
    
    id: string
    status_type: string
    matchId: string
    info: string
    date: Date
    scoreboard: string
    uidPlayer: string
}



// id = models.CharField(primary_key=True, max_length=24, default=get_random_string(length=24))
// status_type = models.CharField(
//     max_length=3,
//     choices=STATUS_OPTIONS,
// )
// matchId = models.CharField(max_length=24)
// user_id = models.IntegerField()
// info = models.CharField(max_length=255)
// date = models.DateTimeField()
// scoreboard = models.CharField(max_length=255)
// uidPlayer = models.CharField(max_length=255)