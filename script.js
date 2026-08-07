/* =========================
   GET ELEMENTS
========================= */

const yesBtn = document.getElementById("yesBtn");

const noBtn = document.getElementById("noBtn");

const counterElement =
    document.getElementById("counter");

const questionScreen =
    document.getElementById("questionScreen");

const endingScreen =
    document.getElementById("endingScreen");

const heartsContainer =
    document.querySelector(".hearts");

const confettiContainer =
    document.getElementById("confetti");

/* =========================
   VARIABLES
========================= */

let attempts = 0;

let noScale = 1;

let gameFinished = false;

/* =========================
   MOVE YES BUTTON
========================= */

function moveYesButton() {

    if (gameFinished) return;

    attempts++;

    counterElement.textContent = attempts;

    /* =========================
       Make NO button bigger
    ========================= */

    noScale += 0.08;

    noBtn.style.transform =
        `scale(${noScale})`;

    /* =========================
       Move YES button
    ========================= */

    yesBtn.style.position = "fixed";

    const buttonWidth =
        yesBtn.offsetWidth;

    const buttonHeight =
        yesBtn.offsetHeight;

    const maxX =
        window.innerWidth -
        buttonWidth -
        10;

    const maxY =
        window.innerHeight -
        buttonHeight -
        10;

    const randomX =
        Math.max(
            10,
            Math.random() * maxX
        );

    const randomY =
        Math.max(
            10,
            Math.random() * maxY
        );

    yesBtn.style.left =
        randomX + "px";

    yesBtn.style.top =
        randomY + "px";

    /* =========================
       Shake YES button
    ========================= */

    yesBtn.style.transform =
        "rotate(10deg)";

    setTimeout(() => {

        yesBtn.style.transform =
            `scale(${noScale}) rotate(0deg)`;

    }, 200);

    /* =========================
       Create heart
    ========================= */

    createHeart();

    /* =========================
       Special messages
    ========================= */

    if (attempts === 5) {

        showMessage(
            "Are you sure? 😂"
        );

    }

    if (attempts === 10) {

        showMessage(
            "You can't catch me! 🏃😂"
        );

    }

    if (attempts >= 15) {

        showMessage(
            "Okay okay... you win 😂❤️"
        );

        setTimeout(() => {

            showEnding();

        }, 1000);

    }

}

/* =========================
   SHOW MESSAGE
========================= */

function showMessage(message) {

    const oldMessage =
        document.querySelector(
            ".game-message"
        );

    if (oldMessage) {

        oldMessage.remove();

    }

    const messageElement =
        document.createElement("div");

    messageElement.className =
        "game-message";

    messageElement.textContent =
        message;

    messageElement.style.position =
        "fixed";

    messageElement.style.top =
        "25px";

    messageElement.style.left =
        "50%";

    messageElement.style.transform =
        "translateX(-50%)";

    messageElement.style.background =
        "rgba(255,255,255,0.9)";

    messageElement.style.padding =
        "10px 20px";

    messageElement.style.borderRadius =
        "20px";

    messageElement.style.color =
        "#ff4f8b";

    messageElement.style.fontWeight =
        "bold";

    messageElement.style.zIndex =
        "200";

    messageElement.style.animation =
        "fadeIn 0.3s ease";

    document.body.appendChild(
        messageElement
    );

    setTimeout(() => {

        messageElement.remove();

    }, 1500);

}

/* =========================
   CREATE HEART
========================= */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className = "heart";

    const heartTypes = [

        "❤️",
        "💕",
        "💗",
        "💖",
        "💓"

    ];

    heart.textContent =
        heartTypes[
        Math.floor(
            Math.random() *
            heartTypes.length
        )
        ];

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    heartsContainer.appendChild(
        heart
    );

    setTimeout(() => {

        heart.remove();

    }, 5000);

}

/* =========================
   CREATE CONFETTI
========================= */

function createConfetti() {

    for (let i = 0; i < 100; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.backgroundColor =
            getRandomColor();

        piece.style.animationDelay =
            Math.random() * 1.5 + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        confettiContainer.appendChild(
            piece
        );

        setTimeout(() => {

            piece.remove();

        }, 4000);

    }

}

/* =========================
   RANDOM COLORS
========================= */

function getRandomColor() {

    const colors = [

        "#ff4f8b",
        "#ff8fab",
        "#ffd166",
        "#06d6a0",
        "#118ab2",
        "#8338ec"

    ];

    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];

}

/* =========================
   YES BUTTON
   MOVES AWAY
========================= */

yesBtn.addEventListener(
    "mouseover",
    moveYesButton
);

/* =========================
   YES BUTTON
   MOBILE
========================= */

yesBtn.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveYesButton();

    }
);

/* =========================
   YES BUTTON CLICK
========================= */

yesBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        moveYesButton();

    }
);

/* =========================
   NO BUTTON
   STAYS FIXED
========================= */

noBtn.addEventListener(
    "click",
    showEnding
);

/* =========================
   SHOW ENDING
========================= */

function showEnding() {

    if (gameFinished) return;

    gameFinished = true;

    /* Hide question */

    questionScreen.style.display =
        "none";

    /* Show ending */

    endingScreen.style.display =
        "flex";

    /* Confetti */

    createConfetti();

    /* Lots of hearts */

    for (let i = 0; i < 25; i++) {

        setTimeout(() => {

            createHeart();

        }, i * 100);

    }

    /* Hide YES button */

    yesBtn.style.display =
        "none";

}

/* =========================
   BACKGROUND HEARTS
========================= */

setInterval(() => {

    if (!gameFinished) {

        createHeart();

    }

}, 1200);