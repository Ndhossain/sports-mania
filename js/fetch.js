function isLoading(val) {
    if(val){
        document.getElementById('loading-spinner').classList.remove('d-none')
    } else {
        document.getElementById('loading-spinner').classList.add('d-none')
    }
}

function fetchData(url, setData) {
    fetch(url)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
};
