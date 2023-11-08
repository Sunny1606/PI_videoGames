
function validation(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Se requiere un nombre!";
    }
    if (!input.description) {
      errors.description = "Se debe agregar una descripción!";
    }
    if (!input.released) {
      errors.release = "Agregar fecha de lanzamiento";
    }
    if (!input.rating || input.rating > 10 || input.rating < 1) {
      errors.rating = "Rating entre 1 y 10!";
    }
    return errors;
  }




export default validation;