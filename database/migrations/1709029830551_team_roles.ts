import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import TeamRoles from 'App/Enums/TeamRoles'

export default class extends BaseSchema {
  protected tableName = 'team_roles'
  protected team_user = 'team_user'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
    })

    this.defer(async () => {
      const roles = [
        { id: TeamRoles.USER, name: 'user' },
        { id: TeamRoles.ADMIN, name: 'admin' },
      ]
      await this.db.insertQuery().table(this.tableName).multiInsert(roles)
    })

    // Add team_role_id to team_user
    this.schema.alterTable(this.team_user, (table) => {
      table
        .integer('team_role_id')
        .unsigned()
        .references('id')
        .inTable(this.tableName)
        .onDelete('CASCADE')
        .defaultTo(TeamRoles.USER)
    })

    // Update team_user table by setting all users to admin
    this.defer(async () => {
      await this.db.from(this.team_user).update('team_role_id', TeamRoles.ADMIN)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
