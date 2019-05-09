USE `ClassHub-Development`;

SELECT course.*, history.Student_ID, professor.* FROM Course course, Course_History history, Users professor
WHERE course.Course_ID = 1 AND history.Course_ID = course.Course_ID AND history.Course_Role = 'PROFESSOR' AND history.Student_ID = professor.id;
