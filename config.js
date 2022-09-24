const { exec } = require('child_process')
const branch = () => new Promise((resolve, reject) => {
  return exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
    if (err) { resolve('production') } else if (typeof stdout === 'string') { resolve(stdout.trim())}
  })
})

module.exports = { branch }
