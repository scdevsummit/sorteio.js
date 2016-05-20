'use strict'

const fs = require('fs')

fs.readFile('lista.csv', 'utf8', (err, data) => {
  const json = data.split('\n')
   .map((line) => line.split(','))
   .filter((line) => !/Front/.test(line[4]))
   .filter((line) => !!line[2])
   .map((line) => `${line[1]} - ${line[2]} ${line[3]}`)

  const random = Math.floor(Math.random() * (json.length))

  const param = process.argv[2];
  if (param && param.toLowerCase() === 'all')
    return console.log(json)
  console.log(json[random])
})
