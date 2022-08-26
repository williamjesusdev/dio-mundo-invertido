import { createSubscription } from "./firebase/collections/hellfire-club.js";

const audio = document.getElementById("music");
const subscribeForm = document.getElementById("subscribeForm");
const toggleButton = document.getElementById("switch-theme-button");

window.addEventListener("click", function (event) {
  const ariaClicked = event.path;

  if (
    ariaClicked.includes(subscribeForm) ||
    ariaClicked[0].localName == "button"
  ) {
    audio.play();
  } else {
    audio.paused ? audio.play() : audio.pause();
  }

  audio.volume = 0.2;
});

toggleButton.addEventListener("click", () => {
  const theme = document.body.classList[0];

  theme === "light-theme"
    ? ((document.body.classList = ["dark-theme"]),
      (audio.src = audio.src.replace("normal", "inverted")))
    : ((document.body.classList = ["light-theme"]),
      (audio.src = audio.src.replace("inverted", "normal")));

  audio.play();
  audio.volume = 0.2;
});

subscribeForm.btnSubscribe.addEventListener("click", () => {
  const subscription = {
    name: subscribeForm.name.value,
    email: subscribeForm.email.value,
    level: subscribeForm.level.value,
    character: subscribeForm.character.value,
  };

  createSubscription(subscription).then((subscribeId) => {
    console.log(`Inscrito com sucesso: ${subscribeId}`);
    subscribeForm.reset();
  });
});
