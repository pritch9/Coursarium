let {
  GraphQLEnumType: Enum
} = require('graphql');

let Term = new Enum({
  name: "Term",
  description: "Semester of the year",
  values: {
    FAL: {
      value: "FAL",
      description: "Fall"
    },
    SUM: {
      value: "SUM",
      description: "Summer"
    },
    SPR: {
      value: "SPR",
      description: "Spring"
    },
    WIN: {
      value: "WIN",
      description: "Winter"
    }
  }
});

module.exports = Term;
