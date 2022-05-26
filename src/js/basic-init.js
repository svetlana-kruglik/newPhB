const smBpUp = window.matchMedia("(min-width: 768px)");

document.addEventListener('DOMContentLoaded', () => {

    let heightWindow = document.documentElement.clientHeight;
    let widthWindow = document.documentElement.clientWidth;
    let indexS1 = document.querySelector('.index-s1')

    if (indexS1) {
        if (!indexS1.closest('p-100') && heightWindow === 960 && widthWindow === 1920) {
            indexS1.classList.add('pt-100');
        }
    }

    AOS.init({disable: 'phone',once: true});

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

    function selectActive() {
        elems.forEach((item) => {
            item.addEventListener('click', toggleClass)
        });

        function toggleClass(e) {
            e.preventDefault();
            console.log(this);
            this.classList.add('active');
            for (let k = 0; elems.length > k; k++) {
                let item = elems[k];
                if (item !== this && item.classList.contains('active')) {
                    item.classList.remove('active')
                }
            }
        }
    }
    selectActive();

    // Add class active
    let elemLinks = document.querySelectorAll('.js-toggle-link');

    elemLinks.forEach((link) => {
        link.addEventListener('click', toggleActiveClass)
    });

    function toggleActiveClass(e) {
        e.preventDefault();
        if (!this.closest('active')) {
            this.classList.add('active');
            for (let k = 0; elemLinks.length > k; k++) {
                let link = elemLinks[k];
                if (link !== this && link.classList.contains('active')) {
                    link.classList.remove('active')
                }
            }
        }
    }

    // change url for link
    let btnStore = document.querySelector('.js-btn-store');
    let appLink = 'https://apps.apple.com/ru/app/pharmbonus/id1062954210';
    let gpLink = 'https://play.google.com/store/apps/details?id=com.pharmbonus.by&amp;hl=ru&amp;gl=US';

    const mobileAndTabletCheck = () => {
        let navigatorPlatform = navigator.platform.toLowerCase();
        let navigatorUserAgent = navigator.userAgent.toLowerCase();

        let isMobile = (function() {
            let check = false;
            (function (a) {
                if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                    check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        })();

        if (isMobile) {
            document.body.classList.add('mobile');
        }

        let deviceOS;

        let iosVersion = parseInt(('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', ''));

        let isIpad = /macintosh/i.test(navigatorUserAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1;

        if (/(huawei)/i.test(navigatorPlatform) || /(harmonyos)/i.test(navigatorPlatform) || /(huawei)/i.test(navigatorUserAgent) || /(harmonyos)/i.test(navigatorUserAgent)) {
            deviceOS = 'huawei';
        }	else if (/(android)/i.test(navigatorUserAgent)) {
            deviceOS = 'android';
        } else if (/(windows phone)/i.test(navigatorUserAgent)) {
            deviceOS = 'windows-phone';
        } else if (iosVersion || isIpad) {
            deviceOS = 'ios';
        }

        if (deviceOS) {
            document.body.classList.add(deviceOS);
        }

        if (document.body.closest('.ios')) {
            btnStore.setAttribute('href', appLink);
        }

        if (document.body.closest('.android')) {
            btnStore.setAttribute('href', gpLink);
        }

        return isMobile || deviceOS;
    };

    if (btnStore) {
        mobileAndTabletCheck();
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
                });
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
