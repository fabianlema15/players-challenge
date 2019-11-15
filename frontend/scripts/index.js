const variables = new Variables();

const functions = {
    loadPlayers() {
        ApiService.getPlayers(variables.getCurrentPage(), variables.getNumberResults())
            .then(players => {
                variables.setPlayers(players)
                functions.createTable()
            })
    },

    loadPagination() {
        ApiService.getCount()
            .then(count => {
                variables.setTotalAllPlayers(count.count)
                functions.createPagination()
            })
    },

    createTable() {
        const playersHtml = variables.getPlayers().map((player, index) =>
            `<tr>
            <td>${player.name}</td>
            <td>${player.jersey_number}</td>
            <td>${player.team}</td>
            <td>${player.position}</td>
            <td>
                <div class="btn-group btn-group-sm" role="group">
                    <button type="button" class="btn btn-primary edit-btn" data-toggle="modal" data-target="#formModal" data-id="${player.id}" data-type="old">Edit</button>
                    <button type="button" class="btn btn-danger delete-btn" data-toggle="modal" data-target="#deleteModal" data-id="${player.id}" data-name="${player.name}">Delete</button>
                </div>
            </td>
        </tr>`)
        $('.table tbody').html(playersHtml);
    },

    createPagination() {
        const paginationHtml =
            `<li class="page-item${variables.getCurrentPage() === 1 && ' disabled'}"><a class="page-link" href="#" data-action="first">First</a></li>
            <li class="page-item${variables.getCurrentPage() === 1 && ' disabled'}"><a class="page-link" href="#" data-action="previous">Previous</a></li>
            <li class="page-item disabled" style="width:150px"><a class="page-link" href="#">Page ${variables.getCurrentPage()} of ${variables.getTotalPages()}</a></li>
            <li class="page-item${variables.getCurrentPage() === variables.getTotalPages() && ' disabled'}"><a class="page-link" href="#" data-action="next">Next</a></li>
            <li class="page-item${variables.getCurrentPage() === variables.getTotalPages() && ' disabled'}"><a class="page-link" href="#" data-action="last">Last</a></li>`
        $('.pagination').html(paginationHtml);
        functions.loadPlayers();
    }
}

const events = () => {
    $('#formModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget) // Button that triggered the modal
        const modal = $(this)
        if (button.data('type') === 'old') {
            $("#isnew").prop("checked", false)
            const id = button.data('id')
            const player = variables.getPlayers().find(player => player.id === id);
            modal.find('.modal-title').text('Edit player')
            modal.find('.modal-body #index').val(id)
            modal.find('.modal-body #team').val(player.team)
            modal.find('.modal-body #name').val(player.name)
            modal.find('.modal-body #position').val(player.position)
            modal.find('.modal-body #jersey_number').val(player.jersey_number)
        } else {
            modal.find('.modal-title').text('New player')
            $("#isnew").prop("checked", true)
        }
    })
    
    $('#deleteModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget) // Button that triggered the modal
        const id = button.data('id')
        const name = button.data('name')
        const modal = $(this)
        modal.find('.modal-body #index').val(id)
        modal.find('.modal-body #player-name').html(`Do you want delete ${name}?`)
        
    })
    
    $('#player-form').on('submit', (e) => {
        e.preventDefault();
        const { index, name, position, jersey_number, team } = e.target
        const isNew = $('#isnew').prop('checked')
        const player = {
            name: name.value,
            position: position.value,
            jersey_number: jersey_number.value,
            team: team.value
        }
        if (isNew) {
            ApiService.saveNew(player)
                .then(result => {
                    variables.addTotalAllPlayers()
                    //if (variables.getCurrentPage() === variables.getTotalPages()) {
                        functions.createPagination();
                    //}
                    $("form")[0].reset();
                    $('#formModal').modal('toggle');
                })
        } else {
            ApiService.saveExisting(index.value, player)
                .then(result => {
                    variables.editPlayer(index.value, player)
                    functions.createTable()
                    $("form")[0].reset();
                    $('#formModal').modal('toggle');
                })
        }
    })
    
    $('#player-delete-form').on('submit', (e) => {
        e.preventDefault();
        const { index } = e.target
        ApiService.delete(index.value)
            .then(result => {
                variables.reduceTotalAllPlayers()
                functions.createPagination();
                $("form")[0].reset();
                $('#deleteModal').modal('toggle');
            })
    })
    
    $(".pagination").on('click', 'a', (e) => {
        e.preventDefault()
        const button = $(e.target)
        const action = button.data('action')
        if (action === 'first') {
            variables.setCurrentPage(1)
        } else if (action === 'previous') {
            variables.reduceCurrentPage();
        } else if (action === 'next') {
            variables.addCurrentPage()
        } else if (action === 'last') {
            variables.setCurrentPage(variables.getTotalPages())
        }
        functions.createPagination()
    });
    
    $( "#select-results" ).change(function() {
        variables.setCurrentPage(1)
        variables.setNumberResults($('#select-results').children("option:selected").val())
        functions.loadPagination();
    });

    variables.setNumberResults($('#select-results').children("option:selected").val())
}

events()
functions.loadPagination();