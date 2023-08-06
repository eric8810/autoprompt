export interface User {
  id: string
  name: string
  extension: Extension[]
}

export interface Extension {
  tag: string
  content: string
}
export interface Intent {
  useCases?: string[]
  description: string
  options?: {
    cot?: boolean
    param?: boolean
    example?: boolean
  }
}
