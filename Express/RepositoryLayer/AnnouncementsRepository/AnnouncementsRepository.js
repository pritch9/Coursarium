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
exports.getAnnouncementsById = function (data) {
  const {announcement_id} = data[0];
  const sql = "SELECT * FROM Announcements WHERE id = ? ORDER BY date DESC"
  const error_msg = 'Unable to obtain announcements!';

  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [announcement_id], (err, result) => {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          con.release();
          return;
        }
        resolve(result);
        con.release();
      });
    });
  });
};

exports.getAnnouncementsByCourseId = function (data) {
  const {course_id} = data[0];
  const sql = "SELECT * FROM Announcements WHERE course_id = ? ORDER BY date DESC"
  const error_msg = 'Unable to obtain announcements!';

  return new Promise((resolve, reject) => {
    db.getConnection((err, con) => {
      if (err) {
        utils.reject(name, error_msg, err, reject);
        return;
      }
      con.query(sql, [course_id], (err, result) => {
        if (err) {
          utils.reject(name, error_msg, err, reject);
          con.release();
          return;
        }
        resolve(result);
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
