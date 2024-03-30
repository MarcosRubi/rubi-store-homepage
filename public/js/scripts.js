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


    //CARRITO
    const services = [
        { id: 1, name: 'Uñas acrílicas' },
        { id: 2, name: 'GelX' },
        { id: 3, name: 'Esmaltado Semipermanente' },
        { id: 4, name: 'Retiro Profesional de Acrílico y GelX' },
    ];
    const servicesSelected = [];
    const $cartCount = document.querySelector('#cartCount');

    const $buttonsAddService = document.querySelectorAll('button.btn-primary');
    const $buttonsRemoveService = document.querySelectorAll('button.btn-secondary');

    $buttonsAddService.forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const buttonText = button.querySelector('span');
            const buttonRemoved = button.nextElementSibling;

            addService(id, buttonText, button, buttonRemoved);
            updateCountCart();
        });
    });

    $buttonsRemoveService.forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const buttonAdded = button.previousElementSibling;
            const buttonText = buttonAdded.querySelector('span');

            removeService(id, buttonText, buttonAdded, button);
            updateCountCart();
        });
    });

    function addService(id, buttonText, button, buttonRemoved) {
        servicesSelected.push(id);
        buttonText.textContent = 'Servicio seleccionado';
        button.classList.add('selected');
        buttonRemoved.classList.add('show');
        button.style.pointerEvents = 'none';
    }

    function removeService(id, buttonText, buttonAdded, button) {
        const index = servicesSelected.indexOf(id);

        servicesSelected.splice(index, 1);
        buttonText.textContent = 'Seleccionar servicio';
        buttonAdded.classList.remove('selected');
        button.classList.remove('show');
        buttonAdded.style.pointerEvents = 'initial';
    }

    function updateCountCart() {
        $cartCount.textContent = servicesSelected.length;
    }

    updateCountCart();


    // MENU
    const iconMenu = document.querySelector('.icon-menu')
    const menuList = document.querySelector('.menu__list')
    const menuElements = menuList.querySelectorAll('a')

    iconMenu.addEventListener('click', toggleMenu);

    menuElements.forEach((el) => {
        el.addEventListener('click', toggleMenu);
    })


    function toggleMenu() {
        iconMenu.classList.toggle('icon-closed');
        menuList.classList.toggle('show');
    }

})