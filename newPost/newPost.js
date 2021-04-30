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

function uniqueID(){
    axios.get('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Post_Data')
        .then( response => {
            var posts = response.data;
            for (i=0; i < posts.length; i++){
                var upid = posts[i].UPID+1;
                console.log(upid);
            }
            return upid;
    });
}

function getUsername() {
    axios.get('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Client_Data')
    .then( response => {
        var users = response.data;
        var isid = readCookie('ISID');
        for (i=0; i < users.length; i++){
            console.log(users[i].Username);
            if (isid==users[i].ISID){
                return users[i].Username;
            }
        }
    });
}

function postData(){
    var uname = getUsername();
    console.log(uname);
    let today = new Date().toLocaleDateString();
    console.log(today);
    
    var data = document.getElementById('newpost').value;
    console.log(data);

    var title_data = document.getElementById('postTitle').value;
    console.log(title_data);

    var upid = uniqueID();
    console.log(upid);

    if(document.getElementById('privacyOption2').checked){
        var option = document.getElementById('privacyOption2').value;
    }
    else{
        var option = document.getElementById('privacyOption1').value;
    }
    console.log(option);

    axios.post('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Post_Data',{
        "data": [{"UPID": uniqueID(), "Date_Posted": today, "Type_Of_Post": option, "Posted_By": getUsername(), "Title": title_data,"Body": data}]
    }).then( response => {
        console.log(response.data);
        window.location.href = '../homepage/homepage.html';
    })
    .catch(function (error) {
        console.log(error);
    });
}

