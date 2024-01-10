import Map from 'App/Models/Map'

class OverwatchAnalyse {
  public async processAndStoreDataFromJSON(jsonData: any) {
    const map = JSON.parse(JSON.parse(jsonData))

    const whereClause = {
      date: map.date,
      map_name: map.map_name,
      map_type: map.map_type,
    }

    const mapDb = await Map.query().where(whereClause).first()
    if (!mapDb) {
      console.info(
        "Création d'une nouvelle map :" + map.map_name + ' ' + map.map_type + ' ' + map.date
      )

      try {
        await Map.create({
          date: map.date,
          map_name: map.map_name,
          map_type: map.map_type,
          team1_name: map.team1_name,
          team2_name: map.team2_name,
          team1_score: parseInt(map.team1_score),
          team2_score: parseInt(map.team2_score),
          data: map,
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      console.info("Mise à jour d'une map :" + map.map_name + ' ' + map.map_type + ' ' + map.date)
      mapDb.team1_name = map.team1_name
      mapDb.team2_name = map.team2_name
      mapDb.team1_score = parseInt(map.team1_score)
      mapDb.team2_score = parseInt(map.team2_score)
      mapDb.data = map
      await mapDb.save()
    }
  }
}

export default new OverwatchAnalyse()
