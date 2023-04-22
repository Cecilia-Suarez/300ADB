const url = 'http://localhost:8080/users/'

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
        <a href="../html/fichaSocio.html"><button class="ficha" id=${socio.documentId}>Ficha</button></a>
        <a href="../html/actualizar.html"><button class="update" id=${socio.documentId}-${socio.id}>Actualizar Datos</button></a>
        <button class="pay" id=${socio.documentId}-${socio.id}>Pagar</button></a>
        <button class="delete" id=${socio.id}>Borrar Socio</b>
        </div>`
    });
    botonBorrar()
    botonActualizar()
    botonFicha()
    botonPagar()

}

function renderizarSocio(socio) {
    const contenedorListadoSocios = document.querySelector(".listadoSocios")
    contenedorListadoSocios.innerHTML = `
        <div class="contenedorCadaSocio">
        <li class="descripcionSocio">${socio.name} ${socio.lastName}</li>
        <a href="../html/fichaSocio.html"><button class="ficha" id=${socio.documentId}>Ficha</button></a>
        <a href="../html/actualizar.html"><button class="update"  id=${socio.documentId}-${socio.id}>Actualizar Datos</button></a>
        <button class="pay" id=${socio.documentId}-${socio.id}>Pagar</button>
        <button class="delete" id=${socio.id}>Borrar Socio</b>
        </div>`
    botonBorrar()
    botonActualizar()
    botonFicha()
    botonPagar()
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

/* -------------------------------------------------------------------------- */
/*                            ACTUALIZAR SOCIO                                */
/* -------------------------------------------------------------------------- */
function botonActualizar() {
    const updates = document.querySelectorAll(".update");
    updates.forEach(update => {
        update.addEventListener("click", function (evento) {
            var ids = evento.target.id.split("-");
            window.localStorage.setItem('id', ids[1]);
            window.localStorage.setItem('documentId', ids[0]);
            window.location.href = "actualizar.html"; // Redirecciona a la página "actualizar.html"
        })
    })
}

function botonFicha() {
    const fichas = document.querySelectorAll(".ficha");
    fichas.forEach(ficha => {
        ficha.addEventListener("click", function (evento) {
            window.localStorage.setItem('documentId', evento.target.id);
            window.location.href = "fichaSocio.html"; // Redirecciona a la página "ficha.html"
        });
    })
}

function botonPagar() {
    const fichas = document.querySelectorAll(".pay");
    const payedSocio = ""
    fichas.forEach(ficha => {
        ficha.addEventListener("click", function (evento) {
            var ids = evento.target.id.split("-");

            if (confirm("Se pagará un mes para el socio, ¿Estás seguro?")) {
                pagarSocio(ids[1])
            }
            window.localStorage.setItem('id', ids[1]);
            window.localStorage.setItem('documentId', ids[0]);
            setTimeout(function () {
                window.location.href = "fichaSocio.html"; // Redirecciona a la página "ficha.html" 
            }, 2000);
        });
    })
}

function pagarSocio(id) {
    const pagar = {
        method: "post",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    fetch(`${url}pay/${id}`, pagar)
        .then(function (response) {
            return response.json();
        }).then(socio => {
            if (socio.code != 200) {
                alert("No se encontro el Socio con el documento: " + id)
                return
            }
        })
        .catch(error => console.log(error));
}