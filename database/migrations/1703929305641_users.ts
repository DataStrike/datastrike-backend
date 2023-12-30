import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      // Create accessToken column and refresh token column
      table.string('access_token').nullable()
      table.string('refresh_token').nullable()

      // Create column to store the provider
      table.string('provider').nullable()

      // Create avatarUrl column
      table.string('avatar_url').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
