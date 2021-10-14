import axios from 'axios'
import $ from 'jquery'
import Modal from '../../components/modal/Modal.vue'

export default {
    name: 'Agenda',
    components: { Modal },
    mounted() {
        this.getAll()
    },
    data() {
        return {
            /* actividades: [], */   
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
                $('#dataTable-Agenda').DataTable( {                    
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
                } );
            })
            .catch(error => console.log(error.response))

            $(document).on("click", "#eliminar", function() {
                let id = $(this).data("id")
                axios.delete('http://localhost:8080/api/agenda/' + id)                
            })            
        },
        addActivity() {
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
        editActivity(datos) {
            this.showModal = true
            this.modalTitle = "Editar Actividad"
            this.id = datos.id
            this.Curso = datos.curso.nombre
            this.FechaIniCre = datos.fechaInicrea
            this.FechaFinCre = datos.fechaFincrea
            this.FechaIniAct = datos.fechaIniact
            this.FechaFinAct = datos.fechaFinact
            this.Area = datos.area.nombre
            this.Estado = datos.estado
        }
    }
}