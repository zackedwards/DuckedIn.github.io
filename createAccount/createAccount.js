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

function createCookie(key, value) {
    const cookie = escape(key) + "=" + escape(value);
    document.cookie = cookie;
    console.log(cookie);
    console.log("Creating new cookie with key: " + key + " value: " + value);
}


axios.get('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Client_Data')
    .then( response => {
        var users = response.data;
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
                createCookie('ISID', isid);
            }
        }
});


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

    axios.post('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Client_Data',{
        "data": [{"ISID": readCookie('ISID'), "First_Name": fname, "Last_Name": lname, "Age": ag, "Password": pword, "Username": uname, "Major": maj, "Graduation_Year": grad, "Job_Experience": jobx, "Current_Employment": curr}]
    }).then( response => {
        console.log(response.data);
        window.location.href = '../homepage/homepage.html';
    })
    .catch(function (error) {
        console.log(error);
    });
}