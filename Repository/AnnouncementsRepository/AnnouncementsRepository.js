const mysql = require('mysql');
const logger = require('../../Server/Utilities/Log/Log');
const userRepo = require('../UserRepository/UserRepository');
var config;
try {
  config = require('../../Server/Utilities/Config/database.js');
} catch (error) {
  logger.log('Unable to load database.js in ~/Server/Utilites/Config/database.js!');
  logger.log();
  logger.log('database.js.dummy is the template, copy that, name it database.js');
  logger.log('and replace the dummy data with database credentials.  Ask Will if');
  logger.log('you have any questions.');
}
// let exports = exports || module.exports;

const con = mysql.createConnection(config.user_db_config, (err) => {
  if (err) throw err;
});

exports.getAnnouncementsById = function(User_ID) {
  const course_ids = "SELECT Course_ID FROM `ClassHub-Development`.`Course_History` WHERE Student_ID = ?"; // gets course ids as array
  let course_infos = "SELECT * FROM `ClassHub-Development`.`Course` WHERE Course_ID IN ? AND Year = 2019 AND Term = 'SPRING'"; // gets course info from course ids
  let announcementQuery = "SELECT * FROM `ClassHub-Development`.`Announcements` WHERE Course_ID IN ?"; // gets announcment info from course ids
  // users.getUserInfoByID()

  return new Promise((resolve, reject) => {
    con.query(course_ids, [User_ID], (err, all_courses_taken) => {
      if (err) reject(err);
      if (all_courses_taken && all_courses_taken.length) {
        // result is an array of courses taken by user
        var arr = [];
        for (var x of all_courses_taken) {
          arr.push(x.Course_ID);
        }

        course_infos = course_infos.replace('?', '(' + arr.toString() + ')');

        con.query(course_infos, [], (err, current_courses) => {
          if (err) reject(err);
          if (current_courses && current_courses.length) {
            // result is an array of course data
            var courses_needed = [];
            for (var r of current_courses) {
              courses_needed.push(r.Course_ID);
            }

            announcementQuery = announcementQuery.replace('?', '(' + courses_needed.toString() + ')');

            con.query(announcementQuery, [], async (err, raw_announcements) => {
              // all the announcements
              if (err) reject(err);
              var users = [];
              /*
                announcements = [
                   {
                     course: {
                       id: 1,
                       course_subject: 'CSE',
                       course_number: 442,
                     },
                     user: {
                       id: 1,
                       first_name: 'William',
                       last_name: 'Pritchard',
                       avi: 'https://placehold.it/250x250'
                     },
                     user_role: 'Professor',
                     date: new Date(),
                     title: 'Announcement title',
                     body: 'This is the announcement body'
                   }
                 ];
               */
              var announcements = [];
              for (let announcement of raw_announcements) {
                var course = current_courses.find(x => x.Course_ID === announcement.Course_ID);
                var user = users.find(x => x.id === announcement.User_ID);
                if (!user) {
                  user = await userRepo.getUserById(announcement.User_ID);
                  users.push(user);
                }
                announcements.push({
                  user_role: 'Professor',
                  date: announcement.Date,
                  title: announcement.Announcement_Title,
                  body: announcement.Announcement_Body,
                  course: {
                    id: course.Course_ID,
                    course_subject: course.Course_Subject,
                    course_number: course.Course_Number
                  },
                  user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    avi: user.avi
                  }
                });
              }

              resolve(announcements); // if there are no announcements, [] is resolved.
            });
          } else {
            resolve([]); // Courses found, but none are current
          }
        });
      } else {
        resolve([]); // No courses taken
      }
    });
  });
};

exports.createNewAnnouncement = function (Course_ID, User_ID, Date, Announcement_Title, Announcement_Body, Course_Term) {
  const sql = "INSERT INTO `ClassHub-Development`.`Announcements` (Course_ID, User_ID, Date, Announcement_Title, Announcement_Body) VALUES (?, ?, ?, ?, ?);";

  return new Promise((resolve, reject) => {
    con.query(sql, [Course_ID, User_ID, Date, Announcement_Title, Announcement_Body, Course_Term], function (err, result) {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};
