import { header } from "./header.js"
import { footer } from "./footer.js"
import { menuScript } from "./scripts/menu-script.js"
export const menu = `
    ${header}
        <div class="col-md-12 p-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4>Menu List</h4>
                <button class="btn btn-sm btn-outline-success btn-create" data-bs-toggle="modal" data-bs-target="#createMenu">+ Add Menu</button>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th class="w-50">NAME</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody id="menuTable">
                   
                </tbody>                
            </table>
            <div id="pagination" class="mt-3 d-flex justify-content-end"></div>
        </div>

        <!-- Modal Create -->
        <div class="modal fade" id="createMenu" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Menu</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">            
                        <form action="/create-menu" method="POST">                            
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" name="name" id="name" placeholder="Enter name">
                            </div>
                            <div class="mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" value="1" name="status" id="status1" checked>
                                    <label class="form-check-label" for="status1">
                                        Enabled
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" value="0" name="status" id="status0">
                                    <label class="form-check-label" for="status0">
                                        Disabled
                                    </label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Edit -->
        <div class="modal fade" id="editMenu" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Menu</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">            
                        <form action="" method="POST" id="editForm">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" name="name" id="name" placeholder="Enter name">
                            </div>
                            <div class="mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="status" value="1" id="status1">
                                    <label class="form-check-label" for="status1">
                                        Enabled
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="status" value="0" id="status0">
                                    <label class="form-check-label" for="status0">
                                        Disabled
                                    </label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Delete -->
        <div class="modal fade" id="deleteMenu" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete Menu</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">            
                        <form action="" method="POST" id="deleteForm">
                            <div class="mb-3">
                                <h6>Are you sure, do you want to delete this menu?</h6>
                            </div>
                            <div class="text-end">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" class="btn btn-danger">Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Script -->
        <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
        ${menuScript}
    ${footer}
`