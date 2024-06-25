// Módulo para la interactividad de la navegación y transiciones
const navigationModule = (() => {
    let nav, h1, h2, study, aboutMe, experiencesJobs, skills, otherSkills, accreditation, contact, webProyects, standardBox;
    let imgSkills = [];

    let colorChanged = false;

    const colorChange = () => {
        let red = Math.random() * 10;
        let green = Math.random() * 50;
        let blue = Math.random() * 200;

        blue < 100 && (blue = 100);

        return `rgb(${parseInt(red)}, ${parseInt(green)}, ${parseInt(blue)})`;
    };

    const handleScroll = () => {
        let imgSkillsNumber = 0;
        for (let i of imgSkills) {
            i.style.animationDelay = `${0.3 * imgSkillsNumber}s`;
            imgSkillsNumber++;
        }

        if (window.scrollY > 0) {
            // Mostrar elementos al hacer scroll
            showElementsOnScroll();

            // Cambiar estilos al hacer scroll
            changeStylesOnScroll();
        } else if (window.innerWidth > 768) {
            // Restaurar estilos cuando el scroll vuelve arriba en pantallas grandes
            restoreStylesOnScrollUp();
        } else {
            // Restaurar estilos cuando el scroll vuelve arriba en pantallas pequeñas
            restoreStylesOnScrollUpSmall();
        }
    };

    const showElementsOnScroll = () => {
        study.style.opacity = 1;
        study.style.transitionDelay = '0.8s';
        study.style.transitionDuration = '0.8s';
        aboutMe.style.opacity = 1;
        aboutMe.style.transitionDelay = '1s';
        aboutMe.style.transitionDuration = '0.7s';
        accreditation.style.transitionDelay = '1s';
        accreditation.style.transitionDuration = '0.7s';

        if (window.scrollY > 250) {
            experiencesJobs.style.opacity = 1;
            skills.style.opacity = 1;
        } else {
            experiencesJobs.style.opacity = 0;
            skills.style.opacity = 0;
        }

        if (window.scrollY > 620) {
            otherSkills.style.opacity = 1;
        } else {
            otherSkills.style.opacity = 0;
        }

        if (window.scrollY > 820) {
            accreditation.style.opacity = 1;
        } else {
            accreditation.style.opacity = 0;
        }

        if (window.scrollY > 950) {
            webProyects.style.opacity = 1;
        } else {
            webProyects.style.opacity = 0;
        }

        if (window.scrollY > 1650) {
            contact.style.opacity = 1;
        } else {
            contact.style.opacity = 0;
        }

        // Cambiar colores y estilos al hacer scroll
        changeStylesOnScroll();
    };

    const changeStylesOnScroll = () => {
        if (window.scrollY > 750 && !colorChanged) {
            for (let box of standardBox) {
                let color = colorChange();
                box.style.background = color;
            }
            h2.style.color = colorChange;
            nav.style.background = 'var(--color-2)';
            nav.style.boxShadow = '0 0 8px 2px #000';
            colorChanged = true;
        } else if (window.scrollY < 400) {
            for (let box of standardBox) {
                box.style.background = 'var(--color-black)';
            }
            h2.style.color = 'var(--color-white)';
            nav.style.background = 'var(--color-black-50)';
            nav.style.boxShadow = 'none';
            colorChanged = false;
        }

        nav.classList.add('small');
        h1.classList.add('h1small');
        h2.classList.add('h2small');
    };

    const restoreStylesOnScrollUp = () => {
        nav.classList.remove('small');
        h1.classList.remove('h1small');
        h2.classList.remove('h2small');
        study.style.opacity = 0;
        study.style.transitionDelay = '0s';
        study.style.transitionDuration = '0.3s';
        aboutMe.style.opacity = 0;
        aboutMe.style.transitionDelay = '0.1s';
        aboutMe.style.transitionDuration = '0.5s';
    };

    const restoreStylesOnScrollUpSmall = () => {
        nav.classList.remove('small');
        h1.classList.remove('h1small');
        h2.classList.remove('h2small');
        study.style.opacity = 1;
        aboutMe.style.opacity = 1;
    };

    const init = () => {
        // Inicialización del módulo
        nav = document.querySelector('nav');
        h1 = document.querySelector('h1');
        h2 = document.querySelector('h2');
        study = document.querySelector('#study');
        aboutMe = document.querySelector('#aboutMe');
        experiencesJobs = document.querySelector('#experincesJobs');
        skills = document.querySelector('#skills');
        otherSkills = document.querySelector('#otherSkills');
        accreditation = document.getElementById('accreditation');
        contact = document.querySelector('#contact');
        webProyects = document.querySelector('#webProyects');
        standardBox = document.querySelectorAll('.standard-box');
        imgSkills = document.querySelectorAll('.image-skills');

        if (window.innerWidth > 768) {
            study.style.opacity = 0;
            aboutMe.style.opacity = 0;
        } else {
            study.style.opacity = 1;
            aboutMe.style.opacity = 1;
        }

        window.addEventListener('scroll', handleScroll);
    };

    return { init };
})();

// Módulo para la gestión de imágenes y modal
const imagesModule = (() => {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close');
    const images = document.querySelectorAll('.clickable-image');

    const openModal = function () {
        modal.style.display = 'flex';
        modalImg.src = this.src;
    };

    const closeModal = function () {
        modal.style.display = 'none';
    };

    const outsideClickClose = function (event) {
        if (event.target === modal) {
            closeModal();
        }
    };

    const addImageEventListeners = () => {
        images.forEach((image) => {
            image.addEventListener('click', openModal);
        });

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', outsideClickClose);
    };

    return { addImageEventListeners };
})();

// Módulo para la carga y renderizado de proyectos
const projectsModule = (() => {
    const webProyects = document.querySelector('#webProyects');

    const printProyects = (proyectsList) => {
        let proyectNumber = 1;
        for (let proyect of proyectsList) {
            const links = proyect.api
                ? `<a class="proyect-link" href="${proyect.code}" target="_blank">Codigo</a>
                   <a class="proyect-link" href="${proyect.web}" target="_blank">Web</a>
                   <a class="proyect-link" href="${proyect.api}" target="_blank">API</a>`
                : `<a class="proyect-link" href="${proyect.code}" target="_blank">Codigo</a>
                   <a class="proyect-link" href="${proyect.web}" target="_blank">Web</a>`;

            let idProyect = `proyect${proyectNumber}`;
            webProyects.innerHTML += `    
                <div class="img-proyects" id="${idProyect}">
                    <h4>${proyect.name}</h4>
                    <a href="${proyect.web}" target="_blank">
                        <img src="${proyect.image}" alt="${proyect.name}">
                    </a>
                    <div class="links">
                        ${links}
                    </div>
                    <div class="tecnologies">
                        <h5>Tecnologias usadas</h5>
                    </div>
                </div>`;

            proyect.tecnologies.forEach((tech) => {
                document
                    .getElementById(idProyect)
                    .querySelector('.tecnologies').innerHTML += `<div class="tag ${tech}">${tech}</div>`;
            });

            proyectNumber++;
        }
    };

    const fetchData = () => {
        fetch('./js/proyectsList.json')
            .then((response) => response.json())
            .then((data) => {
                printProyects(data);
            });
    };

    const init = () => {
        fetchData();
    };

    return { init };
})();

// Inicialización de los módulos
document.addEventListener('DOMContentLoaded', () => {
    navigationModule.init();
    imagesModule.addImageEventListeners();
    projectsModule.init();
});
