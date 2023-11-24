import curso from "./Curso.js";
import assert  from "assert";
import usuario from "./Usuario.js";

describe("Crear Curso", () => {
    it("Se permite crear un nuevo curso", () => { 
        const nuevoCurso = new curso("Ing. de software 2-23 UCB");
        expect(nuevoCurso.getNombre()).toEqual("Ing. de software 2-23 UCB");
    });

    it("Se permite añadir un curso a un array de cursos de la página", () => { 
        const nuevoCurso = new curso("Ing. de software 2-23 UCB");
        nuevoCurso.agregarCurso();
        assert.ok(nuevoCurso.getCursosDisponibles().some(curso => curso.nombre === nuevoCurso.getNombre()));
    });

    it("Se permite se permite crear un curso solo cuando se esta registrado como DOCENTE", () => { 
        const nuevoUsr = new usuario("Din Djarin", "Th1sIsth3Way", "Docente");
        const nuevoCurso = new curso("Ing. de software 2-23 UCB", nuevoUsr);
        nuevoCurso.validarYagregar();
        assert.ok(nuevoCurso.getCursosDisponibles().some(curso => curso.nombre === nuevoCurso.getNombre()));
    });
    it("NO se permite se permite crear un curso cuando se esta registrado como Estudiante", () => { 
        const nuevoUsr = new usuario("Grogu", "MandoR0ckz", "Estudiante");
        const nuevoCurso = new curso("Ing. de software", nuevoUsr);
        nuevoCurso.validarYagregar();
        assert.ok(!nuevoCurso.getCursosDisponibles().some(curso => curso.nombre === nuevoCurso.getNombre()));
    });
});

describe("Inscribirse a un Curso", () => {
    it("Se permite unirse a un curso", () => { 
        const nuevoCurso = new curso("Ing. de software");
        const nuevoUsr = new usuario("Anakin", "URmy3nemy", "Estudiante");
        nuevoCurso.inscribirAlumno(nuevoUsr);
        assert.ok(nuevoCurso.getInscritos().some(inscrito => inscrito.nombre === nuevoUsr.getNombre() && inscrito.contraseña === nuevoUsr.getContraseña()));
    });

    it("NO se permite unirse a un curso si se es DOCENTE", () => { 
        const nuevoCurso = new curso("Ing. de software 2");
        const nuevoUsr = new usuario("Darth Vader", "1mURfather", "Docente");
        nuevoCurso.inscribirAlumno(nuevoUsr);
        assert.ok(!nuevoCurso.getInscritos().some(inscrito => inscrito.nombre === nuevoUsr.getNombre() && inscrito.contraseña === nuevoUsr.getContraseña()));
    });

    it("Se permite unirse a un curso solo una vez", () => { 
        const nuevoCurso = new curso("Testing");
        const nuevoUsr = new usuario("Kylo Ren", "0utOfth3Sky", "Estudiante");
        // Verificar que el usuario no esté inscrito antes de la primera inscripción
        assert.ok(!nuevoCurso.getInscritos().some(inscrito => inscrito.nombre === nuevoUsr.getNombre()));
        // Inscribir al usuario por primera vez
        nuevoCurso.inscribirAlumno(nuevoUsr);
        // Verificar que el usuario esté inscrito después de la primera inscripción
        assert.ok(nuevoCurso.getInscritos().some(inscrito => inscrito.nombre === nuevoUsr.getNombre()));
        // Intentar inscribir al usuario por segunda vez
        nuevoCurso.inscribirAlumno(nuevoUsr);
        // Verificar que el usuario no esté inscrito más de una vez
        assert.equal(nuevoCurso.getInscritos().filter(inscrito => inscrito.nombre === nuevoUsr.getNombre() && inscrito.contraseña === nuevoUsr.getContraseña()).length, 1);
    });
});