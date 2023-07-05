document.addEventListener('DOMContentLoaded', function (){
    getTourPackages();
    getHotels();
    getReviews()
})

const packages = document.getElementsByClassName('tour')
console.log(packages)

//fetching the tour packages
function getTourPackages(){
    fetch('https://json-server-c9we.onrender.com/tourPackages')
        .then((res) => res.json())
        .then((data)=> {
            console.log(data) //log the data from the fetch

            const heading = document.getElementById('title')
                console.log(heading) //check if the element has been captured

            for(let obj of data){
               
                 // Create cards
                const cardsContainer = document.getElementById('cardsContainer');

                const card = document.createElement('div');
                    card.className = 'card';

                    card.innerHTML=`
                    <h3>${obj.name}</h3>
                    <img src="${obj.image}" alt = 'image'></img>
                    <p>${obj.description}</p>
                    <p>Activities: ${obj.activities}</p>
                    `;
                cardsContainer.appendChild(card);
               
            }
                
        })
}


//fetching the hotels
function getHotels(){
    fetch("https://json-server-c9we.onrender.com/hotels")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)

            for(let obj of data){
               
                // Create cards
               const hotelCardsContainer = document.getElementById('hotelCardsContainer');

               const card = document.createElement('div');
                   card.className = 'card';

                   card.innerHTML=`
                   <h3>${obj.name}</h3>
                   <img src="${obj.image}" alt = 'image'></img>
                   <p>Location: ${obj.location}</p>
                   <p>Rating: ${obj.rating}</p>
                   <button id='btn'> Book Hotel </button>
                   `;
               hotelCardsContainer.appendChild(card);
        }
    })
}

