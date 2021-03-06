require ('dotenv').config();

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { makeExecutableSchema } = require('graphql-tools')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { Person } = require('./server/model')
const schema = require('./server/schema')
const resolvers = require('./server/resolvers');

app.use(cors());

mongoose.connect(
    process.env.DATABASE_URL,
        err =>{
            if(err){
                return console.log (err)
            }
        console.log("mongoDB ok")
        }
    );


const execSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});

app.use('/graphql', express.json(), graphqlExpress({ schema: execSchema, context: { Person }}))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}))

app.use ('', express.static(__dirname + '/herokulabapp/dist'))

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/herokulabapp/dist/index.html')
})



const port = process.env.PORT || 3000 

app.listen(port, () => console.log('Example app listening on port 3000!'))