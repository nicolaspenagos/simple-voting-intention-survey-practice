/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @author Nicolás Penagos Montoya
 * nicolas.penagosm98@gmail.com
 **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

//Declarations
const idIpunt = document.getElementById('id');
const nameInput = document.getElementById('name');
const registerBtn = document.getElementById('register');
const registeredIdInput = document.getElementById('registeredId');
const voteBtn = document.getElementById('vote');
const showCandidatesBtn = document.getElementById('showCandidates');
const showVoting = document.getElementById('showVoting');

const database = firebase.database();



//FUNCTIONS
register = () =>{

    let i = idIpunt.value;
    let n = nameInput.value;

    if(i == ''){
        alert('Id cannot be an empty value');
    }

    if(n == ''){
        alert('Name cannot be an empty value');
    }

    let userObject = {
        id: i,
        name:n
    }

    database.ref('candidates/').push().set(userObject);
 

}

registerBtn.addEventListener('click', register);