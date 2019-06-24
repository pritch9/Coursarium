let {
  GraphQLString: String,
  GraphQLInt: ID,
  GraphQLObjectType: Object
} = require('graphql');

let Announcement = new Object({
  name: "Announcement",
  fields: () => {
    let {User, Course} = require('../../SchemaUtil');
    return {
      id: {type: ID},
      title: {type: String},
      body: {type: String},
      date: {type: String},
      course_id: {type: ID},
      course: {
        type: Course,
        resolve(announcement, _, {loaders}) {
          return loaders.getCourseById.load(announcement.course_id);
        }
      },
      user_id: {type: ID},
      user: {
        type: User,
        resolve(announcement, _, {loaders}) {
          return loaders.getUserById.load(announcement.user_id);
        }
      }
    };
  }
});

module.exports = Announcement;
