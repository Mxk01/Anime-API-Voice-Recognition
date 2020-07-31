const form  = document.querySelector('form');
const button = document.getElementById("btn");
let input = document.querySelector('input');
const SpeechRecognition = window.SpeechRecognition  || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
//
window.addEventListener('DOMContentLoaded',()=>{

  // When client starts speaking
recognition.onstart = () => {
  console.log('Voice is activated.Speak');
}

// When user stops talking and we get the result
recognition.onresult = (event) => {
// console.log(event);
recognition.interimResults = true;
const speechText =  event.resultIndex;
const transcript = event.results[speechText][0].transcript;
// content.textContent = transcript;
readText(transcript);
}

recognition.start();

// Speech Synthesis
function readText(message) {
  const speech = new SpeechSynthesisUtterance();
    speech.text = `You have searched for ${message}`;
  if(message!='')
  {
    input.value = message;

    let anime = input.value;
      fetch(`https://kitsu.io/api/edge/anime/?filter[text]=${anime}`)
      .then((data)=>{ return data.json() })
      .then(response=>{
        console.log(response);

      let animeData =
      {
        description : response.data[0].attributes.synopsis,
        popularity :response.data[0].attributes.popularityRank,
        image :response.data[0].attributes.posterImage.large,
        title:response.data[0].attributes.titles.en,
        episodes:response.data[0].attributes.episodeCount
      }


      content.innerHTML = `
      <p style='{width:400px}'>${animeData.description}></p>
      <p>Popularity rank :<strong>${animeData.popularity}</strong></p>
      <p>Title :<strong>${animeData.title}</strong></p>
      <p>Episodes :<strong>${animeData.episodes}</strong></p>

      <img src="${animeData.image}"></img>
      `;
    });

  }
  speech.volume = 1; //  0  to 1    -  0  no sound 1 loud
  speech.rate = 1; // how fast pc speaks
  speech.pitch = 1;
  speech.text = `You have searched for ${message}`;
  window.speechSynthesis.speak(speech);
  input.value='';
   // location.reload();

}



let content = document.querySelector('#content');
form.addEventListener("input",(e)=>{
  e.preventDefault();

let anime = input.value;
  fetch(`https://kitsu.io/api/edge/anime/?filter[text]=${anime}`)
  .then((data)=>{ return data.json() })
  .then(response=>{
    console.log(response);

  let animeData =
  {
    description : response.data[0].attributes.synopsis,
    popularity :response.data[0].attributes.popularityRank,
    image :response.data[0].attributes.posterImage.large,
    title:response.data[0].attributes.titles.en,
    episodes:response.data[0].attributes.episodeCount
  }


  content.innerHTML = `
  <p style='{width:400px}'>${animeData.description}></p>
  <p>Popularity rank :<strong>${animeData.popularity}</strong></p>
  <p>Title :<strong>${animeData.title}</strong></p>
  <p>Episodes :<strong>${animeData.episodes}</strong></p>

  <img src="${animeData.image}"></img>
  `;
},1000);



})
});
//  });
