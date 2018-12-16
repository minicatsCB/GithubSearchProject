function requestProfileData() {
    var url = baseUrl + "minicatsCB";
    requestData(url)
        .then(data => {
            if (!data.email) {
                requestEventsData(data);
            }
            else {
                displayProfileInView(data);
            }
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

            displayProfileInView(data);
        })
        .catch(err => {
            console.error("An error ocurred while fetching data: ", err);
        });;
}

function replaceNullData(strings, ...parts) {
    var checkedMarkup = "";
    strings.forEach((string, index) => {
        if (!parts[index]){
            parts[index] = "data no available";
        }
        checkedMarkup += string + parts[index];
    });

    return checkedMarkup;
}

function displayProfileInView(data) {
    var summaryElement = document.getElementById("summary");
    var detailsElement = document.getElementById("details");

    var summaryMarkup = replaceNullData`
        <div class="py-5">
            <img class="w-50 mx-auto d-block" src=${data.avatar_url}>
        </div>
        <div>
            <p>Username: ${data.login}</p>
        </div>
        <div>
            <p>Name: ${data.name}</p>
        </div>
        <div>
            <p>Bio: ${data.bio}/<p>
        </div>
        <div class="pb-3">
            <p>Email: ${data.email}</p>
        </div>
    `;

    summaryElement.innerHTML = summaryMarkup;

    var detailsMarkup = replaceNullData`
        <div class="pt-3">
            <p>Is admin: ${data.site_admin}</p>
        </div>
        <div>
            <p>Company: ${data.company}</p>
        </div>
        <div>
            <p>Blog: ${data.blog}</p>
        </div>
        <div>
            <p>Location: ${data.location}</p>
        </div>
        <div>
            <p>Hireable: ${data.hireable}</p>
        </div>
        <div>
            <p>Public repos: ${data.public_repos}</p>
        </div>
        <div>
            <p>Public gists: ${data.public_gists}</p>
        </div>
        <div>
            <p>Followers: ${data.followers}</p>
        </div>
        <div>
            <p>Following: ${data.following}</p>
        </div>
        <div>
            <p>Created at: ${data.created_at}</p>
        </div>
        <div class="pb-3">
            <p>Updated at: ${data.updated_at}</p>
        </div>
    `;

    details.innerHTML = detailsMarkup;

}

requestProfileData();
