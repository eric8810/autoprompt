export interface History {
  id: string
  time: number
  content: string
}

export interface Relation {
  id: string
  objects: string[]
  type: string
}

export interface Platform {
  id: string
  name: string
  description: string
}

export interface Knowledge {
  id: string
  content: string
}

export interface Environment {
  history?: History[]
  relations?: Relation[]
  knowledge?: Knowledge[]
  platform: Platform
}
