import axios from 'axios'
import Modal from '../../components/modal/Modal.vue'

export default {
    name: 'Agenda',
    components: { Modal },
    mounted() {
        this.getAll()
    },
    data() {
        return {
            cursos: [],
            areas: [],
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
            })
            .catch(error => console.log(error.response))  

            axios.get('http://localhost:8080/api/cursos/listar')
            .then(response => {
                this.cursos = response.data
            })
            .catch(error => console.log(error.response)) 
            
            axios.get('http://localhost:8080/api/areas/listar')
            .then(response => {
                this.areas = response.data
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