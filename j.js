// =====================================
// Countdown Timer
// =====================================

// Deadline Date
const deadline = new Date(
"September 20, 2026 00:00:00"
).getTime();


const countdown = setInterval(function(){


const now = new Date().getTime();


const distance = deadline - now;



const days = Math.floor(
distance / (1000 * 60 * 60 * 24)
);


const hours = Math.floor(
(distance % (1000 * 60 * 60 * 24)) /
(1000 * 60 * 60)
);


const minutes = Math.floor(
(distance % (1000 * 60 * 60)) /
(1000 * 60)
);


const seconds = Math.floor(
(distance % (1000 * 60)) /
1000
);



document.getElementById("countdown").innerHTML =

days + " ቀን " +
hours + " ሰዓት " +
minutes + " ደቂቃ " +
seconds + " ሰከንድ";




// Deadline finished

if(distance < 0){


clearInterval(countdown);



document.getElementById("countdown").innerHTML =
"🔴 ምዝገባው ተዘግቷል";



document.getElementById("submitBtn").disabled = true;


document.getElementById("submitBtn").innerHTML =
"Registration Closed";


}



},1000);






// =====================================
// Registration Form Validation
// =====================================


const form = document.getElementById(
"registerForm"
);



form.addEventListener(
"submit",
function(event){


event.preventDefault();



// Get Values


const name =
document.getElementById("name").value.trim();


const phone =
document.getElementById("phone").value.trim();


const level =
document.getElementById("level").value.trim();


const church =
document.getElementById("church").value.trim();


const agree =
document.getElementById("agree").checked;



const gender =
document.querySelector(
'input[name="gender"]:checked'
);



const day =
document.querySelector(
'input[name="day"]:checked'
);





// Clear old errors


document.querySelectorAll("small")
.forEach(function(error){

error.innerHTML="";

});




// Validation status


let isValid = true;






// Name Check

if(name === ""){


document.getElementById("nameError")
.innerHTML =
"ሙሉ ስም ያስገቡ";


isValid=false;

}




// Phone Check


if(phone === ""){


document.getElementById("phoneError")
.innerHTML =
"ስልክ ቁጥር ያስገቡ";


isValid=false;


}

else if(
!/^09[0-9]{8}$/.test(phone)
){


document.getElementById("phoneError")
.innerHTML =
"ትክክለኛ የስልክ ቁጥር ያስገቡ";


isValid=false;


}





// Gender Check


if(!gender){


document.getElementById("genderError")
.innerHTML =
"ፆታ ይምረጡ";


isValid=false;


}




// Day Check


if(!day){


document.getElementById("dayError")
.innerHTML =
"የሚማሩበትን ጊዜ ይምረጡ";


isValid=false;


}




// Level Check


if(level === ""){


document.getElementById("levelError")
.innerHTML =
"የትምህርት ደረጃ ያስገቡ";


isValid=false;


}




// Church Check


if(church === ""){


document.getElementById("churchError")
.innerHTML =
"የመጡበት ደብር ያስገቡ";


isValid=false;


}





// Agreement Check


if(!agree){


document.getElementById("agreeError")
.innerHTML =
"መረጃውን ያረጋግጡ";


isValid=false;


}







// If all correct


if(isValid){
 const submitBtn = document.getElementById("submitBtn");

submitBtn.disabled = true;
submitBtn.innerHTML = "⌛ በመመዝገብ ላይ...";



const studentData = {


name:name,

phone:phone,

gender:gender.value,

day:day.value,

level:level,

church:church


};





console.log(studentData);





// Send to Google Apps Script

fetch(
"https://script.google.com/macros/s/AKfycbxkeM8_G3QMQ588Y1qBgB6ZKCxbM3pCyVfqS4KydtLku9-m3Kosev3L_k3Coh7B272D/exec",
{


method:"POST",

body:JSON.stringify(studentData)

}


)

.then(response=>response.json())


.then(data=>{


console.log(data);

if(data.status=="exist"){

document.getElementById("successMessage").innerHTML =
"⚠️ ይህ ስልክ ቁጥር አስቀድሞ ተመዝግቧል።";

submitBtn.disabled=false;
submitBtn.innerHTML="ምዝገባዬን አስገባ";

return;

}

document.getElementById("successMessage").innerHTML =
"✅ ምዝገባዎ በተሳካ ሁኔታ ተጠናቋል።";

form.reset();

submitBtn.innerHTML="✔ ተመዝግበዋል";
submitBtn.disabled=true;

})



.catch(error=>{


console.log(error);


document.getElementById(
"successMessage"
).innerHTML =

"";

submitBtn.disabled=false;
submitBtn.innerHTML="ምዝገባዬን አስገባ";

});



}



});