import TrackerResult from 'App/Models/TrackerResult'
import { determineResult } from '../../../../utils/tracker-results'
import { DateTime } from 'luxon'

export class ApiTracker {
  public id: number
  public opponentTeamName: string
  public date: DateTime
  public mapName: string
  public usScore: number
  public themScore: number
  public usInfo: string
  public themInfo: string
  public replayCode: string
  public vodLink: string
  public result: string
  public info: string

  constructor(tracker: TrackerResult) {
    this.id = tracker.id
    this.opponentTeamName = tracker.opponentTeam
    this.date = tracker.date
    this.mapName = tracker.mapName
    this.usScore = tracker.team1_score
    this.themScore = tracker.team2_score
    this.usInfo = tracker.team1_info
    this.themInfo = tracker.team2_info
    this.replayCode = tracker.replay_code
    this.vodLink = tracker.vod_link
    this.result = determineResult(tracker.team1_score, tracker.team2_score)
    this.info = tracker.info
  }
}
