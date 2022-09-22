const express = require('express')
const {buildSchema} = require('graphql')
const graphqlHttp = require('express-graphql')

var Schema = buildSchema(`

  type Film{
    id: Int,
    name: String,
    poster: String,
    price:Int
  }

  input FilmInput{
    name: String,
    poster: String,
    price: Int
  }

  type Query{
    getNowplayingList: [Film]
  }

  type Mutation{
    createFilm(input: FilmInput):Film,
    updateFilm(id:Int!,input:FilmInput):Film,
    deleteFilm(id:Int!):Int
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
  getNowplayingList() {
    return faskeDb
  },
  createFilm({input}) {
    var obj = {...input, id:faskeDb.length+1}
    faskeDb.push(obj)
    return obj 
  },
  updateFilm({id,input}){
    console.log(id,input)
    var current = null
    faskeDb = faskeDb.map(item=> {
      if(item.id === id){
        current = {...item, ...input}
        return {...item, ...input}
      }
      return item 
    })
    return current
  },
  deleteFilm({id}){
    faskeDb = faskeDb.filter(item=>item.id!==id)
    return 1
  }
}

var app = express()
app.use('/graphql', graphqlHttp({
  schema: Schema,
  rootValue: root,
  graphiql: true 
}))

app.listen(3000, function () {
  console.log("127.0.0.1:3000")
})