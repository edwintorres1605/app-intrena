import axios from 'axios'
/* import $ from 'jquery' */
import Modal from '../../components/modal/Modal.vue'

export default {
    name: 'Roles',
    components: { Modal },
    mounted() {
        this.getAll()
    },
    data() {
        return {
            roles: [],   
            id: 0,         
            modalTitle: "",
            Nombre: "",
            Descripcion: "",
            showModal: false
        }
    },
    methods: {
        getAll() {
            axios.get('http://localhost:8080/api/roles/listar')
            .then(response => {
                this.roles = response.data
                /* $('#dataTable-Roles').DataTable( {                    
                    data: response.data,
                    columns: [
                        { data: 'id' },
                        { data: 'nombre' },
                        { data: 'descripcion' },
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
            this.modalTitle = "Nuevo Rol"
            this.id = 0
            this.Nombre = ""
            this.Descripcion = ""           
        },
        editClick(rol) {
            this.showModal = true
            this.modalTitle = "Editar Rol"
            this.id = rol.id
            this.Nombre = rol.nombre
            this.Descripcion = rol.descripcion
        },
        createClick() {
            axios.post('http://localhost:8080/api/roles', {
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
            axios.put('http://localhost:8080/api/roles/actualizar/' + this.id, {
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
            axios.delete('http://localhost:8080/api/roles/' + id)
            .then((response) => {
                this.getAll()
                console.log(response)
            })
        }
    }
}