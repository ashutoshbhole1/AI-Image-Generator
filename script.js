function log(...e) { console.log(...e); } log("Radhe Radhe");
// https://huggingface.co/docs/api-inference/tasks/text-to-image?code=js

let body = document.querySelector("body");
let themeToggle = document.querySelector(".theme-toggle");
let mode = document.querySelector(".theme-toggle i");
let dark = false;

let promptBtn = document.querySelector(".prompt-btn");
let generateBtn = document.querySelector(".generate-btn");
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
    "A hyper-realistic 3D-rendered image of Lord Krishna and Radha in the enchanting forests of Braj, surrounded by ancient banyan trees and vibrant wildflowers. Krishna, in royal blue attire, plays the flute as Radha, draped in a golden saree, listens with devotion. Fireflies glow around them, and peacocks dance in the background. The scene is bathed in warm golden light, evoking divine romance. Ultra-HD, 8K, photorealistic details, cinematic lighting, dreamy atmosphere.",  
"A stunning 3D render of Radha and Krishna standing on the steps of an ancient temple in Vrindavan, bathed in the soft golden glow of sunrise. Krishna, holding his flute, is adorned in a silk dhoti with gold embroidery, while Radha wears a pink and emerald green lehenga with delicate jewelry. The temple’s intricate carvings, marigold garlands, and incense smoke fill the air, creating a sacred and divine ambiance. Ultra-HD, 8K, photorealistic, cinematic lighting, ethereal atmosphere.",  
"A photorealistic 3D render of Krishna and Radha dancing gracefully during Raas Leela on the banks of the Yamuna River under the full moon. The water shimmers with reflections of the celestial light, and divine gopis dance in synchronized motion. Krishna’s golden crown glows subtly, and Radha’s flowing attire moves elegantly with the rhythm. Soft wind, twinkling stars, magical ambiance, and divine energy fill the scene. Ultra-HD, 8K, cinematic quality, highly detailed textures.",  
"A breathtaking 3D-rendered image of Krishna and Radha standing under a blossoming kadamba tree in Govardhan Hills as rain gently falls around them. Krishna shelters Radha under his yellow shawl, their eyes locked in a divine gaze. Lush greenery, misty mountains in the background, raindrops glistening on lotus flowers, and the scent of wet earth create an incredibly realistic and immersive scene. Ultra-HD, 8K, photorealistic lighting, cinematic mood.",  
"A hyper-detailed 3D visualization of Krishna and Radha in the celestial gardens of Goloka Vrindavan, surrounded by golden lotus ponds, floating divine chariots, and glowing celestial beings. Krishna plays his flute, and the air vibrates with divine energy, while Radha, in a radiant silk dress, is surrounded by celestial swans and heavenly flowers. The sky glows with ethereal colors, creating an otherworldly ambiance. Ultra-HD, 8K, photorealistic textures, divine lighting effects.",  
"A 3D-rendered masterpiece of Krishna and Radha sitting by Radha Kund at sunset, with the sky painted in deep orange and pink hues. The water reflects their divine beauty, surrounded by fragrant jasmine flowers and softly glowing diyas floating in the lake. Krishna’s golden flute rests beside him, while Radha leans gently on his shoulder, lost in devotion. The entire scene exudes peace, love, and divine connection. Ultra-HD, 8K, cinematic quality, warm lighting, hyper-realistic details.",  

    "A magic forest with glowing plants and fairy homes among giant mushrooms",
    "An old steampunk airship floating through golden clouds at sunset",
    "A future Mars colony with glass domes and gardens against red mountains",
    "A dragon sleeping on gold coins in a crystal cave",
    "A witch's cottage in fall with magic herbs in the garden",
    "A robot painting in a sunny studio with art supplies around it",
    "A magical library with floating glowing books and spiral staircases",
    "A medieval marketplace with colorful tents and street performers",
    "A cyberpunk city with neon signs and flying cars at night",

    "A hyper-realistic 3D-rendered cyberpunk city at midnight, with neon lights reflecting on rain-soaked streets, flying cars in the distance, and a lone figure wearing a futuristic jacket standing under a holographic billboard. Ultra-detailed, cinematic lighting, 8K resolution, Octane render, Unreal Engine 5.",
    "A photorealistic 3D-rendered portrait of a futuristic warrior with cybernetic implants, battle scars, and piercing blue eyes. Wearing a highly detailed, futuristic armored suit with glowing blue accents. The lighting highlights the intricate textures of the metal and fabric. 8K resolution, cinematic, ultra-sharp, Octane render, Unreal Engine 5.",
    "A highly detailed, ultra-realistic 3D render of a futuristic Lamborghini parked on the red, dusty terrain of Mars, with a glass-like dome city in the background. The metallic car reflects the alien landscape, and the setting sun casts long, dramatic shadows. 8K, cinematic lighting, ray tracing, ultra-HD textures.",
    "A hyper-detailed, 3D-rendered scene of an ancient sorcerer with a long flowing robe, casting a glowing blue energy spell with swirling magical runes. The background is a dark, gothic castle with floating candles and mist rising from the stone floors. Ultra-HD, realistic skin textures, volumetric lighting, ray tracing, Unreal Engine 5.",

    "A 3D ultra-realistic image of a medieval king sitting on an elaborately detailed golden throne inside a grand, candle-lit stone castle hall. His royal armor shines in the dim firelight, and his cape flows over the throne. Intricate details in the textures of the stone, metal, and fabrics. 8K, cinematic lighting, highly detailed, hyper-realistic, Octane render.",
    "A stunning 3D-rendered interior of a luxurious futuristic penthouse with a panoramic floor-to-ceiling glass window overlooking a glowing cyberpunk city. The room is decorated with high-end furniture, LED accent lighting, and an ultra-modern aesthetic. A digital AI assistant hologram stands in the center, interacting with the environment. Ultra-HD, 8K, cinematic lighting, photorealistic, Octane render, ray tracing.",

    "A hyper-realistic 3D render of a peaceful countryside village at sunrise, with cozy wooden houses, colorful flowers lining the stone paths, and a gentle morning mist rolling over the green hills. The golden sunlight gives everything a warm, dreamy glow. Ultra-HD, photorealistic, soft lighting, cinematic atmosphere.",
    "A hyper-realistic 3D render of a foggy ancient village deep in the mountains, with rustic wooden houses covered in moss, glowing lanterns hanging from curved rooftops, and narrow stone streets filled with mist. A river flows through the village, reflecting the golden lantern light. Ultra-HD, cinematic lighting, peaceful atmosphere.",
    "A photorealistic 3D-rendered image of a lively traditional Japanese street at night, filled with glowing red and yellow paper lanterns, tiny ramen shops, and people walking under neon-lit signs. The wet pavement reflects the lights, adding a cinematic depth to the scene. Ultra-HD, hyper-detailed, night atmosphere, cyberpunk aesthetic.",
    "A serene 3D-rendered image of a small Scandinavian fishing village with colorful wooden houses sitting along a calm, icy fjord. Snow-capped mountains rise in the background, and gentle ripples in the water reflect the winter sunset. Photorealistic, ultra-HD, cinematic, cozy and peaceful.",
    "A hyper-realistic 3D image of an enchanted forest village where tiny glowing mushrooms light up the wooden houses built into ancient trees. Fireflies dance in the air, and a crystal-clear river winds through the village, reflecting the soft glow of the bioluminescent plants. Fantasy realism, ultra-HD, magical atmosphere.",
    "A beautiful 3D-rendered cozy winter village, with wooden cottages covered in fresh snow, glowing golden lights shining from the windows, and smoke rising from chimneys. A frozen river winds through the village, reflecting the twinkling stars above. Ultra-HD, hyper-realistic, cinematic, peaceful holiday atmosphere.",



    "A hyper-realistic 3D render of a peaceful countryside village at sunrise, with cozy wooden houses, colorful flowers lining the stone paths, and a gentle morning mist rolling over the green hills. The golden sunlight gives everything a warm, dreamy glow. Ultra-HD, photorealistic, soft lighting, cinematic atmosphere.",
    "A stunning 3D-rendered autumn landscape of a quiet lakeside cabin surrounded by trees with red, orange, and yellow leaves. A wooden dock extends into the misty lake, with gentle ripples reflecting the golden sunset. Warm, cozy lighting, ultra-HD, hyper-realistic details, cinematic vibes.",
    "A photorealistic 3D image of a Mediterranean coastal town with pastel-colored houses stacked along a cliffside, overlooking the deep blue sea. The streets are lined with blooming bougainvillea, and small boats float near the shore. Sunlight glistens on the water, creating a serene, dreamy vibe. 8K, ultra-detailed, vibrant, cinematic composition.",
    "A hyper-realistic 3D render of a foggy ancient village deep in the mountains, with rustic wooden houses covered in moss, glowing lanterns hanging from curved rooftops, and narrow stone streets filled with mist. A river flows through the village, reflecting the golden lantern light. Ultra-HD, cinematic lighting, peaceful atmosphere.",
    "A photorealistic 3D-rendered image of a lively traditional Japanese street at night, filled with glowing red and yellow paper lanterns, tiny ramen shops, and people walking under neon-lit signs. The wet pavement reflects the lights, adding a cinematic depth to the scene. Ultra-HD, hyper-detailed, night atmosphere, cyberpunk aesthetic.",
    "A realistic 3D-rendered spring village scene with cherry blossom trees in full bloom, their pink petals drifting through the air. Small wooden houses with thatched roofs sit along a cobblestone path, and a peaceful stream flows through the center of the village. Warm lighting, photorealistic textures, dreamy aesthetic.",
    "A beautiful 3D-rendered cozy winter village, with wooden cottages covered in fresh snow, glowing golden lights shining from the windows, and smoke rising from chimneys. A frozen river winds through the village, reflecting the twinkling stars above. Ultra-HD, hyper-realistic, cinematic, peaceful holiday atmosphere."



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
                        <a href="${imgUrl}" class="download-btn" download="${Date.now()}.png" target="_blank">
                            <i class="fa-solid fa-download" download="${Date.now()}.png"></i>
                        </a>
                    </div>
                    `;
};


// send req to hugging face api
const generateImages = async (selectedModel, imageCount, aspectRatio, promptText) => {

  const MODEL_URL = `https://router.huggingface.co/hf-inference/models/${selectedModel}`;

  // const API_KEY =  `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`;
  // const API_KEY =  `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`;// for backup

  // const API_KEY = `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`; // Ashu College READ
  // const API_KEY = `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`; // kanha ashu  tech READ Access
  const API_KEY =  `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`;// for backup with READ Access ( Paul Krisi )

  const { width, height } = getImageDimension(aspectRatio);
  generateBtn.setAttribute("disabled", "true");


  // Array of img generation promises
  const imagePromises = Array.from({ length: imageCount }, async (_, i) => {
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
      const imgCard = document.getElementById(`img-card-${i}`);
      imgCard.classList.replace("loading", "error");
      imgCard.querySelector(".status-text").textContent = "Generation failed! Check console for more details.";

    }
  });


  await Promise.allSettled(imagePromises);
  generateBtn.removeAttribute("disabled");

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








