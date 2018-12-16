function requestData(url) {
    fetch(url, {
        headers: {
            "Authorization": " token " + token
        }
    })
       .then(getStatus)
       .then(getJson)
       .then(function(data) {
           console.log("Received data: ", data);
           displayProfileInView(data);
       })
       .catch(function(err) {
           console.error("An error ocurred while fetching data: ", err);
       });
}

function getStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    }
    else {
        return Promise.reject(new Error(response.statusText));
    }
}

function getJson(response) {
    return response.json();
}

function requestProfileData() {
    requestData(url);
    var url = baseUrl + "minicatsCB";
}

function displayProfileInView(data) {
    var container = document.getElementsByClassName("container")[0];
}

requestProfileData();
