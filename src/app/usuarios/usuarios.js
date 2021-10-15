import axios from 'axios'
import Modal from '../../components/modal/Modal.vue'

export default {
    name: 'Usuarios',
    components: { Modal },
    mounted() {
        this.getAll()
    },
    data() {
        return {
            usuarios: [],   
            id: 0,         
            modalTitle: "",
            Nombre: "",
            Email: "",
            Password: "",
            showModal: false
        }
    },
    methods: {
        getAll() {
            axios.get('http://localhost:8080/api/usuarios/listar')
            .then(response => {
                this.usuarios = response.data
            })
            .catch(error => console.log(error.response))
        },
        addClick() {
            this.showModal = true
            this.modalTitle = "Nuevo Curso"
            this.id = 0
            this.Nombre = ""
            this.Email = ""   
            this.Password = ""        
        },
        editClick(usuario) {
            this.showModal = true
            this.modalTitle = "Editar Curso"
            this.id = usuario.id
            this.Nombre = usuario.nombre
            this.Email = usuario.email
            this.Password = usuario.password
        },
        createClick() {
            axios.post('http://localhost:8080/api/usuarios', {
                nombre: this.Nombre,
                email: this.Email,
                password: this.Password
            })
            .then((response) => {
                this.getAll()
                this.showModal = false
                console.log(response)
            })
        },
        updateClick() {
            axios.put('http://localhost:8080/api/usuarios/actualizar/' + this.id, {
                id: this.id,
                nombre: this.Nombre,
                email: this.Email,
                password: this.Password
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
            axios.delete('http://localhost:8080/api/usuarios/' + id)
            .then((response) => {
                this.getAll()
                console.log(response)
            })
        }
    }
}