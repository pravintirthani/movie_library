import request from 'sync-request';


export function sync(url,method,data){
    let res="";
    let serverCall="http://localhost/movie_lib";
    data.token=localStorage.getItem("serverAccessToken");
switch (method) {
    case "GET":
        res = request('GET', serverCall+url, {
            headers: {
            'user-agent': 'example-user-agent',
            },
        });
        console.log(res);
        // res.getBody()

        break;
    case "POST":
        res = request('POST', serverCall+url, {
            json: {username: 'ForbesLindesay'},
        });
        console.log(res);
    break;
    default:
        break;
}

}

export function async(service,method,data){    
    data.token=localStorage.getItem("serverAccessToken");
    let res="";
    let serverServiceUrl="http://localhost/movie_lib"+service;

    var finalData = "";
for (var key in data) {
    if (finalData != "") {
        finalData += "&";
    }
    finalData += key + "=" + encodeURIComponent(data[key]);
}
switch (method) {
    case "GET":
         fetch(serverServiceUrl+finalData)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson));
        });
    break;
    case "POST":
    return fetch(serverServiceUrl, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.      
        headers: {            
            "Content-Type": "application/x-www-form-urlencoded",
        },        
        body: finalData, // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses JSON response into native Javascript objects 

    // break;
    }    
}