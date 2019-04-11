const repo = require('../../Repository/StudentRepository/StudentRepository.js');

function checkStudentList() {
  var list = ["RowDataPacket { full_name: 'Slemmer, Bobby' }", "RowDataPacket { full_name: 'Slemmer, Bobby' }"];
  var test_list1 = [];
  var repo_list = repo.getStudentListByCourseID(6);
  var flag = true;
  for(let i = 0; i < 2; ++i){
    test_list1.push(repo_list[i]);
    if(list[i] !== test_list1[i]){
      flag = false;
    }
  }

  if(flag == true){
    console.log("Lists match!")
  } else {
    console.log("Lists do not match!")
  }
}

console.log(checkStudentList());
