const db = require('../../Server/Utilities/Database/Database');
// let exports = exports || module.exports;
const name = 'AnnouncementsRepository';
exports.getAnnouncementsById = function (User_ID) {
  const sql =
    "SELECT " +
    "announcement.*, " +
    "user.first_name AS User_First_Name, " +
    "user.last_name AS User_Last_Name, " +
    "user.avi AS User_AVI, " +
    "course.Course_Subject, " +
    "course.Course_Number " +
    "FROM " +
    "Announcements announcement " +
    "CROSS JOIN Course_History history ON history.Student_ID = ? " +
    "CROSS JOIN Users user ON user.id = announcement.User_ID " +
    "CROSS JOIN Course course ON course.Course_ID = announcement.Course_ID " +
    "WHERE " +
    "announcement.Course_ID = history.Course_ID;";

  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      con.query(sql, [User_ID], (err, result) => {
        if (err) {
          logger.error(name, err);
          reject(err);
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
              avi: row.User_AVI
            }
          };
          retVal.push(row);
        }
        resolve(retVal);
      }).on('end', con.release);
    });
  }).catch(err => {
    console.log(name, err);
  });
};

exports.createNewAnnouncement = function (Course_ID, User_ID, Date, Announcement_Title, Announcement_Body, Course_Term) {
  const sql = "INSERT INTO `ClassHub-Development`.`Announcements` (Course_ID, User_ID, Date, Announcement_Title, Announcement_Body) VALUES (?, ?, ?, ?, ?);";

  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      con.query(sql, [Course_ID, User_ID, Date, Announcement_Title, Announcement_Body, Course_Term], function (err, result) {
        if (err) {
          logger.error(name, err);
          reject(err);
          return;
        }
        resolve(result[0]);
      }).on('end', con.release);
    });
  }).catch(err => {
    console.log(name, err);
  });
};
