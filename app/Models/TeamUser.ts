import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Team from 'App/Models/Team'
import User from 'App/Models/User'
import TeamRoles from 'App/Enums/TeamRoles'
export default class TeamUser extends BaseModel {
  public static table = 'team_user'

  @column({ isPrimary: true })
  public id: number

  @column()
  public team: Team

  @column()
  public user: User

  @column()
  public role: TeamRoles
}
