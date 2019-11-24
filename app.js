const express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
graphqlHttp = require('express-graphql'),
schema = require('./schema/schema'),
mongoose = require('mongoose')
app = express(),
event = []
port = 8080
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))
mongoose.connect('mongodb://demo:idea1234@ds249008.mlab.com:49008/graphql-demo')
mongoose.connection.once('open',()=>{
    console.log("Successfully connected to db")
})
app.use("/graphql",graphqlHttp({
    //schema query and mutation list
    schema,
    pretty: true,
    graphiql:true
}))

app.listen(port,()=>{
   console.log(`serving on port ${port}`)
})

// schema:buildSchema(`
// type Event {
//     _id:Float!
//     description:String!
//     name:String!
// }
// input EventInput{
//     name:String!
//     description:String!
// }
// type rootQuery{
//     events: [Event!]!
// }
// type rootMutation {
//     createEvent(eventInput:EventInput):Event 
// }
// schema{
//     query: rootQuery,
//     mutation:rootMutation
// }
// `),
// rootValue:{
//     events:()=>{return event},//the name of the controller shoulb be smae as that of schmea query/mutaion
//     createEvent:(args)=>{
//         const eve  = {
//             _id:Math.random().toString(),
//             name:args.eventInput.name,
//             description:args.eventInput.name
//         }
//         event.push(eve)
//         return eve
//     }
// } //all resolvers
