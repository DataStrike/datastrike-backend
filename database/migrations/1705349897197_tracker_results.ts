import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tracker_results'

  public async up() {
    // Add columns to tracker_results
    this.schema.table(this.tableName, (table) => {
      table.string('replay_code')
      table.string('vod_link')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
