const url = 'http://localhost:8080/users/'

function obtenerSocios() {
    const pidoSocios = {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    fetch(`${url}near_to_expire`, pidoSocios)
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
    const contenedorListadoPagos = document.querySelector(".listadoPagos")
    contenedorListadoPagos.innerHTML = ` `;
    listado.forEach(socio => {
        contenedorListadoPagos.innerHTML += `
        <div class="contenedorCadaMoroso">
        <p class="nombre">${socio.name}</p>
        <p class="apellido">${socio.lastName}</p>
        <p class="cedula">${socio.documentId}</p>
        <p class="tel">${socio.phoneNumber}</p>
        <p class="ultimoPago"> ${socio.lastPayment}</p>
        <p class="vto">${socio.expirationDate}</p>
        <button class="pagar" id=${socio.documentId}-${socio.id}>Pagar</button> 
        </div>`
    });
    botonPagar()
}

function botonPagar() {
    const fichas = document.querySelectorAll(".pagar");
    fichas.forEach(ficha => {
        ficha.addEventListener("click", function (evento) {
            var ids = evento.target.id.split("-");

            if (confirm("Se pagará un mes para el socio, ¿Estás seguro?")) {
                pagarSocio(ids[1])
            }
            window.localStorage.setItem('id', ids[1]);
            window.localStorage.setItem('documentId', ids[0]);
            setTimeout(function() {
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
