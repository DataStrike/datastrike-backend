import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'map_overwatches'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string("date")
      table.string("map_name")
      table.string("map_type")
      table.string("team1_name")
      table.string("team2_name")
      table.integer("team1_score")
      table.integer("team2_score")
      table.json("data")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
