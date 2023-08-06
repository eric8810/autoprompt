import { GeneratorConfig } from '../typing/generator_config'
import { Environment } from '../typing/environment'
import { Intent } from '../typing/intent'
import { Context } from 'vm'
import { ValidDataSet } from '../typing/dataset'

export class Generator {
  config: GeneratorConfig
  constructor() {}
  /**
   * @summary generator prompt context with environment and intent
   * @param {Environment} env
   * @param {Intent} intent
   * @param {ValidDataSet} validDataSet
   */
  gen(env: Environment, intent: Intent, validDataSet: ValidDataSet) {}

  /**
   * @summary use llm to analyze and think the prototype of prompt context
   * @param {Environment} env
   * @param {Intent} intent
   */
  analyze(env: Environment, intent: Intent) {}

  /**
   * @summary validate if prompt context is fully functional
   * @param {Context} context
   * @param {ValidDataSet} validDataSet
   */
  validate(context: Context, validDataSet: ValidDataSet) {}
}
