var crypt = {
// (B1) THE SECRET KEY
secret : "vtJHEGLQerdNhsmnsG1R26K0aAm1wp5kPrhlUp50xU3T2pVwaJpiqErNLH3tUlAIemKXre4gpW5DFk16eyH6qRr5kQIhmR7lewsZtkB9JiauEOLR3bL9XQbBbY12unTW",

// (B2) ENCRYPT
encrypt : function (clear) {
    var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    cipher = cipher.toString();
    return cipher;
},

// (B3) DECRYPT
decrypt : function (cipher) {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
}
};

function createCookie(key, value, date) {
    const expiration = new Date(date).toUTCString();
    const cookie = key + "=" + value + "; Expires=" + expiration + ";";
    document.cookie = cookie;
    console.log(cookie);
    console.log("Creating new cookie with key: " + key + " value: " + value + " expiration: " + expiration);
}

// var request = require("request");

// var options = { method: 'GET',
// url: 'https://duckedin-2987.restdb.io/rest/client',
// headers: 
// { 'cache-control': 'no-cache',
//     'x-apikey': '1acf2e675715216ec9b736c94cc52fc10f4b8' } };

// request(options, function (error, response, body) {
// if (error) throw new Error(error);

// console.log(body);
// var users = body;
// var condition = true;
// while(condition){
//     var isid = Math.floor(Math.random() * 100000)
//     for (i=0; i < users.length; i++){
//         if(users[i].ISID == isid){
//             break;
//         }
//     }
//     if(i == users.length){
//         condition = false;
//         createCookie('ISID', isid, Date.UTC(2022, 8, 1));
//     }
// }
// });
window.onload = function() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "https://getpantry.cloud/apiv1/pantry/dd14b579-e07c-4fcc-8e08-534632eb36a9", true);
    xhr.addEventListener("readystatechange", processRequest, false);
    xhr.send();
    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let content = JSON.parse(xhr.responseText);

            var users = content.baskets;

            var condition = true;
            while(condition){
                var isid = Math.floor(Math.random() * 100000)
                for (i=0; i < users.length; i++){
                    if(users[i].ISID == isid){
                        break;
                    }
                }
                if(i == users.length){
                    condition = false;
                    createCookie('ISID', isid, Date.UTC(2022, 8, 1));
                }
            }
        }
    }
};
//pantry ID: dd14b579-e07c-4fcc-8e08-534632eb36a9

// axios.get('https://duckedin-2987.restdb.io/rest/client', config)
//     .then( response => {
//         var users = response.data;
//         var condition = true;
//         while(condition){
//             var isid = Math.floor(Math.random() * 100000)
//             for (i=0; i < users.length; i++){
//                 if(users[i].ISID == isid){
//                     break;
//                 }
//             }
//             if(i == users.length){
//                 condition = false;
//                 createCookie('ISID', isid, Date.UTC(2022, 8, 1));
//             }
//         }
// });


function readCookie(name) {
    let key = name + "=";
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(key) === 0) {
            return cookie.substring(key.length, cookie.length);
        }
    }
    return null;
}

function postValues(){
    var fname = document.getElementById('firstname').value;
    var lname = document.getElementById('lastname').value;
    var ag = document.getElementById('age').value;
    var pword = crypt.encrypt(document.getElementById('password').value);
    var uname = document.getElementById('username').value;
    var jobx = document.getElementById('jobexp').value;
    var grad = document.getElementById('gradyear').value;
    var maj = document.getElementById('major').value;
    var curr = document.getElementById('currentemp').value;

    var data = JSON.stringify({"ISID": readCookie('ISID'), "First_Name": fname, "Last_Name": lname, "Age": ag, "Password": pword, "Username": uname, "Major": maj, "Graduation_Year": grad, "Job_Experience": jobx, "Current_Employment": curr})

    var original = "https://getpantry.cloud/apiv1/pantry/dd14b579-e07c-4fcc-8e08-534632eb36a9"
    var basket = original.concat(fname);

    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4 && xhr.status == 200) {
          console.log(this.responseText);
          window.location.href = '../homepage/homepage.html';
        }
    });
    xhr.open('PUT', original);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  
//     axios.post('https://duckedin-2987.restdb.io/rest/client',{
//         "data": [{"ISID": readCookie('ISID'), "First_Name": fname, "Last_Name": lname, "Age": ag, "Password": pword, "Username": uname, "Major": maj, "Graduation_Year": grad, "Job_Experience": jobx, "Current_Employment": curr}]
//     }).then( response => {
//         console.log(response.data);
//         window.location.href = '../homepage/homepage.html';
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
}