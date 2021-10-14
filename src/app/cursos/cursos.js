import axios from 'axios'
/* import $ from 'jquery' */
import Modal from '../../components/modal/Modal.vue'

export default {
    name: 'Cursos',
    components: { Modal },
    mounted() {
        this.getAll()
    },
    data() {
        return {
            cursos: [],   
            id: 0,         
            modalTitle: "",
            Nombre: "",
            Descripcion: "",
            showModal: false
        }
    },
    methods: {
        getAll() {
            axios.get('http://localhost:8080/api/cursos/listar')
            .then(response => {
                this.cursos = response.data
                /* $('#dataTable-Cursos').DataTable( {                    
                    data: response.data,
                    columns: [
                        { data: 'id' },
                        { data: 'nombre' },
                        { data: 'descripcion' },
                        {
                            data: 'id',
                            render: function(data) {
                                return `<button type="button" class="d-sm-inline-block btn btn-sm btn-warning my-btn-red shadow-sm" 
                                            data-toggle="modal" data-target="#modal-agenda" @click="editClick(${data})" id="show-modal">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <a href="" data-id="${data}" class="d-sm-inline-block btn btn-sm btn-danger shadow-sm ml-2">
                                            <i class="fas fa-trash-alt"></i>
                                        </a>`
                            }
                        }
                    ]
                } ); */
            })
            .catch(error => console.log(error.response))
        },
        addClick() {
            this.showModal = true
            this.modalTitle = "Nuevo Curso"
            this.id = 0
            this.Nombre = ""
            this.Descripcion = ""           
        },
        editClick(curso) {
            this.showModal = true
            this.modalTitle = "Editar Curso"
            this.id = curso.id
            this.Nombre = curso.nombre
            this.Descripcion = curso.descripcion
        },
        createClick() {
            axios.post('http://localhost:8080/api/cursos', {
                nombre: this.Nombre,
                descripcion: this.Descripcion
            })
            .then((response) => {
                this.getAll()
                this.showModal = false
                console.log(response)
            })
        },
        updateClick() {
            axios.put('http://localhost:8080/api/cursos/actualizar/' + this.id, {
                id: this.id,
                nombre: this.Nombre,
                descripcion: this.Descripcion
            })
            .then((response) => {
                this.getAll()
                this.showModal = false
                console.log(response)
            })
        },
        deleteClick(id) {
            if (!confirm("¿Confirma que desea eliminar el registro?")) {
                return 
            }
            axios.delete('http://localhost:8080/api/cursos/' + id)
            .then((response) => {
                this.getAll()
                console.log(response)
            })
        }
    }
}