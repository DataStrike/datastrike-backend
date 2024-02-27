import User from 'App/Models/User'

class TeamsService {
  public async getPlayers(teamId: number): Promise<User[]> {
    return User.query()
      .select(['users.id', 'name', 'email', 'avatar_url', 'team_role_id'])
      .innerJoin('team_user', 'users.id', 'team_user.user_id')
      .where('team_user.team_id', teamId)
  }

  public async makeAdmin(teamId: number, userId: number): Promise<void> {
    await User.query()
      .from('team_user')
      .where('team_id', teamId)
      .where('user_id', userId)
      .update('team_role_id', 2)
  }
}

export default new TeamsService()
