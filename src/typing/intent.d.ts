export interface User {
  id: string
  name: string
  extension: { [key: string]: string }
}
export interface Intent {
  instruction: string
  user: User
  requestTime?: number
  options: any
}
