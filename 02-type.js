const express = require('express')
const {buildSchema} = require('graphql')
const graphqlHttp = require('express-graphql')

var Schema = buildSchema(`
  type Account{
    name: String, 
    age: Int,
    location: String
  }

  type Film{
    id: Int,
    name: String,
    poster: String,
    price:Int
  }

  type Query{
    hello: String, 
    getName: String, 
    getAge: Int,
    getAllNames: [String],
    getAllAges: [Int],
    getAccountInfo: Account,
    getNowplayingList: [Film],
    getFilmDetail(id:Int!):Film
  }
`)

// 模拟数据库
var faskeDb = [{
  id:1,
  name:"1111",
  poster:"http://1111",
  price:100
},
{
  id:2,
  name:"2222",
  poster:"http://2222",
  price:200
},
{
  id:3,
  name:"3333",
  poster:"http://333",
  price:300
}]

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
  },
  getAllNames: () => {
    return ['kkk', 'hhh', 'lll']
  },
  getAllAges: () => {
    return [19, 20 ,21]
  },
  getAccountInfo() {
    return {
      name: 'hhh',
      age: '100',
      location: 'weizhi'
    }
  },
  getNowplayingList() {
    return faskeDb
  },
  getFilmDetail({id}){
    return faskeDb.filter(item => item.id === id)[0]
  }
}

var app = express()
app.use('/graphql', graphqlHttp({
  schema: Schema,
  rootValue: root,
  graphiql: true 
}))

app.listen(3000, function () {
  console.log('127.0.0.1:3000')
})