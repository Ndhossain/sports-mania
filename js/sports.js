const sportName = sessionStorage.getItem("SportsName");
fetchData(`https://www.thesportsdb.com/api/v1/json/2/all_countries.php`, setCountry);



function setCountry({countries}) {
    countries.forEach(country => {
        fetchData(`https://www.thesportsdb.com/api/v1/json/2/search_all_leagues.php?c=${country.name_en}&s=${sportName}`, setCountryData);
        function setCountryData(result) {
            if (result.countries) {
                const option = document.createElement('option');
                option.setAttribute('value', country.name_en);
                option.classList.add('text-black');
                option.innerText = country.name_en;
                document.getElementById('inputGroupSelect03').appendChild(option);
            };
        };
    });
};

setTimeout(() => {
    isLoading(true);
    searchLeauges()
}, 2000);


function searchLeauges() {
    isLoading(true);
    const country = document.getElementById('inputGroupSelect03').value;
    console.log(country)
    fetchData(`https://www.thesportsdb.com/api/v1/json/2/search_all_leagues.php?c=${country}&s=${sportName}`, setLeauges);
}

function setLeauges({countries}) {
    document.getElementById('league').innerHTML ='';
    if (!countries) {
        document.getElementById('league').innerHTML = `<h2>No Data Found</h2>`;
        isLoading(false);
        return ;
    };
    countries.forEach(country => {
        const cardbox = document.createElement('div');
        cardbox.classList.add('col');
        cardbox.innerHTML = `
            <div onclick="goTo('${country.strLeague}')" class="card bg-black sports-box">
                <img src=${country.strBadge} class="card-img-top p-2 mx-auto" style="height: 120px; width: 120px;"alt="${country.strLeague}">
                <div class="card-body">
                    <h5 class="text-center">${country.strLeague}</h5>
                </div>
            </div>
        `
        document.getElementById('league').appendChild(cardbox)
    });
    isLoading(false);
};

function goTo(leagueName) {
    location.href = `./teams.html`;
    sessionStorage.setItem("LeagueName", leagueName);
}
