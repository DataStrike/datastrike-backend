export default class AdminStats {
  public nbTeams: number
  public nbUsers: number
  public nbMaps: number
  public nbTrackerResults: number
  constructor(nbTeams: number, nbUsers: number, nbMaps: number, nbTrackerResults: number) {
    this.nbTeams = nbTeams
    this.nbUsers = nbUsers
    this.nbMaps = nbMaps
    this.nbTrackerResults = nbTrackerResults
  }
}
