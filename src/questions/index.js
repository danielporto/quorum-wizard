import inquirer from 'inquirer'
import {
  isBash,
  isTessera,
  isRaft,
  isCakeshop,
  isDocker,
} from '../model/NetworkConfig'
import {
  getCustomizedBashNodes,
  getCustomizedDockerPorts,
  getCustomizedCakeshopPort,
} from './customPromptHelper'
import {
  CUSTOM_QUESTIONS,
  QUICKSTART_QUESTIONS,
  SIMPLE_QUESTIONS,
} from './questions'

// eslint-disable-next-line import/prefer-default-export
export async function promptUser(mode) {
  const answers = await inquirer.prompt(getQuestionsForMode(mode))

  if (answers.customizePorts) {
    await promptForCustomPorts(answers)
  }

  return answers
}

function getQuestionsForMode(mode) {
  switch (mode) {
    case 'simple':
      return SIMPLE_QUESTIONS
    case 'custom':
      return CUSTOM_QUESTIONS
    case 'quickstart':
    default:
      return QUICKSTART_QUESTIONS
  }
}

async function promptForCustomPorts(answers) {
  if (isBash(answers.deployment)) {
    // eslint-disable-next-line no-param-reassign
    answers.nodes = await getCustomizedBashNodes(
      answers.numberNodes,
      isTessera(answers.transactionManager),
      isRaft(answers.consensus),
    )
  } else if (isDocker(answers.deployment)) {
    // eslint-disable-next-line no-param-reassign
    answers.nodes = await getCustomizedDockerPorts(
      answers.numberNodes,
      isTessera(answers.transactionManager),
    )
  }

  if (isCakeshop(answers.cakeshop)) {
    // eslint-disable-next-line no-param-reassign
    answers.cakeshopPort = await getCustomizedCakeshopPort()
  }
}
