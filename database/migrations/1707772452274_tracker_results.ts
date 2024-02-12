import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tracker_results'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('team1_info').nullable()
      table.string('team2_info').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('team1_info', 'team2_info')
    })
  }
}
