import User from 'App/Models/User'

class TeamsService {
  public async getPlayers(teamId: number): Promise<User[]> {
    return User.query()
      .select(['name', 'email', 'avatar_url'])
      .innerJoin('team_user', 'users.id', 'team_user.user_id')
      .where('team_user.team_id', teamId)
  }
}

export default new TeamsService()
