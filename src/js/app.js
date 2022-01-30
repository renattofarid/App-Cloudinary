import { subirImagen } from "./cloudinary.service";

let arrImg = [];

const divImagenes = document.querySelector('#imagenes');
const inputFile = document.querySelector('input');

// const crearHtmlImagen = () => {
//     for (let z = 0; z < arrImg.length; z++) {        
//         const w = arrImg[z];
//         // if (arrImg.includes(w)) {
//             const html = `<img id="foto${z}" width="300px" class="img-thumbnail" src="" />`
//             const div = document.createElement("div");
//             div.innerHTML = html;
//             divImagenes.appendChild(div);
//         // }        
//     }
// };

const crearHtmlImagen = (a) => {
    const html = `<img id="foto${a}" width="300px" class="img-thumbnail" src="" />`
    const div = document.createElement("div");    
    div.innerHTML = html;
    divImagenes.appendChild(div);
    
}

const cargaLocalStorage = () => {
    arrImg = localStorage.getItem('imagenes') 
             ? JSON.parse(localStorage.getItem("imagenes"))
             : [];
    console.log(arrImg);
    for (let j = 0; j < arrImg.length; j++) {
        const existente = arrImg[j];
        const div = document.createElement("div");        
        div.innerHTML = existente;
        divImagenes.appendChild(div);
    }
};

const cargarImagenes = () => {
    console.log(arrImg);
    if (localStorage.getItem('imagenes')) {
        let arrImg2 = JSON.parse(localStorage.getItem("imagenes"));
        console.log(arrImg2);
        for (let h = 0; h < arrImg.length-1; h++) {
            if (!arrImg2.includes(arrImg[h])) {
                crearHtmlImagen(h);
            }
            
        }        
        localStorage.setItem('imagenes',JSON.stringify(arrImg));    
        console.log(arrImg);

        // crearHtmlImagen();

    } else {
        localStorage.setItem('imagenes',JSON.stringify(arrImg));    
    }
};


const eventoCargarImagenes = () => {      
    inputFile.addEventListener("change", (event) => {
        if (arrImg) {
            const files = event.target.files;
            console.log(files);
            const a = arrImg.length;
            const b = files.length;
            console.log(a,b);
            for (let o = 0; o < files.length; o++) {                
                for (let x = a; x < a + b; x++) {
                    crearHtmlImagen(x);
                    arrImg.push(document.querySelector(`#foto${x}`));
                    console.log(arrImg[x].src);
                    console.log(files[o]);
                    subirImagen(files[o]).then((url) => (arrImg[x].src = url));                
                    console.log(arrImg[x]);
                    console.log(arrImg);
                    
                }
                break;
            }
            setTimeout(() => {
                for (let y = a; y < a +b ; y++) {
                    // console.log(arrImg[y]);
                    const e = arrImg[y].outerHTML;
                    arrImg[y] = e;        
                    // console.log(arrImg[y]);
                } 
                cargarImagenes();
            }, 2000);  
        }
          

    });       
    // console.log(arrImg);                 
    
    
}







export const init = () => {
    cargaLocalStorage();
    eventoCargarImagenes();
};
