let arrImgLength = 3;
let filesLength = 3;
let suma = Number(arrImgLength + filesLength);

let arr1 = [];
let arr2 = [];

for (let i = 0; i < filesLength; i++) {
  arr1[i] = i;
  // console.log(arr1);
}

for (let j = arrImgLength; j < suma; j++) {
  arr2[j] = j;
  arr2 = arr2.flat();
  // console.log(arr2);
}

for (let x = 0; x < filesLength; x++) {
  console.log(arr1[x], arr2[x]);
}
