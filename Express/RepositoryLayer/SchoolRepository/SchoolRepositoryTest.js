const repo = require('./SchoolRepository.js');

function checkSchoolList() {
  let list = ["RowDataPacket { School_Name: 'University at Buffalo (SUNY)' }"];
  let test_list1 = [];
  let repo_list = repo.getSchoolList();
  let flag = true;
  for(let i = 0; i < 2; ++i){
    test_list1.push(repo_list[i]);
    if(list[i] !== test_list1[i]){
      flag = false;
    }
  }

  if (flag) {
    console.log("Lists match!")
  } else {
    console.log("Lists do not match!")
  }
}

console.log(checkSchoolList());
