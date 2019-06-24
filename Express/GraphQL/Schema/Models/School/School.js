let {
  GraphQLString: String,
  GraphQLInt: Int,
  GraphQLInt: ID,
  GraphQLList: List,
  GraphQLObjectType: Object
} = require('graphql');

let School = new Object({
  name: "School",
  description: "School, College, or University",
  fields: () => {
    let {User, State} = require('../../SchemaUtil');
    return {
      id: {type: ID},
      name: {type: String},
      address1: {type: String},
      address2: {type: String},
      city: {type: String},
      state: {type: State},
      zip: {type: String},
      contact_id: {type: ID},
      contact: {
        type: User,
        resolve(school, args, {loaders}) {
          return loaders.getUserById(school.contact_id);
        }
      }
    };
  }
});

module.exports = School;
