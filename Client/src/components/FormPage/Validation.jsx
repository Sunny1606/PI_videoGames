const validation = (data) => {
    let errors = {}

    if (data.name.length > 35){
        errors.e1 = "Debe tener menos de 36 caracteres";
    }
 
    
  
    
    return errors;
}
export default validation;