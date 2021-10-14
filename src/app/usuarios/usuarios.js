import axios from 'axios'
/* import $ from 'jquery' */
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
                /* $('#dataTable-Usuarios').DataTable( {                    
                    data: response.data,
                    columns: [
                        { data: 'id' },
                        { data: 'nombre' },
                        { data: 'email' },
                        {
                            data: 'id',
                            render: function(data) {
                                return `<a href="" data-id="${data}" class="d-sm-inline-block btn btn-sm btn-warning shadow-sm float-left pr-1"><i class="fas fa-edit"></i></a><a href="" data-id="${data}" class="d-sm-inline-block btn btn-sm btn-danger shadow-sm ml-2"><i class="fas fa-trash-alt"></i></a>`
                            }
                        }
                    ]
                }); */
            })
            .catch(error => console.log(error.response))
        },
        addClick() {
            this.showModal = true
            this.modalTitle = "Nuevo Usuario"
            this.id = 0
            this.Nombre = ""
            this.Email = ""  
            this.Password = ""
        },
        editClick(usuario) {
            this.showModal = true
            this.modalTitle = "Editar Usuario"
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
            axios.put('http://localhost:8080/api/cursos/usuarios/' + this.id, {
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