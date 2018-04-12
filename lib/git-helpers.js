'use strict'

const exec = require('child_process').execSync

const _ = require('lodash')

module.exports = {
  getNumberOfCommitsOnBranch: function getNumberOfCommitsOnBranch (branch) {
    const refArgument = `$(git for-each-ref '--format=%(refname)' refs/ | grep /${branch} | head -1)`
    const notArgument = `$(git for-each-ref '--format=%(refname)' refs/ | grep -v /${branch})`
    console.log(refArgument)
    console.log(notArgument)
    console.log(exec(`git log ${refArgument} --oneline --not ${notArgument} | wc -l`).toString())
    return _.toNumber(
      exec(
        `git log ${refArgument} --oneline --not ${notArgument} | wc -l`
      ).toString()
    )
  },
  getLastCommitMessage: function getLastCommitMessage () {
    return exec('git log --format=%B -1').toString()
  },
  getRepoSlug: function getRepoSlug (githubUrl) {
    var ghRegex = /\S+[:|/](\w+(?:[-]\w+)*)\/(\w+(?:[-]\w+)*)/g
    var parsed = ghRegex.exec(githubUrl)
    return (
      `${parsed[1]}/${parsed[2]}`
    )
  }
}
