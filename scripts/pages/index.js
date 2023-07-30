import photographerFactory from "../factories/photographer.js"
import api from "../utils/api_database.js";

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.map(photographer => {
        const photographerModel = photographerFactory(photographer);
        const article = photographerModel.getUserCardDOM()
        article.onclick = ()=>{
            console.log("click",photographer.id)
            window.location.href = './photographer.html?id='+photographer.id
        }
        article.onkeydown=(e)=>{
            if (e.code==="Space" || e.code==="Enter") {
                console.log("click", photographer.id)
                window.location.href = './photographer.html?id=' + photographer.id
            }
        }
        photographersSection.appendChild(article);
    });
}

window.onload = async () => {
    await displayData( await api.getPhotographers())
}
