let userFormEl = document.querySelector("#user-form");
let nameinputEl = document.querySelector('#username');
let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");

function getUserRepo(user) {
    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                ///here is where we have the data available
                displayRepos(data, user);

            })
        } else {
            alert("Error: GitHub User Not Found");
        }
    })
    //errors are sent to the catch() method
    .catch(function(error){
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to GitHub");
    });
}



function formSubmitHandler(event) {
    event.preventDefault();

    let username = nameinputEl.value.trim();
    if (username) {
        getUserRepo(username);
        nameinputEl.value = "";
    } else {
        alert("Please Enter a GitHub username");
    }

}




function displayRepos(repos, searchTerm) {
    // check if api returned any repos
if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
    // clear old content
    repoContainerEl.textContent = "";
    // put user query  in
    ///-----------------Create List Code-----------------------///
    repoSearchTerm.textContent = searchTerm;
    for (let i = 0; i < repos.length; i++) {
        //format repo
        const repoName = repos[i].owner.login + "/" + repos[i].name;
        //create container
        let repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create span element to hold repo name
        let titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        ///////////////Get issues///////////////////////
        // create a status element
        let statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);
        //append container to DOM
        repoContainerEl.appendChild(repoEl);

    }

    console.log(repos);
    console.log(searchTerm);
};


userFormEl.addEventListener("submit", formSubmitHandler);
