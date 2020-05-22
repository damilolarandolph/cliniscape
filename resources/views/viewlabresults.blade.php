@extends('master')

@section('main-content')


<div class="col">

    <div class="card">
        <div class="card-header bg-primary text-white font-weight-bold">
            Hello
        </div>
    </div>

</div>

<div class="col-md-4">

    <div class="card">
        <div class="card-header bg-primary text-white font-weight-bold">
            Filter Results
        </div>
        <div class="card-body">
            <form>

                <div class="form-group">
                    <label>Search Term</label>
                    <input class="form-control" name="searchterm" placeholder="Please enter a search term" />
                </div>
            </form>
        </div>
    </div>

</div>


@endsection