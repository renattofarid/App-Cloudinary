import { subirImagen } from "./cloudinary.service";

let arrImg = [];

const divImagenes = document.querySelector("#imagenes");
const inputFile = document.querySelector("input");

const crearHtmlImagen = (a) => {
  const html = `<img id="foto${a}" width="300px" class="img-thumbnail" src="" />`;
  const div = document.createElement("div");
  div.innerHTML = html;
  divImagenes.appendChild(div);
};

const cargaLocalStorage = () => {
  arrImg = localStorage.getItem("imagenes")
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

const actualizarLocalStorage = () => {
  localStorage.setItem("imagenes", JSON.stringify(arrImg));
};

const eventoCargarImagenes = () => {
  inputFile.addEventListener("change", (event) => {
    if (arrImg) {
      const files = event.target.files;
      console.log(files);
      const a = arrImg.length;
      const b = files.length;
      const suma = a + b;

      let pos1 = [];
      let pos2 = [];

      for (let i = 0; i < b; i++) {
        pos1[i] = i;
      }

      for (let j = a; j < suma; j++) {
        pos2[j] = j;
        pos2 = pos2.flat();
      }

      for (let x = 0; x < files.length; x++) {
        let o = pos1[x];
        let p = pos2[x];
        crearHtmlImagen(p);
        arrImg.push(document.querySelector(`#foto${p}`));
        subirImagen(files[o]).then((url) => (arrImg[p].src = url));
      }
      setTimeout(() => {
        for (let y = a; y < suma; y++) {
          const e = arrImg[y].outerHTML;
          arrImg[y] = e;
        }
        actualizarLocalStorage();
      }, 2000);
    }
  });
  // console.log(arrImg);
};

export const init = () => {
  cargaLocalStorage();
  eventoCargarImagenes();
};
