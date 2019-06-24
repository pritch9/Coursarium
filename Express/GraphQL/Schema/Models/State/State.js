let {
  GraphQLEnumType: Enum
} = require('graphql');

let State = new Enum({
  name: 'State',
  values: {
    ALABAMA: {value: "ALABAMA"},
    ALASKA: {value: "ALASKA"},
    ARIZONA: {value: "ARIZONA"},
    ARKANSAS: {value: "ARKANSAS"},
    CALIFORNIA: {value: "CALIFORNIA"},
    COLORADO: {value: "COLORADO"},
    CONNECTICUT: {value: "CONNECTICUT"},
    DELAWARE: {value: "DELAWARE"},
    FLORIDA: {value: "FLORIDA"},
    GEORGIA: {value: "GEORGIA"},
    HAWAII: {value: "HAWAII"},
    IDAHO: {value: "IDAHO"},
    ILLINOIS: {value: "ILLINOIS"},
    INDIANA: {value: "INDIANA"},
    IOWA: {value: "IOWA"},
    KANSAS: {value: "KANSAS"},
    KENTUCKY: {value: "KENTUCKY"},
    LOUISIANA: {value: "LOUISIANA"},
    MAINE: {value: "MAINE"},
    MARYLAND: {value: "MARYLAND"},
    MASSACHUSETTS: {value: "MASSACHUSETTS"},
    MICHIGAN: {value: "MICHIGAN"},
    MINNESOTA: {value: "MINNESOTA"},
    MISSISSIPPI: {value: "MISSISSIPPI"},
    MISSOURI: {value: "MISSOURI"},
    MONTANA: {value: "MONTANA"},
    NEVADA: {value: "NEVADA"},
    NEW_HAMPSHIRE: {value: "NEW_HAMPSHIRE"},
    NEW_JERSEY: {value: "NEW_JERSEY"},
    NEW_MEXICO: {value: "NEW_MEXICO"},
    NEW_YORK: {value: "NEW_YORK"},
    NORTH_CAROLINA: {value: "NORTH_CAROLINA"},
    NORTH_DAKOTA: {value: "NORTH_DAKOTA"},
    OHIO: {value: "OHIO"},
    OKLAHOMA: {value: "OKLAHOMA"},
    OREGON: {value: "OREGON"},
    PENNSYLVANIA: {value: "PENNSYLVANIA"},
    RHODE_ISLAND: {value: "RHODE_ISLAND"},
    SOUTH_CAROLINA: {value: "SOUTH_CAROLINA"},
    SOUTH_DAKOTA: {value: "SOUTH_DAKOTA"},
    TENNESSEE: {value: "TENNESSEE"},
    TEXAS: {value: "TEXAS"},
    UTAH: {value: "UTAH"},
    VERMONT: {value: "VERMONT"},
    VIRGINIA: {value: "VIRGINIA"},
    WASHINGTON: {value: "WASHINGTON"},
    WEST_VIRGINIA: {value: "WEST_VIRGINIA"},
    WISCONSIN: {value: "WISCONSIN"},
    WYOMING: {value: "WYOMING"}
  }
});

module.exports = State;
