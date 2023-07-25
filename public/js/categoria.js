var id = 0

function create(){
    axios.post('/categoria',{
        nombre: txtNombre.value,
        codigo: txtCodigo.value,
    }).then(function(response){
        console.log(response)
        read();
        clear();
    })
    .catch(function (error){
        console.log(Object.values(error.response.data.errors));
        let data = "";
        Object.values(error.response.data.errors).forEach((element) => {
            data += `<p>${element}</p>`
        });
        errores.innerHTML = data;
    });
}
function read(url = "categoria"){
    axios.get(url)
    .then(function (response){
        console.log(response.data);
        console.log(response.data);
        datos = " ";
        lista = " ";

        response.data.data.forEach((element, index) => {
            datos += `<tr onclick='load(${JSON.stringify(element)})'>`;
            datos += `<td>${index + 1}</td>`;
            datos += `<td>${element.nombre}</td>`;
            datos += `<td>${element.codigo}</td>`;
            datos += `<td>${element.estado}</td>`;
            datos += `</tr>`;
        });
        
        response.data.links.forEach((element) => {
            lista +=`<td>
                        <a class="pagina" onclick="read('${element.url}')">${element.label}</a>
                    </td>`;
        });
        tableBody.innerHTML = datos;
        list.innerHTML = lista;
    })
    .catch(function (error){
        console.log(error)
    })
}
function update(){
    axios.put("/categoria/" + id,{
        id: id,
        nombre: txtNombre.value,
        codigo: txtCodigo.value,
    })
    .then(function (response){
        console.log(response)
        read();
        clear();
    })
    .catch(function (error){
        console.log(error)
    })
}
function deletes(){
    let respuesta = confirm("¿Esta seguro de eliminar la Categoria?")
    if(respuesta){
        axios.delete("/categoria/" + id)
        .then(function (response){
            console.log(response);
            read();
            clear();
        })
        .catch(function(error){
            console.log(error);
        });
    }
}

function clear(){
    txtNombre.value = " ";
    txtCodigo.value = " ";
}
function load(element){
    id = element.id;
    txtNombre.value = element.nombre;
    txtCodigo.value = element.codigo;
}

read()