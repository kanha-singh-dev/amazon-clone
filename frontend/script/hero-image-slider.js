document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".hero-slider");

    if (!slider) {
        return;
    }

    const track = slider.querySelector(".slides");
    const previousButton = slider.querySelector("#prev");
    const nextButton = slider.querySelector("#next");

    if (!track || !previousButton || !nextButton) {
        return;
    }

    const originalSlides = Array.from(track.children);

    if (originalSlides.length < 2) {
        return;
    }

    // Duplicate edge slides so the visible movement remains continuous on wraparound.
    const firstSlideClone = originalSlides[0].cloneNode(true);
    const lastSlideClone = originalSlides[originalSlides.length - 1].cloneNode(true);
    firstSlideClone.setAttribute("aria-hidden", "true");
    lastSlideClone.setAttribute("aria-hidden", "true");
    track.append(firstSlideClone);
    track.prepend(lastSlideClone);

    let currentSlide = 1;
    let isAnimating = false;
    let autoplayId;

    // Every track step is exactly one slide width, regardless of screen size.
    const setPosition = (animate = true) => {
        track.style.transition = animate ? "" : "none";
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    const moveTo = (nextSlide) => {
        if (isAnimating) {
            return;
        }

        isAnimating = true;
        currentSlide = nextSlide;
        setPosition();
    };

    const stopAutoplay = () => {
        window.clearInterval(autoplayId);
    };

    const startAutoplay = () => {
        stopAutoplay();
        autoplayId = window.setInterval(() => {
            moveTo(currentSlide + 1);
        }, 5000);
    };

    // Start on the first real slide, after the prepended clone.
    setPosition(false);

    nextButton.addEventListener("click", () => {
        moveTo(currentSlide + 1);
        startAutoplay();
    });

    previousButton.addEventListener("click", () => {
        moveTo(currentSlide - 1);
        startAutoplay();
    });

    track.addEventListener("transitionend", (event) => {
        if (event.target !== track || event.propertyName !== "transform") {
            return;
        }

        isAnimating = false;

        // Jump invisibly from a clone back to its matching real slide.
        if (currentSlide === 0) {
            currentSlide = originalSlides.length;
            setPosition(false);
        } else if (currentSlide === originalSlides.length + 1) {
            currentSlide = 1;
            setPosition(false);
        }
    });

    // Pausing while hovered or hidden avoids wasted transitions and surprise movement.
    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    startAutoplay();
});
