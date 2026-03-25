export const menuScript = `
<script>
    const table = document.querySelector("#menuTable");
    let currentPage = 1;
    const limit = 5;
    function loadMenu(page = 1) {
        fetch("/menu-list?page=" + page + "&limit=" + limit)
        .then(res => res.json())
        .then(res => {
            const table = document.querySelector("#menuTable");
            table.innerHTML = ""; // clear table

            res.data.forEach((item, index) => {
                const tr = document.createElement("tr");

                tr.innerHTML = \`
                    <td>\${(page-1)*limit + index + 1}</td>
                    <td>\${item.name}</td>
                    <td>
                        <span class="\${item.status == 1 ? "badge bg-success" : "badge bg-secondary"}">\${item.status == 1 ? "Enabled" : "Disabled"}</span>
                    </td>
                    <td>
                        <a class="btn btn-sm btn-edit btn-outline-primary" data-id="\${item.id}" data-bs-toggle="modal" data-bs-target="#editMenu">Edit</a>
                        <a class="btn btn-sm btn-del btn-outline-danger" data-id="\${item.id}" data-bs-toggle="modal" data-bs-target="#deleteMenu">Delete</a>
                    </td>
                \`;

                table.appendChild(tr);
            });
            // render pagination buttons
            renderPagination(res.page, res.totalPages);
        });
    }

    function renderPagination(current, totalPages) {
        const container = document.querySelector("#pagination");
        container.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            if(totalPages > 1){
                const btn = document.createElement("button");
                btn.className = "btn btn-sm mx-1 " + (i === current ? "btn-primary" : "btn-outline-primary");
                btn.textContent = i;
                btn.addEventListener("click", () => loadMenu(i));
                container.appendChild(btn);            
            }
        }
    }

    // initial load
    loadMenu(currentPage);
</script>
<script>
    $(function(){
        $('#menuTable').on('click', '.btn-edit', function(){
            const id = $(this).data('id');
            $.ajax({
                url: \`/menu/find/\${id}\`,
                method: 'GET',
                success: function(data) {
                    console.log(data);
                    $('#editMenu .modal-body #editForm #name').val(data.name);
                    $('#editMenu .modal-body #editForm [name="status"][value="' + data.status + '"]').prop('checked', true);
                    $('#editMenu .modal-body #editForm').attr('action', \`/menu/update/\${id}\`);
                },
                error: function(err) {
                    console.error(err);
                }
            });            
        });

        $('#menuTable').on('click', '.btn-del', function(e){
            const id = $(this).data('id');
            e.preventDefault();            
            $('#deleteMenu .modal-body #deleteForm').attr('action', \`/menu/delete/\${id}\`);           
        });
    });
</script>
`