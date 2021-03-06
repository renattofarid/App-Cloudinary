import { subirImagen } from "./cloudinary.service";

let arrImg = [];
const divImagenes = document.querySelector("#imagenes");
const inputFile = document.querySelector("#input");
const btnEliminar = document.querySelector("#eliminarTodos");
const nickname = document.getElementById("nickname");
const inputNick = document.getElementById("inputNick");
const buttonAddon2 = document.getElementById("button-addon2");
const alerta = document.getElementById("toast");
const toast = bootstrap.Toast.getOrCreateInstance(alerta);
const alerta2 = document.getElementById("toastTodosEliminados");
const toastTodosEliminados = bootstrap.Toast.getOrCreateInstance(alerta2);
const alerta3 = document.getElementById("toastEliminarElemento");
const toastEliminarElemento = bootstrap.Toast.getOrCreateInstance(alerta3);
const alerta4 = document.getElementById("toastNickCambiado");
const toastNickCambiado = bootstrap.Toast.getOrCreateInstance(alerta4);
const alerta5 = document.getElementById("toastCargaFinalizada");
const toastCargaFinalizada = bootstrap.Toast.getOrCreateInstance(alerta5);

const cargarNickname = () => {
  if (localStorage.getItem("nickname")) {
    const nickExistente = localStorage.getItem("nickname");
    nickname.textContent = nickExistente;
    inputNick.disabled = true;
    inputNick.value = "";
    inputNick.placeholder = "Da un click a tu nickname para poder cambiarlo ;)";
    inputNick.style.display = "none";
    buttonAddon2.style.display = "none";
    toast.show();
  } else {
    const nickExistente = localStorage.getItem("nickname");
    nickname.textContent = nickExistente;
    toast.show();
  }
};

const createNickname = () => {
  let palabra = [];

  inputNick.addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      palabra.push(e.key);
      nickname.textContent = palabra.join("");
    } else if (e.key === "Enter") {
      if (inputNick.value !== "") {
        let ls = localStorage.setItem("nickname", palabra.join(""));
        inputNick.disabled = true;
        inputNick.value = "";
        inputNick.placeholder =
          "Da un click a tu nickname para poder cambiarlo ;)";
        cargarNickname();
        toastNickCambiado.show();
      } else {
        inputNick.disabled = true;
        inputNick.value = "";
        inputNick.placeholder =
          "Da un click a tu nickname para poder cambiarlo ;)";
        cargarNickname();
      }
    }
  });
  inputNick.addEventListener("keyup", (e) => {
    if (e.key === "Backspace") {
      if (inputNick.value == "") {
        palabra = [];
        nickname.textContent = palabra.join("");
      } else if (palabra.length !== 0) {
        palabra.pop();
        nickname.textContent = palabra.join("");
      }
    }
  });
  nickname.addEventListener("click", () => {
    const nickExistente = localStorage.getItem("nickname");
    inputNick.disabled = false;
    inputNick.placeholder = nickExistente;
    nickname.textContent = "";
    palabra = [];
    inputNick.style.display = "block";
    buttonAddon2.style.display = "block";
    inputNick.classList.add("animate__animated");
    inputNick.classList.add("animate__heartBeat");
    inputNick.classList.add("animate__fast");
    buttonAddon2.classList.add("animate__animated");
    buttonAddon2.classList.add("animate__heartBeat");
    buttonAddon2.classList.add("animate__fast");
    inputNick.focus();
  });
  buttonAddon2.addEventListener("click", (e) => {
    if (inputNick.value !== "") {
      let ls = localStorage.setItem("nickname", palabra.join(""));
      inputNick.disabled = true;
      inputNick.value = "";
      inputNick.placeholder =
        "Da un click a tu nickname para poder cambiarlo ;)";
      cargarNickname();
      inputNick.style.display = "none";
      buttonAddon2.style.display = "none";
    } else {
      inputNick.disabled = true;
      inputNick.value = "";
      inputNick.placeholder =
        "Da un click a tu nickname para poder cambiarlo ;)";
      cargarNickname();
      inputNick.style.display = "none";
      buttonAddon2.style.display = "none";
    }
  });
};

const crearHtmlImagen = (a) => {
  const html = `<a id="link${a}" href="" href="" data-lightbox="repository">
                <img id="foto${a}" width="100%" class="img-thumbnail animate__animated animate__fadeIn animate__delay-2s" src="" /></a>
                <button id="btn${a}" onclick="eliminarElemento(this.id)" type="button" class="btn btn-eliminar animate__animated animate__fadeIn animate__delay-2s">
                <i class="fas fa-times" aria-hidden="true"></i>
                </button>
  `;
  const div = document.createElement("div");
  div.classList.add(`text-center${a}`);
  div.classList.add("animate__animated");
  div.classList.add("animate__heartBeat");
  div.classList.add("animate__slow");
  div.innerHTML = html;
  divImagenes.appendChild(div);
};

const cargaLocalStorage = () => {
  arrImg = localStorage.getItem("imagenes")
    ? JSON.parse(localStorage.getItem("imagenes"))
    : [];
  for (let j = 0; j < arrImg.length; j++) {
    const existente =
      arrImg[j] +
      `<button id="btn${j}" onclick="eliminarElemento(this.id)" type="button" class="btn btn-eliminar">
    <i class="fas fa-times" aria-hidden="true"></i>
    </button>`;
    const div = document.createElement("div");
    div.classList.add(`text-center${j}`);
    div.classList.add("animate__animated");
    div.classList.add("animate__heartBeat");
    div.classList.add("animate__slow");
    div.innerHTML = existente;
    divImagenes.appendChild(div);
  }
};

const actualizarLocalStorage = () => {
  localStorage.setItem("imagenes", JSON.stringify(arrImg));
};

const eliminarLocalStorage = () => {
  btnEliminar.addEventListener("click", (event) => {
    if (localStorage.getItem("imagenes")) {
      arrImg = [];
      localStorage.removeItem("imagenes");
      while (divImagenes.firstChild) {
        divImagenes.removeChild(divImagenes.firstChild);
      }
      toastTodosEliminados.show();
    }
  });
};

const eventoCargarImagenes = () => {
  inputFile.addEventListener("change", async (event) => {
    if (!localStorage.getItem("imagenes")) {
      arrImg = [];
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
        let link = document.querySelector(`#link${p}`);
        arrImg.push(link);
        const url = await subirImagen(files[o]);
        arrImg[p].href = url;
        arrImg[p].lastElementChild.src = url;
      }
      for (let y = a; y < suma; y++) {
        const e = arrImg[y].outerHTML;
        arrImg[y] = e;
      }
      actualizarLocalStorage();
      event.target.value = "";
      toastCargaFinalizada.show();
    } else if (arrImg) {
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
        let link = document.querySelector(`#link${p}`);
        arrImg.push(link);
        const url = await subirImagen(files[o]);
        arrImg[p].href = url;
        arrImg[p].lastElementChild.src = url;
      }
      for (let y = a; y < suma; y++) {
        const e = arrImg[y].outerHTML;
        arrImg[y] = e;
      }
      actualizarLocalStorage();
      event.target.value = "";
      toastCargaFinalizada.show();
    }
  });
};

export const eliminarElemento = (id) => {
  const idFoto = id.slice(3);
  const eliminado = document.getElementById(`link${idFoto}`);
  const btnDeEliminado = document.getElementById(id);
  const contenedor = document.querySelector(`.text-center${idFoto}`);
  const a = JSON.parse(localStorage.getItem("imagenes"));

  if (eliminado.parentNode) {
    eliminado.parentNode.removeChild(eliminado);
    btnDeEliminado.parentNode.removeChild(btnDeEliminado);
    contenedor.parentNode.removeChild(contenedor);
  }

  arrImg = a.filter((e) => e !== eliminado.outerHTML);
  actualizarLocalStorage();
  toastEliminarElemento.show();
  if (arrImg.length < 1) {
    arrImg = [];
    localStorage.removeItem("imagenes");
  }
};

export const init = () => {
  cargaLocalStorage();
  eventoCargarImagenes();
  eliminarLocalStorage();
  cargarNickname();
  createNickname();
};
