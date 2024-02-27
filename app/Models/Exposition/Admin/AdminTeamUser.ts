import TeamUser from 'App/Models/TeamUser'
import TeamRoles from 'App/Enums/TeamRoles'

export default class AdminTeamUser {
  public id: number
  public userId: number
  public teamId: number
  public role: string
  constructor(team_user: TeamUser) {
    this.id = team_user.id
    this.userId = team_user.$extras.user_id
    this.teamId = team_user.$extras.team_id
    this.role = TeamRoles[team_user.$extras.team_role_id]
  }
}
