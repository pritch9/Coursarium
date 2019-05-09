/********************************** */
/**** Imports ********************* */
/********************************** */

const path = require('path');
const db = require(path.resolve(__dirname, '../../Server/Utilities/Database/Database'));
const utils = require(path.resolve(__dirname, '../../Server/Utilities/Utils/Utils'));
const courseRepo = require(path.resolve(__dirname, '../CourseRepository/CourseRepository'));


/********************************** */
/**** Constants ******************* */
/********************************** */

const name = 'AnnouncementsRepository';


/********************************** */
/**** Functions ******************* */
/********************************** */


/**
 * Gets announcements specific to the a user.
 *
 * *ordered by newest first
 *
 * @param User_ID ID of user to fetch announcements
 * @returns {Promise<any[]>} List of announcements
 */
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
          const {
            User_First_Name, Date: Date1, Announcement_Body, User_ID: User_ID1, User_AVI, Course_ID, User_Role, Announcement_Title, User_Last_Name, Course_Subject, Course_Number
          } = row;
          row = {
            title: Announcement_Title,
            body: Announcement_Body,
            date: new Date(Date1),
            course: {
              id: Course_ID,
              course_subject: Course_Subject,
              course_number: Course_Number
            },
            user: {
              id: User_ID1,
              first_name: User_First_Name,
              last_name: User_Last_Name,
              avi: User_AVI,
              role: User_Role
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


/**
 * Posts a new announcement given a user (person announcing) and a course.
 *
 * @param Course_ID ID of the course
 * @param User_ID User's ID
 * @param Announcement_Title Title of the announcement
 * @param Announcement_Body Body of the announcement
 * @param Course_Term Semester and year of the announcement
 * @returns {Promise<number>} Error code.  0 => post successful
 */
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
            resolve(0); // Message posted
            con.release();
          });
        });
      } else {
        utils.reject(name, 'User is not professor, can not post announcement!', '', reject); // Unable to verify user as professor
      }
    }).catch(err => {
      utils.reject(name, error_msg, err, reject);
    });
  });
};
