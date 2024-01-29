import Team from 'App/Models/Team'

export default class AdminTeam {
  public id: number
  public name: string
  public code: string
  constructor(team: Team) {
    this.id = team.id
    this.name = team.name
    this.code = team.code
  }
}
