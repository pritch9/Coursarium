let {
  GraphQLString: String,
  GraphQLInt: Int,
  GraphQLInt: ID,
  GraphQLList: List,
  GraphQLNonNull: Required,
  GraphQLObjectType: Object
} = require('graphql');

let RootQuery = new Object({
  name: 'RootQuery',
  fields: () => {
    let {School, User} = require('../../SchemaUtil');
    return {
      school: {
        type: School,
        args: {
          id: {type: new Required(ID)}
        },
        resolve: function (_, args, {loaders}) {
          return loaders.getSchoolById.load(args.id);
        }
      },
      schools: {
        type: new List(School),
        resolve: function (_, args, {loaders}) {
          return loaders.getAllSchools.load(0);
        }
      },
      user: {
        type: User,
        args: {
          id: {type: ID},
          email: {type: String}
        },
        resolve(_, args, {loaders}) {
          return loaders.getUserById.load(args);
        }
      },
      generatePasswordHash: {
        type: String,
        args: {
          password: {type: new Required(String)}
        },
        resolve(_, args, {loaders}) {
          return loaders.generatePasswordHash.load(args.password);
        }
      }
    };
  }
});

module.exports = RootQuery;
