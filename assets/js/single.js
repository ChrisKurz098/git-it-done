function getRepoName() {
    let queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    if (repoName) {
        document.querySelector("#repo-name").textContent = repoName;
        getRepoIssues(repoName);
    } else {
        document.location.replace("./index.html");
    }


}

function getRepoIssues(repo) {
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                displayIssues(data);
                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }

            });
        } else {
            // if not successful, redirect to homepage
            document.location.replace("./index.html");
        }
    });

}

function displayIssues(issues) {
    let issueContainerEl = document.querySelector("#issues-container");

    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (let i = 0; i < issues.length; i++) {
        let issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        // create span to hold issue title
        let titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        // append to container
        issueEl.appendChild(titleEl);
        // create a type element
        let typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        // append to container
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
};

function displayWarning(repo) {
    let limitWarningEl = document.querySelector("#limit-warning");
    limitWarningEl.textContent = "This repo has more than 30 issues"

    let linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");
    linkEl.append(limitWarningEl);
}


getRepoName();


