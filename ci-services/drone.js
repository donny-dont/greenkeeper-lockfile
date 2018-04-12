'use strict'

const env = process.env
const gitHelpers = require('../lib/git-helpers')

module.exports = {
  // The GitHub repo slug
  repoSlug: env.DRONE_REPO,
  // The name of the current branch
  branchName: env.DRONE_COMMIT_BRANCH,
  // Is this the first push on this branch
  // i.e. the Greenkeeper commit
  firstPush: gitHelpers.getNumberOfCommitsOnBranch(env.DRONE_COMMIT_BRANCH) === 1,
  // Is this a regular build
  correctBuild: env.DRONE_BUILD_EVENT=== 'push',
  // Should the lockfile be uploaded from this build
  uploadBuild: env.DRONE_JOB_NUMBER.endsWith('1')
}
