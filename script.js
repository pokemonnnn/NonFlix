// SETELAH REFACTORING
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
    try {
        const inputKeyword = document.querySelector(".input-keyword");
        const movies = await getMovie(inputKeyword.value);
        updateUi(movies);
    } catch (err) {
        // console.log(err);
        alert(err);
    }
});

function updateUi(movies) {
    let cards = "";
    movies.forEach((e) => {
        cards += showCard(e);
    });
    const movieContainer = document.querySelector("#container-movie");
    movieContainer.innerHTML = cards;
}

function getMovie(keyword) {
    return fetch("http://www.omdbapi.com/?apikey=2cbd1ad8&s=" + keyword)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((response) => {
            if (response.Response === "False") {
                throw new Error(response.Error);
            }
            return response.Search;
        });
}

// event binding (memberi event ke element yang belum ada tapi ketika ada, event tetap bisa berjalan)
document.addEventListener("click", async function (e) {
    if (e.target.classList.contains("detail-movie")) {
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUiDetail(movieDetail);
    }
});

function getMovieDetail(imdbid) {
    return fetch("http://www.omdbapi.com/?apikey=2cbd1ad8&i=" + imdbid)
        .then((response) => response.json())
        .then((e) => e);
}

function updateUiDetail(e) {
    const movieDetail = showDetail(e);
    const detailModal = document.querySelector(".modal-body");
    detailModal.innerHTML = movieDetail;
}

function showCard(e) {
    return `<div class="col-3 my-3">
                <div class="card border-0">
                    <img src="${e.Poster}" class="card-img-top" alt="">
                    <div class="card-body bg-secondary">
                        <h5 class="card-title fw-bold">${e.Title}</h5>
                        <h6 class="card-subtitle text-body-secondary mb-2">${e.Year}</h6>
                        <a href="#" class="btn btn-danger detail-movie w-100 rounded-2 mt-3" data-bs-toggle="modal" data-bs-target="#movieDetail" data-imdbid="${e.imdbID}">Details</a>
                    </div>
                </div>
           </div>`;
}

function showDetail(e) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${e.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item border-0 border-bottom"><h4>${e.Title} (${e.Year})</h4></li>
                            <li class="list-group-item"><strong>Director : </strong>${e.Director}</li>
                            <li class="list-group-item"><strong>Actors : </strong>${e.Actors}</li>
                            <li class="list-group-item"><strong>Country : </strong>${e.Country}</li>
                            <li class="list-group-item"><strong>Plot : </strong> <br> ${e.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}
