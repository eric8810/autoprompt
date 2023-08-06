import dotenv from 'dotenv'
import { logger } from './log/logger'
import { ChatGPT } from './model/chatGPT'
import { Intent } from './typing/intent'
import { Environment } from './typing/environment'
import { Generator } from './generator/generator'
dotenv.config()
logger.info(process.env.OPENAI_API_KEY)

const intent: Intent = {
  description: '我想要一个专门介绍和解答美食的机器人'
}

const intentWithCases: Intent = {
  useCases: [
    '用户想了解美食建议',
    '帮助用户决策想吃什么？',
    '某些地区的独特风味有哪些？'
  ],
  description: '我想要一个专门介绍和解答美食的机器人',
  options: {
    cot: true,
    example: true,
    param: false
  }
}

const environment: Environment = {
  platform: {
    id: 'wx',
    name: 'wechat',
    description: '一个社交平台'
  }
}

const generator = new Generator()

// //analyze with env
// generator.analyze(intent, environment)

// //analyze only with intent
// generator.analyze(intent)

//analyze with userCases
generator.analyze(intentWithCases, environment)
