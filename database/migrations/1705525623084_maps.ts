import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.table('maps', (table) => {
      table.integer('team_id').unsigned().references('teams.id').onDelete('CASCADE')
    })
  }
}
