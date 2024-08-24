/* eslint-disable */
import "bootstrap";
import "./style.css";

const cardValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];
const cardSuits = ["♦", "♠", "♥", "♣"];

function randomValue() {
  const options = cardValues;
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function randomSuit() {
  const suits = cardSuits;
  const randomIndex = Math.floor(Math.random() * suits.length);
  return suits[randomIndex];
}

function createRandomCard() {
  const value = cardValues[Math.floor(Math.random() * cardValues.length)];
  const suit = cardSuits[Math.floor(Math.random() * cardSuits.length)];
  return { value, suit };
}

function createMultipleCards(num) {
  const deck = [];
  for (let i = 0; i < num; i++) {
    deck.push(createRandomCard());
  }
  return deck;
}

function displayCards(cards, targetContainer) {
  targetContainer.innerHTML = "";
  cards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.className = `card ${
      card.suit === "♥" || card.suit === "♦" ? "red" : "black"
    }`;
    cardElement.innerHTML = `<span class="top-suit">${card.suit}</span>
                              <span class="number">${card.value}</span>
                              <span class="bottom-suit">${card.suit}</span>`;
    targetContainer.appendChild(cardElement);
  });
}

const selectionSortAlgorithm = array => {
  let startIndex = 0;
  const history = [];
  while (startIndex < array.length - 1) {
    for (let i = startIndex + 1; i < array.length; i++) {
      if (
        cardValues.indexOf(array[startIndex].value) >
        cardValues.indexOf(array[i].value)
      ) {
        let temp = array[startIndex];
        array[startIndex] = array[i];
        array[i] = temp;
      }
    }
    history.push([...array]);
    startIndex++;
  }
  return history;
};

function showSortSteps(steps, container) {
  container.innerHTML = "";
  steps.forEach((step, index) => {
    const stepElement = document.createElement("div");
    stepElement.className = "step";
    const header = document.createElement("h3");
    header.textContent = `Step ${index}`;
    stepElement.appendChild(header);
    const row = document.createElement("div");
    row.className = "card-row";
    step.forEach(card => {
      const cardElement = document.createElement("div");
      cardElement.className = `card ${
        card.suit === "♥" || card.suit === "♦" ? "red" : "black"
      }`;
      cardElement.innerHTML = `<span class="top-suit">${card.suit}</span>
                                <span class="number">${card.value}</span>
                                <span class="bottom-suit">${card.suit}</span>`;
      row.appendChild(cardElement);
    });
    stepElement.appendChild(row);
    container.appendChild(stepElement);
  });
}

document.getElementById("generateCardsButton").addEventListener("click", () => {
  const cardAmount = parseInt(document.getElementById("numCards").value);
  if (isNaN(cardAmount) || cardAmount < 1) return;
  const deck = createMultipleCards(cardAmount);
  displayCards(deck, document.getElementById("cardsContainer"));
  document.getElementById("sortCardsButton").dataset.deck = JSON.stringify(
    deck
  );
});

document.getElementById("sortCardsButton").addEventListener("click", () => {
  const deck = JSON.parse(
    document.getElementById("sortCardsButton").dataset.deck
  );
  const sortingSteps = selectionSortAlgorithm(deck);
  showSortSteps(sortingSteps, document.getElementById("stepsContainer"));
});
