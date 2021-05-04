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

function createCookie(key, value) {
    const cookie = escape(key) + "=" + escape(value);
    document.cookie = cookie;
    console.log("Creating new cookie with key: " + key + " value: " + value);
}

function uniqueID(){
    axios.get('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Post_Data')
        .then( response => {
            var posts = response.data;
            for (i=0; i < posts.length; i++){
                var upid = parseInt(posts[i].UPID)+1;
            }
            createCookie('upid', upid);
            return upid;
    });
}

function getUsername() {
    var isid = readCookie('ISID');
    axios.get('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Client_Data')
    .then( response => {
        var users = response.data;
        for (i=0; i < users.length; i++){
            if (isid==users[i].ISID){
                createCookie('username', users[i].Username);
                return users[i].Username;
            }
        }
        return 'unknown'
    });
}

getUsername();
uniqueID();

function postData(){
    var uname = readCookie('username');
    let today = new Date().toLocaleDateString();
    console.log(today);
    
    var data = document.getElementById('newpost').value;
    console.log(data);

    var title_data = document.getElementById('postTitle').value;
    console.log(title_data);

    var upid = readCookie('upid');
    console.log(upid);

    if(document.getElementById('privacyOption2').checked){
        var option = document.getElementById('privacyOption2').value;
    }
    else{
        var option = document.getElementById('privacyOption1').value;
    }
    console.log(option);

    axios.post('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Post_Data',{
        "data": [{"UPID": upid, "Date_Posted": today, "Type_Of_Post": option, "Posted_By": uname, "Title": title_data,"Body": data}]
    }).then( response => {
        console.log(response.data);
        window.location.href = '../homepage/homepage.html';
    })
    .catch(function (error) {
        console.log(error);
    });
}

