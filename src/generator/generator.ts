import { GeneratorConfig } from '../typing/generator_config'
import { Environment } from '../typing/environment'
import { Intent } from '../typing/intent'
import { Context } from 'vm'
import { ValidDataSet } from '../typing/dataset'
import { analyzeBasePrompt } from '../prompt/analyze'
import { ChatGPT } from '../model/chatGPT'

export class Generator {
  config: GeneratorConfig
  constructor() {}
  /**
   * @summary generator prompt context with environment and intent
   * @param {Environment} environment
   * @param {Intent} intent
   * @param {ValidDataSet} validDataSet
   * @async
   */
  async gen(
    intent: Intent,
    environment: Environment,
    validDataSet: ValidDataSet
  ) {
    // intent.instruction
    // intent.user
    // environment.history
    // environment.knowledge
    // environment.platform
    // environment.relations
    const context = await this.analyze(intent, environment)
  }

  /**
   * @summary use llm to analyze and think the prototype of prompt context
   * @param {Environment} environment
   * @param {Intent} intent
   * @async
   */
  async analyze(intent: Intent, environment?: Environment): Promise<Context> {
    //     user: User
    // requestTime?: number
    const context: Context = {
      template: '',
      params: []
    }
    let systemPrompt = `
      Think in English and reply in user's description language.
      ${analyzeBasePrompt}
    `
    let analyzePrompt: string = `
      <description>
        ${intent.description}
      </description>
    `

    if (intent.useCases) {
      const userCases = intent.useCases.map(
        (useCase: string, index: number) => {
          return `
        <user-case-${index}>
          ${useCase}
        </user-case-${index}>
      `
        }
      )
      analyzePrompt = `${userCases}${analyzePrompt}`
    }

    if (environment) {
      const envPrompt = `<environment>
          the prompt is performed on ${environment.platform.name}, the platform is for ${environment.platform.description}
        </environment>`

      analyzePrompt = `${analyzePrompt}${envPrompt}`
    }

    if (intent.options?.cot) {
      systemPrompt = `${systemPrompt} The prompt need to remind model to think step by step. \n`
    }
    if (intent.options?.example) {
      systemPrompt = `${systemPrompt} The prompt need to show one question answer pair example. \n`
    }
    if (intent.options?.param) {
    }

    const chatGPT = new ChatGPT()
    chatGPT.query(systemPrompt, analyzePrompt)
    return context
  }

  /**
   * @summary validate if prompt context is fully functional
   * @param {Context} context
   * @param {ValidDataSet} validDataSet
   * @async
   */
  async validate(context: Context, validDataSet: ValidDataSet) {}
}
