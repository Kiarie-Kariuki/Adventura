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
                    <img id='tourimg'src="${obj.image}" alt = 'image'></img>
                    <p>${obj.description}</p>
                    <p>Activities: ${obj.activities}</p>
                    `;
                cardsContainer.appendChild(card);
               
            }
                
        })
}

let currentPosition = 0;
const slideAmount = 30; //slide amount of the cards

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
                   card.className = 'cardHotel';

                   card.innerHTML=`
                   <h3>${obj.name}</h3>
                   <div class='pic'><img id='hotelimg 'src="${obj.image}" alt = 'image'></img></div>
                   <p>Location: ${obj.location}</p>
                   <p>Rating: ${obj.rating}</p>
                   <button id='btn'> Book A Room </button>
                   `;
               hotelCardsContainer.appendChild(card);
        }

         // Apply sliding effect
      const intervalTime = 2000; // sets the slide to take place after 2000ms
      const slideInterval = setInterval(slideLeft, intervalTime);

      function slideLeft() {
        currentPosition -= slideAmount;
        hotelCardsContainer.style.transition = 'transform 0.5s ease-in-out';
        hotelCardsContainer.style.transform = `translateX(${currentPosition}px)`;
        
        // Reset position to start if reached the end
        if (currentPosition <= -(slideAmount * (data.length - 1))) {
          currentPosition = 0;
          setTimeout(() => {
            hotelCardsContainer.style.transition = 'none';
            hotelCardsContainer.style.transform = `translateX(${currentPosition}px)`;
          }, 100);
        }
      }
    })
}



// fetching client reviews of Adventura
function getReviews(){
    fetch('https://json-server-c9we.onrender.com/users')
        .then((res) => res.json())
        .then((data) =>{
            console.log(data)
            for(let obj of data){
               
                // Create cards
               const reviewCardsContainer = document.getElementById('review');

               const card = document.createElement('div');
                   card.className = 'cardReview';

                   card.innerHTML=`
                   <img id='reviewImage'src="${obj.image}" alt = 'image'></img>
                   <h3>${obj.name}</h3>
                   <p>${obj.review}</p>
                   `;
               reviewCardsContainer.appendChild(card);
             }
        })
}


