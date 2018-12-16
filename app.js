function requestData(url) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            headers: {
                "Authorization": " token " + token
            }
        })
           .then(getStatus)
           .then(getJson)
           .then(resolve)
           .catch(reject);
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
    var url = baseUrl + "minicatsCB";
    requestData(url)
        .then(data => {
            if (!data.email) {
                requestEventsData(data);
            }
            displayProfileInView(data);
        })
        .catch(err => {
            console.error("An error ocurred while fetching data: ", err);
        });
}

function requestEventsData(data){
    var url = baseUrl + "minicatsCB/events";
    return requestData(url)
        .then(events => {
            var regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
            var results = regex.exec(JSON.stringify(events));
            if (results) {
                data.email = results[0];
            }

            displayProfileInView();
        })
        .catch(err => {
            console.error("An error ocurred while fetching data: ", err);
        });;
}

function displayProfileInView(data) {
    var container = document.getElementsByClassName("container")[0];
}

requestProfileData();
