const repo = require('../../Repository/StudentRepository/StudentRepository.js');

async function checkStudentList() {
  var list = [
    {full_name: 'Slemmer, Bobby'},
    {full_name: 'Slemmer, Bobby'}
  ];
  var test_list1 = [];
  var repo_list = await repo.getStudentListByCourseID(6);
  var flag = true;
  for (let i = 0; i < 2; ++i) {
    console.log('Comparing: \'' + list[i].full_name + '\' to \'' + repo_list[i].full_name + '\'');
    if (list[i].full_name !== repo_list[i].full_name) {
      flag = false;
      break;
    }
  }

  if (flag == true) {
    console.log("Lists match!")
  } else {
    console.log("Lists do not match!")
  }
}

console.log(checkStudentList());
