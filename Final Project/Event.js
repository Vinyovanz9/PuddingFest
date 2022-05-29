const firebaseConfig = {
    apiKey: "AIzaSyBe_N2W_vRpzPzWZdgya6ovBCbJtxglbl8",
    authDomain: "bnccfinalprojectfront-end.firebaseapp.com",
    projectId: "bnccfinalprojectfront-end",
    storageBucket: "bnccfinalprojectfront-end.appspot.com",
    messagingSenderId: "399368863703",
    appId: "1:399368863703:web:4b8ae8708f7811d6025592",
    measurementId: "G-1JTQBEE5D0"
  };

firebase.initializeApp(firebaseConfig);
var firestore=firebase.firestore();

const submitBtn=document.querySelector('#Submit');

let userName=document.querySelector('#userFullName');
let userEmail=document.querySelector('#userEmail');
let userPhoneNumber= document.querySelector('#userPhoneNumber');
let userOptions= document.getElementById("userOptions");
let error1=document.querySelector('#error_msg1');
let error2=document.querySelector('#error_msg2');
let error3=document.querySelector('#error_msg3');

const db=firestore.collection("BNCCFinalProjectFront-End");

submitBtn.addEventListener('click',function(event){
    event.preventDefault();
    error1.innerText='';
    error2.innerText='';
    error3.innerText='';
  
    let userNameInput = userName.value;
    let userEmailInput = userEmail.value;
    let userPhoneNumberInput = userPhoneNumber.value;
    let userOptionsInput = userOptions.options[userOptions.selectedIndex].text;
    
    if(userNameInput.length<=1){
        error1.innerText='Name must be filled';
    }

    else if((!(userEmailInput.includes('@')))||userEmailInput.length==0){
        error2.innerText='Email must be filled and include "@"';
    }
    
    else if((!(userPhoneNumberInput.startsWith('08')))||
    userPhoneNumberInput.length==0 || userPhoneNumberInput.length>14){
        error3.innerText='Phone number must be filled, the first and second digit must be 08, and no more than 14 digits';
    }

    else{
        let param = {Name: userNameInput, Email: userEmailInput, PhoneNumber: userPhoneNumberInput, Options: userOptionsInput}
        $.ajax({
            url:'https://jsonplaceholder.typicode.com/posts',
            type: 'POST',
            data: JSON.stringify(param),
            success:function(data){
                console.log(data);
            }
        })
        db.doc().set({
            Name: userNameInput,
            Email: userEmailInput,
            PhoneNumber: userPhoneNumberInput,
            Options: userOptionsInput
         }).then(function(){
             console.log("Data Submitted");
         });
         $("#userFullName").val("");
         $("#userEmail").val("");
         $("#userPhoneNumber").val("");
         $("#successAlert").removeClass("d-none");
    }
});