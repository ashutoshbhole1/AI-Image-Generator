function log(...e) {
  console.log(...e);
}
log("Radhe Radhe");
// https://huggingface.co/docs/api-inference/tasks/text-to-image?code=js

let body = document.querySelector("body");
let themeToggle = document.querySelector(".theme-toggle");
let mode = document.querySelector(".theme-toggle i");
let dark = false;

let promptBtn = document.querySelector(".prompt-btn");
let promptInput = document.querySelector(".prompt-input");

const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");

const promptForm = document.querySelector(".prompt-form");

const gridGallery = document.querySelector(".gallery-grid");


// theme toggle
const theme = () => {

  themeToggle.addEventListener("click", () => {
    if (!dark) {
      body.classList.add("dark-theme");
      mode.classList.remove("fa-moon");
      mode.classList.add("fa-sun");
      dark = true;
    }

    else {
      mode.classList.remove("fa-sun");
      mode.classList.add("fa-moon");
      body.classList.remove("dark-theme");
      dark = false;
    }
  });
}
theme();


// Prompt Btn
const samplePrompt = () => {

  const examplePrompts = [
    "A magic forest with glowing plants and fairy homes among giant mushrooms",
    "An old steampunk airship floating through golden clouds at sunset",
    "A future Mars colony with glass domes and gardens against red mountains",
    "A dragon sleeping on gold coins in a crystal cave",
    "An underwater kingdom with merpeople and glowing coral buildings",
    "A floating island with waterfalls pouring into clouds below",
    "A witch's cottage in fall with magic herbs in the garden",
    "A robot painting in a sunny studio with art supplies around it",
    "A magical library with floating glowing books and spiral staircases",
    "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
    "A cosmic beach with glowing sand and an aurora in the night sky",
    "A medieval marketplace with colorful tents and street performers",
    "A cyberpunk city with neon signs and flying cars at night",
    "A peaceful bamboo forest with a hidden ancient temple",
    "A giant turtle carrying a village on its back in the ocean",
  ];

  promptBtn.addEventListener("click", () => {
    const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    promptInput.value = prompt;
    promptInput.focus();
  });
};
samplePrompt();



// Prompt Form submit result


// Calculate width and height on choosen ration
const getImageDimension = (aspectRatio, baseSize = 512) => {
  const [width, height] = aspectRatio.split("/").map(Number);

  const scaleFactor = baseSize / Math.sqrt(width * height);

  let calculatedWidth = Math.round(width * scaleFactor);
  let calculatedHeight = Math.round(height * scaleFactor);

  // Ensure dimensions are multiples of 16 (AI model requirements)
  calculatedWidth = Math.floor(calculatedWidth / 16) * 16;
  calculatedHeight = Math.floor(calculatedHeight / 16) * 16;

  return { width: calculatedWidth, height: calculatedHeight };
};


// loading img  spinner with the actual image
const updateImageCard = (imgIndex, imgUrl) => {
  const imgCard = document.getElementById(`img-card-${imgIndex}`);

  if (!imgCard) return;

  imgCard.classList.remove("loading");
  imgCard.innerHTML = `
                    <img src="${imgUrl}" class="result-img">
                    <div class="img-overlay">
                        <a href="${imgUrl}" class="download-btn">
                            <i class="fa-solid fa-download" download="${Date.now()}.png"></i>
                        </a>
                    </div>
                    `;
}

// send req to hugging face api
const generateImages = async (selectedModel, imageCount, aspectRatio, promptText) => {

  const MODEL_URL = `https://router.huggingface.co/hf-inference/models/${selectedModel}`;

  const { width, height } = getImageDimension(aspectRatio);

  // Array of img generation promises
  const imagePromises = Array.from({ length: imageCount }, async (API_KEY, i) => {
    // send req to ai model api
    try {
      const response = await fetch(MODEL_URL, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "x-use-cache": "false",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: promptText,
          parameters: { width, height },

        }),
      });

      if (!response.ok) throw new Error((await response.json())?.error);

      // convert response to image url
      const result = await response.blob();
      // console.log(result);
      updateImageCard(i, URL.createObjectURL(result));
    }
    catch (err) {
      log(err);
    }
  });


  await Promise.allSettled(imagePromises);
};


// cards creation along with specs
const createImageCards = (selectedModel, imageCount, aspectRatio, promptText) => {
  gridGallery.innerHTML = "";

  for (let i = 0; i < imageCount; i++) {
    gridGallery.innerHTML += `
    <div class="image-card loading" id="img-card-${i}" style="aspect-ratio : ${aspectRatio}">

                    <div class="status-container ">
                        <div class="spinner"></div>
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <p class="status-txt">Generating...</p>
                    </div>                    
                    
                    <img src="Img/test.webp" class="result-img">
                </div>
                `;
  }

  generateImages(selectedModel, imageCount, aspectRatio, promptText);
}


const handleFormSubmit = (e) => {
  e.preventDefault();  //prevent form from submitting

  const selectedModel = modelSelect.value;
  const imageCount = parseInt(countSelect.value) || 1;
  const aspectRatio = ratioSelect.value || "1/1";
  const promptText = promptInput.value.trim();

  createImageCards(selectedModel, imageCount, aspectRatio, promptText);
  log(selectedModel, imageCount, aspectRatio, promptText);

};


promptForm.addEventListener("submit", handleFormSubmit);














// custom select arrow
const customSelect = () => {

  let selects = document.querySelectorAll(".custom-select");
  // to selewct all the elem as they are in node list because of query All
  selects.forEach((select) => {
    // Set initial state
    select.dataset.arrow = "down";
    select.style.backgroundImage = `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='grey'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")`;
    // Default down arrow

    select.addEventListener("click", function () {
      let down = `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='grey'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")`;

      let up = `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='grey' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l5-5 5 5'/%3E%3C/svg%3E")`;

      // Toggle between up and down arrows
      if (select.dataset.arrow === "down") {
        select.style.backgroundImage = up;
        select.dataset.arrow = "up";
      } else {
        select.style.backgroundImage = down;
        select.dataset.arrow = "down";
      }

    });
  });
}

customSelect();





























// :root {
//   --color-primary: #5C56E1;
//   --color-primary-dark: #5b21b6;
//   --color-accent: #8B5CF6;
//   --color-card: #FFFFFF;
//   --color-input: #F1F1FF;
//   --color-text: #09090E;
//   --color-placeholder: #5C5A87;
//   --color-border: #D4D4ED;
//   --color-gradient: linear-gradient(135deg, #5C56E1, #8B5CF6);
// }

// body.dark-theme {
//   --color-card: #1E293B;
//   --color-input: #141B2D;
//   --color-text: #F3F4F6;
//   --color-placeholder: #A3B6DC;
//   --color-border: #334155;

//   background: var(--color-card);
//   background-image: radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 35%), radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 35%), radial-gradient(circle at 50% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 40%);
// }
