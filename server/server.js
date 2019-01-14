const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');


const schema = buildSchema(`
    type Query{
        message:String
    }
`);

const root = {
    message: () => 'Hello world!'
};

const app = express();

app.use('/graphql', expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Express graphQl server running on localhost:4000/graphql'));