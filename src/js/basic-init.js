const smBpUp = window.matchMedia("(min-width: 768px)");

document.addEventListener('DOMContentLoaded', () => {

    AOS.init({disable: 'phone'});

    // hide cookie box
    const storageType = localStorage;
    const consentPropertyType = 'hide-window';
    const shouldShowPopUp = () => !storageType.getItem(consentPropertyType);
    const saveToStorage = () => !storageType.setItem(consentPropertyType, true);


    const popUps = document.querySelectorAll('.js-overlay-cookies');
    popUps.forEach(el => {
        if (shouldShowPopUp()) {
            el.classList.add('open');
        }
        let btn = el.querySelector('.js-close-modal');
        btn.addEventListener('click', ()=> {
            saveToStorage();
            el.classList.remove('open');
        })
    })

    // align cookies to container coordinates
    let container = document.querySelectorAll('.js-container');

    if (smBpUp.matches) {
        container.forEach(el=> {
            let bodyParent = el.closest('.js-body');
            let pathBody = bodyParent.dataset.body;
            let modalCookie = document.querySelector(`[data-md='${pathBody}']`);
            function getCoords(elem) {
                let box = elem.getBoundingClientRect();
                return {
                    left: (box.left + 40) + window.pageXOffset
                };
            }

            function createMessageUnder(modalCookie, el) {
                let coords = getCoords(el);
                modalCookie.style.left = coords.left + "px";
                return modalCookie;
            }
            createMessageUnder(modalCookie, el);
        })
    }


    // Scroll
    scrollTo();
    function scrollTo() {
        const links = document.querySelectorAll('.js-menu-hash-item');
        links.forEach(each => (each.onclick = scrollAnchors));
    }
    function scrollAnchors(e, respond = null) {
        const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
        e.preventDefault();
        const targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
        const targetAnchor = document.querySelector(targetID);

        if (!targetAnchor) return;
        const originalTop = distanceToTop(targetAnchor);

        window.scrollBy({top: originalTop, left: 0, behavior: 'smooth'});
        const checkIfDone = setInterval(function () {
            const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
            if (distanceToTop(targetAnchor) === 0 || atBottom) {
                targetAnchor.tabIndex = '-1';
                targetAnchor.focus();
                window.history.pushState('', '', targetID);
                clearInterval(checkIfDone);
            }
        }, 100);
    }

    // adding a shadow to the header on scroll
    let header = document.querySelectorAll('.header');
    document.addEventListener('scroll', () => {
        header.forEach(el => {
            if (window.pageYOffset > 0 && !el.closest('.scroll')) {
                el.classList.add('scroll');
            }
            if (window.pageYOffset <= 0 && el.closest('.scroll')) {
                el.classList.remove('scroll');
            }
        })
    })

    // focus label
    let inptElems = document.querySelectorAll('.form__input');
    let textareaElems = document.querySelectorAll('.form__textarea');

    inptElems.forEach(inp => {
        inp.addEventListener('focusin', addedTopLabel);
    });

    textareaElems.forEach(textarea => {
        textarea.addEventListener('focusin', addedTopLabel);
    });

    function addedTopLabel() {
        let parent = this.closest('.form-control');
        let labelForm = parent.querySelector('.form__label');
        if (!labelForm.classList.contains('label-top')) {
            labelForm.classList.add('label-top');
        }
    }

    inptElems.forEach(inp => {
        inp.addEventListener('focusout', removeTopLabel);
        function removeTopLabel() {
            let parent = this.closest('.form-control');
            let inputForm = parent.querySelector('.form__input');
            let labelForm = parent.querySelector('.form__label');
            if (inputForm.value === "" && labelForm.classList.contains('label-top')) {
                labelForm.classList.remove('label-top');
            }
        }
    });

    textareaElems.forEach(inp => {
        inp.addEventListener('focusout', removeTopLabel);
        function removeTopLabel() {
            let parent = this.closest('.form-control');
            let textareaForm = parent.querySelector('.form__textarea');
            let labelForm = parent.querySelector('.form__label');
            if (textareaForm.value === "" && labelForm.classList.contains('label-top')) {
                labelForm.classList.remove('label-top');
            }
        }
    });

    //burger modal
    let openBtnMd = document.querySelector('.js-open-modal');
    let closeBtnMd = document.querySelector('.js-close-modal');

    modalWindowShow();

    function modalWindowShow() {
        if (!openBtnMd) {
            return false
        }
        let openBtnMds = document.querySelectorAll('.js-open-modal');
        openBtnMds.forEach((item) => {
            item.addEventListener('click', function openModal() {
                let pathBtnOpen = this.dataset.opn;
                let modalWindow = document.querySelector(`[data-md='${pathBtnOpen}']`);
                if (!modalWindow.classList.contains('.show')) {
                    modalWindow.classList.add('show');
                    document.body.style.overflowY = 'hidden';
                } else {
                    modalWindow.classList.remove('show');
                    document.body.style.overflowY = 'visible';
                }
            });
        });

        if (!closeBtnMd) {
            return false
        }
        let closeBtnMds = document.querySelectorAll('.js-close-modal');
        closeBtnMds.forEach((item) => {
            item.addEventListener('click', function closeModal() {
                let pathBtnClose = this.dataset.cls;
                let modalWindow = document.querySelector(`[data-md='${pathBtnClose}']`);
                if (modalWindow.classList.contains('show')) {
                    modalWindow.classList.remove('show');
                    document.body.style.overflowY = 'visible';
                }
                if (!modalWindow.classList.contains('hide')) {
                    modalWindow.classList.add('hide');
                }
            })
        });

        let closeLinks = document.querySelectorAll('.js-modal-link');
        closeLinks.forEach((link) => {
            link.addEventListener('click', function closeModal() {
                let pathLink = this.dataset.link;
                let modalWindow = document.querySelector(`[data-md='${pathLink}']`);

                if (!modalWindow.classList.contains('hide')) {
                    modalWindow.classList.add('hide');
                }
            })
        });

    }

    //custom select
    let selectHeaders = document.querySelectorAll('.js-select__header');
    let selectItems = document.querySelectorAll('.select__item');
    let closeSelectBtns = document.querySelectorAll('.js-select-close');

    selectHandler();
    function selectHandler() {
        selectHeaders.forEach((item) => {
            item.classList.contains('select-mob');
            item.addEventListener('click', selectToggle)
        });
        selectItems.forEach((item) => {
            item.addEventListener('click', selectChose)
        });
        closeSelectBtns.forEach((item) => {
            item.addEventListener('click', closeSelect)
        });

        function closeSelect() {
            let parent = this.closest('.js-select');
            this.classList.remove('active');
            parent.classList.remove('is-active');
        }

        function selectToggle() {
            let parent = this.closest('.js-select');
            this.parentElement.classList.toggle('is-active');
            let currentCloseBtn = parent.querySelector('.js-select-close');
            if (currentCloseBtn) {
                currentCloseBtn.classList.add('active');
            }
        }

        document.addEventListener('click', function handleClickOutsideBox(event) {
            const selects = document.querySelectorAll('.js-select');
            selects.forEach(el => {
                if (!el.contains(event.target)) {
                    el.classList.remove('is-active');
                }
            })
        });

        function selectChose() {
            let select = this.closest('.js-select');
            let currentText = select.querySelector('.js-select__current');
            let currentImg = select.querySelector('.js-select-img');
            let textItem = this.querySelector('.js-select__item');
            let imgItem = this.querySelector('.js-select-img');
            currentText.innerText = textItem.innerText;
            select.classList.remove('is-active');
            if (imgItem && currentImg) {
                let pathImg = imgItem.dataset.src;
                currentImg.setAttribute("src", `${pathImg}`)
            }
        }
    }

    let elems = document.querySelectorAll('.js-toggle-btn');

    function selectIcons() {
        elems.forEach((item) => {
            item.addEventListener('click', toggleClass)
        });

        function toggleClass(e) {
            e.preventDefault();
            this.classList.add('active');
            for (let k = 0; elems.length > k; k++) {
                let item = elems[k];
                if (item !== this && item.classList.contains('active')) {
                    item.classList.remove('active')
                }
            }
        }
    }
    selectIcons();

    let btnStore = document.querySelector('.js-btn-store');
    let appLink = 'https://apps.apple.com/ru/app/pharmbonus/id1062954210';
    let gpLink = 'https://play.google.com/store/apps/details?id=com.pharmbonus.by&amp;hl=ru&amp;gl=US';

    if (btnStore) {
        if (!/(Android)/i.test(navigator.platform)) {
            btnStore.setAttribute('href', appLink);
        } else {
            btnStore.setAttribute('href', gpLink);
        }
    }

        // validate
    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const form = Array.from(document.querySelectorAll("form[name='contact-form']"));
    const emailInput = document.querySelector("input[name='email']");
    const modalMd = document.querySelector('.modal');

    if (!form.length) {
        return false;
    }

    let isFormValid = false;
    let isValidation = false;
    const inputs = [emailInput];

    const resetElm = (elm) => {
        elm.classList.remove('invalid');
    }

    const invalidateElm = (elm) => {
        elm.classList.add('invalid');
    }

    const validateInputs = () => {
        if (!isValidation) return;

        isFormValid = true;
        inputs.forEach(resetElm);

        if (!isValidEmail(emailInput.value)) {
            isFormValid = false;
            invalidateElm(emailInput);
            openModalMd();
        }
    }

    form.forEach((el)=> {
        el.addEventListener('submit', (e) => {
            e.preventDefault();
            isValidation = true;
            validateInputs();
            let btnSubmit = el.querySelector('.js-btn-submit');
            let btnSubmitNew = el.querySelector('.js-btn-submit-new');
            let btnSubmitRep = el.querySelector('.js-btn-submit-rep');
            if (isFormValid) {
                // TODO: DO AJAX REQUEST
                //change color btn
                btnSubmit.classList.add('visible');
                btnSubmitNew.classList.add('visible');
                btnSubmitRep.classList.add('visible');

                btnSubmitRep.addEventListener('click', () => {
                    btnSubmit.classList.remove('visible');
                    btnSubmitNew.classList.remove('visible');
                    btnSubmitRep.classList.remove('visible');
                })
            }
        })
    })

    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            validateInputs();
        });
    });

    function openModalMd() {
        if (!modalMd.classList.contains('open')) {
            modalMd.classList.add('open');
            setTimeout(()=> {
                modalMd.classList.remove('open');
            },3000);
        }
    }

    let modalMdClose = document.querySelector('.js-modal-close');

    modalMdClose.addEventListener('click', () => {
        if (modalMd.classList.contains('open')) {
            modalMd.classList.remove('open');
        }
    });

})
