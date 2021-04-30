function postData(){
    var isid = readCookie('ISID');
    console.log(isid);
    let today = new Date().toLocaleDateString();
    console.log(today);
    
    var data = document.getElementById('newpost').value;
    console.log(data);

    var title_data = document.getElementById('postTitle').value;
    console.log(title_data);

    if(document.getElementById('privacyOption2').checked){
        var option = document.getElementById('privacyOption2').value;
    }
    else{
        var option = document.getElementById('privacyOption1').value;
    }

    axios.post('https://sheetdb.io/api/v1/9kxufr2k05mi6?sheet=Post_Data',{
        "data": {"Date _Posted": today, "Type_Of_Post": option, "Posted_By": readCookie('ISID'), "Title": title_data,"Body": data}
    }).then( response => {
        console.log(response.data);
    });


}

