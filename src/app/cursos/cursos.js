import axios from 'axios'
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
            axios.get('http://132.145.32.121:8080/api/cursos/listar')
            .then(response => {
                this.cursos = response.data
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
            axios.post('http://132.145.32.121:8080/api/cursos', {
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
            axios.put('http://132.145.32.121:8080/api/cursos/actualizar/' + this.id, {
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
            axios.delete('http://132.145.32.121:8080/api/cursos/' + id)
            .then((response) => {
                this.getAll()
                console.log(response)
            })
        }
    }
}