/**
 * Created by Andreas on 23/5/17.
 */

function insertMember(){
    var firstname,lastname,ssn,occupation,street,zip,city,country,regCountry,isEmployee;
    firstname=document.getElementById('inputFirstName').value;
    lastname=document.getElementById('inputLastName').value;
    ssn=document.getElementById('inputID').value;
    occupation=document.getElementById('inputOccupation').value;
    street=document.getElementById('inputAddress').value;
    zip=document.getElementById('inputZip').value;
    city=document.getElementById('inputCity').value;
    country=document.getElementById('inputCountry').value;
    regCountry=document.getElementById('inputRegCountry').value;
    isEmployee=document.getElementById('inputIsEmployee').checked;

    console.log("Res:"+firstname,lastname,ssn,occupation,street,zip,city,country,regCountry,isEmployee);
    createNewMember(firstname,lastname,ssn,occupation,street,zip,city,country,regCountry,isEmployee);
}