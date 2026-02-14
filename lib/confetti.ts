import confetti from "canvas-confetti";

const heartPath =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

export function fireSmallHeartBurst() {
  const heart = confetti.shapeFromPath({ path: heartPath });

  confetti({
    particleCount: 12,
    spread: 50,
    origin: { y: 0.6 },
    shapes: [heart],
    scalar: 1.1,
    colors: ["#e11d63", "#f47a8b", "#fbd5e0"],
    disableForReducedMotion: true,
  });
}

export function fireValentineConfetti() {
  const heart = confetti.shapeFromPath({ path: heartPath });

  // Single celebratory burst — no sustained loop
  confetti({
    particleCount: 40,
    spread: 70,
    origin: { y: 0.5 },
    shapes: [heart, "circle"],
    scalar: 1.3,
    colors: ["#e11d63", "#f47a8b", "#fbd5e0", "#ff6b9d"],
    disableForReducedMotion: true,
  });

  // Two quick side pops after a short delay
  setTimeout(() => {
    confetti({
      particleCount: 15,
      angle: 60,
      spread: 50,
      origin: { x: 0.1, y: 0.6 },
      shapes: [heart],
      scalar: 1.1,
      colors: ["#e11d63", "#f47a8b", "#ff6b9d"],
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 15,
      angle: 120,
      spread: 50,
      origin: { x: 0.9, y: 0.6 },
      shapes: [heart],
      scalar: 1.1,
      colors: ["#e11d63", "#f47a8b", "#ff6b9d"],
      disableForReducedMotion: true,
    });
  }, 400);
}
