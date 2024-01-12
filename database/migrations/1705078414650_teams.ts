import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected teams_name = 'teams'
  protected team_user_name = 'team_user'

  public async up() {
    this.schema.createTable(this.teams_name, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('code').notNullable()
    })

    this.schema.createTable(this.team_user_name, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('users.id')
      table.integer('team_id').unsigned().references('teams.id')
      table.unique(['user_id', 'team_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.teams_name)
    this.schema.dropTable(this.team_user_name)
  }
}
