function cookieAlert(){
    alert('You need cookies enabled in order to use this website!')
}

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
    const cookie = escape(key) + "=" + escape(value) + ";expires=" + expiration + ";";
    document.cookie = cookie;
    console.log(cookie);
    console.log("Creating new cookie with key: " + key + " value: " + value + " expiration: " + expiration);
}

function check_login(){
    axios.get('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Client_Data')
    .then( response => {
        var users = response.data;
        var username = document.getElementById("username").value;
        var password = document.getElementById('password').value;
        for (i=0; i < users.length; i++){
            if (users[i].Username == username && crypt.decrypt(users[i].Password) == password){
                createCookie('ISID', users[i].ISID, Date.UTC(2022, 8, 1));
                window.location.href = 'homepage/homepage.html';
            }
        }
        document.getElementById('incorrect').innerHTML = "Incorrect Password or Username";
        
    });
}


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