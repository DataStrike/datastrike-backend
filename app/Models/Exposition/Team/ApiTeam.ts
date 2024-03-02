import Team from 'App/Models/Team'
import User from 'App/Models/User'

export class ApiTeam {
  public id: number
  public name: string
  public code: string
  public isAdmin?: boolean
  public players?: {
    id: number
    name: string
    email: string
    avatar_url: string
    isAdmin: boolean
  }[]

  constructor(team: Team)
  constructor(team: Team, players: User[])
  constructor(team: Team, players?: User[]) {
    this.id = team.id
    this.name = team.name
    this.code = team.code
    if (players) {
      this.isAdmin = team.$extras.pivot_team_role_id === 2
      this.players = players.map((player) => ({
        id: player.id,
        name: player.name,
        email: player.email,
        avatar_url: player.avatarUrl,
        isAdmin: player.$extras.team_role_id === 2,
      }))
    }
  }
}
