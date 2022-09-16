const express = require('express')
const {buildSchema} = require('graphql')
const graphqlHttp = require('express-graphql')

var Schema = buildSchema(`
  type Query{
    hello: String, 
    getName: String, 
    getAge: Int
  }
`)

// 处理器
const root = {
  hello: () => {
    // 通过数据库去查
    var str = 'hello world'
    return str
  },
  getName: () => {
    return 'hhh'
  }, 
  getAge: () => {
    return 100
  }
}

var app = express()
app.use('/home', function (req, res) {
  res.send('home data')
})
app.use('/list', function (req, res) {
  res.send('list data')
})
app.use('/graphql', graphqlHttp({
  schema: Schema,
  rootValue: root,
  graphiql: true 
}))

app.listen(8000, function () {
  console.log('127.0.0.1:8000')
}
  )