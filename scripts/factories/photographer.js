function photographerFactory(data) {
    const {name, portrait, city, country, tagline,price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // Création du conteneur
        const article = document.createElement('article');
        // Création et ajout de l'avatar
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute('aria-label',picture)
        img.tabIndex=0
        // Creation et ajout du nom du photographe
        const h2 = document.createElement('h2');
        h2.tabIndex=0
        h2.setAttribute('aria-label',name)
        h2.textContent = name;
        // Creation d'un conteneur pour englober trois elements
        const content = document.createElement('div')
        content.classList.add('content_photographer')
        // Creation et ajout du texte pour la localisation
        const pLocation = document.createElement('p')
        pLocation.tabIndex=0
        pLocation.setAttribute('aria-label',`${city}, ${country}`)
        pLocation.textContent = `${city}, ${country}`
        pLocation.classList.add('content_location')
        pLocation.classList.add('margin_padding')
        // Creation et ajout du tagline
        const pTag = document.createElement('p')
        pTag.tabIndex=0
        pTag.setAttribute('aria-label',tagline)
        pTag.textContent = `${tagline}`
        pTag.classList.add('content_tag')
        pTag.classList.add('margin_padding')
        // Creation et ajout du prix
        const pPrice = document.createElement('p')
        pPrice.tabIndex=0
        pPrice.setAttribute('aria-label',`${price}€/jour`)
        pPrice.textContent=`${price}€/jour`
        pPrice.classList.add('content_price')
        pPrice.classList.add('margin_padding')
        // Ajout des éléments au conteneur Content
        content.appendChild(pLocation)
        content.appendChild(pTag)
        content.appendChild(pPrice)
        // Ajout des divers éléments au conteneur Article
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(content)
        return (article);
    }

    return {name, picture, getUserCardDOM}
}

export default photographerFactory