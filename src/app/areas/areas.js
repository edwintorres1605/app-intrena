import axios from 'axios'
import Modal from '../../components/modal/Modal.vue'

export default {
    name: 'Areas',
    components: { Modal },
    mounted() {
        this.getAll()
    },
    data() {
        return {
            areas: [],   
            id: 0,         
            modalTitle: "",
            Nombre: "",
            showModal: false
        }
    },
    methods: {
        getAll() {
            axios.get('http://localhost:8080/api/areas/listar')
            .then(response => {
                this.areas = response.data
            })
            .catch(error => console.log(error.response))
        },
        addClick() {
            this.showModal = true
            this.modalTitle = "Nueva Área"
            this.id = 0
            this.Nombre = ""          
        },
        editClick(permiso) {
            this.showModal = true
            this.modalTitle = "Editar Área"
            this.id = permiso.id
            this.Nombre = permiso.nombre
        },
        createClick() {
            axios.post('http://localhost:8080/api/areas', {
                nombre: this.Nombre
            })
            .then((response) => {
                this.getAll()
                this.showModal = false
                console.log(response)
            })
        },
        updateClick() {
            axios.put('http://localhost:8080/api/areas/actualizar/' + this.id, {
                id: this.id,
                nombre: this.Nombre
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
            axios.delete('http://localhost:8080/api/areas/' + id)
            .then((response) => {
                this.getAll()
                console.log(response)
            })
        }
    }
}