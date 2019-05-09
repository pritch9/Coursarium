const path = require('path');

exports.AnnouncementService = require(path.resolve(__dirname, 'Announcements/AnnouncementsService'));
exports.AuthenticationService = require(path.resolve(__dirname, 'Authentication/AuthenticationService'));
exports.CourseService = require(path.resolve(__dirname, 'Courses/CourseService'));
exports.SchoolService = require(path.resolve(__dirname, 'Schools/SchoolService'));
exports.UserService = require(path.resolve(__dirname, 'Users/UserService'));

exports.registerRoutes = function (app) {
  this.AnnouncementService.registerRoutes(app);
  this.AuthenticationService.registerRoutes(app);
  this.CourseService.registerRoutes(app);
  this.SchoolService.registerRoutes(app);
  this.UserService.registerRoutes(app);
};
