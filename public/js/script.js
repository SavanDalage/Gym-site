"use strict";

// array dla klawiszy oraz zbiór stron
var buttonsArray = Array.from(
  document.getElementsByClassName("navigation-button")
);
var pages = document.getElementsByClassName("page");

// funkcja podświetlająca klawisze
function highlight(event) {
  buttonsArray.forEach((button) => {
    button.classList.remove("highlighted");
  });
  event.target.classList.add("highlighted");
}

// dla array klawiszy lisner kliknięcia. Podświetla klawisze i na podstawie klikniętego klawisza przywołuję odpowiednią stronę
buttonsArray.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    highlight(event);
    document.getElementById(`p${index + 1}`).scrollIntoView();
  });
});

// Intersection Observer callback
function intersectionCallback(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      var index = Array.from(pages).indexOf(entry.target);
      buttonsArray.forEach((button) => {
        button.classList.remove("highlighted");
      });
      buttonsArray[index].classList.add("highlighted");
    }
  });
}

// Intersection Observer callback dla opacity
function handleIntersect(entries) {
  entries.forEach((entry) => {
    const ratio = entry.intersectionRatio;
    const opacity = Math.min(ratio * 2, 1); // obliczanie opacity na podstawie intersection ratio
    entry.target.style.opacity = opacity;
  });
}

// tworzy Intersection Observer
var observer = new IntersectionObserver(intersectionCallback, {
  threshold: 0.5, // Trigger kiedy 50% jest widoczne
});

// tworzy Intersection Observer dla zmiany opacity
var observerOpacity = new IntersectionObserver(handleIntersect, {
  threshold: Array.from({ length: 101 }, (v, i) => i * 0.01), // Thresholds od 0% do 100%
});

// Observe dla każdej page
Array.from(pages).forEach((page) => {
  observer.observe(page);
  observerOpacity.observe(page);
});

// SPRZĘT DO ĆWICZEŃ

function newPath(path, replacement) {
  let firstPart = path.substring(0, path.length - 7);
  let lastPart = path.substring(path.length - 6, path.length);
  return firstPart + replacement + lastPart;
}

async function opisSprzetu() {
  try {
    const response = await fetch("eq.json");
    const textMapping = await response.json();
    // const textMapping2 = CSSJSON.toCSS(textMapping);
    const images = document.querySelectorAll(".gear-img");
    images.forEach((img) => {
      img.addEventListener("click", function () {
        document.getElementById("equipment").classList.add("equ-visible");

        document
          .getElementById("equipment-img")
          .setAttribute("src", newPath(this.src, "h"));

        const srcSubstring = this.src.substring(
          this.src.length - 7,
          this.src.length - 4
        );
        document.getElementById("eq-des").textContent =
          textMapping[srcSubstring];
        document.getElementById("eq-des-2").textContent =
          textMapping[srcSubstring + 1];
        document.getElementById("eq-des-3").textContent =
          textMapping[srcSubstring + 3];
      });
    });
  } catch (error) {
    console.error("Błąd ładowania opisu sprzętu:", error);
  }
}

opisSprzetu();
