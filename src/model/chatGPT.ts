import { logger } from '../log/logger'
import { OpenAIApi, Configuration } from 'openai'

export class ChatGPT {
  openai: OpenAIApi
  constructor() {
    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
      // accessToken: process.env.OPENAI_ACCESS_TOKEN,
      basePath: 'https://aiapi.xiongdei.net/v1',
      baseOptions: {}
    })
    this.openai = new OpenAIApi(config)
  }

  async query(system: string, prompt: string) {
    const chatCompletion = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo-16k',
      messages: [
        {
          role: 'system',
          content: system
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    })
    logger.info(chatCompletion.data.choices)
  }
}
