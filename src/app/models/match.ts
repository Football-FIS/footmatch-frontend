export class Match {
    constructor(
        id: string,
        user_id: number,
        opponent: string,
        is_local: boolean,
        alignment: string,
        url: string,
        city: string,
        weather: string,
        start_date: Date,
        sent_email: boolean
    ) {
        this.id = id
        this.user_id = user_id
        this.opponent = opponent
        this.is_local = is_local
        this.alignment = alignment
        this.url = url
        this.city = city
        this.weather = weather
        this.start_date = start_date
        this.sent_email = sent_email
    }
    
    id: string
    user_id: number
    opponent: string
    is_local: boolean
    alignment: string
    url: string
    city: string
    weather: string
    start_date: Date
    sent_email: boolean
}