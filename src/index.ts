import { OpenAIApi, Configuration } from 'openai'
import winston from 'winston'

import dotenv from 'dotenv'
dotenv.config()
const { combine, timestamp, label, prettyPrint } = winston.format

const logger = winston.createLogger({
  level: 'info',
  format: combine(label({ label: 'meow' }), timestamp(), prettyPrint()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/combined.log' }),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error'
    })
  ]
})

logger.info(process.env.OPENAI_API_KEY)

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  // accessToken: process.env.OPENAI_ACCESS_TOKEN,
  basePath: 'https://aiapi.xiongdei.net/v1',
  baseOptions: {}
})
const openai = new OpenAIApi(config)

const a = [1, 2, 3]

const paragraph = `Customer Data. Customer shall retain all right, title and interest to all data and information
provided to LangChain in connection with its use of the LangSmith Platform (“Customer Data”). Customer
warrants that it has all rights necessary to provide any information, data or other materials that it provides
hereunder, and to permit LangChain to use the same as contemplated hereunder.`

const init = async () => {
  const models = await openai.listModels()
  // console.log(models.request)
  logger.info(
    models.data.data
      .sort((a, b) => a.created - b.created)
      .map((model) => model.id)
  )
  query()
}

const query = async () => {
  const chatCompletion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-16k',
    messages: [
      {
        role: 'system',
        content:
          'You are professional language translator that know exactly how to translate user message into Chinese. Also add a paragraph to explain what user message is all about in Chinese.'
      },
      {
        role: 'user',
        content: paragraph
      }
    ]
  })
  logger.info(chatCompletion.data.choices)
}
init()
