let {
  GraphQLString: String,
  GraphQLInt: Int,
  GraphQLInt: ID,
  GraphQLList: List,
  GraphQLObjectType: Object
} = require('graphql');

let RootMutation = new Object({
  name: 'RootMutation',
  fields: () => {
    let {User} = require('../../SchemaUtil');
    return {
      createTempUser: {
        type: User,
        resolve() {
          return null;
        }
      }
    };
  }
});

module.exports = RootMutation;
