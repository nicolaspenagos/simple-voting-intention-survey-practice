/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @author Nicolás Penagos Montoya
 * nicolas.penagosm98@gmail.com
 **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

// -------------------------------------
// DECLARATIONS
// -------------------------------------
const idIpunt = document.getElementById('id');
const nameInput = document.getElementById('name');
const registerBtn = document.getElementById('register');
const registeredIdInput = document.getElementById('registeredId');
const voteBtn = document.getElementById('vote');
const showCandidatesBtn = document.getElementById('showCandidates');
const showVotingBtn = document.getElementById('showVoting');
const database = firebase.database();

// -------------------------------------
// FUNCTIONS
// -------------------------------------

/*
*   Register 
*/
register = () =>{

    let i = idIpunt.value;
    let n = nameInput.value;

    if(i == ''){
        alert('Id cannot be an empty value');
    }else if(n == ''){
        alert('Name cannot be an empty value');
    }else{

        let newCandidate = true;

        database.ref('candidates').on('value', function(data){
          data.forEach(
            function(user){
                let u = user.val();
                if(u.id == i){
                    newCandidate = false;
                }  
            }
          );
        });
    
        if(newCandidate){
            let userObject = {
                id: i,
                name:n,
                votes:0
            }
        
            database.ref('candidates/').push().set(userObject);
        }else{
            alert('This candidate has been already registered');
        }
    }

    idIpunt.value = '';
    nameInput.value = '';

}

/*
*   Vote
*/
vote = () =>{

    let i = registeredIdInput.value;
    let keyToSet;
    let userObject;
    let founded=false;

    if(i == ''){
        alert('Id value cannot be empty');
        return;
    }else{

        database.ref('candidates').on('value', function(data){
            data.forEach(
              function(user){
                  let u = user.val();
                  if(u.id == i){
                    userObject = u;
                      u.votes = u.votes + 1;
                      keyToSet = user.key;
                      founded = true;
                  }  
              }
            );
          });
    
          if(founded){
       
            let dir = 'candidates/'+keyToSet;
            console.log(dir);
            console.log(userObject);
            database.ref(dir).set(userObject);
    
          }else{
              alert('The candidate has not been registered so far');
          }
       
    }

     registeredIdInput.value = '';

}

/*
*   Register 
*/
showCandidates = () =>{

    let msg = 'CANDIDATES: \n \n';

    database.ref('candidates').on('value', function(data){
        data.forEach(
          function(user){

              let u = user.val();
              let id = u.id;
              let name = u.name;
              msg += id + '  ' + name + '\n';

          }
        );
      });

      alert(msg)

}

/*
*   Show voting
*/
showVoting = () =>{

    let msg = 'VOTING REPORT \n \n';
    let total = 0;

    database.ref('candidates').on('value', function(data){
        data.forEach(
          function(user){

              let u = user.val();
              total = u.votes + total;

          }
        );
      });

    console.log('total '+total);
    database.ref('candidates').on('value', function(data){
        data.forEach(
          function(user){

              let u = user.val();
              let p;
              if(u.votes == 0){
                p = 0;
              }else{
                p = u.votes / total * 100;
              }
              
              msg += u.name + ' votes: ' + u.votes + '    % '+ p + '\n';

          }
        );
      });

      msg += '-------------------------------- \n ';
      msg += 'Total: ' + total + '      % 100';

      alert(msg);

}

// -------------------------------------
// EVENTS
// -------------------------------------
registerBtn.addEventListener('click', register);
voteBtn.addEventListener('click', vote);
showCandidatesBtn.addEventListener('click', showCandidates);
showVotingBtn.addEventListener('click', showVoting);

