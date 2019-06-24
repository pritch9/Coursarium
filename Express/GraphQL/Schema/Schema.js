let {
  GraphQLSchema: Schema
} = require('graphql');

let {RootQuery, RootMutation} = require('./SchemaUtil');

let s = new Schema({
  query: RootQuery
  // query: RootQuery,
  // mutation: RootMutation
});

module.exports = s;
