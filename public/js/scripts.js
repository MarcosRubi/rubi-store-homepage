window.addEventListener('load', () => {
    //   OBSERVER
    function startAnimation(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }
    const observer = new IntersectionObserver(startAnimation, {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    });

    const numbers = document.querySelectorAll('.number')
    const imagesToReveal = document.querySelectorAll('.reveal')
    // const orderOnlineImage = document.querySelector('.order-online img')

    const elementsToObserver = [...numbers, ...imagesToReveal];

    elementsToObserver.forEach((element) => {
        observer.observe(element);
    });
})