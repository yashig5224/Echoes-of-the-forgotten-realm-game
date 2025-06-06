const storyEl = document.getElementById('story');
const choicesEl = document.getElementById('choices');
const sceneImg = document.getElementById('scene-img');

function showStory(text, options = [], background = '') {
  storyEl.innerText = text;
  choicesEl.innerHTML = '';
  if (background) sceneImg.src = background;

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.innerText = option.text;
    btn.onclick = option.action;
    choicesEl.appendChild(btn);
  });
}

function gameOver() {
  showStory(
    'Game Over. You have met your fate.',
    [{ text: 'Restart', action: levelOne }],
    'assets/bg-abyss.jpeg'
  );
}

function victory() {
  showStory(
    'Congratulations! You have uncovered the secrets of the Forgotten Realm and achieved enlightenment!',
    [],
    'assets/bg-gateway.jpeg'
  );
}

function secretEnding() {
  showStory(
    'As you step into the Unknown, reality itself unravels. You become a legend beyond time and space...',
    [],
    'assets/bg-kingdom.jpeg'
  );
}

function combat(nextLevel) {
  const playerRoll = Math.ceil(Math.random() * 6);
  const enemyRoll = Math.ceil(Math.random() * 6);
  let result = `You rolled a ${playerRoll}, the enemy rolled a ${enemyRoll}. `;

  if (playerRoll >= enemyRoll) {
    result += 'You win the fight!';
    showStory(result, [{ text: 'Continue...', action: nextLevel }]);
  } else {
    result += 'You were defeated.';
    showStory(result, [{ text: 'Game Over', action: gameOver }], 'assets/bg-abyss.jpg');
  }
}

// Levels
function levelOne() {
  showStory(
    "Level 1: The Whispering Woods\nA mysterious voice whispers: 'Choose your path... left or right?'",
    [
      { text: 'Left', action: levelTwo },
      { text: 'Right', action: () => combat(levelTwo) }
    ],
    'assets/bg-forest.jpeg'
  );
}

function levelTwo() {
  showStory(
    "Level 2: The Ancient Temple\nYou find a glowing artifact. Take it or leave it?",
    [
      { text: 'Take it', action: levelThree },
      { text: 'Leave it', action: gameOver }
    ],
    'assets/bg-temple.jpeg'
  );
}

function levelThree() {
  showStory(
    "Level 3: The Lost Kingdom\nA guardian asks:\n'What has roots as nobody sees, is taller than trees, up, up it goes, and yet it never grows?'",
    [
      { text: 'Mountain', action: levelFour },
      { text: 'Other', action: () => combat(levelTwo) }
    ],
    'assets/bg-kingdom.jpeg'
  );
}

function levelFour() {
  showStory(
    "Level 4: The Shadow Abyss\nA voice asks: 'What do you seek? Power or Wisdom?'",
    [
      { text: 'Power', action: gameOver },
      { text: 'Wisdom', action: levelFive }
    ],
    'assets/bg-abyss.jpeg'
  );
}

function levelFive() {
  showStory(
    "Level 5: The Celestial Gateway\nFinal choice: Enter the Light or step into the Unknown?",
    [
      { text: 'Light', action: victory },
      { text: 'Unknown', action: secretEnding }
    ],
    'assets/bg-gateway.jpeg'
  );
}

// Game Start
window.onload = () => {
  showStory(
    "Welcome to 'Echoes of the Forgotten Realm'!\nYou find yourself in a dark forest with no memory of how you got here...",
    [{ text: 'Start Game', action: levelOne }],
    'assets/bg-forest.jpeg'
  );
};
