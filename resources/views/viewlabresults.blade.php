@extends('master')
@section('css')
<link href="{{asset('css/spreadsheet.css')}}" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
<style>
    .sug-item:hover {
        cursor: pointer;
    }
</style>
@endsection

@section('main-content')

<div class="container-fluid">
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header bg-primary text-white font-weight-bold">
                    Performed Examinations
                </div>

                @if(count($results) != 0)

                <div class="card-body">
                    <div class="accordion" id="accordionExample">
                        @foreach($results as $result)
                        <div class="card">
                            <div class="card-header" id="headingOne">
                                <h2 class="mb-0">
                                    <button sheet-link="{{asset($result->lab_result_details['sheet'])}}"
                                        class="btn btn-link w-100" type="button" data-toggle="collapse"
                                        data-target="#collapse{{$loop->iteration}}" aria-expanded="true"
                                        aria-controls="collapseOne">
                                        <div class="row" onclick="switchSheet(event)"
                                            sheet-link="{{asset($result->lab_result_details['sheet'])}}">
                                            <div class="col">
                                                {{$result->lab_result_details['title']}}
                                            </div>
                                            <div class="col">
                                                Performed
                                                {{-- @if ($isDoctor)
                                                for {{$result->patient->userDetails->basic_details['firstname']}}
                                                {{$result->patient->userDetails->basic_details['lastname']}}
                                                @else
                                                by {{$result->doctor->userDetails->basic_details['firstname']}}
                                                {{$result->doctor->userDetails->basic_details['lastname']}}
                                                @endif --}}
                                                on {{$result->lab_result_details['date']['day']}}/
                                                {{$result->lab_result_details['date']['month']}}/
                                                {{$result->lab_result_details['date']['year']}}
                                            </div>
                                        </div>
                                    </button>
                                </h2>
                            </div>

                            <div id="collapse{{$loop->iteration}}" class="collapse show" aria-labelledby="headingOne"
                                data-parent="#accordionExample">
                                <div class="card-body">
                                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="home-tab" data-toggle="tab"
                                                href="#home{{$loop->iteration}}" role="tab" aria-controls="home"
                                                aria-selected="true">Description</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="profile-tab" data-toggle="tab"
                                                href="#profile{{$loop->iteration}}" role="tab" aria-controls="profile"
                                                aria-selected="false">Images</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="home{{$loop->iteration}}"
                                            role="tabpanel" aria-labelledby="home-tab">
                                            <div class="card">
                                                <div class="card-body">
                                                    {{$result->lab_result_details['description']}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="profile{{$loop->iteration}}" role="tabpanel"
                                            aria-labelledby="profile-tab">
                                            <div class="container-fluid px-0">
                                                <div class="row">
                                                    @foreach($result->lab_result_details['images'] as $image)
                                                    <div class="col-md-12 p-4">
                                                        <img src="{{asset($image)}}" class="img-fluid"
                                                            alt="Responsive image">
                                                    </div>
                                                    @endforeach
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
                @else
                <div class="card-title">
                    No examinations performed yet
                </div>
                @endif
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
                            <label>Show results for patient </label>
                            <input oninput="renderList(event)" suggestions="patientsuggestions" id="patient"
                                class="form-control" value="{{old('for')}}" name="for"
                                placeholder="Show results for patient" />
                            <ul id="patientsuggestions" class="list-group mt-1">

                            </ul>
                        </div>
                        <div class="form-group">
                            <label>Show results by doctor </label>
                            <input value="{{old('by')}}" oninput="renderList(event)" id="doctor"
                                suggestions="doctorsuggestions" class="form-control" name="by"
                                placeholder="Show results by doctor" />
                            <ul id="doctorsuggestions" class="list-group mt-1">

                            </ul>
                        </div>
                        <div class="form-group">
                            <label>Search Term</label>
                            <input value="{{old('searchterm')}}" class="form-control" name="searchterm"
                                placeholder="Please enter a search term" />
                        </div>
                        <div class="form-row">

                        </div>
                        <button class="btn btn-primary" type="submit">Filter</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col">
            <div class="card">
                <div class="card-header bg-primary text-white font-weight-bolder">
                    Data Sheet For Selected Examination
                </div>
                <div class="card-body">
                    <div class="container-fluid">
                        <div style="height: 50vh" class="row" id="sheet"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('js')
<script src="{{asset('js/spreadsheet.js')}}"></script>
<script>
    let suggestions = {
        patientsuggestions: [    
            @foreach($patients as $patient)
            @if (!$loop->first),@endif"{{$patient}}"
            @endforeach
        ],
        doctorsuggestions: [ @foreach($doctors as $doctor)
            @if (!$loop->first),@endif"{{$doctor}}"
            @endforeach]
    }
    console.log(document.getElementById('patient').attributes.suggestions.nodeValue);
    function clearList(node){
        let listNode = document.getElementById(node.attributes.suggestions.nodeValue);
        listNode.innerHTML = '';
    }

    function setList(event){
        let inputId = event.target.attributes.for.nodeValue;
        let listId = event.target.attributes.suggestions.nodeValue;
        let spaces = new RegExp(' ', 'g');
        let newLine = new RegExp('\n', 'g');
        let value = event.target
        .textContent
        .replace(spaces,'')
        .replace(newLine,'');
        document.getElementById(inputId).value = value;

        document.getElementById(listId).innerHTML = '';
    }
    function renderList(event){
        clearList(event.target);
        if (event.target.value == '')
        return;
        let currQuery = event.target.value;
        let suggestionId = event.target.attributes.suggestions.nodeValue;
        
        
        let items = suggestions[suggestionId]
            .filter((value) => value.includes(currQuery))
            .map((value) => {
                return `<li suggestions="${suggestionId}" for="${event.target.id}" onclick="setList(event)" class="sug-item list-group-item d-flex justify-content-between align-items-center">
                            <span suggestions="${suggestionId}" for="${event.target.id}" onclick="setList(event)" class="align-middle">
                                ${value}
                            </span>
                        </li>`
            })
        document.getElementById(suggestionId).innerHTML = items.join('');

   
     }
var spreadsheet = new dhx.Spreadsheet("sheet", {
    toolbarBlocks: ["file"],
    menu: true,
    rowsCount: 20,
    colsCount: 20,
    readonly: true
    });
function switchSheet(event){
    console.log(event.target);
    let sheetUrl = event.currentTarget.attributes['sheet-link'].nodeValue;

    spreadsheet.load(sheetUrl);
}
</script>
@endsection