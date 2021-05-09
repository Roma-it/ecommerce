window.addEventListener("load", function () {
  let nombre = document.getElementById("nombre");
  let apellido = document.getElementById("apellido");
  let pass = document.getElementById("password");
  let error = document.querySelector(".ventana-error");

  function minChar(field, num) {
    if (field.value.length > 0 && field.value.length < num) {
      field.style.color = "red";
      field.style.backgroundColor = "orange";
      error.innerHTML = `Debes ingresar al menos ${num - 1} caracteres`;
    } else {
      error.innerHTML = "";
      field.style.color = "black";
      field.style.backgroundColor = "white";
    }
  }
  nombre.addEventListener("input", () => {
    minChar(nombre, 3);
  });
  apellido.addEventListener("input", () => {
    minChar(apellido, 3);
  });
  pass.addEventListener("input", () => {
    minChar(pass, 8);
  });
});
