export default class ContactForm {

    constructor(onOpen = () => {
    }, onClose = () => {
    }, photographer) {
        this.container = document.getElementById('modal_contact')
        this.nameContact = document.getElementById('name_contact')
        this.nameContact.textContent = `${photographer}`
        this.nameContact.setAttribute('aria-label', `Contactez-moi ${photographer}`)
        this.formulaire = document.getElementById('form_contact')
        this.regexEmail = /^[a-z0-9._-]+@{1}[a-z0-9.-_]{2,}[.]{1}[a-z]{2,5}$/
        this.regexText = /^[a-zA-Z \-àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/
        this.regexMessage = /^(?:[\w-]+\|{2}unlimited(?:\r?\n|$))+$/
        this.container.tabIndex = 0;

        this.addEventListeners()

        this.onOpen = onOpen
        this.onClose = onClose

        this.validationForm()
        this.formulaire.onsubmit = (event) => this.validationSubmit(event)

        this.render()

    }


    addEventListeners() {
        const closeContact = this.container.querySelector(".closeContact")
        closeContact.tabIndex = 0
        closeContact.setAttribute('aria-label', 'Fermeture')
        closeContact.addEventListener('click', () => this.closeContactBox())
        this.container.onkeydown = (e) => {
            if (e.code === "Escape") {
                this.closeContactBox()
                e.preventDefault()
            }
        }

    }

    openContactBox = () => {
        this.container.classList.add('open')
        this.container.focus()
        this.onOpen && this.onOpen()
    }

    closeContactBox = () => {
        this.container.classList.remove('open')
        this.onClose && this.onClose()
    }

    ValidateName = (value) => {
        if (value.length < 1) return `Veuillez entrer 2 caractères ou plus.`
        return !this.regexText.test(value) ? "Caractère utilisé non valide, utilisez uniquement des lettres, espaces et '-'." : "";
    }

    validateEmail = (value) => {
        // if (value.length < 5) return "Veuillez entrer 2 caractères ou plus pour le champ email."
        return !this.regexEmail.test(value) ? "L'adresse e-mail n'est pas valide." : "";
    }

    validateMessage = (value) => {
        if (value.length < 5) return "Veuillez entrer 5 caractères ou plus pour votre message."
        return "";
    }

    Validate = (elem, validationFunction) => {
        const value = elem.value;
        const error = document.getElementById(elem.id + "-error");
        const inputError = document.getElementById(elem.id)
        if (!error) console.log("error on error ... " + elem.id)
        error.textContent = validationFunction(value);
        inputError.classList.add('error')
        if (error.textContent === "") inputError.classList.remove('error')
        return (error.textContent === "")
    }

    Elements = [
        {
            id: 'prenom',
            validation: this.ValidateName
        },
        {
            id: 'nom',
            validation: this.ValidateName
        },
        {
            id: 'email',
            validation: this.validateEmail
        },
        {
            id: 'message',
            validation: this.validateMessage
        }

    ]

    validationForm() {
        this.Elements.map(el => {
            const element = document.getElementById(el.id)
            element.onchange = element.oninput = (event) => this.Validate(element, el.validation)
        })
    }


    validationSubmit=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        let result = true;
        let array=[]
        this.Elements.map(el=>{
            const element = document.getElementById(el.id)
            result &= (this.Validate(element, el.validation));
            result && array.push(element.value)
        })

        if(result){
            console.log('Data',array)
            this.formulaire.reset()
        }
    }

    render = () => {
        this.openContactBox()
    }
}