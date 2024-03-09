import Map from 'App/Models/Map'
export class ApiMap {
  public id: number
  public date: string
  public mapName: string
  public mapType: string
  public team1Name: string
  public team2Name: string
  public team1Score: number
  public team2Score: number
  public data: JSON

  constructor(map: Map) {
    this.id = map.id
    this.date = map.date
    this.mapName = map.map_name
    this.mapType = map.map_type
    this.team1Name = map.team1_name
    this.team2Name = map.team2_name
    this.team1Score = map.team1_score
    this.team2Score = map.team2_score
    this.data = map.data
  }
}
