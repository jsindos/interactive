const util = require('util')
const readFile = util.promisify(require('fs').readFile)
const writeFile = util.promisify(require('fs').writeFile)

// [ 'Australia', 'Canada', 'Germany', 'Singapore', 'France', 'China', 'USA', 'UK' ]

const main = async () => {
  const file = String(await readFile('/Users/josephtsindos/Downloads/MM_latest/Australia-Table 1.csv'))
  const splitFile = file.split('\n')
  const firstLine = splitFile[0].split(',')
  firstLine[3] = 'Medium Impact'
  firstLine[5] = 'Small Impact'
  splitFile[0] = firstLine
  await writeFile('/Users/josephtsindos/Downloads/MM_latest/Australia-Table 1.csv', splitFile.join('\n'))
}

main()
