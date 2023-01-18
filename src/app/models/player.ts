export class Player {
    /** Constructor */
    constructor(
        _id: string,
        team_id: number,
        first_name: string,
        last_name: string,
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
    last_name: string
    email: string
    position: string
}

/** Default function to create an empty player */
export function defaultPlayer(): Player {
    return new Player(
        "",
        0,
        "New",
        "Player",
        "example@email.com",
        "DELANTERO"
    );
}