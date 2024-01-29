import User from 'App/Models/User'

export default class AdminUser {
  public id: number
  public createdAt: string
  public name: string
  public email: string

  constructor(user: User) {
    this.id = user.id
    this.createdAt = user.createdAt.toFormat('yyyy-MM-dd HH:mm:ss')
    this.name = user.name
    this.email = user.email
  }
}
