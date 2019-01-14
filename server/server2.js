const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const uuid = require('uuid/v1');


const schema = buildSchema(`
    type Query{
        course(id:Int!):Course
        courses(topic:String) :[Course]
        task(id:String!):Task
        tasks:[Task]
    },

    type Mutation {
        update(id:Int! , topic:String!):Course
        edit(id:String! , isDone: Boolean!):[Task]
        delete(id:String!):[Task]
        add(name:String!):[Task]
    }

    type Course {
        id: Int
        title: String 
        author:String
        description:String
        topic:String
        url:String
    }

    type Task {
        id: String
        name: String
        isDone: Boolean
    }

`);

var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]

const tasks = [
    {
        id: '1',
        name: "Do something",
        isDone: true
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
        isDone: false
    },
];



const getCourse = (args) => {
    const id = args.id;
    return coursesData.filter(course => course.id === id)[0];
    // return null;
}

const getCourses = (args) => {
    if (args.topic) {
        const topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }

}

const updateCourse = (args) => {
    const id = args.id;
    const topic = args.topic;
    coursesData.map(e => {
        if (e.id === id) {
            e.topic = topic
        }
    });

    return coursesData.filter(e => e.id === id)[0];
}

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
    course: getCourse,
    courses: getCourses,
    update: updateCourse,
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

app.listen(4000, () => console.log('Express graphQl server running on localhost:4000/graphql'));