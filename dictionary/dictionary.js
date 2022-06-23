//selecting HTML elements
let input = document.getElementById("input");
let btn = document.getElementById("btn");
let result = document.getElementById("result");
let footer = document.querySelector("footer");

//event listener for the button
btn.addEventListener("click", search, true);

//event Handler for button
function search(e) {
  e.preventDefault();
  let word = input.value;
  if (word === "") {
    alert("Enter a word");
  } else {
    result.innerHTML = `<i class="fa fa-spinner fa-spin fa-3x"></i>`;
    footer.style.position = "absolute";

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/ ${word}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        createElements(data);
      });
  }

  function createElements(data) {
    if (data.title) {
      result.innerHTML = `<h3>${data.title}</h3><br><p>${data.message}</p>`;
      footer.style.position = "absolute";
    } else {
      let div = document.createElement("div");
      data[0].meanings.map((meaning) => {
        let divInner = `
        <h3>${meaning.partOfSpeech}</h3>
        <p> ${meaning.definitions[0].definition}</p>
        
        `;
        div.append(divInner);
        console.log(meaning.definitions[0].definition);
        console.log(meaning.partOfSpeech);
        console.log(div);
      });

      let newHtml = `<main>
    <h2>${data[0].word.toUpperCase()}</h2>

    <div class="json">
        <div class="phonetics">
            <h3>Phonetics</h3>
            <div><p>${data[0].phonetic}</p></div>
        </div>

        <div class="meanings">

            <h3>Meaning(s)</h3>
           ${div.textContent}
        </div>

        <div class="audio">
            <h3>Pronunciation</h3>
            <audio controls >
                <source src= ${
                  data[0].phonetics[0].audio !== ""
                    ? data[0].phonetics[0].audio
                    : data[0].phonetics[1].audio
                }   type="audio/mp3">
            </audio>
        </div>
    </div> 
</main>`;

      result.innerHTML = newHtml;

      console.log(data);
      footer.style.position = "sticky";
    }
  }
}
