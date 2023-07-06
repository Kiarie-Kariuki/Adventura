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
                //console.log(heading) //check if the element has been captured

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
                   <h3 id='hotelName'>${obj.name}</h3>
                   <div class='pic'><img id='hotelimg 'src="${obj.image}" alt = 'image'></img></div>
                   <p>Location: ${obj.location}</p>
                   <p>Rating: ${obj.rating}</p>
                   <button class='btn'> Book A Room </button>
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
      addBookingEventListener();
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


//Event listeners

//function to book hotel rooms
function addBookingEventListener() {
    const bookButtons = document.getElementsByClassName('btn');
    const popupContainer = document.getElementById('popupContainer');
    const popupClose = document.getElementById('popupClose');
  
    Array.from(bookButtons).forEach(function (button) {
      button.addEventListener('click', function (event) {
        // Show the pop-up
        popupContainer.style.display = 'block';
      });
    });
  
    // Close the pop-up when the close button is clicked
    popupClose.addEventListener('click', function () {
      popupContainer.style.display = 'none';
    });
  
    // Handle form submission
    const reservationForm = document.getElementById('reservationForm');
    reservationForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const hotelName = document.getElementById('hotelName').textContent
      const userId = 1; //assigning the users an id from 1
  
      // Get form input values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const checkInDate = document.getElementById('checkInDate').value;
      const checkOutDate = document.getElementById('checkOutDate').value;
  
      // Create a new booking object
      const bookingData = {
        userId: userId,
        hotelName: hotelName,
        name: name,
        email: email,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
      };
  
      // Send the booking data to the server
      fetch('https://json-server-c9we.onrender.com/hotelBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log('Booking successful:', data);
          return 'Booking successful.';

          reservationForm.reset()
  
          // Close the pop-up after successful booking
          popupContainer.style.display = 'none';
        })
        .catch((error) => {
          //console.log('Booking failed:', error);
          return 'Booking failed.';
        });
    });
  }


// Add event listener to the form
const bookTripForm = document.getElementById('bookTrip');
bookTripForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form input values
  const name = document.getElementById('Name').value;
  const email = document.getElementById('email').value;
  const expedition = document.getElementById('expedition').value;
  const message = document.getElementById('message').value;

  // Create an object with the form data
  const formData = {
    name: name,
    email: email,
    expedition: expedition,
    message: message
  };

  // Send the form data to the server
  fetch('https://json-server-c9we.onrender.com/tourBooking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log('Form submission successful:', data);
      return 'Form submission successful';

       // Reset form input fields
       bookTripForm.reset();
    })
    .catch((error) => {
      //console.log('Form submission failed:', error);
      return 'Form submission failed';
    });
});



  
  