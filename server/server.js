const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const uuid = require('uuid/v1');


const schema = buildSchema(`
    type Query{
        task(id:String!):Task
        tasks:[Task]
    },

    type Mutation {
        edit(id:String! , isDone: Boolean!):[Task]
        delete(id:String!):[Task]
        add(name:String!):[Task]
    }

    type Task {
        id: String
        name: String
        isDone: Boolean
    }

`);

const tasks = [
    {
        id: '1',
        name: "Do something",
        isDone: false
    },
    {
        id: '2',
        name: "Do something else",
        isDone: true
    },
    {
        id: '3',
        name: "Do something more",
        isDone: false
    },
    {
        id: '4',
        name: "Do something again",
        isDone: true
    },
];


const getTask = (args) => {
    const id = args.id;
    return tasks.filter(e => e.id === id)[0]
}

const getTasks = (args) => {
    return tasks;
}

const doneTask = (args) => {
    const id = args.id;
    const isDone = args.isDone;

    tasks.map(e => {
        if (e.id === id) {
            e.isDone = isDone
        }
    })
    return tasks;
}

const deleteTask = (args) => {
    const id = args.id;
    const task = tasks.find(e => e.id === id);
    if (task) {
        tasks.splice(tasks.indexOf(task), 1);
        return tasks;
    }
}

const addTask = (args) => {
    const name = args.name;
    tasks.push({
        id: uuid(),
        name: name,
        isDone: false
    })

    return tasks;
}



const root = {
    task: getTask,
    tasks: getTasks,
    edit: doneTask,
    delete: deleteTask,
    add: addTask
};

const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use('/graphql', expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 4000, () => console.log('Express graphQl server running on localhost:4000/graphql'));