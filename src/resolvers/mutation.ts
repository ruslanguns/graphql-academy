
import { IResolvers } from 'graphql-tools';
import _ from 'lodash';
import { database } from '../data/data.store';

const mutation: IResolvers = {
    Mutation: {
        cursoNuevo(__: void, { curso }): any {
            const itemCurso = {
                id: String(database.cursos.length + 1),
                title: curso.title,
                description: curso.description,
                clases: curso.clases,
                time: curso.time,
                level: curso.level,
                logo: curso.logo,
                path: curso.path,
                teacher: curso.teacher,
                reviews: [],
            }

            // Evitamos que no se incluya curso con el mismo título
            const tituloDisponible = database.cursos.filter(item => item.title === itemCurso.title).length === 0;
            if (tituloDisponible) {
                database.cursos.push(itemCurso);
                return itemCurso;
            } else {
                return {
                    id: -1,
                    title: `El curso ya existe con este titulo`,
                    description: '',
                    clases: '-1',
                    time: '0.0',
                    level: 'TODOS',
                    logo: '',
                    path: '',
                    teacher: '',
                    reviews: [],
                }
            }

        },
        modificarCurso(__: void, { curso }): any {
            const existe = _.findIndex(database.cursos, (o) => o.id === curso.id);

            if (existe > -1) {
                const valoraciones = database.cursos[existe].reviews;
                curso.reviews = valoraciones;
                database.cursos[existe] = curso;
                return curso;
            }
            return {
                id: -1,
                title: `El curso no existe en la DB`,
                description: '',
                clases: '-1',
                time: '0.0',
                level: 'TODOS',
                logo: '',
                path: '',
                teacher: '',
                reviews: [],
            }

        },
        eliminarCurso(__: void, { id }): any {
            const borrar = _.remove(database.cursos, (o) => o.id === id);

            console.log(borrar);

            if (!borrar.length) {
                return {
                    id: -1,
                    title: `No existe ningún curso con ese ID`,
                    description: '',
                    clases: '-1',
                    time: '0.0',
                    level: 'TODOS',
                    logo: '',
                    path: '',
                    teacher: '',
                    reviews: [],
                }
            }

            return borrar[0];
        }
    }
}

export default mutation;
