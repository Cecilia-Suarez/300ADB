const url = 'http://localhost:8080/users/'

//creamos un objeto vacío
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
}

//creamos un objeto de errores
const estadoErroresOK = {
    name: false,
    lastname: false,
    documentId: false,
    birdDate: false,
    address: false,
    phoneNumber: false,
    medical: false,
    activity: false,
};

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

//capturamos todos los nodos errores
const errorName = document.querySelector("#nameError");
const errorLastName = document.querySelector("#lastError");
const errorCedula = document.querySelector("#cedulaError");
const errorNacimiento = document.querySelector("#nacimientoError");
const errorDomicilio = document.querySelector("#domicilioError");
const errorTel = document.querySelector("#phoneError");
const errorMutualista = document.querySelector("#mutualistaError");
const errorActividades = document.querySelector("#actividadesError");

//mostramos los errores
function mostrarErrores() {
    estadoErroresOK.name ? errorName.classList.remove('visible') : errorName.classList.add('visible');
    estadoErroresOK.lastname ? errorLastName.classList.remove('visible') : errorLastName.classList.add('visible');
    estadoErroresOK.documentId ? errorCedula.classList.remove('visible') : errorCedula.classList.add('visible');
    estadoErroresOK.birdDate ? errorNacimiento.classList.remove('visible') : errorNacimiento.classList.add('visible');
    estadoErroresOK.address ? errorDomicilio.classList.remove('visible') : errorDomicilio.classList.add('visible');
    estadoErroresOK.phoneNumber ? errorTel.classList.remove('visible') : errorTel.classList.add('visible');
    estadoErroresOK.medical ? errorMutualista.classList.remove('visible') : errorMutualista.classList.add('visible');
    estadoErroresOK.activity ? errorActividades.classList.remove('visible') : errorActividades.classList.add('visible');
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


    // 👇 actualizo el estado del error segun el estado del usuario
    estadoErroresOK.name = validarString(objetoInformacion.name);
    estadoErroresOK.lastname = validarString(objetoInformacion.lastname);
    estadoErroresOK.documentId = validarNumeros(objetoInformacion.documentId);
    estadoErroresOK.birdDate = validarFecha(objetoInformacion.birdDate);
    estadoErroresOK.address = validarString(objetoInformacion.address);
    estadoErroresOK.phoneNumber = validarNumeros(objetoInformacion.phoneNumber);
    estadoErroresOK.medical = validarString(objetoInformacion.medical);
    estadoErroresOK.activity = validarActividades(objetoInformacion.activity);

    // finalmente muestro los errores presentes
    mostrarErrores();
});

/* -------------------------------------------------------------------------- */
/*                                  VALIDACIONES                              */
/* -------------------------------------------------------------------------- */
function validarString(campo) {
    let resultado = false;
    if (campo) {
        resultado = true;
    }
    return resultado;
}

function validarNumeros(campo) {
    let resultado = false;
    if (!isNaN(campo) && campo > 0) {
        resultado = true;
    }
    return resultado;
}

function validarFecha(campo) {
    console.log(typeof (campo));
    let resultado = false;
    let timestamp = Date.parse(campo);
    if (isNaN(timestamp)) {
    } else {
        resultado = true;
    }
    return resultado;
}

function validarActividades(campo) {
    let resultado = false;
    if (campo.length > 0) {
        resultado = true;
    }
    return resultado;
}

/* -------------------------------------------------------------------------- */
/*                                     SUMBIT                                 */
/* -------------------------------------------------------------------------- */

form.addEventListener('submit', function (evento) {
    // prevenimos el default para manejar nososotro el comportamiento
    evento.preventDefault();

    console.log(objetoInformacion);
    console.log(estadoErroresOK);

    if (estadoErroresOK.name && estadoErroresOK.lastname && estadoErroresOK.documentId && estadoErroresOK.birdDate && estadoErroresOK.address && estadoErroresOK.phoneNumber && estadoErroresOK.medical && estadoErroresOK.activity) {
        alert("Inscripción realizada OK")
    } else {
        alert("Completa los campos correctamente")
    }

    creoSocio()
    form.reset()

});


/* -------------------------------------------------------------------------- */
/*                            ENVIO DATOS BACKEND                             */
/* -------------------------------------------------------------------------- */

function creoSocio() {
    const datos = objetoInformacion;

    const settings = {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',

        },
    }
    fetch(url, settings)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            console.log(data);
            window.location.href= "socios.html"
        });
}


//Camára
const openCameraButton = document.querySelector('#open-camera');
const takePhotoButton = document.querySelector('#take-photo');
const video = document.querySelector('#video');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

openCameraButton.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.style.border = "2px solid #ff2e2e";
        video.style.height = "auto";
        await video.play();
        takePhotoButton.disabled = false;
    } catch (error) {
        console.error('Error al acceder a la cámara', error);
    }
});

takePhotoButton.addEventListener('click', () => {
    video.style.border = "";
    video.style.height = "5px";
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    const imageUrl = canvas.toDataURL('image/png');
    profile.src = imageUrl;
    takePhotoButton.disabled = true;
    video.pause();
    video.srcObject = null;
});

