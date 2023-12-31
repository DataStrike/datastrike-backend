import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    // Remove 'rememberMeToken' column from users table
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('remember_me_token')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
