document.addEventListener('DOMContentLoaded', () => {

    // menu burger
    const hamburgerLabels = Array.from(document.querySelectorAll(".js-bars-container"));
    let open = false;

        function changeHamburger() {
            let thisEl = this;
            let parent = thisEl.closest('.js-header');
            let overlay = parent.querySelector('.js-menu-overlay');

            if (!open) {
                thisEl.classList.add("open");
                overlay.classList.add("menu");
                document.body.style.overflowY = 'hidden';
                overlay.style.visibility = 'visible';
            } else {
                thisEl.classList.remove("open");
                overlay.classList.remove("menu");
                document.body.style.overflowY = 'visible';
                overlay.style.visibility = 'hidden';
            }
            open = !open;
        }


    hamburgerLabels.forEach((el) => {
        el.addEventListener('click', changeHamburger);
    });

    //Accordion
    let allSvBtns = document.querySelectorAll('.js-sv-item__btn');
    let allSvItem = document.querySelectorAll('.js-sv-item');
    let allSvCont = document.querySelectorAll('.js-sv-item__cont');


    allSvBtns.forEach((btn) => {
        btn.addEventListener('click', openSvContent);
    });

    function openSvContent() {

        let currentSvItem = this.closest('.js-sv-item');
        let currentSvCont = currentSvItem.querySelector('.js-sv-item__cont');
        let currentSvContWrap = currentSvItem.querySelector('.js-sv-item__wrap');
        let currentSvBtn = currentSvItem.querySelector('.js-sv-item__btn');
        let currentSvContHeight = currentSvContWrap.clientHeight;

        if (!currentSvCont.classList.contains('open')) {
            currentSvItem.classList.add('active');
            currentSvBtn.classList.add('active');
            currentSvCont.style.maxHeight = `${currentSvContHeight}px`;
            currentSvCont.classList.add('open');

            for (let i = 0; i < allSvCont.length; i++) {
                if (allSvCont[i].classList.contains('open') && allSvCont[i] !== currentSvCont) {
                    allSvCont[i].classList.remove('open');
                    allSvCont[i].style.maxHeight = '0px';
                }
                if (allSvBtns[i].classList.contains('active') && allSvBtns[i] !== currentSvBtn) {
                    allSvBtns[i].classList.remove('active');
                }
                if (allSvItem[i].classList.contains('active') && allSvItem[i] !== currentSvItem) {
                    allSvItem[i].classList.remove('active');
                }
            }
        } else {
            currentSvItem.classList.remove('active');
            currentSvBtn.classList.remove('active');
            currentSvCont.style.maxHeight = '0px';
            currentSvCont.classList.remove('open');
        }
    }

    const lgBpDown = window.matchMedia("(max-width: 1023px)");

    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const form = Array.from(document.querySelectorAll("form[name='contact-form']"));
    const nameInput = document.querySelector("input[name='name']");
    const nameCompanyInput = document.querySelector("input[name='company-name']");
    const emailInput = document.querySelector("input[name='email']");
    const messageInput = document.querySelector("textarea[name='message']");
    const overlayWindow = document.querySelector('.overlay');
    const modalMd = document.querySelector('.modal');

    if (!form.length) {
        return false;
    }

    let isFormValid = false;
    let isValidation = false;

    const inputs = [nameInput, nameCompanyInput, emailInput, messageInput];

    const resetElm = (elm) => {
        elm.classList.remove('invalid');
        elm.nextElementSibling.classList.add('hide');
    }

    const invalidateElm = (elm) => {
        elm.classList.add('invalid');
        elm.nextElementSibling.classList.remove('hide');
    }

    const validateInputs = () => {
        if (!isValidation) return;

        isFormValid = true;
        inputs.forEach(resetElm);

        if (!nameInput.value) {
            isFormValid = false;
            invalidateElm(nameInput);
            openModalMd();
        }

        if (!nameCompanyInput.value) {
            isFormValid = false;
            invalidateElm(nameCompanyInput);
            openModalMd();
        }

        if (!isValidEmail(emailInput.value)) {
            isFormValid = false;
            invalidateElm(emailInput);
            openModalMd();
        }

        if (!messageInput.value) {
            isFormValid = false;
            invalidateElm(messageInput);
            openModalMd();
        }
    }

    form.forEach((el)=> {
        el.addEventListener('submit', (e) => {
            e.preventDefault();
            isValidation = true;
            validateInputs();
            if (isFormValid) {
                // TODO: DO AJAX REQUEST
                showOverlayWindow();
            }
        })
    })

    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            validateInputs();
        });
    });

    function showOverlayWindow() {
        if (!overlayWindow.classList.contains('open')) {
            overlayWindow.classList.add('open');
        }
    }

    overlayWindow.addEventListener('click', closeOverlay);

    function closeOverlay(e) {
        if (overlayWindow.classList.contains('open')) {
            if (e.target === overlayWindow) {
                overlayWindow.classList.remove('open');
            }
        }
    }

    let closeBtnOverlay = document.querySelector('.js-overlay-close');

    closeBtnOverlay.addEventListener('click', closeOverlayWindow);

    function closeOverlayWindow() {
        if (overlayWindow.classList.contains('open')) {
            overlayWindow.classList.remove('open');
        }
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            overlayWindow.classList.remove('open');
        }
    });

    function openModalMd() {
        if (!modalMd.classList.contains('open')) {
            modalMd.classList.add('open');
            setTimeout(()=> {
                modalMd.classList.remove('open');
            },5000);
        }
    }

    let modalMdClose = document.querySelector('.js-modal-close');

    modalMdClose.addEventListener('click', () => {
        if (modalMd.classList.contains('open')) {
            modalMd.classList.remove('open');
        }
    });

})
