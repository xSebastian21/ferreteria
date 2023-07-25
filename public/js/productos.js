var id = 0;

function create() {
    axios.post("/producto", {
        nombre: txtNombre.value,
        cantidad: txtCantidad.value,
        estado: "A",
    })
        .then(function (response) {
            console.log(response);
            //read();
        })
        .catch(function (error) {
            console.log(error);
        });
}
function read() {
    axios
        .get("/productos")
        .then(function (response) {
            console.log(response.data);
            let tableData = document.querySelector("#tableData"); //Id del tableBody
            while (tableData.firstChild) {
                tableData.removeChild(tableData.firstChild);
            }
            let filaEncabezado = document.createElement("tr");
            let campoId = document.createElement("th");
            campoId.textContent = "#";
            let campoNombre = document.createElement("th");
            campoNombre.textContent = "Nombre";
            let campoCantidad = document.createElement("th");
            campoCantidad.textContent = "Cantidad";
            let campoEstado = document.createElement("th");
            campoEstado.textContent = "Estado";
            let campoOpcion = document.createElement("th");
            campoOpcion.textContent = "Opcion";

            filaEncabezado.appendChild(campoId);
            filaEncabezado.appendChild(campoNombre);
            filaEncabezado.appendChild(campoCantidad);
            filaEncabezado.appendChild(campoEstado);
            filaEncabezado.appendChild(campoOpcion);

            tableData.appendChild(filaEncabezado);
            response.data.forEach((element, index) => {
                let fila = document.createElement("tr");
                let campoIndice = document.createElement("td");
                let indice = document.createTextNode(index + 1);
                campoIndice.appendChild(indice);
                fila.appendChild(campoIndice);
                Object.entries(element).forEach((entry) => {
                    const [key, value] = entry;
                    if (
                        key == "nombreProducto" ||
                        key == "cantidad" ||
                        key == "estado"
                    ) {
                        let campo = document.createElement("td");
                        let dato = document.createTextNode(value);
                        campo.appendChild(dato);
                        fila.appendChild(campo);
                        tableData.appendChild(fila);
                    }
                });
                let campoOpcion = document.createElement("td");
                let opcion = document.createElement("input");
                opcion.setAttribute("type", "radio");
                opcion.setAttribute("name", "radOpcion");
                opcion.setAttribute("onclick", `accion(${JSON.stringify(element)})`);
                campoOpcion.appendChild(opcion);
                fila.appendChild(campoOpcion);
                tableData.appendChild(fila);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

read();
function accion(registro) {
    id = registro.id;
    txtNombre.value = registro.nombre;
    txtCantidad.value = registro.cantidad;
}

function update() {
    axios.put("/producto/" + id, {
        id: id,
        nombre: txtNombre.value,
        cantidad: txtCantidad.value,
    })
        .then(function (response) {
            console.log(response);
            read();
        })
        .catch(function (error) {
            console.log(error);
        });
}
function deletes() {
    let respuesta = confirm("¿esta seguro de eliminar el producto?");
    if (respuesta) {
        axios
            .delete("/producto/" + this.id)
            .then(function (response) {
                console.log(response);
                read();
            })
            .then(function (error) {
                console.log(error);
            });
    }
}
