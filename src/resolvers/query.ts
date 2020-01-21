
import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';

const query: IResolvers = {
    Query: {
        estudiantes(): any {
            return database.estudiantes;
        },
        estudiante(__: void, { id }): any {
            const resultado = database.estudiantes.filter(estudiante => estudiante.id === id)[0];
            if (!resultado) {
                return {
                    id: '-1',
                    name: `No se ha encontrado el estudiante con el ID ${id}`,
                    email: '',
                    courses: []
                };
            } else {
                return resultado;
            }
        },
        cursos(): any {
            return database.cursos;
        },
        curso(__: void, { cursoId }): any {
            const resultado = database.cursos.filter(curso => curso.id === cursoId)[0];
            if (!resultado) {
                return {
                    id: '-1',
                    title: `No se ha encontrado el curso con el ID ${cursoId}`,
                    description: '',
                    clases: -1,
                    time: 0.0,
                    logo: '',
                    level: 'TODOS',
                    path: '',
                    teacher: '',
                    reviews: []
                };
            } else {
                return resultado;
            }
        },
    }
}

export default query;
