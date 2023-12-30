import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
export default class UserProviders extends BaseModel {
  @column({ isPrimary: true })
  public providerName: string

  @column({ isPrimary: true })
  public providerId: string

  @column()
  @belongsTo(() => User)
  public userId: BelongsTo<typeof User>
}
