isLoading(true);
fetchData('https://www.thesportsdb.com/api/v1/json/2/all_sports.php', setAllSports);


function setAllSports({sports}) {
    sports.forEach(sport => {
        const cardbox = document.createElement('div');
        cardbox.classList.add('col');
        cardbox.innerHTML = `
            <div onclick="goTo('${sport.strSport}')" class="card bg-black sports-box">
            <img src=${sport.strSportIconGreen} class="card-img-top p-2 mx-auto" style="height: 80px; width: 80px;" alt="${sport.strSport}">
                <div class="card-body">
                    <h5 class="text-center">${sport.strSport}</h5>
                </div>
            </div>
        `;
        document.getElementById('sports').appendChild(cardbox);
    });
    isLoading(false);
};

function goTo(sportName) {
    location.href = `./sports.html`;
    sessionStorage.setItem("SportsName", sportName);
}