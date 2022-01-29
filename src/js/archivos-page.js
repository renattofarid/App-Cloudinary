import { subirImagen } from "./http-provider";

const body = document.body;

let inputFile,
  imgFotos = [],
  imgFotosE = [];

const crearInputFileHtml = () => {
  const html = `
        <h1 class="mt-45">Subir archivos</h1>
        <hr>

        <label>Selecciona una fotografía: </label>
        <input type="file" multiple accept="image/png, image/jpeg"/>
        <br>
        <div class="imagenes"> <hr> </div>
    `;
  const div = document.createElement("div");
  div.innerHTML = html;
  body.append(div);

  inputFile = document.querySelector("input");
};

const crearHtmlImagen = (id) => {
  const html = `
        <img id="foto${id}" width="300px" class="img-thumbnail" src="" />
    `;
  const div = document.createElement("div");
  div.innerHTML = html;
  const divImagenes = document.querySelector(".imagenes");
  divImagenes.appendChild(div);
  imgFotos.push(document.querySelector(`#foto${id}`));
  // console.log({ imgFotos });
};

const eventos = () => {
  inputFile.addEventListener("change", (event) => {
    const files = event.target.files;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      crearHtmlImagen(i);
      subirImagen(files[i]).then((url) => (imgFotos[i].src = url));
    }
    setTimeout(() => {
      guardarImagenLocalStorage();
    }, 2000);
  });
};

const insertarImagen = () => {};

const guardarImagenLocalStorage = () => {
  if (localStorage.getItem("imgs")) {
    for (let x = 0; x < imgFotosE.length; x++) {
      const divImagenes = document.querySelector(".imagenes");
      const b = document.querySelector(`#foto${x}`);
      divImagenes.removeChild(b);
    }
    imgFotosE = [];
    for (let j = 0; j < imgFotos.length; j++) {
      const e = imgFotos[j].outerHTML;
      imgFotos[j] = e;
    }
    imgFotosE = [...imgFotos];
    console.log(imgFotosE);
    console.log(imgFotos);

    localStorage.setItem("imgs", JSON.stringify(imgFotosE));

    for (let y = 0; y < imgFotosE.length; y++) {
      const a = imgFotosE[y];
      console.log(a);
      crearHtmlImagen2(a);
    }
  } else {
    for (let i = 0; i < imgFotos.length; i++) {
      const e = imgFotos[i].outerHTML;
      imgFotos[i] = e;
    }
    // console.log(imgFotos);
    localStorage.setItem("imgs", JSON.stringify(imgFotos));
  }
};

const crearHtmlImagen2 = (id) => {
  const html = `${id}`;
  const div = document.createElement("div");
  div.innerHTML = html;
  const divImagenes = document.querySelector(".imagenes");
  // console.log(divImagenes);
  divImagenes.appendChild(div);
};

const cargarLocalStorage = () => {
  imgFotosE = localStorage.getItem("imgs")
    ? JSON.parse(localStorage.getItem("imgs"))
    : [];
  // imgFotos = Object.values(img);

  console.log(imgFotosE);

  for (let i = 0; i < imgFotosE.length; i++) {
    const a = imgFotosE[i];
    console.log(a);
    crearHtmlImagen2(a);
  }
};

export const init = () => {
  crearInputFileHtml();
  cargarLocalStorage();
  eventos();
};
