import Team from 'App/Models/Team'
import TrackerResult from 'App/Models/TrackerResult'

export default class AdminTrackerResult {
  public id: number
  public createdAt: string
  public teamId: Team

  constructor(trackerResult: TrackerResult) {
    this.id = trackerResult.id
    this.createdAt = trackerResult.createdAt.toFormat('yyyy-MM-dd HH:mm:ss')
    this.teamId = trackerResult.teamId
  }
}
