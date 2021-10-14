import axios from 'axios'
/* import $ from 'jquery' */
import Modal from '../../components/modal/Modal.vue'

export default {
    name: 'Permisos',
    components: { Modal },
    mounted() {
        this.getAll()
    },
    data() {
        return {
            permisos: [],   
            id: 0,         
            modalTitle: "",
            Nombre: "",
            Descripcion: "",
            showModal: false
        }
    },
    methods: {
        getAll() {
            axios.get('http://localhost:8080/api/permisos/listar')
            .then(response => {
                this.permisos = response.data
                /* $('#dataTable-Permisos').DataTable( {                    
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
            this.modalTitle = "Nuevo Permiso"
            this.id = 0
            this.Nombre = ""
            this.Descripcion = ""           
        },
        editClick(permiso) {
            this.showModal = true
            this.modalTitle = "Editar Permiso"
            this.id = permiso.id
            this.Nombre = permiso.nombre
            this.Descripcion = permiso.descripcion
        },
        createClick() {
            axios.post('http://localhost:8080/api/permisos', {
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
            axios.put('http://localhost:8080/api/permisos/actualizar/' + this.id, {
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
            axios.delete('http://localhost:8080/api/permisos/' + id)
            .then((response) => {
                this.getAll()
                console.log(response)
            })
        }
    }
}