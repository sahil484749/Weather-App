// fetch('http://puzzle.mead.io/puzzle').then((response)=>{

//         response.json().then((data)=>{
//             console.log(data)
//         })

// })

// fetch('http://localhost:3000/weather?address=Noida').then((response)=>{
//         response.json().then((data)=>{
//             if(data.error){
//                 console.log(data.error)
//             }else{
//                 console.log(data.Location)
//                 console.log(data.forecast)

//             }

//         })
// })

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");
//messageError.textContent = 'From javascript'
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // For Testing Purpose
  // console.log("Testing!")
  //const location =search.value
  // console.log(location)

  // To fetch the weather
  const location = search.value;
  searchLocation = "/weather?address=" + location;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(searchLocation).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.Location;
        messageTwo.textContent = data.forecast;
        console.log(data.Location);
        console.log(data.forecast);
      }
    });
  });
});
//console.log(weatherForm);
