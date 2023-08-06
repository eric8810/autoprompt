import { GeneratorConfig } from '../typing/generator_config'
import { Environment } from '../typing/environment'
import { Intent } from '../typing/intent'
import { Context } from 'vm'
import { ValidDataSet } from '../typing/dataset'
import { analyzeBasePrompt } from '../prompt/analyze'

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
  async analyze(intent: Intent, environment: Environment): Promise<Context> {
    const context: Context = {
      template: '',
      params: []
    }
    let analyzePrompt: string = `${analyzeBasePrompt}`

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
