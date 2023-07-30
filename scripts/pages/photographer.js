import api from "../utils/api_database.js";
import LightBox from "../utils/ligthBox.js";
import {
    headerPhotographerFactory,
    mediaFactory
} from "../factories/media.js";
import Context from "../utils/context.js";
import ContactForm from "../utils/contactForm.js";

window.onload = async () => {
    const header = document.querySelector('.photograph-header');
    const overlayLikes=document.querySelector('.counterLike')
    overlayLikes.tabIndex=0

    const id = (+new URLSearchParams(window.location.search).get("id"))


    const photographer = (await api.getPhotographers()).find(p => (+p.id) === id)
    const headerPhotographer = headerPhotographerFactory(photographer).getHeaderPhotographerCardDOM()
    header.appendChild(headerPhotographer)

    const price = document.getElementById('price')
    price.textContent=photographer.price+'€/Jour'
    price.tabIndex=0
    price.setAttribute('aria-label',photographer.price+'€/Jour')

    const refreshLikes = () => {
        const elems = document.getElementsByClassName('like');
        const likeElements = [...elems];
        const count = likeElements.reduce((sum, b) => sum + (+b.textContent), 0)
        const displayCount = document.getElementById('display-count')
        displayCount.textContent = count;
        displayCount.setAttribute('aria-label',`${count} Likes`)
    }


    const divMedia = document.querySelector('.photograph-media');

    const onOpen = ()=> {
        divMedia.style.display = 'none'
    }
    const onClose = (currentMedia)=> {
        divMedia.style.display = 'flex'
        document.getElementById("media_"+currentMedia.id).focus()
    }

    let count = 0;
    const media = (await api.getMedia()).filter(m => (+m.photographerId) === id)
    media.map((m,index) => {
        if (Context.liked(photographer.id, m.id)) {
            m.likes++;
        }
        const med = mediaFactory(photographer.name, m)
        const card = med.getMediaCardDOM();
        const cardImg = card.querySelector('.container_img')
        m.cardImg = cardImg;
        cardImg.setAttribute('id', 'media_'+m.id)
        cardImg.onclick = ()=> new LightBox(media,media.indexOf(m),photographer.name, onOpen, onClose)
        card.querySelector('.container_img').onkeydown = (e) =>{
            if (e.code==="Space" || e.code==="Enter") {
                new LightBox(media,media.indexOf(m),photographer.name, onOpen, onClose)
                e.preventDefault();
            } else if (e.code==="ArrowLeft") {
                media[(index-1 + media.length)%media.length].cardImg.focus()
                e.preventDefault();
            } else if (e.code==="ArrowRight") {
                media[(index + 1) % media.length].cardImg.focus()
                e.preventDefault();
            }
        }

        divMedia.appendChild(card);

        // event listener for like
        const likeContainer = card.querySelector('.like_container');
        likeContainer.onclick = () => {
            const sens = Context.like(photographer.id, m.id);
            // local storage -> array des id likés
            m.likes += sens;
            likeContainer.querySelector('.like').textContent = '' + m.likes;
            likeContainer.setAttribute('aria-label',`${m.likes} J'aime`)
            refreshLikes();
        }
    })


    const sortOptions = [
        {
            name: 'sortLikes',
            sort: (a, b) => (a.media.likes - b.media.likes)
        },
        {
            name: 'sortTitles',
            sort: (a, b) => (a.media.title.localeCompare(b.media.title))
        },
        {
            name: 'sortDates',
            sort: (a, b) => (new Date(a.media.date).getTime() - new Date(b.media.date).getTime())
        }
    ]

    const optionSelector = document.getElementById('trieur')
    optionSelector.onchange = (e) => {
        const option = sortOptions.find(b => b.name === e.target.value)

        // 1 - parcourir tous les médias attachés divMedia --> collection
        const array = [...divMedia.querySelectorAll("article")];
        // 2 - tu détaches tout !
        array.map(m => divMedia.removeChild(m));
        // 3 - tu tries la collection
        array.sort(option.sort)
        // 4 - tu attaches les media
        array.map(m => divMedia.appendChild(m));
    }

//     CONTACT FORM
    const onOpenContact = ()=> {
        divMedia.style.display = 'none'
    }
    const onCloseContact = ()=> {
        divMedia.style.display = 'flex'
        document.getElementById('contact').focus()

    }
    const contactForm= document.querySelector('.contact_button')
    contactForm.addEventListener('click',()=> new ContactForm(onOpenContact,onCloseContact,photographer.name))
    contactForm.onkeydown=(e)=>{
        if (e.code==="Space" || e.code==="Enter") {
            console.log(e.code)
            new ContactForm(onOpenContact,onCloseContact,photographer.name)
            e.preventDefault();
        }
    }

    refreshLikes();
}
