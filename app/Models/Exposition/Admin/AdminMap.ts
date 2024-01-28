import Map from 'App/Models/Map'
import Team from 'App/Models/Team'

export default class AdminMap {
  public id: number
  public createdAt: string
  public teamId: Team

  constructor(map: Map) {
    this.id = map.id
    this.createdAt = map.createdAt.toFormat('yyyy-MM-dd HH:mm:ss')
    this.teamId = map.teamId
  }
}
