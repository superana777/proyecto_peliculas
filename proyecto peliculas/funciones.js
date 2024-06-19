import { eliminar, getData, obtener, save, update } from "./firebase.js"
let id = 0
document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const Peliculas = {
                'titulo': document.getElementById('titulo').value.trim(),
                'director': document.getElementById('director').value.trim(),
                'fecha': document.getElementById('fecha').value,
                'genero': document.getElementById('genero').value.trim(),
                'clasificacion': document.getElementById('clasificacion').value.trim(),
                'duracion': document.getElementById('duracion').value,
                'sinopsis': document.getElementById('sinopsis').value.trim()
            }
            save(Peliculas)
            limpiar()
        }
        else{
            const Peliculas = {
                'titulo': document.getElementById('titulo').value.trim(),
                'director': document.getElementById('director').value.trim(),
                'fecha': document.getElementById('fecha').value,
                'genero': document.getElementById('genero').value.trim(),
                'clasificacion': document.getElementById('clasificacion').value.trim(),
                'duracion': document.getElementById('duracion').value,
                'sinopsis': document.getElementById('sinopsis').value.trim()
            }
            update(id,Peliculas)
            limpiar()
            id=0
        }
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = ''
        collection.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
            <td>${item.titulo}</td>
            <td>${item.director}</td>
            <td>${item.fecha}</td>
            <td>${item.genero}</td>
            <td>${item.clasificacion}</td>
            <td>${item.duracion}</td>
            <td>${item.sinopsis}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminar(btn.id)
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })

        document.querySelectorAll('.btn-warning').forEach( btn => {
            btn.addEventListener('click',async() =>{
                const doc = await obtener(btn.id)
                const d = doc.data()
                document.getElementById('titulo').value = d.titulo
                document.getElementById('director').value = d.director
                document.getElementById('fecha').value = d.fecha
                document.getElementById('genero').value = d.genero
                document.getElementById('clasificacion').value = d.clasificacion
                document.getElementById('duracion').value = d.duracion
                document.getElementById('sinopsis').value = d.sinopsis
                document.getElementById('btnGuardar').value='Modificar'
                id=btn.id
            })
        })

    })
})