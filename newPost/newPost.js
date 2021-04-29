function postData(){
    var isid = readCookie('ISID');
    console.log(isid);
    let today = new Date().toLocaleDateString();
    console.log(today);
    
    var data = document.getElementById('newpost').innerHTML;
    console.log(data);

    var title_data = document.getElementById('postTitle').innerHTML;
    console.log(title_data);

    axios.post('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Post_Data',{
        "data": {"Posted_By": readCookie('ISID'), "Title": title_data,"Body": data}
    }).then( response => {
        console.log(response.data);
    });


}

