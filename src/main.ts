import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import { getExecOutput } from '@actions/exec'

async function run(): Promise<void> {
  const downloadUrl = `https://storage.googleapis.com/fabric-cli-release/fabric.tar.gz`
  try {
    const projectToken = core.getInput('projectToken')
    const toolPath = await tc.downloadTool(downloadUrl)
    const extractedPath = await tc.extractTar(toolPath)
    const cmd = ['push', '--project_token', `${projectToken}`]
    core.debug(`${extractedPath}/fabric`)
    core.debug(`cmd: ${cmd}`)
    const result = await getExecOutput(`${extractedPath}/fabric`, cmd);
    core.debug(`${result}`)
    if (result.exitCode !== 0) {
      const errMsg = result.stderr || `command exited ${result.exitCode}, but stderr had no output`;
      throw new Error(`failed to execute command \`${cmd}\`: ${errMsg}`);
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()