const { ApolloServer } = require('apollo-server');

const students = [
    { id: 1, name: "Ivan", lastName: "Lopez", email: "ivanlo@gmail.com"},
    { id: 2, name: "Andres", lastName: "Posada", email: "andres.posada@gmail.com"},
    { id: 3, name: "Paola", lastName: "Meneses", email: "paolameneses@gmail.com"},
]

const courses = [
    { name: "Graphql", price: 12.67, students: [1,3] },
    { name: "reactjs", price: 18.67, students: [2,3] },
    { name: "nodejs", price: 20.67, students: [1,2] },
    { name: "vuejs", price: 15.67, students: [1,3] }
    
]
const typeDefs = `

    type Student {
        name: String,
        fullName: String,
        lastName: String,
        course: [Courses],
        email: String
    }

    type Courses {
        name: String,
        price: Float
    }

    type Message {
        message: String
    }

    type Query {
        courses: [Courses]
        students: [Student]
        hello(name: String!): Message
    }
`
const resolvers = {
    Query: {
        students(root, args, contexto) {
            return students
        },
        courses(root, args, contexto) {
            return courses
        },
        hello(root, args, contexto){
            return { message: `hello ${args.name}` } 
        }
    },
    Student: {
        fullName(root, args, contexto) {
            return `${root.name} ${root.lastName}`
        },
        course(root, args, contexto) {
            const results = courses.filter(data => data.students.includes(root.id))
            return results
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers});

server.listen().then(({ url }) => console.log(`server running in ${ url }`));
