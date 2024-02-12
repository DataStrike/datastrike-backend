import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tracker_results'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('team1_payload').nullable()
      table.integer('team2_payload').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
