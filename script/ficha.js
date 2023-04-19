const url = 'http://192.168.1.11:8080/users/'
const documentId = localStorage.getItem('documentId');
console.log(documentId); // Imprime "valorGuardado"

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
}

function buscarSocio(id) {
    const buscoSocios = {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    fetch(`${url}${documentId}`, buscoSocios)
        .then(function (response) {
            return response.json();
        })
        .then(socio => {
            if (socio.code != 200) {
                alert("No se encontro el Socio con el documento: " + id)
                buscar.reset()
                return
            } renderizarSocio(socio.data);
        })
        .catch(error => console.log(error));


}

function renderizarSocio(socio) {
    const contenedorListadoSocios = document.querySelector(".formulariox")
    contenedorListadoSocios.innerHTML = `
        <div class="contenedorCadaSocio">
        <li class="descripcionSocio">${socio.name} ${socio.lastName}</li>
        <button class="ficha" id=${socio.documentId}>Ficha</button>
        <a href="../html/inscribir.html"><button class="update" id=${socio.id}>Actualizar Datos</button></a>
        <button class="delete" id=${socio.id}>Borrar Socio</b>
        <a href="../html/pagos.html"><button class="pay" id=${socio.id}>Pagos</button></a>
        </div>`
    botonBorrar()
    botonFicha()
}