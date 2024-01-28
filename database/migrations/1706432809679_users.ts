import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Roles from 'App/Enums/Roles'

export default class extends BaseSchema {
  protected users = 'users'
  protected roles = 'roles'

  public async up() {
    this.schema.createTable(this.roles, (table) => {
      table.increments('id')
      table.string('name').notNullable()
    })

    this.defer(async () => {
      const roles = [
        { id: Roles.USER, name: 'user' },
        { id: Roles.ADMIN, name: 'admin' },
      ]
      await this.db.insertQuery().table(this.roles).multiInsert(roles)
    })

    this.schema.alterTable(this.users, (table) => {
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable(this.roles)
        .onDelete('CASCADE')
        .defaultTo(Roles.USER)
    })
  }

  public async down() {
    this.schema.dropTable(this.users)
    this.schema.dropTable(this.users)
  }
}
