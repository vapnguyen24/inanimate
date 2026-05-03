const duration = 5; // seconds

function random(num) {
    return Math.floor(Math.random() * num);
}

function random_range(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomStyles() {
    var r = random(255);
    var g = random(255);
    var b = random(255);
    var mt = random(200);
    var ml = random(50);
    var dur = random(5) + 5;
    return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7);
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloon(balloonContainer) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);

    setTimeout(() => {
        balloonContainer.remove();
    }, duration * 1000);
}

function createBalloons(num) {
    var balloonContainer = document.createElement("div");
    balloonContainer.id = "balloon-container";
    document.body.appendChild(balloonContainer);

    for (var i = num; i > 0; i--) {
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(function () {
            createBalloon(balloonContainer);
        });
    }
}

function createFireworks() {
    for (var i = 0; i < 20; i++) {
        (function () {
            var firework = document.createElement("div");
            firework.className = "firework";
            firework.style.left = Math.random() * window.innerWidth + "px";
            firework.style.top = Math.random() * window.innerHeight + "px";
            document.body.appendChild(firework);

            // Remove the fireworks after (n) seconds
            setTimeout(function () {
                firework.remove();
            }, duration * 1000);
        })();
    }
}

function createThunderstorm(customDuration = duration) {
    var thunderstormContainer = document.createElement('div');
    thunderstormContainer.id = 'thunderstorm';

    document.body.appendChild(thunderstormContainer);

    const rain = setInterval(function () {
        createRaindrop(thunderstormContainer);
    }, 50);

    setTimeout(function () {
        clearInterval(rain);
        thunderstormContainer.remove();
    }, customDuration * 1000);
}

// Function to create raindrops
function createRaindrop(thunderstormContainer) {
    const raindrop = document.createElement("div");
    raindrop.className = "raindrop";
    thunderstormContainer.appendChild(raindrop);

    const startX = random_range(0, window.innerWidth);
    const startY = random_range(-10, -5);
    const duration = random_range(0.5, 2);

    gsap.fromTo(
        raindrop,
        { x: startX, y: startY, opacity: 1 },
        {
            x: startX + 20,
            y: window.innerHeight + 20,
            opacity: 0,
            duration,
            ease: "linear",
            onComplete: () => {
                thunderstormContainer.removeChild(raindrop);
            }
        }
    );
}

function showFunnyMessage(message, customDuration = duration) {
    // Create a div for the funny message
    var funnyMessageDiv = document.createElement('div');
    funnyMessageDiv.className = 'funny-message';
    funnyMessageDiv.textContent = message;

    // Append the div to the body
    document.body.appendChild(funnyMessageDiv);

    // Remove the message after a delay
    setTimeout(function () {
        funnyMessageDiv.remove();
    }, customDuration * 1000); // Remove the message after (n) seconds
}

function showDancingCat(referenceImage) {
    // Change the gif image
    referenceImage.src = 'public/cat-state-2.gif';

    // Bring back the image after delay
    setTimeout(function () {
        referenceImage.src = 'public/cat-state-1.gif';
    }, duration * 1000);
}

function showCryingCat(referenceImage, customDuration = duration) {
    // Change the gif image
    referenceImage.src = 'public/cat-state-4.gif';

    // Bring back the image after delay
    setTimeout(function () {
        referenceImage.src = 'public/cat-state-1.gif';
    }, customDuration * 1000);
}

function preloadImages() {
    // Array to store image URLs
    const imageUrls = [
        'public/cat-state-1.gif',
        'public/cat-state-2.gif',
        'public/cat-state-3.gif',
        'public/cat-state-4.gif',
    ];

    // Iterate through each image URL
    imageUrls.forEach(url => {
        // Create a new image element
        const img = new Image();

        // Set the image source to preload the image
        img.src = url;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Preload images when the window loads
    preloadImages();

    // Get the "Có" button element
    var yesButton = document.querySelector('button:nth-of-type(1)');
    var noButton = document.querySelector('button:nth-of-type(2)');

    // Get the image element
    var imageElement = document.querySelector('img');

    // Smartphone compability
    var isTouchDevice = 'ontouchstart' in document.documentElement;
    var isMouseOver = false;

    var mouseLeaveTimeout;

    // Add a mouseover event listener to the image element
    imageElement.addEventListener('mouseover', function () {
        if (!isTouchDevice) {
            isMouseOver = true;
            imageElement.src = 'public/cat-state-3.gif';
        }
    });

    // Add a mouseleave event listener to the image element
    imageElement.addEventListener('mouseleave', function () {
        if (!isTouchDevice) {
            clearTimeout(mouseLeaveTimeout);

            // Set a delay before changing the image source on mouseleave
            mouseLeaveTimeout = setTimeout(function () {
                isMouseOver = false;
                // Only reset if it's not currently dancing (state 2) or crying (state 4)
                if (!imageElement.src.includes('public/cat-state-2.gif') && !imageElement.src.includes('public/cat-state-4.gif')) {
                    imageElement.src = 'public/cat-state-1.gif';
                }
            }, 300); // Adjust the delay as needed
        }
    });

    // Add a touchstart event listener to the image element
    imageElement.addEventListener('touchstart', function () {
        if (isMouseOver) {
            return;
        }

        isMouseOver = false;

        // Change the image source when the image is clicked
        imageElement.src = 'public/cat-state-3.gif';

        // Reset the image source after (n) seconds
        setTimeout(function () {
            if (!imageElement.src.includes('public/cat-state-2.gif')
                && !imageElement.src.includes('public/cat-state-4.gif')) {
                imageElement.src = 'public/cat-state-1.gif';
            }
        }, 1500);
    });

    // Audio elements
    var yesAudio = new Audio('public/yes.mp3');
    var noAudio = new Audio('public/no.mp3');
    var audioTimeout;

    // Add a click event listener to the "Có" button
    yesButton.addEventListener('click', function () {
        clearTimeout(audioTimeout);
        // Play 'yes' audio and stop 'no' audio
        noAudio.pause();
        noAudio.currentTime = 0;
        yesAudio.currentTime = 0;
        yesAudio.play().catch(e => console.log("Audio play failed:", e));

        // Show dancing cat
        showDancingCat(imageElement);

        // Create floating baloons
        createBalloons(50);

        // Create fireworks on "Có" button click
        createFireworks();

        // Add a funny message when the "Có" button is clicked
        showFunnyMessage("Tràn đầy năng lượng nhỉ! Tuyệt vời quá meo 🌟");
    });

    // Add a click event listener to the "Không" button
    noButton.addEventListener('click', function () {
        clearTimeout(audioTimeout);
        // Play 'no' audio and stop 'yes' audio
        yesAudio.pause();
        yesAudio.currentTime = 0;
        noAudio.currentTime = 0;
        noAudio.play().catch(e => console.log("Audio play failed:", e));

        const noDuration = 15; // Mèo khóc trong 15 giây

        audioTimeout = setTimeout(function() {
            noAudio.pause();
            noAudio.currentTime = 0;
        }, noDuration * 1000);

        // Show crying cat
        showCryingCat(imageElement, noDuration);

        // Make it rain
        createThunderstorm(noDuration);

        // Add a funny message when the "Không" button is clicked
        showFunnyMessage("Muốn thấy nụ cười của mọi người quá meo 💔", noDuration);
    });
});
