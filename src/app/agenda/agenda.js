import axios from 'axios'
/* import $ from 'jquery' */
import Modal from '../../components/modal/Modal.vue'

export default {
    name: 'Agenda',
    components: { Modal },
    mounted() {
        this.getAll()
    },
    data() {
        return {
            actividades: [],   
            id: 0,         
            modalTitle: "",
            Curso: "",
            FechaIniCre: "",
            FechaFinCre: "",
            FechaIniAct: "",
            FechaFinAct: "",
            Area: "",
            Estado: "",
            showModal: false
        }
    },
    methods: {
        getAll() {
            axios.get('http://localhost:8080/api/agenda/listar')
            .then(response => {
                this.actividades = response.data
                /* $('#dataTable-Agenda').DataTable( {                    
                    data: response.data,
                    columns: [
                        { data: 'id' },
                        { data: 'curso.nombre' },
                        { data: 'fechaInicrea' },
                        { data: 'fechaFincrea' },
                        { data: 'fechaIniact' },
                        { data: 'fechaFinact' },
                        { data: 'area.nombre' },
                        { data: 'estado' },
                        {
                            data: 'id',
                            render: function(data) {
                                return `<button type="button" class="d-sm-inline-block btn btn-sm btn-warning my-btn-red shadow-sm" 
                                            data-toggle="modal" data-target="#modal-agenda" @click="editActivity(${data})" id="show-modal">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button data-id="${data}" id="eliminar" class="d-sm-inline-block btn btn-sm btn-danger shadow-sm ml-2">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>`
                            }
                        }
                    ]
                }); */
            })
            .catch(error => console.log(error.response))        
        },
        addClick() {
            this.showModal = true
            this.modalTitle = "Nueva Actividad"
            this.id = 0
            this.Curso = ""
            this.FechaIniCre = "" 
            this.FechaFinCre = ""
            this.FechaIniAct = ""
            this.FechaFinAct = ""
            this.Area = ""
            this.Estado = ""  
        },
        editClick(actividad) {
            this.showModal = true
            this.modalTitle = "Editar Actividad"
            this.id = actividad.id
            this.Curso = actividad.curso.nombre
            this.FechaIniCre = actividad.fechaInicrea
            this.FechaFinCre = actividad.fechaFincrea
            this.FechaIniAct = actividad.fechaIniact
            this.FechaFinAct = actividad.fechaFinact
            this.Area = actividad.area.nombre
            this.Estado = actividad.estado
        },
        createClick() {
            axios.post('http://localhost:8080/api/agenda', {
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
            axios.put('http://localhost:8080/api/agenda/actualizar/' + this.id, {
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
            axios.delete('http://localhost:8080/api/agenda/' + id)
            .then((response) => {
                this.getAll()
                console.log(response)
            })
        }
    }
}