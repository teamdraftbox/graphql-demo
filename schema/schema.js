const graphql = require('graphql');
const { GraphQLString, GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;
const _ = require("lodash");
const Book = require('../models/books');
const Author = require('../models/author')


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        authorName: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({authorId:parent.id})
            }
        }
    })

})

const BookType = new GraphQLObjectType({   // Defining the datatypes that will be available to the user
    name: 'Book',                          //on sending a grapql query
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId)
            }
        }
    }
    )
})


const RootQuery = new GraphQLObjectType({   //Defining possible ways a client can query a data
    name: "RootQueryTpe",
    fields: {
        book: {            // query name is book
            type: BookType,  // return book data type
            args: { id: { type: GraphQLID } }, // args required to query the data 

            resolve(parent, args) {   // action to be done when the query book is called
                return Book.findById(args.id)
                // return _.find(data, { id: args.id }) // ideally should return the result form the db

            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id)
                // return _.find(authorData, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({})
                // return data
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({})
                // return authorData
            }
        }
    }
})

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                authorName: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                let author = new Author({
                    authorName: args.authorName,
                    age: args.age
                })
                return author.save()
            }
        },
        addBooks: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})
// model of query from query
// query{
//     book(id:"1"){
//       id,
//       name,
//       genre

//     }
//   }

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})