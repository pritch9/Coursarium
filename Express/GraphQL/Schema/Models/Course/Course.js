let {
  GraphQLString: String,
  GraphQLInt: Int,
  GraphQLInt: ID,
  GraphQLList: List,
  GraphQLObjectType: Object
} = require('graphql');


let Course = new Object({
  name: "course",
  description: "School course",
  fields: () => {
    let {School, User} = require('../../SchemaUtil');
    return {
      id: {type: ID},
      name: {type: String},
      description: {type: String},
      school_id: {type: ID},
      school: {
        type: School,
        resolve(course, _, {loaders}) {
          return loaders.getSchoolById.load(course.school_id);
        }
      },
      faculty: {
        type: new List(User),
        resolve(course, _, {loaders}) {
          return loaders.getFaculty.load(course.id);
        }
      },
      students: {
        type: new List(User),
        resolve(course, _, {loaders}) {
          return loaders.getUsersByCourseId.load(course.id);
        }
      },
      seats_available: {type: Int}
    };
  }
});

module.exports = Course;
