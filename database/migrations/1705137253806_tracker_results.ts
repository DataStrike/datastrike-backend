import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tracker_results'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.dateTime('date')
      table.string('map_name')

      table.integer('team_id').unsigned().references('teams.id').onDelete('CASCADE')

      table.string('opponent_team')
      table.integer('team1_score')
      table.integer('team2_score')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
