/**
 * The Mocha.js software is an MIT software
 */

import {describe, it} from "@angular/core/testing/src/testing_internal";
import {getCourseInfoById} from "../CourseRepository";

const repo = require("../CourseRepository");
var assert = require('assert');
console.log(repo.getCourseInfoById(4));
console.log("hello");
describe('Test CourseInfo', function () {
  it('should return class information given id', function () {
    assert.equal(getCourseInfoById(4), "Software Programming");
  });

  it('Should return Course Number', function () {
    assert.equal(getCourseInfoById(4), '442');
  });
});

describe('Test CourseInfoByUserID', function () {
  it('should return array of information given id', function () {
    assert.equal(repo.getCourseInfoByUserID(1), ["Software Programming", "Introduction to Theory of Computation"]);

  });

  it('Should return Course Numbers given User ID', function () {
    assert.equal(getCourseInfoById(4), ['442', '396']);
  });
});

describe('Test current courses', function () {
  it('should return array of current classes', function () {
    assert.equal(repo.getCourseInfoByUserID(4), ["Linear Algebra", "Software Programming", "Introduction to Theory of Computation"]);

  });

  it('Should return Course Numbers given User ID', function () {
    assert.equal(getCourseInfoById(4), ['309','442', '396']);
  });
});


