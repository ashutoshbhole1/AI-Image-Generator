function log(...e){
    console.log(...e);
}

log("Radhe Radhe");

// https://huggingface.co/spaces/black-forest-labs/FLUX.1-dev

// API FOR THAT AI IMG GEN



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

  :root {
    --color-primary: #5C56E1;
    --color-primary-dark: #5b21b6;
    --color-accent: #8B5CF6;
    --color-card: #FFFFFF;
    --color-input: #F1F1FF;
    --color-text: #09090E;
    --color-placeholder: #5C5A87;
    --color-border: #D4D4ED;
    --color-gradient: linear-gradient(135deg, #5C56E1, #8B5CF6);
  }
  
  body.dark-theme {
    --color-card: #1E293B;
    --color-input: #141B2D;
    --color-text: #F3F4F6;
    --color-placeholder: #A3B6DC;
    --color-border: #334155;
  
    background: var(--color-card);
    background-image: radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 35%), radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 35%), radial-gradient(circle at 50% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 40%);
  }