const path = require('path');
const db = require(path.resolve(__dirname, '../../Server/Utilities/Database/Database'));
const utils = require(path.resolve(__dirname, '../../Server/Utilities/Utils/Utils'));
const courseRepo = require(path.resolve(__dirname, '../CourseRepository/CourseRepository'));

// let exports = exports || module.exports;
const name = 'AnnouncementsRepository';
exports.getAnnouncementsById = function (User_ID) {
  const sql =
    "SELECT \
      announcement.*, \
      user.first_name AS User_First_Name, \
      user.last_name AS User_Last_Name, \
      user.avi AS User_AVI, \
      course.Course_Subject, \
      course.Course_Number, \
      prof_history.Course_Role as User_Role \
    FROM \
      Announcements announcement \
      CROSS JOIN Course_History history ON \
        history.Student_ID = ? \
      CROSS JOIN Users user ON \
        user.id = announcement.User_ID \
      LEFT JOIN Course_History prof_history ON \
        prof_history.Course_ID = announcement.Course_ID AND \
        prof_history.Student_ID = announcement.User_ID \
      CROSS JOIN Course course ON \
        course.Course_ID = announcement.Course_ID \
    WHERE \
      announcement.Course_ID = history.Course_ID \
    ORDER BY announcement.Date DESC";
  const error_msg = 'Unable to obtain announcements!';

  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [User_ID], (err, result) => {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          con.release();
          return;
        }
        let retVal = [];
        if (!result || !result.length) {
          resolve([]);
        }
        for (let row of result) {
          row = {
            title: row.Announcement_Title,
            body: row.Announcement_Body,
            date: new Date(row.Date),
            course: {
              id: row.Course_ID,
              course_subject: row.Course_Subject,
              course_number: row.Course_Number
            },
            user: {
              id: row.User_ID,
              first_name: row.User_First_Name,
              last_name: row.User_Last_Name,
              avi: row.User_AVI,
              role: row.User_Role
            }
          };
          retVal.push(row);
        }
        resolve(retVal);
        con.release();
      });
    });
  });
};

exports.createNewAnnouncement = function (Course_ID, User_ID, Announcement_Title, Announcement_Body, Course_Term) {
  const sql = "INSERT INTO `ClassHub-Development`.`Announcements` (Course_ID, User_ID, Date, Announcement_Title, Announcement_Body) VALUES (?, ?, ?, ?, ?);";
  const error_msg = 'Unable to create new announcement!';
  return new Promise((resolve, reject) => {
    courseRepo.verifyCourseProfessor(User_ID, Course_ID).then(verified => {
      if (verified) {
        db.getConnection((err, con) => {
          if (err) {
            utils.reject(name, error_msg, err, reject);
            return;
          }
          con.query(sql, [Course_ID, User_ID, new Date(Date.now()), Announcement_Title, Announcement_Body, Course_Term], err => {
            if (err) {
              utils.reject(name, error_msg, err, reject);
              con.release();
              return;
            }
            resolve({error: 0}); // Message posted
            con.release();
          });
        });
      } else {
        resolve({error: 2}); // Unable to verify user as professor
      }
    }).catch(err => {
      utils.reject(name, error_msg, err, reject);
    });
  });
};
