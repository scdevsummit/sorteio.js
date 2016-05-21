'use strict'

const fs = require('fs')
const through = require('through2')
const split = require('split')
const concat = require('concat-stream')
const stream = fs.createReadStream('list.csv')

const jsonStream = through(function write (buffer, _, next) {
  const line = buffer.toString()
  const arr = line.split(',')
  if (arr[1] && arr[2] && arr[3])
    this.push(`${arr[1]} - ${arr[2]} ${arr[3]}\n`)
  next()
})

stream
  .pipe(split())
  .pipe(jsonStream)
  .pipe(concat((body) => {
    const list = body.toString().split('\n').filter(i => !!i)
    const random = Math.floor(Math.random() * (list.length))

    console.log(list[random])
  }))
