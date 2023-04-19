const url = 'http://192.168.1.11:8080/users/'

function obtenerSocios() {
    const pidoSocios = {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    fetch(url, pidoSocios)
        .then(function (response) {
            return response.json();
        })
        .then(socios => {
            renderizarSocios(socios.data);
        })
        .catch(error => console.log(error));
}

obtenerSocios()

function renderizarSocios(listado) {
    const contenedorListadoSocios = document.querySelector(".listadoSocios")
    contenedorListadoSocios.innerHTML = ` `;
    listado.forEach(socio => {
        contenedorListadoSocios.innerHTML += `
        <div class="contenedorCadaSocio">
        <li class="descripcionSocio">${socio.name} ${socio.lastName} || Cédula: ${socio.documentId}</li>
        <button class="ficha" id=${socio.documentId}>Ficha</button>
        <a href="../html/inscribir.html"><button class="update" id=${socio.id}>Actualizar Datos</button></a>
        <button class="delete" id=${socio.id}>Borrar Socio</b>
        <a href="../html/pagos.html"><button class="pay" id=${socio.id}>Pagos</button></a>
        </div>`
    });
    botonBorrar()

}

function renderizarSocio(socio) {
    const contenedorListadoSocios = document.querySelector(".listadoSocios")
    contenedorListadoSocios.innerHTML = `
        <div class="contenedorCadaSocio">
        <li class="descripcionSocio">${socio.name} ${socio.lastName}</li>
        <button class="ficha" id=${socio.documentId}>Ficha</button>
        <a href="../html/inscribir.html"><button class="update" id=${socio.id}>Actualizar Datos</button></a>
        <button class="delete" id=${socio.id}>Borrar Socio</b>
        <a href="../html/pagos.html"><button class="pay" id=${socio.id}>Pagos</button></a>
        </div>`
    botonBorrar()
}

/* -------------------------------------------------------------------------- */
/*                                BUSCAR SOCIO                                */
/* -------------------------------------------------------------------------- */
const buscar = document.querySelector(".buscadorSocios")
buscar.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const id = document.querySelector(".barraBusqueda")
    buscarSocio(id.value)

})

function buscarSocio(id) {
    const buscoSocios = {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    fetch(`${url}${id}`, buscoSocios)
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



/* -------------------------------------------------------------------------- */
/*                                BORRAR SOCIO                                */
/* -------------------------------------------------------------------------- */
function botonBorrar() {
    const deleteSocio = document.querySelectorAll(".delete")
    deleteSocio.forEach(boton => {
        boton.addEventListener("click", function (evento) {
            if (confirm("¿Estás seguro?")) {
                borrarSocio(evento.target.id)
                alert("Socio eliminado con éxito.")
            } window.location.reload()
        })
    })
}

function borrarSocio(id) {
    const borrarSocio = {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    fetch(`${url}${id}`, borrarSocio)
        .then(function (response) {
            return response.json();
        })
        .catch(error => console.log(error));
}

