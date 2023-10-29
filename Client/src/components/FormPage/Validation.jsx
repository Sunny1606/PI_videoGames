const validation = (data) => {
    let errors = {}

    if (data.name){
        errors.e1 = "Debe tener menos de 36 caracteres";
    }
    if(data.description) {
        errors.e2 = "Este campo es obligatorio" ; 
    }
 
    
  
    
    return errors;
}
export default validation;