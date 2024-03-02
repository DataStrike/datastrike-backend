import User from 'App/Models/User'

export class ApiUser {
  public name: string
  public email: string
  public avatarUrl: string
  public isAdmin: boolean
  constructor(user: User) {
    this.name = user.name
    this.email = user.email
    this.avatarUrl = user.avatarUrl
    this.isAdmin = user.isAdmin
  }
}
