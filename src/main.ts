import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    core.setOutput('project_id', '728919945741')
    core.setOutput('project_name', 'fabric')
    core.setOutput('service_account', 'dev-104@fabric-375222.iam.gserviceaccount.com')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()