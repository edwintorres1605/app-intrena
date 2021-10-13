import axios from 'axios'
import $ from 'jquery'
import ModalAgenda from './modalAgenda/ModalAgenda.vue'

export default {
    name: 'Agenda',
    components: { ModalAgenda },
    mounted() {
        this.getAll()
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
                                return `<a href="" data-id="${data}" class="d-sm-inline-block btn btn-sm btn-warning shadow-sm float-left pr-1"><i class="fas fa-edit"></i></a><a href="" data-id="${data}" class="d-sm-inline-block btn btn-sm btn-danger shadow-sm ml-2"><i class="fas fa-trash-alt"></i></a>`
                            }
                        }
                    ]
                } );
            })
            .catch(error => console.log(error.response))
        }
    }
}