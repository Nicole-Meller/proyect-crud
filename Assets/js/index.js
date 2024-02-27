//Ocultar el boton de modificar
document.getElementById("btnUpdate").style.display = 'none';


//Que el logo de la Biblioteca Nacional me abra la página en una pestaña nueva
const enlace = document.getElementById("miLink");
    enlace.href="#";
    enlace.addEventListener('click', function(){
        window.open('https://www.bibliotecanacional.gob.cl/','_blank');
    });

    function bloquearUsername() {
        document.getElementById("inputUsername").disabled = true;
    }

//Con esto veremos si el usuario ya está registrado y lo usaremos para crear nuevos registros y modificar actuales
    const usuarioYaRegistrado = (username) => {
        let listPeople = JSON.parse(localStorage.getItem('listPeople'));
        if (listPeople) {
            return listPeople.some(person => person.user === username);
        } else {
            return false;
        }
    }

    const validarFormulario = () => {

        //obtener los valores
    
        let name = document.getElementById('inputNombre').value;
        let apell = document.getElementById('inputApellido').value;
        let user = document.getElementById('inputUsername').value;
        let book = document.getElementById('inputLibro').value;
        let time = document.getElementById('inputTiempo').value;
    
        //validar 
        if (name == "") {
            swal( "Oops","Debes ingresar un nombre","error" );
            return false;
        } if (apell == "") {
            swal( "Oops","Debes ingresar un apellido","error" );
            return false;
        }
        if (user == "") {
            swal( "Oops","Debes ingresar un nombre de usuario","error" );
            return false;
        }
        if (book == "") {
            swal( "Oops","Debes ingresar un lirbo","error" );
            return false;
        }
        if (time == "") {
            swal( "Oops","Debes seleccionar tiempo de préstamo","error" );
            return false;
        }
        if (usuarioYaRegistrado(user)) {
            swal( "Oops","Este usuario ya está registrado" ,  "error" );
            return false;
        }
    
        return true;
    }

    const validarCamposVacios = () => {

        //obtener los valores del formulario a editar, sin la posibilidad de Editar el Username
    
        let name = document.getElementById('inputNombre').value;
        let apell = document.getElementById('inputApellido').value;
        let book = document.getElementById('inputLibro').value;
        let time = document.getElementById('inputTiempo').value;
    
        //validar 
        if (name == "") {
            swal( "Oops","Debes ingresar un nombre","error" );
            return false;
        } if (apell == "") {
            swal( "Oops","Debes ingresar un apellido","error" );
            return false;
        }
        if (book == "") {
            swal( "Oops","Debes ingresar un lirbo","error" );
            return false;
        }
        if (time == "") {
            swal( "Oops","Debes seleccionar tiempo de préstamo","error" );
            return false;
        }
    
        return true;
    }

const addData = () => {
    if (validarFormulario() == true) {

    let name = document.getElementById('inputNombre').value;
    let apell = document.getElementById('inputApellido').value;
    let user = document.getElementById('inputUsername').value;
    let book = document.getElementById('inputLibro').value;
    let time = document.getElementById('inputTiempo').value;

        let listPeople;
        if (localStorage.getItem('listPeople') == null) {
            listPeople = [];
        } else {
            listPeople = JSON.parse(localStorage.getItem('listPeople'));
        }
        listPeople.push({
            name: name,
            apell: apell,
            user: user,
            book: book,
            time: time
        })

        localStorage.setItem('listPeople', JSON.stringify(listPeople));
        swal("Buen trabajo", "Tus datos se han guardado", "success");

        showData();
        document.getElementById('inputNombre').value = "";
        document.getElementById('inputApellido').value = "";
        document.getElementById('inputUsername').value = "";
        document.getElementById('inputLibro').value = "";
        document.getElementById('inputTiempo').value = "";
    }
}

const showData = () => {
    let listPeople;

    if (localStorage.getItem('listPeople') === null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    let html = ""

    listPeople.forEach(function (element, index) {
        html += '<tr>';
        html += '<td>' + element.name + '</td>';
        html += '<td>' + element.apell + '</td>';
        html += '<td>' + element.user + '</td>';
        html += '<td>' + element.book + '</td>';
        html += '<td>' + element.time + '</td>';
        html += '<td class="btn-column"><button onclick="deleteData('+ index +')" class="btn btn-outline-danger">Eliminar dato</button> <button onclick="updateData('+ index +')" class="btn btn-outline-success">Editar dato</button></td>';
        html += '</tr>';
    });

    document.querySelector('#tableData tbody').innerHTML = html;

}

document.onload=showData();

const updateData = (index) => {

    //Cambiar visibilidad
    document.getElementById("btnGuardar").style.display = 'none';  

    document.getElementById("btnUpdate").style.display = 'block';

    let listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
        document.getElementById("inputUsername").disabled = true;
    }

    //rellenar los campos
    document.getElementById('inputNombre').value = listPeople[index].name;
    document.getElementById('inputApellido').value = listPeople[index].apell;
    document.getElementById('inputUsername').value = listPeople[index].user;
    document.getElementById('inputLibro').value = listPeople[index].book;
    document.getElementById('inputTiempo').value = listPeople[index].time;

    //Actualizar datos
    document.querySelector("#btnUpdate").onclick = function () {

        if (validarCamposVacios() == true) {
        
            listPeople[index].name = document.getElementById('inputNombre').value;
            listPeople[index].apell = document.getElementById('inputApellido').value;
            listPeople[index].user = document.getElementById('inputUsername').value;
            listPeople[index].book = document.getElementById('inputLibro').value;
            listPeople[index].time = document.getElementById('inputTiempo').value;

            //guardar lista actualizada
            localStorage.setItem('listPeople', JSON.stringify(listPeople));
            swal("Buen trabajo", "Tus datos se han actualizado", "success");

            //mostrar la data
            showData();

            document.getElementById('inputNombre').value = " ";
            document.getElementById('inputApellido').value = " ";
            document.getElementById('inputUsername').value = " ";
            document.getElementById('inputLibro').value = " ";
            document.getElementById("inputUsername").disabled = false;
            document.getElementById('inputTiempo').value = "Selecciona";

            //cambiar la visibilidad de los botones
            document.getElementById("btnUpdate").style.display = 'none';

            document.getElementById("btnGuardar").style.display = 'block';

        }
        
    }

}

const deleteData=(index)=>{

    let confirmacion = confirm("¿Estás seguro de que deseas eliminar este dato?");
    if (confirmacion) {
    let listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }
    listPeople.splice(index, 1);
    localStorage.setItem('listPeople',JSON.stringify(listPeople));
    swal("Acción realizada", "Tus datos se han eliminado", "success");

        document.getElementById('inputNombre').value = " ";
        document.getElementById('inputApellido').value = " ";
        document.getElementById('inputUsername').value = " ";
        document.getElementById('inputLibro').value = " ";
        document.getElementById("inputUsername").disabled = false;
        document.getElementById('inputTiempo').value = "Selecciona";

        //cambiar la visibilidad de los botones
        document.getElementById("btnUpdate").style.display = 'none';

        document.getElementById("btnGuardar").style.display = 'block';
    showData();
}
}

document.getElementById("formulario").addEventListener("submit", function(event) {
    // Prevenir el comportamiento predeterminado del envío del formulario
    event.preventDefault();
});