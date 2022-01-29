import { obtenerUsuarios } from "./http-provider";



const body  = document.body;
let   tbody;
let   correlativo;

const crearHtml = () => {
    
    const html = `
    <h1 class="mt-5"> Usuarios</h1>
    <hr>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">email</th>
                <th scope="col">Nombre</th>
                <th scope="col">Avatar</th>
            </tr>
        </thead>
        <tbody class="t-body">
        </tbody>
    </table>
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    body.appendChild( div );    

    tbody  = document.querySelector('tbody');

}


// La función crearFilaUsuario debería de recibir un UNICO usuario
// con la siguiente estructura
    // {
    //     "id": 7,
    //     "email": "michael.lawson@reqres.in",
    //     "first_name": "Michael",
    //     "last_name": "Lawson",
    //     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg"
    // }
const crearFilaUsuario = async ( usuario ) => {

    // En la tabla deben de colocar un correlativo empezando en 1
    // También deben de colocar el avatar    
        const html = `
            <td scope="col"> ${correlativo} </td>
            <td scope="col"> ${usuario.email} </td>
            <td scope="col"> ${usuario.first_name} ${usuario.last_name} </td>
            <td scope="col">
                <img class="img-thumbnail" src="${usuario.avatar}">
            </td>
        `;
    
        const tr = document.createElement('tr');
        tr.innerHTML = html;
        tbody.appendChild(tr);
    
}


// const crearFilaUsuario = async ( usuario ) => {

//     // En la tabla deben de colocar un correlativo empezando en 1
//     // También deben de colocar el avatar
//     tbody  = document.querySelector('.t-body');

//     usuario = await obtenerUsuarios();
    
//     for (let i = 0; i < usuario.length; i++) {
        
//         const idx = i+1;
//         // const element = usuario[i].email;
//         // console.log(idx, element);

//         const html = `
//             <td scope="col"> ${idx} </td>
//             <td scope="col"> ${usuario[i].email} </td>
//             <td scope="col"> ${usuario[i].first_name} ${usuario[i].last_name} </td>
//             <td scope="col">
//                 <img class="img-thumbnail" src="${usuario[i].avatar}">
//             </td>
//         `;
    
//         const tr = document.createElement('tr');
//         tr.innerHTML = html;
//         tbody.appendChild(tr);

        
//     } 

// }


export const init = async() => {

    crearHtml();
    correlativo = 0;
    const usuarios = await obtenerUsuarios();
    usuarios.forEach(e =>  crearFilaUsuario(e));
    // crearFilaUsuario();
    // Obtener la lista de usuarios usando el servicio creado
    // Por cada usuario, llamar la función crearFila (for, forEach)
    // Colocar el init en el index.js, para que se ejecute la creación

}

