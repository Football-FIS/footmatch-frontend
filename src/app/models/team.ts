export class Team {
    constructor(
        user: string,
        name:string,
        country:string,
        state:string,
        city:string,
        address:string,
        coach_name:string,
        stadium_name:string,
        capacity_stadium:number,
        president_name:string,
        league_name:string,
        latitude:string,
        longuitude:string,
        expiration: Date,
        plan_type: string,
        matches_month_created: number
    ) {
        this.user = user,
        this.name = name,
        this.country = country,
        this.state = state,
        this.city = city,
        this.address = address,
        this.coach_name = coach_name,
        this.stadium_name = stadium_name,
        this.capacity_stadium = capacity_stadium,
        this.president_name = president_name,
        this.league_name = league_name,
        this.latitude = latitude,
        this.longuitude = longuitude,
        this.expiration = expiration,
        this.plan_type = plan_type,
        this.matches_month_created = matches_month_created
    }
    
    user: string
    name:string
    country:string
    state:string
    city:string
    address:string
    coach_name:string
    stadium_name:string
    capacity_stadium:number
    president_name:string
    league_name:string
    latitude:string
    longuitude:string
    expiration: Date
    plan_type: string
    matches_month_created: number
}