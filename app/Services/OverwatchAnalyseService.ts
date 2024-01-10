import MapOverwatch from 'App/Models/MapOverwatch'


class OverwatchAnalyse {


  public async processAndStoreDataFromJSON(jsonData: any) {

    const map = JSON.parse(JSON.parse(jsonData))


    const whereClause = {
      date: map.date,
      map_name: map.map_name,
      map_type: map.map_type,
    }

    const mapDb = await MapOverwatch.query().where(whereClause).first()
    if (!mapDb) {
      console.info("Création d'une nouvelle map :" + map.map_name + " " + map.map_type + " " + map.date)
      
      try {
        const mapDb = await MapOverwatch.create({
          date: map.date,
          map_name: map.map_name,
          map_type: map.map_type,
          team1_name: map.team1_name,
          team2_name: map.team2_name,
          team1_score: parseInt(map.score_team1),
          team2_score: parseInt(map.score_team2),
          data: map
        })

      } catch (error) {
        console.error(error)
      }
    }
    else {
      console.info("Mise à jour d'une map :" + map.map_name + " " + map.map_type + " " + map.date)
      mapDb.team1_name = map.team1
      mapDb.team2_name = map.team2
      mapDb.team1_score = parseInt(map.score_team1)
      mapDb.team2_score = parseInt(map.score_team2)
      mapDb.data = map
      await mapDb.save()
    }
}
}

export default new OverwatchAnalyse();
