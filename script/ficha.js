const url = 'http://localhost:8080/users/'
const documentid = localStorage.getItem('documentId');
buscarSocio(documentid)
const objetoInformacion = {
    name: "",
    lastname: "",
    documentId: 0,
    birdDate: "",
    address: "",
    phoneNumber: 0,
    emergencyPerson: "",
    emergencyNumber: 0,
    medical: "",
    physicalAptitudeCard: "",
    publicImage: false,
    activity: [],
    profilePicture: "",
    inscriptionDate: "",
    lastPayment: "",
    expirationDate: "",
    amountToPay: 0,
}
//capturamos todos los nodos
const names = document.querySelector("#name");
const lastname = document.querySelector("#lastname");
const documentId = document.querySelector("#cedula");
const birdDate = document.querySelector("#nacimiento");
const address = document.querySelector("#domicilio");
const phoneNumber = document.querySelector("#phone");
const emergencyPerson = document.querySelector("#perEme");
const emergencyNumber = document.querySelector("#telEme");
const medical = document.querySelector("#mutualista");
const physicalAptitudeCard = document.querySelector("#cardFisical");
const publicImage = document.querySelector("#publicImage");
const activity = document.querySelectorAll("[name=actividades]");
const profile = document.querySelector('.perfil')
const inscriptionDate = document.querySelector('#inscriptionDate')
const lastPayment = document.querySelector('#lastPayment')
const expirationDate = document.querySelector('#expirationDate')
const amountToPay = document.querySelector('#amount')

function llenarObjeto(socio) {
    objetoInformacion.name = socio.name;
    objetoInformacion.lastname = socio.lastName;
    objetoInformacion.documentId = parseInt(socio.documentId);
    objetoInformacion.birdDate = socio.birdDate;
    objetoInformacion.address = socio.address;
    objetoInformacion.phoneNumber = parseInt(socio.phoneNumber);
    objetoInformacion.emergencyPerson = socio.emergencyPerson;
    objetoInformacion.emergencyNumber = parseInt(socio.emergencyNumber);
    objetoInformacion.medical = socio.medical;
    objetoInformacion.physicalAptitudeCard = socio.physicalAptitudeCard;
    objetoInformacion.publicImage = socio.publicImage;
    objetoInformacion.activity = socio.activity;
    objetoInformacion.profilePicture = socio.profilePicture;
    objetoInformacion.inscriptionDate = socio.inscriptionDate;
    objetoInformacion.lastPayment = socio.lastPayment;
    objetoInformacion.expirationDate = socio.expirationDate;
    objetoInformacion.amountToPay = socio.amountToPay;
}

function buscarSocio(id) {
    const buscoSocios = {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    fetch(`${url}${documentid}`, buscoSocios)
        .then(function (response) {
            return response.json();
        })
        .then(socio => {
            if (socio.code != 200) {
                alert("No se encontro el Socio con el documento: " + id)
                buscar.reset()
                return
            } llenarObjeto(socio.data);
            llenarFormulario();
        })
        .catch(error => console.log(error));


}

function llenarFormulario() {
    names.textContent = objetoInformacion.name
    lastname.textContent = objetoInformacion.lastname;
    documentId.textContent = objetoInformacion.documentId;
    birdDate.textContent = objetoInformacion.birdDate
    address.textContent = objetoInformacion.address;
    phoneNumber.textContent = objetoInformacion.phoneNumber;
    emergencyPerson.textContent = objetoInformacion.emergencyPerson;
    emergencyNumber.textContent = objetoInformacion.emergencyNumber;
    medical.textContent = objetoInformacion.medical;
    physicalAptitudeCard.textContent = objetoInformacion.physicalAptitudeCard
    publicImage.checked = objetoInformacion.publicImage;
    activity.forEach(actividad => {
        if (objetoInformacion.activity.includes(actividad.id)) {
            actividad.checked = "true"
        }
        actividad.disabled = true
    });
    profile.src = objetoInformacion.profilePicture;
    inscriptionDate.textContent = objetoInformacion.inscriptionDate;
    lastPayment.textContent = objetoInformacion.lastPayment;
    expirationDate.textContent = objetoInformacion.expirationDate;
    amountToPay.textContent = objetoInformacion.amountToPay;
}

const form = document.querySelector("#formulariox")
form.addEventListener('change', () => {
    //rellenamos el objeto con la información correspondiente

    objetoInformacion.name = names.value;
    objetoInformacion.lastname = lastname.value;
    objetoInformacion.documentId = parseInt(documentId.value);
    objetoInformacion.birdDate = birdDate.value;
    objetoInformacion.address = address.value;
    objetoInformacion.phoneNumber = parseInt(phoneNumber.value);
    objetoInformacion.emergencyPerson = emergencyPerson.value;
    objetoInformacion.emergencyNumber = parseInt(emergencyNumber.value);
    objetoInformacion.medical = medical.value;
    objetoInformacion.physicalAptitudeCard = physicalAptitudeCard.value;
    objetoInformacion.publicImage = publicImage.checked;
    activity.forEach(seleccion => {
        if (seleccion.checked) {
            objetoInformacion.activity.push(seleccion.id)
        }
        return objetoInformacion;
    });
    if (profile.src) {
        objetoInformacion.profilePicture = profile.src
    }
    objetoInformacion.amountToPay = amountToPay.value;
})
