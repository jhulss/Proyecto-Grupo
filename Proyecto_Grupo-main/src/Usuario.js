import curso from "./Curso";

const usuariosRegistrados= [];

class usuario {
    constructor(nombre,contraseña,tipo) {
      this.nombre = nombre;
      this.contraseña = contraseña;
      this.tipo = tipo;
    }
    getNombre() {
        return this.nombre;
    }
    getContraseña() {
      return this.contraseña;
    }
    getTipo() {
      return this.tipo;
    }
    agregarUsuario() {
      usuariosRegistrados.push({ nombre: this.nombre, contraseña: this.contraseña, tipo: this.tipo });
    } 
    getUsuariosRegistrados() {
      return usuariosRegistrados;
    }
    crearCurso(nombreCurso){
      const nuevoCurso = new curso(nombreCurso, this);
      if(nuevoCurso.validarYagregar()){
        alert("El curso se creó con éxito");
        return nuevoCurso;
      }
      else{
        alert("El curso no se pudo crear! Solo los Docentes pueden crear cursos");
        return null;
      }
    }
}

export default usuario;