import usuario from "./Usuario.js";
import assert from 'assert';

describe("Crear Usuario", () => {
    it("Se permite crear un nuevo usuario en el sitio ingresando nombre", () => { 
      const NuevoUs = new usuario("Santiago");
      expect(NuevoUs.getNombre()).toContain("Santiago"); 
    }); 
  
    it("Se permite agregar usuario con nombre a un array de los usuarios registrados", () => { 
      const NuevoUs = new usuario("Guille");
      NuevoUs.agregarUsuario();
      assert.ok(NuevoUs.getUsuariosRegistrados().some(usuario => usuario.nombre === NuevoUs.getNombre()));
    });
  
    it("Se permite crear un nuevo usuario en el sitio ingresando nombre y contraseña", () => { 
      const NuevoUs = new usuario("Santiago","TDD123");
      expect(NuevoUs.getContraseña()).toContain("TDD123"); 
    });
    
    it("Se permite agregar usuario con nombre a un array de los usuarios registrados", () => { 
      const NuevoUs = new usuario("Paola","LWO999");
      NuevoUs.agregarUsuario();
      assert.ok(NuevoUs.getUsuariosRegistrados().some(usuario => usuario.contraseña === NuevoUs.getContraseña()));
    });
});

describe("Identificarr Usuario", () => {
    it("Se permite crear un nuevo usuario identificandose como estudiante o docente", () => { 
      const NuevoUs = new usuario("Hermenegildo","fidpasa922","Estudiante");
      NuevoUs.agregarUsuario();
      assert.ok(NuevoUs.getUsuariosRegistrados().some(usuario => usuario.tipo === NuevoUs.getTipo()));
      const NuevoUs2 = new usuario("Romina","mojul333","Docente");
      NuevoUs2.agregarUsuario();
      assert.ok(NuevoUs2.getUsuariosRegistrados().some(usuario => usuario.tipo === NuevoUs2.getTipo()));
    });
});