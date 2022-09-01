const leagueName = sessionStorage.getItem("LeagueName");
document.getElementById('title').innerText = `${leagueName} Teams`

fetchData(`https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=${leagueName.replace(' ', '%20')}`, setTeamUi);

function setTeamUi({teams}) {
    teams.forEach(team => {
        const cardbox = document.createElement('div');
        cardbox.classList.add('col');
        cardbox.innerHTML = `
            <div type="button" onclick='setModalData(${JSON.stringify(team).split("'").join("&apos;")})' class="card bg-black sports-box" data-bs-toggle="modal" data-bs-target="#teamDetails">
                <img src=${team.strTeamBadge} class="card-img-top p-2 mx-auto" style="height: 120px; width: 120px;"alt="${team.strTeam}">
                <div class="card-body">
                    <h5>Team Name: ${team.strTeam}</h5>
                </div>
            </div>
        `
        document.getElementById('teams').appendChild(cardbox)
    });
};

function setModalData(teamdetails) {
    console.log(teamdetails);
    document.getElementById('modal-title').innerText = teamdetails.strTeam + ' Details';
    document.getElementById('modal-body').innerHTML = `
        <div class="card mb-3 bg-dark border-0">
            <img src=${teamdetails.strTeamBadge} class="card-img-top" alt="${teamdetails.strTeam}">
            <div class="card-body">
                <h5 class="card-title">${teamdetails.strTeam}</h5>
                <p class="card-text">${teamdetails.strDescriptionEN}.</p>
                <div class="d-flex justify-content-between align-items-center">
                    <p>Team Jersey:</p>
                    <img src=${teamdetails.strTeamJersey} style="width: 150px;" class="card-img-top" alt="${teamdetails.strTeam}">
                </div>
                <div class="mt-3">
                    <p>Last 5 Mathc Details:</p>
                    <div id="lastMatchData">
                    </div>
                </div>
            </div>
        </div>
    `;
    fetchData(`https://www.thesportsdb.com/api/v1/json/2/eventslast.php?id=${teamdetails.idTeam}`, setLastFiveMatchData);
};

function setLastFiveMatchData({results}) {
    if (!results) {
        document.getElementById('lastMatchData').innerHTML = `<p>No Results found</p>`
    };
    console.log(results)
    document.getElementById('lastMatchData')
    results?.forEach(result => {
        const p = document.createElement('p');
        p.classList.add('d-flex');
        p.classList.add('justify-content-between');
        p.innerHTML = `<span>${result.intHomeScore}</span><span>${result.strEvent}</span><span>${result.intAwayScore}</span>`;
        document.getElementById('lastMatchData').appendChild(p);
    });
}
