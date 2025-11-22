//mode
const modeBtn = document.querySelector(".mode-btn");
const body = document.body;

modeBtn.addEventListener("click", () => {
  body.classList.toggle("light");

  if (body.classList.contains("light")) {
    localStorage.setItem("mode", "light");
  } else if (!body.classList.contains("light")) {
    localStorage.setItem("mode", "dark");
  }
});

//window loading
window.addEventListener("load", () => {
  const savedMode = localStorage.getItem("mode");
  if (!savedMode) return;
  if (savedMode === "light") {
    body.classList.add("light");
  } else if (savedMode === "dark") {
    body.classList.remove("light");
  }
});

//jokeFetcher
const getJoke = document.querySelector(".get-joke");
const copyJoke = document.querySelector(".copy-joke");
copyJoke.disabled = true;
const loading = document.querySelector(".loading");
const jokeBody = document.querySelector(".joke-body");
const copiedMsg = document.querySelector(".copied-msg");

async function fetchJoke() {
  loading.style.display = "block";
  jokeBody.textContent = "";
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch a joke");
    }

    const data = await response.json();
    copyJoke.disabled = false;
    loading.style.display = "none";
    jokeBody.textContent = data.joke;
  } catch (err) {
    jokeBody.textContent = err.message;
    copyJoke.disabled = true;
    loading.style.display = "none";
  }
}

getJoke.addEventListener("click", fetchJoke);

copyJoke.addEventListener("click", () => {
  navigator.clipboard
    .writeText(jokeBody.textContent)
    .then(() => {
      copyJoke.textContent = "Copied!";
      copiedMsg.classList.add("active");
      copyJoke.disabled = true;
      setTimeout(() => {
        copyJoke.textContent = "Copy Joke";
        copiedMsg.classList.remove("active");
      }, 2000);
    })
    .catch(() => {
      copyJoke.textContent = "Failed to Copy!";
      setTimeout(() => {
        copyJoke.textContent = "Copy Joke";
      }, 2000);
    });
});
