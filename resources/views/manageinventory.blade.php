@extends('master')

@section('main-content')
<div class="container-fluid">

    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header">
                    Add To Inventory
                </div>
                <div class="card-body">
                    <div class="row">
                        <form class="form-inline">
                            <div class="form-group">
                                <label>Filter by name </label>
                                <input type="text" name="medicineterm" />
                            </div>
                            <button class="btn ml-1 btn-primary">Filter</button>
                        </form>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col">
            <div class="card">
                <div class="card-header">
                    Manage Medicine
                </div>
                <div class="card-body">
                    <div class="row">
                        <form class="form-inline">
                            <div class="form-group">
                                <label>Filter by name </label>
                                <input type="text" name="medicineterm" />
                            </div>
                            <button class="btn ml-1 btn-primary">Filter</button>
                        </form>
                    </div>
                    <hr />
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card">
                <div class="card-header">
                    Manage Medical Supplies
                </div>
                <div class="card-body">
                    <div class="row">
                        <form class="form-inline">
                            <div class="form-group">
                                <label>Filter by name </label>
                                <input type="text" name="medicineterm" />
                            </div>
                            <button class="btn ml-1 btn-primary">Filter</button>
                        </form>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    </div>

</div>


</div>

</div>
@endsection