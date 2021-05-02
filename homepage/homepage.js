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
    console.log(cookie);
    console.log("Creating new cookie with key: " + key + " value: " + value);
}

axios.get('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Ordered_Post')
    .then( response => {
        console.log(response.data);
        var posts = response.data;

        for(let i = 0; i < posts.length; i++){
            if(posts[i].Type_Of_Post != 'private'){
                document.getElementById('postDisplay').innerHTML += '<div id="individual_post"><h2 id="title"> Title: ' + posts[i].Title +  '</h2>';
                document.getElementById('postDisplay').innerHTML += '<h3 id="body">'+ posts[i].Body +'</h3>';
                document.getElementById('postDisplay').innerHTML += '<p id="info"> Posted by: '+ posts[i].Posted_By+' Posted on:'+ posts[i].Date_Posted +'</p></div><br>';
            }
        }
});

var isid = readCookie('ISID');
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
});

function reloadFeed(){
    axios.get('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Ordered_Post')
    .then( response => {
        console.log(response.data);
        var posts = response.data;
        var connections = readCookie('connects');
        connections = connections.split('%25');
        console.log(connections);

        if(document.getElementById('privacyOption2').checked){
            document.getElementById('postDisplay').innerHTML = '';
            for(let i = 0; i < posts.length; i++){
                if(connections.includes(posts[i].Posted_By)){
                    document.getElementById('postDisplay').innerHTML += '<div id="individual_post"><h2 id="title"> Title: ' + posts[i].Title +  '</h2>';
                    document.getElementById('postDisplay').innerHTML += '<h3 id="body">'+ posts[i].Body +'</h3>';
                    document.getElementById('postDisplay').innerHTML += '<p id="info"> Posted by: '+ posts[i].Posted_By+' Posted on:'+ posts[i].Date_Posted +'</p></div><br>';
                }
            }
        }
        else{
            document.getElementById('postDisplay').innerHTML = '';
            for(let i = 0; i < posts.length; i++){
                if(posts[i].Type_Of_Post != 'private'){
                    document.getElementById('postDisplay').innerHTML += '<div id="individual_post"><h2 id="title"> Title: ' + posts[i].Title +  '</h2>';
                    document.getElementById('postDisplay').innerHTML += '<h3 id="body">'+ posts[i].Body +'</h3>';
                    document.getElementById('postDisplay').innerHTML += '<p id="info"> Posted by: '+ posts[i].Posted_By+' Posted on:'+ posts[i].Date_Posted +'</p></div><br>';
                }
            }
        }
});
}