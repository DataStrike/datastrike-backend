export const determineResult = (team1_score: number, team2_score: number): string => {
  if (team1_score > team2_score) {
    return 'W'
  } else if (team1_score < team2_score) {
    return 'L'
  } else {
    return 'D'
  }
}
