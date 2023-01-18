export class Player {
    constructor(
        _id: string,
        team_id: number,
        first_name: string,
        last_name: boolean,
        email: string,
        position: string,
    ) {
        this._id = _id,
        this.team_id = team_id,
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.position = position
    }
    
    _id: string
    team_id: number
    first_name: string
    last_name: boolean
    email: string
    position: string
}