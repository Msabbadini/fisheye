export default class LightBox {

    constructor(arrayImg, currentImg, namePhotographer, onOpen = () => {
    }, onClose = () => {
    }) {
        // Recuperation du tableau
        this.elements = arrayImg
        // Recuperation de l'index image selectionné
        this.id = currentImg
        // Recuperation de l'image via l'index dans l'array
        this.current = this.elements[this.id]
        // Recuperation information du photographe
        this.namePhotographer = namePhotographer.split(' ')[0].split('-').join(' ')

        // Recuperation du conteneur de la lightbox
        this.container = document.getElementById('modal_lightbox')
        this.titleMedia = this.container.querySelector('.media_container_title')
        this.container.tabIndex = 0;
        this.titleMedia.tabIndex = 0

        this.media = this.container.querySelector('video');
        this.play = this.container.querySelector('.play');
        this.stop = this.container.querySelector('.stop');
        this.rwd = this.container.querySelector('.rwd');
        this.fwd = this.container.querySelector('.fwd');

        this.onOpen = onOpen
        this.onClose = onClose

        this.render(this.id)
    }

    addEventListeners() {
        const prevMedia = this.container.querySelector(".prevMedia")
        prevMedia.setAttribute('aria-label', 'Image Précédente')
        this.eventPrev = () => this.prevImg()
        prevMedia.addEventListener('click', this.eventPrev)

        const nextMedia = this.container.querySelector(".nextMedia")
        nextMedia.setAttribute('aria-label', 'Image suivante')
        this.eventNext = () => this.nextImg()
        nextMedia.addEventListener('click', this.eventNext)

        const closeMedia = this.container.querySelector(".closeMedia")
        closeMedia.setAttribute('aria-label', 'Fermeture')
        this.eventClose = () => this.closeLightBox()
        closeMedia.addEventListener('click', this.eventClose )
        this.playerFocused = false;

        this.eventPlay = (e)=> {
            if (e.code === 'Escape') {

            }
        }

        this.container.onkeydown = (e) => {
            console.log(e.code);
            if (document.activeElement === this.media) {
                if (e.code === "Escape") {
                    this.escapeVideo()
                    e.preventDefault()
                }
            } else {

                if (e.code === "ArrowLeft") {
                    this.prevImg()
                    e.preventDefault()
                }
                if (e.code === "ArrowRight") {
                    this.nextImg()
                    e.preventDefault()
                }
                if (e.code === "Escape") {
                    this.closeLightBox()
                    e.preventDefault()
                }
                if (e.code==='Enter') {
                    this.enterVideo()
                    e.preventDefault()
                }
            }

        }

        this.media.addEventListener('keydown',this.eventPlay)
    }


    removeEventListeners() {
        this.container.onkeydown = null
        const prevMedia = this.container.querySelector(".prevMedia")
        const nextMedia = this.container.querySelector(".nextMedia")
        const closeMedia = this.container.querySelector(".closeMedia")
        const media = this.container.querySelector('video')
        prevMedia && this.eventPrev && prevMedia.removeEventListener('click', this.eventPrev)
        nextMedia && this.eventNext && nextMedia.removeEventListener('click', this.eventNext)
        closeMedia && this.eventClose && closeMedia.removeEventListener('click', this.eventClose )
        media && this.eventPlay && media.removeEventListener('keydown',this.eventPlay)
    }

    enterVideo() {
        if (this.media.tagName ==="video") {
            this.media.tabIndex = 1
            this.media.focus();
            console.log("escape enter")
        }
    }

    escapeVideo() {
        this.media.pause();
        console.log("escape video")
        this.media.tabIndex = -1
        this.container.focus();
    }


    // Creation de la vue + retour dans le html
    getView = () => {
        let media
        if (this.current.image) {
            this.container.querySelector('video').style.display = 'none'
            media = this.container.querySelector('img')
            media.setAttribute('alt', this.current.image)
            media.src = `assets/images/${this.namePhotographer}/lg/${this.current.image}`
        } else {
            this.container.querySelector('img').style.display = 'none'
            media = this.container.querySelector('video')
            media.setAttribute('alt', this.current.video)
            media.setAttribute('autoplay', "true")
            media.innerHTML = `<source src="assets/images/${this.namePhotographer}/lg/${this.current.video}" type="video/mp4"/>`
            // media.play()
        }
        media.style.display = "block"
        this.media = media
    }

    // Fonction pour l'ouverture de la lightBox
    openLightBox = () => {
        this.container.classList.add('open')
        this.container.focus()
        this.addEventListeners()
        this.onOpen && this.onOpen()
    }

    closeLightBox = () => {
        this.container.classList.remove('open')
        this.removeEventListeners();
        this.onClose && this.onClose(this.current)
    }

    setImg = (id) => {
        this.id = id
        this.current = this.elements[this.id]
        this.titleMedia.textContent = this.current.title
        this.getView()
        this.container.focus()
    }
    // Fonction pour la gestion de l'image precedent
    prevImg = () => {
        this.setImg((this.id - 1 + this.elements.length) % this.elements.length)
    }

//     Fonction pour la gestion de l'image suivante
    nextImg = () => {
        this.setImg((this.id + 1) % this.elements.length)
    }


//     Fonction qui ajoute la vue au document
    render = (id) => {
        this.setImg(id)
        this.openLightBox()
    }
}