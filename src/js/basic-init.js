document.addEventListener('DOMContentLoaded', () => {
    (function(w, d){
        let b = d.getElementsByTagName('body')[0];
        let s = d.createElement("script");
        // s.async = true;
        let v = !("IntersectionObserver" in w) ? "8.12.0" : "10.12.0";
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/" + v + "/lazyload.min.js";
        w.lazyLoadOptions = {};
        b.appendChild(s);
    }(window, document));

    let images = document.querySelectorAll(".lazyload");
    lazyload(images);

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

    // validate
    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const form = Array.from(document.querySelectorAll("form[name='contact-form']"));
    const nameInput = document.querySelector("input[name='name']");
    const nameCompanyInput = document.querySelector("input[name='company-name']");
    const emailInput = document.querySelector("input[name='email']");
    const messageInput = document.querySelector("textarea[name='message']");
    const modalMd = document.querySelector('.modal');
    //const submitFormBtns = document.querySelectorAll('.js-btn-submit');

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
