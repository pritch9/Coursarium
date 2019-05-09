const repo = require('../../Repository/SchoolRepository/SchoolRepository.js');

function checkSchoolList() {
  var list = ["RowDataPacket { School_Name: 'University at Buffalo (SUNY)' }"];
  var test_list1 = [];
  var repo_list = repo.getSchoolList();
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

console.log(checkSchoolList());
