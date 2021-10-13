import axios from 'axios'
import $ from 'jquery'

export default {
    name: 'Agenda',
    mounted() {
        this.getAll()
    },
    methods: {
        getAll() {
            axios.get('http://localhost:8080/api/cursos/listar')
            .then(response => {
                $('#dataTable-Agenda').DataTable( {                    
                    data: response.data,
                    columns: [
                        { data: 'curso_id' },
                        { data: 'fecha_inicrea' },
                        { data: 'fecha_fincrea' },
                        { data: 'fecha_iniact' },
                        { data: 'fecha_finACT' },
                        { data: 'area_id' },
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