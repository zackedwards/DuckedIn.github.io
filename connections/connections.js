var isid = readCookie('ISID');

function createCookie(key, value) {
    const cookie = escape(key) + "=" + escape(value);
    document.cookie = cookie;
    console.log(cookie);
    console.log("Creating new cookie with key: " + key + " value: " + value);
}

axios.get('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Client_Data')
    .then( response => {
        var users = response.data;
        for (i=0; i < users.length; i++){
            if(users[i].ISID == isid){
                var connections = users[i].Connected_Usernames;
                break;
            }
        }
        createCookie('connects', connections);
        connections = unescape(connections).split("%");
        for(j=0; j<connections.length; j++){
            for(k=0; k<users.length; k++){
                if(users[k].Username == connections[j]){
                    var fname = users[k].First_Name;
                    var lname = users[k].Last_Name;
                    var space = " ";
                    var name = fname.concat(space, lname);
                    document.getElementById('listedConnections').innerHTML += '<p>' + name +  '</p>';
                }
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

function submit(){
    var isid = readCookie('ISID');

    var username = document.getElementById('newConnection').value;
    console.log(username)
    var connections = unescape(readCookie('connects')) +'%'+username;
    console.log(connections);
    var link = 'https://sheetdb.io/api/v1/9kxufr2k05mi6/ISID/' + isid +'?sheet=Client_Data';
    //var link = 'https://sheetdb.io/api/v1/9kxufr2k05mi6/Client_Data/ISID/'+isid;
    console.log(link);

    axios.patch(link, {
        "data": {'Connected_Usernames': connections}
    }).then( response => {
        console.log(response.data);
        window.location.href = '../homepage/homepage.html';
    });
}