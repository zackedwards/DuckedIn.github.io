function postData(){
    var isid = readCookie('ISID');
    console.log(isid);
    let today = new Date().toLocaleDateString();
    console.log(today);
    
    var data = document.getElementById('newpost').innerHTML;
    console.log(data);

    axios.post('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Post_Data',{
        "data": {"ISID": readCookie('ISID'), "Post": data}
    }).then( response => {
        console.log(response.data);
    });

    
}

