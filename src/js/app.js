import { subirImagen } from "./cloudinary.service";

let arrImg = [];

const divImagenes = document.querySelector("#imagenes");
const inputFile = document.querySelector("input");
const btnEliminar = document.querySelector("button");
const eventoInput = document.querySelector("#eventoInput");

const crearHtmlImagen = (a) => {
  const html = `<img id="foto${a}" width="450px" class="img-thumbnail" src="" />
                <button id="btn${a}" onclick="eliminarElemento(this.id)" type="button" class="btn btn-eliminar">
                <i class="fas fa-times" aria-hidden="true"></i>
                </button>
  `;
  const div = document.createElement("div");
  div.classList.add(`text-center${a}`);
  div.innerHTML = html;
  divImagenes.appendChild(div);
};

const cargaLocalStorage = () => {
  arrImg = localStorage.getItem("imagenes")
    ? JSON.parse(localStorage.getItem("imagenes"))
    : [];
  // console.log(arrImg);
  for (let j = 0; j < arrImg.length; j++) {
    const existente =
      arrImg[j] +
      `<button id="btn${j}" onclick="eliminarElemento(this.id)" type="button" class="btn btn-eliminar">
    <i class="fas fa-times" aria-hidden="true"></i>
    </button>`;
    const div = document.createElement("div");
    div.classList.add(`text-center${j}`);
    div.innerHTML = existente;
    divImagenes.appendChild(div);
  }
};

const actualizarLocalStorage = () => {
  localStorage.setItem("imagenes", JSON.stringify(arrImg));
};

const eliminarLocalStorage = () => {
  btnEliminar.addEventListener("click", (event) => {
    arrImg = [];
    localStorage.removeItem("imagenes");
    while (divImagenes.firstChild) {
      divImagenes.removeChild(divImagenes.firstChild);
    }
  });
};

const eventoCargarImagenes = () => {
  inputFile.addEventListener("change", async (event) => {
    if (!localStorage.getItem("imagenes")) {
      arrImg = [];
      console.log("entre al if y mostre arreglo del evento", { arrImg });
      const files = event.target.files;
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
        // subirImagen(files[o]).then((url) => (arrImg[p].src = url));
        const url = await subirImagen(files[o]);
        arrImg[p].src = url;
        // console.log({ url });
      }
      for (let y = a; y < suma; y++) {
        const e = arrImg[y].outerHTML;
        arrImg[y] = e;
      }
      actualizarLocalStorage();
      // setTimeout(() => {
      //   for (let y = a; y < suma; y++) {
      //     const e = arrImg[y].outerHTML;
      //     arrImg[y] = e;
      //   }
      //   actualizarLocalStorage();
      // }, 2000);
      event.target.value = "";
      console.log("entre al if y mostre arreglo del evento otra vez", {
        arrImg,
      });
    } else if (arrImg) {
      console.log("entre al segundo if y mostre arreglo del evento", {
        arrImg,
      });
      const files = event.target.files;
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
        // subirImagen(files[o]).then((url) => (arrImg[p].src = url));
        const url = await subirImagen(files[o]);
        arrImg[p].src = url;
        // console.log({ url });
      }
      for (let y = a; y < suma; y++) {
        const e = arrImg[y].outerHTML;
        arrImg[y] = e;
      }
      actualizarLocalStorage();
      // setTimeout(() => {
      //   for (let y = a; y < suma; y++) {
      //     const e = arrImg[y].outerHTML;
      //     arrImg[y] = e;
      //   }
      //   actualizarLocalStorage();
      // }, 2000);
      event.target.value = "";
      console.log("entre al segundo if y mostre arreglo del evento otra vez", {
        arrImg,
      });
    }
  });
};

export const init = () => {
  cargaLocalStorage();
  eventoCargarImagenes();
  eliminarLocalStorage();
  // evento();
};
