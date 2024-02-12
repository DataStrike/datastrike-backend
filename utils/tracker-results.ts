export const determineResult = (
  team1_score: number,
  team2_score: number,
  team1_payload: number,
  team2_payload: number
): string => {
  if (team1_score > team2_score) {
    return 'W'
  }
  if (team1_score < team2_score) {
    return 'L'
  }
  // If score equals
  if (team1_score === team2_score) {
    // If team 1's payload is greater than team 2's payload, team 1 wins
    if (team1_payload > team2_payload) {
      return 'W'
    }
    // If team 2's payload is greater than team 1's payload, team 2 wins
    if (team1_payload < team2_payload) {
      return 'L'
    }
    // If payload scores are also equal, it's a draw
    return 'D'
  }
  // This should not be reached, but if it does, return draw as fallback
  return 'D'
}
