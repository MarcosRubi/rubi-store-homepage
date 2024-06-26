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

    const elementsToObserver = [...numbers, ...imagesToReveal];

    elementsToObserver.forEach((element) => {
        observer.observe(element);
    });

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

    //BANNER 
    const layers = document.querySelectorAll(".layer");
    const banner = document.querySelector(".banner");

    function parallax(e) {
        layers.forEach((layer) => {
            const speed = layer.getAttribute("data-speed");

            if (speed) {
                const x = (window.innerWidth - e.pageX * parseInt(speed)) / 100;
                const y =
                    (window.innerHeight - e.pageY * parseInt(speed)) / 100;

                layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
            }
        });
    }

    function handleAnimationEnd() {
        layers.forEach((layer) => {
            layer.style.animation = "none";
        });
        banner.addEventListener("mousemove", parallax);
    }

    function startMoveAnimation() {
        let cumulativeDelay = 0;

        layers.forEach((layer, index) => {
            const delay = (index + 1) * 0.2;

            layer.style.animation = `moveImages 8s ease-in-out infinite alternate`;
            layer.style.animationDelay = `${cumulativeDelay + delay}s`;
            cumulativeDelay += delay;
        });
    }

    if (window.innerWidth > 1023) {
        banner?.addEventListener("animationend", handleAnimationEnd);
    } else {
        banner?.addEventListener("animationend", startMoveAnimation);
    }


    //CARRITO
    const services = [
        { id: 1, name: 'Uñas Acrílicas', image: "image-product-1-thumbnail" },
        { id: 2, name: 'GelX', image: "image-product-1-thumbnail" },
        { id: 3, name: 'Esmaltado Semipermanente', image: "image-product-1-thumbnail" },
        { id: 4, name: 'Retiro de Acrílico y GelX', image: "image-product-1-thumbnail" },
        { id: 5, name: 'Pedicure Tradicional', image: "image-product-1-thumbnail" },
        { id: 6, name: 'Pedicure Spa', image: "image-product-1-thumbnail" },
        { id: 7, name: 'Pedicure Clínico', image: "image-product-1-thumbnail" },
        { id: 8, name: 'Acripie', image: "image-product-1-thumbnail" },
        { id: 9, name: 'Extensiones de Pestañas', image: "image-product-1-thumbnail" },
        { id: 10, name: 'Lifting + Botox', image: "image-product-1-thumbnail" },
        { id: 11, name: 'Depilación de Cejas', image: "image-product-1-thumbnail" },
        { id: 12, name: 'Diseño de Cejas', image: "image-product-1-thumbnail" },
        { id: 13, name: 'Alisados', image: "image-product-1-thumbnail" },
        { id: 14, name: 'Masajes Relajantes', image: "image-product-1-thumbnail" },
    ];
    const servicesSelected = [];
    const $cartCount = document.querySelector('#cartCount');
    const $iconCart = document.querySelector('#cart-icon')
    const $cartDetails = document.querySelector('.cart__details')
    const $cartData = document.querySelector('#list')

    const $buttonsAddService = document.querySelectorAll('button.btn-primary');

    let showCartData = false;

    $iconCart.addEventListener('click', () => {
        $cartDetails.classList.toggle('active')
    })

    $buttonsAddService.forEach((button) => {
        button.addEventListener('click', () => {
            addService(button);
            updateCountCart();
        });
    });

    function addService(button) {
        const id = parseInt(button.getAttribute('data-id'));
        const buttonText = button.querySelector('span');

        if (servicesSelected.includes(id) || !services.find(service => service.id === id)) return;

        servicesSelected.push(id);

        buttonText.textContent = 'Servicio seleccionado';
        button.classList.add('selected');
        button.style.pointerEvents = 'none'
    }

    function removeService(button) {
        const buttonText = button.querySelector('span');

        buttonText.textContent = 'Seleccionar servicio';
        button.classList.remove('selected');
        button.style.pointerEvents = 'initial';
    }

    function updateCountCart() {
        const empty = `<div class='empty'><p class='font-bold'>No hay servicios seleccionados.</p></div>`

        $cartCount.textContent = servicesSelected.length;

        if (servicesSelected.length === 0) {
            $cartData.innerHTML = empty;
            return;
        }
        if (servicesSelected.length === 1 && !showCartData) {
            $cartDetails.classList.add('active')
            showCartData = true
        }

        let filteredServices = servicesSelected.map(id => services.find(service => service.id === id));
        $cartData.innerHTML = '';
        filteredServices.forEach((service, index) => {
            $cartData.appendChild(templateServiceToList(service.image, service.name, service.id));
        });
    }

    function templateServiceToList(img, name, id) {
        const li = document.createElement('li');
        li.classList.add('cart__item', 'flex', 'items-center', 'justify-between');

        const divImg = document.createElement('div');
        divImg.classList.add('cart__item__img');
        const imgElement = document.createElement('img');
        imgElement.src = `/images/${img}.jpg`;
        imgElement.alt = 'Imagen del producto';
        divImg.appendChild(imgElement);

        const divInfo = document.createElement('div');
        divInfo.classList.add('cart__item__info');
        const spanInfo = document.createElement('span');
        spanInfo.textContent = name;
        divInfo.appendChild(spanInfo);

        const divRemove = document.createElement('div');
        divRemove.classList.add('cart__item__remove');
        const btnRemove = document.createElement('button');
        btnRemove.classList.add('btn', 'btn-removed');
        btnRemove.dataset.id = id;

        btnRemove.addEventListener('click', function () {
            removeServiceSelected(id);
        });

        const imgDelete = document.createElement('img');
        imgDelete.src = '/images/icon-delete.svg';
        imgDelete.alt = 'Eliminar del carrito';
        btnRemove.appendChild(imgDelete);

        divRemove.appendChild(btnRemove);
        li.appendChild(divImg);
        li.appendChild(divInfo);
        li.appendChild(divRemove);

        return li;
    }

    function removeServiceSelected(id) {
        if (!servicesSelected.includes(id) || !services.find(service => service.id === id)) return;

        const index = servicesSelected.indexOf(id);
        servicesSelected.splice(index, 1);

        const buttons = document.querySelectorAll(`button[data-id="${id}"]`);

        const button = buttons[1]

        removeService(button)
        updateCountCart()
    }

    //RESERVAR - WHATSAPP

    function buildWhatsAppMessage() {
        let message

        servicesSelected.length === 0
            ? message = "¡Hola! Me gustaría solicitar una reserva.\n"
            : servicesSelected.length === 1
                ? message = "¡Hola! Me gustaría hacer una reserva para el siguente servicio:\n"
                : message = "¡Hola! Me gustaría hacer una reserva para los siguientes servicios:\n";

        servicesSelected.forEach(id => {
            const service = services.find(service => service.id === id);
            message += `- ${service.name}\n`;
        });
        console.log(message)
        return encodeURIComponent(message);
    }

    function redirectToWhatsApp() {
        const phoneNumber = "+50375235589";
        const message = buildWhatsAppMessage();
        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(url, "_blank");
    }

    const reserveButton = document.querySelector("#reserve");
    reserveButton.addEventListener("click", redirectToWhatsApp);

    updateCountCart();
})