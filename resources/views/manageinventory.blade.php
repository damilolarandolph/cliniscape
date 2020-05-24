@extends('master')
@section('css')
<link href="{{asset('css/autocomplete-lhc.min.css')}}" rel="stylesheet">
@endsection

@section('routename')
Manage Inventory
@endsection

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
                        <div class="col text-center font-weight-bold">
                            <span>Add Medical Supply</span>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col text-center">
                            <form method="POST" action="/addmedicalsupply" class="form-inline">
                                <div class="form-row mx-auto">
                                    <input required name="supply" type="text" placeholder="Medical Supply Name"
                                        class="form-control mr-2" />
                                    <input required name="quantity" min="0" type="number" placeholder="Initial Stock"
                                        class="mr-2 form-control" />
                                    <input required min=0 type="number" placeholder="Price" class="mr-2 form-control"
                                        name="price" />
                                    <button class="btn btn-primary" type="submit">Add To Inventory</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col text-center font-weight-bold">
                            <span>Add Non-Prescribable Medicines (Vaccines, Injectables)</span>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col text-center">
                            <form action="/addmedicalsupply" method="POST" class="form-inline">
                                <div class="form-row mx-auto">
                                    <input required id="supply" name="supply" type="hidden"
                                        placeholder="Medical Supply Name" class="form-control mr-2" />
                                    <input required id="supply-name" type="text" placeholder="Medical Supply Name"
                                        class="form-control mr-2" />
                                    <input required id="supply-details" type="text" placeholder="Medical Supply Details"
                                        class="form-control mr-2" />
                                    <input required name="quantity" min="0" type="number" placeholder="Initial Stock"
                                        class="mr-2 form-control" />
                                    <input required min=0 type="number" placeholder="Price" class="mr-2 form-control"
                                        name="price" />
                                    <button onclick="nonPrescribableDrugSubmit(event)" class="btn btn-primary"
                                        type="submit">Add To Inventory</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col text-center font-weight-bold">
                            <span>Add Prescribable Medicine</span>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col text-center">
                            <form action="/addmedicine" method="POST" class="form-inline">
                                <div class="form-row mx-auto">
                                    <input required id="rxterms" type="text" placeholder="Medicine Name"
                                        class="form-control mr-2" />
                                    <input type="hidden" name="drug" id="drug" />
                                    <input required id="drug_strengths" type="text" placeholder="Dosage"
                                        class="form-control mr-2" name="dosage" />
                                    <input required min=0 type="number" placeholder="Initial Stock"
                                        class="mr-2 form-control" name="quantity" />
                                    <input required min=0 type="number" placeholder="Price" class="mr-2 form-control"
                                        name="price" />
                                    <button onclick="addDrugToRequest(event)" class="btn btn-primary" type="submit">Add
                                        To Inventory</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <hr />

                </div>
            </div>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col" style="max-height: 100vh; overflow-y: scroll;">
            <div class="card">
                <div class="card-header">
                    Manage Medicine
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col text-center ">
                            <form class="form-inline ">
                                <div class="form-row mx-auto">
                                    <input value="{{old('medicineterm')}}" class="form-control mr-1"
                                        placeholder="Enter search here" type="text" name="medicineterm" />
                                    <button class="btn btn-primary">Filter</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <hr />
                    @foreach($medicines as $medicine)
                    <div class="row">

                        <div class="col">
                            <div class="card mb-2 bg-info text-white">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col text-center">
                                            {{$medicine->name}}
                                        </div>
                                        <div class="col text-center">
                                            {{$medicine->dosage}}
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <ul class="list-group bg-info text-white">
                                        <li class="list-group-item bg-info text-white"">
                                            <i>Quantity - </i> <b>{{$medicine->quantity}}</b>
                                        </li>
                                        <li class=" list-group-item bg-info text-white"">
                                            <i>Price - </i> <b>{{$medicine->unit_price}}</b>
                                        </li>
                                    </ul>

                                    <hr />
                                    <form action="/editmedicine" method="POST" class="form-inline">
                                        <div class="form-row mx-auto">
                                            <input type="hidden" name="drug-id" value="{{$medicine->id}}" />
                                            <input name="price" min="0" type="number" class="form-control mr-1"
                                                placeholder="Change Price" />
                                            <input name="quantity" min="0" type="number" class="form-control mr-1"
                                                placeholder="Add To Quantity" />
                                            <button type="submit" class="btn btn-primary">Sumbit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                    @endforeach
                </div>
            </div>
        </div>

        <div class="col" style="max-height: 100vh; overflow-y: scroll;">
            <div class="card">
                <div class="card-header">
                    Manage Medical Supplies
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <form class="form-inline">
                                <div class="form-row mx-auto">
                                    <input value="{{old('supplyterm')}}" placeholder="Enter Search Here"
                                        class="form-control mr-1" type="text" name="supplyterm" />
                                    <button class="btn btn-primary">Filter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <hr />
                    @foreach($supplies as $supply)
                    <div class="row">
                        <div class="col">
                            <div class="card mb-2 bg-info text-white">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col text-center">
                                            {{$supply->name}}
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <ul class="list-group bg-info text-white">
                                        <li class="list-group-item bg-info text-white"">
                                        <i>Quantity - </i> <b> {{$supply->quantity}} </b>
                                    </li>
                                    <li class=" list-group-item bg-info text-white"">
                                            <i>Price - </i> <b> {{$supply->unit_price}} </b>
                                        </li>
                                    </ul>

                                    <hr />
                                    <form method="POST" action="/editsupply" class="form-inline">
                                        <div class="form-row mx-auto">
                                            <input type="hidden" name="supply-id" value="{{$supply->id}}" />
                                            <input name="price" type="number" class="form-control mr-1"
                                                placeholder="Change Price" />
                                            <input name="quantity" type="number" class="form-control mr-1"
                                                placeholder="Add To Quantity" />
                                            <button type="submit" class="btn btn-primary">Sumbit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>

</div>


</div>

</div>
@endsection

@section('js')
<script src="{{asset('js/jquery.min.js')}}"></script>
<script src="{{asset('js/autocomplete-lhc.min.js')}}"></script>

<script>
    new Def.Autocompleter.Prefetch('drug_strengths', []);
new Def.Autocompleter.Search('rxterms',
 'https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS');
Def.Autocompleter.Event.observeListSelections('rxterms', function() {
  var drugField = $('#rxterms')[0];
  var autocomp = drugField.autocomp;
  var strengths =
    autocomp.getSelectedItemData()[0].data['STRENGTHS_AND_FORMS'];
  if (strengths)
    $('#drug_strengths')[0].autocomp.setListAndField(strengths, '');
})

new Def.Autocompleter.Prefetch('supply-details', []);
new Def.Autocompleter.Search('supply-name',
 'https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS');
Def.Autocompleter.Event.observeListSelections('supply-name', function() {
  var drugField = $('#supply-name')[0];
  var autocomp = drugField.autocomp;
  var strengths =
    autocomp.getSelectedItemData()[0].data['STRENGTHS_AND_FORMS'];
  if (strengths)
    $('#supply-details')[0].autocomp.setListAndField(strengths, '');
})
</script>

<script>
    function nonPrescribableDrugSubmit(event){
        let supplyName = document.querySelector('#supply-name').value;
        let supplyDosage = document.querySelector('#supply-details').value;
        document.querySelector("#supply").value = `${supplyName} (${supplyDosage})`;
    }

    function addDrugToRequest(event){
        document.querySelector('#drug').value = document.querySelector('#rxterms').value;
    }
</script>
@endsection