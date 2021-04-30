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

axios.get('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Ordered_Post')
    .then( response => {
        console.log(response.data);
        var posts = response.data;

        for(let i = 0; i < posts.length; i++){
            document.getElementById('postDisplay').innerHTML += '<h2 id="title">' + posts[i].Title +  '</h2>';
            document.getElementById('postDisplay').innerHTML += '<h3 id="body">'+ posts[i].Body +'</h3>';
            document.getElementById('postDisplay').innerHTML += '<p id="info"> Posted by: '+ posts[i].Posted_By+' Posted on:'+ posts[i].Date_Posted +'</p><br><br>';
        }
    });