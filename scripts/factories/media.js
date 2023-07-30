

function mediaFactory(name, data) {
    const {title, image, video, likes, date} = data;
    const src = video ?? image;
    name = name.split(' ')[0].split('-').join(' ');
    const picture = `assets/images/${name}/small/${src}`;

    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.media = data
        article.classList.add('card')
        article.setAttribute('aria-label',title)
        const divImg = document.createElement('div')
        divImg.classList.add('container_img')
        divImg.tabIndex = 0;
        const element = document.createElement(video?'video':'img');
        if(video) {
            element.setAttribute("control", picture);
        }
        element.setAttribute("src", picture);
        const divContent = document.createElement('div')
        divContent.classList.add('contentMedia')
        const h2 = document.createElement('p');
        h2.textContent = title;
        const likeContainer = document.createElement('button');
        likeContainer.classList.add('like_container');
            const like = document.createElement('span');
            like.classList.add('like');
            like.textContent = `${likes}`;
            const heart = document.createElement('span');
            heart.classList.add('heart');
            heart.innerHTML = `<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fill-rule="nonzero"/></svg>`;
        likeContainer.tabIndex = 0;
        divContent.appendChild(h2)
        likeContainer.appendChild(like)
        likeContainer.appendChild(heart)
        divContent.appendChild(likeContainer)
        divImg.appendChild(element)
        article.appendChild(divImg);
        article.appendChild(divContent);
        return (article);
    }

    return {name, picture, getMediaCardDOM}
}

function headerPhotographerFactory(data) {
    const {name, portrait, city, country, tagline} = data
    const picture = `assets/photographers/${portrait}`;

    function getHeaderPhotographerCardDOM() {
        const div = document.createElement('div');
        div.classList.add('flex', 'header');
        const names = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.tabIndex=0
        h2.textContent = name;
        h2.setAttribute('aria-label',name)

        const loc = document.createElement('p');
        loc.tabIndex=0
        loc.textContent = `${city}, ${country}`;
        loc.classList.add('localisation');
        loc.setAttribute('aria-label',`${city}, ${country}`)

        const tag = document.createElement('p');
        tag.tabIndex=0
        tag.textContent = `${tagline}`;
        tag.classList.add('tagHeader')
        tag.setAttribute('aria-label',`${tagline}`)

        const contact = document.createElement('button');
        contact.setAttribute('id', 'contact');
        contact.classList.add("contact_button")
        contact.textContent = "Contactez-moi"
        contact.tabIndex=0
        contact.setAttribute('aria-label',`${name}`)

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute('aria-label',picture)

        names.appendChild(h2);
        names.appendChild(loc);
        names.appendChild(tag);
        div.appendChild(names);
        div.appendChild(contact);
        div.appendChild(img);

        return (div);
    }

    return {name, picture, getHeaderPhotographerCardDOM}
}



export {mediaFactory, headerPhotographerFactory}