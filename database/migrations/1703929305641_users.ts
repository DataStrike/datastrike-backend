import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      // Create avatarUrl column
      table.string('avatar_url').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
