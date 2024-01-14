import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tracker_results'

  public async up() {
    // Add column
    this.schema.table(this.tableName, (table) => {
      table.string('info')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
