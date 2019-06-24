let {
  GraphQLString: String,
  GraphQLInt: Int,
  GraphQLInt: ID,
  GraphQLList: List,
  GraphQLObjectType: Object
} = require('graphql');

let User = new Object({
  name: "User",
  description: "Coursarium User",
  fields: () => {
    let {Course, Announcement, Term} = require('../../SchemaUtil');
    return {
      id: {type: ID},
      first_name: {type: String},
      last_name: {type: String},
      nick_name: {type: String},
      email: {type: String},
      avi: {type: String},
      courses: {
        type: new List(Course),
        args: {
          term: {type: Term},
          year: {type: Int},
          subject: {type: String}
        },
        resolve(user, args, {loaders}) {
          loaders.getCoursesByUserId.load({user_id: user.id, args});
        }
      },
      announcements: {
        type: new List(Announcement),
        args: {
          course: {type: ID},
          courses: {type: new List(ID)}
        },
        resolve(user, args, {loaders}) {
          return loaders.getAnnouncementsByUserId.load({user_id: user.id, args});
        }
      }
    }
  }
});

module.exports = User;
