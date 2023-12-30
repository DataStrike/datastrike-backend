import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_providers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('provider_name')
      table.string('provider_id')

      // providerName and providerId are the composite key
      table.primary(['provider_name', 'provider_id'])

      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE') // delete providers when user is deleted
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
