@extends('master')

@section('routename')
Manage Appointments
@endsection

@section('css')
<link rel="stylesheet" href="{{asset('css/flatpickr.min.css')}}">
<link href="{{asset('css/autocomplete-lhc.min.css')}}" rel="stylesheet">
<style>
    .sug-item:hover {
        cursor: pointer;
    }
</style>
@endsection

@section('main-content')





<div id="accordion" class="w-100">
    @isset($user->appointments)
    @foreach($user->appointments as $appointment)
    @php
    if ($isDoctor){
    $related = $appointment->patient;
    }else{
    $related = $appointment->doctor;
    }


    @endphp
    <div class="card w-100 mb-2">

        <div class="card-header" id="heading{{$loop->iteration}}">
            <h5 class="mb-0">
                <button class="btn btn-link w-100" data-toggle="collapse" data-target="#collapse{{$loop->iteration}}"
                    aria-expanded="true" aria-controls="collapse{{$loop->iteration}}">
                    <div class="row">
                        <div class="col">
                            <span>
                                Appointment with {{$isDoctor ? 'patient ' : 'Dr '}}
                                {{$related->userDetails->basic_details['firstname']}}
                                {{$related->userDetails->basic_details['lastname']}}

                            </span>
                        </div>
                        <div class="col">

                            <span
                                class="badge badge-primary {{($appointment->status == 3) ? 'badge-info' : ''}} {{($appointment->status == 1) ? 'badge-success' : ''}}">
                                @if($appointment->status == 1)
                                Completed
                                @elseif($appointment->status == 3)
                                Scheduled
                                @else
                                Pending
                                @endif
                            </span>

                        </div>
                    </div>
                </button>
            </h5>
        </div>


        <div id="collapse{{$loop->iteration}}" class="collapse show" aria-labelledby="heading{{$loop->iteration}}"
            data-parent="#accordion">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <div class="list-group" id="list-tab" role="tablist">
                            <a class="list-group-item list-group-item-action active " id="list-home-list"
                                data-toggle="list" href="#list-home{{$loop->iteration}}" role="tab"
                                aria-controls="home">{{$isDoctor ? 'Patient Info' : 'Doctor Info'}}</a>
                            @if($appointment->status != 2)
                            <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list"
                                href="#list-profile{{$loop->iteration}}" role="tab" aria-controls="profile">Services
                                Rendered</a>

                            <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list"
                                href="#list-messages{{$loop->iteration}}" role="tab" aria-controls="messages">Time</a>
                            <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list"
                                href="#list-setting{{$loop->iteration}}" role="tab" aria-controls="settings">Notes</a>
                            @endif
                            @if($isDoctor)
                            <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list"
                                href="#schedule{{$loop->iteration}}" role="tab" aria-controls="settings">Schedule
                                Appointment</a>
                            @endif
                            @if ($appointment->status != 2)
                            <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list"
                                href="#prescriptions{{$loop->iteration}}" role="tab"
                                aria-controls="settings">Prescriptions</a>
                            @if($isDoctor )
                            <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list"
                                href="#supplies{{$loop->iteration}}" role="tab" aria-controls="settings">Add Used
                                Medical Supplies</a>
                            @endif
                            @if (($appointment->status == 3) && $isDoctor)
                            <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list"
                                href="#finish{{$loop->iteration}}" role="tab" aria-controls="settings">Finish</a>
                            @endif

                            @endif

                        </div>
                    </div>
                    <div class="col">
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="list-home{{$loop->iteration}}" role="tabpanel"
                                aria-labelledby="list-home-list">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            {{$related->userDetails->basic_details['firstname']}}
                                            {{$related->userDetails->basic_details['lastname']}}
                                        </h5>
                                    </div>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="list-profile{{$loop->iteration}}" role="tabpanel"
                                aria-labelledby="list-profile-list">
                                <div class="card">
                                    <div class="card-body">

                                        @isset($appointment->appointment_details['services'])
                                        <ul class="list-group">
                                            @foreach($appointment->appointment_details['services'] as $service)
                                            <li
                                                class="list-group-item d-flex justify-content-between align-items-center">

                                                <span>
                                                    {{$appointment->doctor->typeMap->type->services_rendered[(int) $service]['description']}}
                                                </span>
                                            </li>
                                            @endforeach
                                        </ul>
                                        @endisset
                                    </div>
                                </div>
                                @if(($appointment->status != 1) && $isDoctor)
                                <div class="card mt-2">
                                    <div class="card-header">
                                        Add Rendered Services
                                    </div>
                                    <div class="card-body">
                                        <form method="POST" action="addservice">
                                            <input type="hidden" name="appointment" value="{{$appointment->id}}">
                                            @csrf
                                            <ul class="list-group">
                                                @foreach($user->typeMap->type->services_rendered as $service)
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center">
                                                    {{$service['description']}}
                                                    <span class="align-middle">
                                                        <input type="radio" name="service" id="exampleRadios1"
                                                            value="{{$loop->index}}">
                                                    </span>
                                                </li>
                                                @endforeach
                                            </ul>
                                            <button type="submit" class="btn btn-primary mt-2 w-100">Submit</button>
                                        </form>
                                    </div>
                                </div>
                                @endif
                            </div>
                            <div class="tab-pane fade" id="list-messages{{$loop->iteration}}" role="tabpanel"
                                aria-labelledby="list-messages-list">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Appointment Date</h5>
                                        @if(isset($appointment->appointment_details['time']))
                                        <p class="card-text">
                                            {{$appointment->appointment_details['time']}}</p>
                                        @else
                                        Meeting hasn't been scheduled
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="list-setting{{$loop->iteration}}" role="tabpanel"
                                aria-labelledby="list-settings-list">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <h5 class="card-title">Notes</h5>
                                        @if(isset($appointment->appointment_details['notes']))
                                        <ul class="list-group">
                                            @foreach($appointment->appointment_details['notes'] as $note)
                                            <li class="list-group-item">{{$note}}</li>
                                            @endforeach
                                        </ul>
                                        @else
                                        No Notes.
                                        @endif
                                    </div>
                                </div>
                                @if(($appointment->status != 1) && $isDoctor)
                                <div class="card ">
                                    <div class="card-body">
                                        <h5 class="card-title">Add a note</h5>
                                        <form method="post" action="addnote">
                                            @csrf
                                            <div class="form-group">
                                                <input type="hidden" name="appointment" value="{{$appointment->id}}">
                                                <label for="exampleFormControlTextarea1">Type Note Here</label>
                                                <textarea name="note" class="form-control"
                                                    id="exampleFormControlTextarea1" rows="3"></textarea>
                                            </div>
                                            <button class="btn btn-primary">Add Note</button>
                                        </form>
                                    </div>
                                </div>
                                @endif
                            </div>

                            <div class="tab-pane fade" id="schedule{{$loop->iteration}}" role="tabpanel"
                                aria-labelledby="list-settings-list">
                                <div class="card mb-3">
                                    <div class="card-body">

                                        <h5 class="card-title">Schedule a date and time for meeting</h5>

                                        <form method="post" action="addschedule">
                                            @csrf
                                            <div class="form-group">
                                                <div class="input-group mb-3">
                                                    <input type="hidden" name="appointment"
                                                        value="{{$appointment->id}}">
                                                    <input id="date" type="text" class="form-control"
                                                        placeholder="Choose Date" name="date"
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2">

                                                </div>

                                                <div class="input-group mb-3">
                                                    <input type="hidden" name="appointment"
                                                        value="{{$appointment->id}}">
                                                    <input id="start-time" type="text" class="form-control"
                                                        placeholder="Choose start time" name="start-time"
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2">

                                                </div>

                                                <div class="input-group mb-3">
                                                    <input type="hidden" name="appointment"
                                                        value="{{$appointment->id}}">
                                                    <input id="end-time" type="text" class="form-control"
                                                        placeholder="Choose end time" name="end-time"
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2">

                                                </div>
                                                <div class="input-group-append">
                                                    <button class="btn btn-outline-secondary"
                                                        type="submit">Schedule</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="finish{{$loop->iteration}}" role="tabpanel"
                                aria-labelledby="list-settings-list">
                                <div class="card mb-3">
                                    <div class="card-body">

                                        <h5 class="card-title">Finish Appointment</h5>

                                        <form method="post" action="finishappointment">
                                            @csrf
                                            <div class="form-group">
                                                <input type="hidden" name="appointment" value="{{$appointment->id}}">
                                                <button class="btn btn-primary" type="submit">Complete</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="prescriptions{{$loop->iteration}}" role="tabpanel"
                                aria-labelledby="list-settings-list">
                                <div clasgs="card">
                                    <div class="card-header">
                                        Prescribed Drugs (for full details please visit prescriptions tab)
                                    </div>
                                    <div class="card-body">
                                        <ul class="list-group">
                                            @foreach($appointment->prescriptions as $prescription)
                                            <li class="list-group-item">
                                                <div class="row">
                                                    <div class="col">
                                                        {{$prescription->medicine_name}}
                                                    </div>
                                                    <div class="col">
                                                        {{$prescription->dosage}}
                                                    </div>
                                                    <div class="col">
                                                        x{{$prescription->quantity}}
                                                    </div>
                                                </div>
                                            </li>
                                            @endforeach
                                        </ul>
                                    </div>

                                </div>
                                @if(($appointment->status != 1) && $isDoctor)
                                <div class="card mt-3 mb-3">
                                    <div class="card-body">

                                        <h5 class="card-title">Add Prescriptions</h5>


                                        <div class="form-group">
                                            <label>Drug Name</label>
                                            <input class="form-control" type="text" id="rxterms"
                                                placeholder="Drug name">
                                            <label>Dosage</label>
                                            <input class="form-control" type="text" id="drug_strengths"
                                                placeholder="Strength list">
                                            <label>Quantity</label>
                                            <input type="number" class="form-control" id="quantity">
                                            <label>Instructions</label>
                                            <div class="form-group">
                                                <textarea required class="form-control" id="instructions"></textarea>
                                                <button onclick="addPrescription(event)"
                                                    class="form-control mt-2 btn btn-primary">Add
                                                    Prescription</button>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="card-header">Prescription Draft
                                            </div>
                                            <div class="card-body">
                                                <ul class="list-group" id="prescription-draft">

                                                </ul>
                                            </div>
                                        </div>
                                        <form method="post" action="addprescription">
                                            @csrf
                                            <div class="form-group">
                                                <input type="hidden" name="appointment" value="{{$appointment->id}}">
                                                <input id='prescriptions' type="hidden" name="prescriptions" value="">
                                                <button onclick="addPrescriptionsToRequest(event)"
                                                    class="mt-2 w-100 btn btn-primary" type="Prescribe">Prescribe to
                                                    Patient</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                @endif
                            </div>
                            <div class="tab-pane fade" id="supplies{{$loop->iteration}}" role="tabpanel"
                                aria-labelledby="list-settings-list">

                                <div class="card mb-3">
                                    <div class="card-body">
                                        <h5 class="card-title">Add Used Medical Supplies</h5>
                                        <div class="form-group">
                                            <label>Medical Supply Name</label>
                                            <input oninput="renderSuggestions(event)" class="form-control"
                                                suggestions="#supply-suggestions" id="supply-name"
                                                url="/medicalsupplies"
                                                placeholder="Please enter the medical supply's name" />
                                            <ul id="supply-suggestions" class="list-group mt-1">

                                            </ul>
                                            <label>Quantity</label>
                                            <input class="form-control" type="number" id="supply-quantity"
                                                placeholder="Please enter the quantity used" />
                                            <button onclick="addSupplyToDraft(event)"
                                                class="mt-2 btn btn-primary w-100">Add Supply</button>
                                        </div>
                                        <div class="card">
                                            <div class="card-header">Used Supplies Draft
                                            </div>
                                            <div class="card-body">
                                                <ul class="list-group" id="supplies-draft">

                                                </ul>
                                            </div>
                                        </div>
                                        <form method="post" action="addsupplies">
                                            @csrf
                                            <div class="form-group">
                                                <input type="hidden" name="appointment" value="{{$appointment->id}}">
                                                <input type="hidden" name="supplies" id="supplies" />
                                                <button onclick="addSuppliesToRequest(event)"
                                                    onsubmit="addSuppliesToRequest(event)"
                                                    class="btn mt-2 w-100 btn-primary" type="submit">Add
                                                    Supplies</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endforeach
    @endisset
    @if (!isset($user->appointments))
    <p>You have No Appointments</p>
    @endif
</div>
@endsection

@section('js')
<script src="{{asset('js/flatpickr.js')}}"></script>
<script src="{{asset('js/jquery.min.js')}}"></script>
<script src="{{asset('js/autocomplete-lhc.min.js')}}"></script>
<script>
    // Example POST method implementation:
async function getData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
   
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
</script>
<script type="text/javascript">
    let date = Date()
    flatpickr("#date", {
        dateFormat: "Y-m-d"
    });

    let startTime = flatpickr("#start-time", {
        enableTime: true,
        dateFormat: "H:i",
        noCalendar: true,
        minuteIncrement: 30,
        onChange: function(selectedDates, dateStr, instance) {
            let stopTimeMax = flatpickr.parseDate(dateStr, "H:i");
            stopTimeMax.setMinutes(stopTimeMax.getMinutes() + 30);
            const options1 = {
                hour: 'numeric',
                minute: 'numeric'
            };
            const dateTimeFormat2 = new Intl.DateTimeFormat('en-GB', options1);

            endTime.set('minTime', dateTimeFormat2.format(stopTimeMax));
        }
    });

    let endTime = flatpickr("#end-time", {
        enableTime: true,
        dateFormat: "H:i",
        noCalendar: true,
        minuteIncrement: 30,
        onChange: function(selectedDates, dateStr, instance) {
            let startTimeMax = flatpickr.parseDate(dateStr, "H:i");
            startTimeMax.setMinutes(startTimeMax.getMinutes() - 30);
            const options1 = {
                hour: 'numeric',
                minute: 'numeric'
            };
            const dateTimeFormat2 = new Intl.DateTimeFormat('en-GB', options1);
            startTime.set('maxTime', dateTimeFormat2.format(startTimeMax));
        }
    });
</script>

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
</script>

<script>
    let prescriptions = [];
    let querySelector = document.querySelector;
    let drug = '#rxterms';
    let quantity = '#quantity';
    let strength = '#drug_strengths';
    let instructions = '#instructions';
    let prescription_draft = '#prescription-draft';
                                                
    function addPrescriptionToDraft(prescription){
        let pres = `<li class="list-group-item">
                     <div class="row">
                    <div class="col">
                        Drug Name: ${prescription.drug_name}
                   </div>
                    <div class="col">
                        Dosage: ${prescription.strength}
                    </div>
                    <div class="col">
                        Quantity: ${prescription.quantity}
                     </div>
                    </div>
                    </li>`
        document.querySelector(prescription_draft).innerHTML = document.querySelector(prescription_draft).innerHTML + pres;
    }

    function addPrescription(event){
        let prescription = {
            drug_name: document.querySelector(drug).value,
            quantity: document.querySelector(quantity).value,
            strength: document.querySelector(strength).value,
            instructions: document.querySelector(instructions).value
        }

        prescriptions.push(prescription);
        addPrescriptionToDraft(prescription);

        event.preventDefault();
    }

    function addPrescriptionsToRequest(event){
        document.querySelector('#prescriptions').value = JSON.stringify(prescriptions);
        
    }

</script>

<script>
    let supplyInput = '#supply-name';
    
    function clearList(target){
     let elem = document.querySelector(`#${target}`);
     document.querySelector(elem.attributes.suggestions.nodeValue).innerHTML = '';
    }
    
    function setList(event){
        let inputId = event.target.attributes.for.nodeValue;
        let listId = event.target.attributes.suggestions.nodeValue;
      
        let input =  document.getElementById(inputId);
        input.value = event.target.attributes.name.nodeValue;
        input.setAttribute('supply-id', event.target.id);
        document.querySelector(listId).innerHTML = '';
    }
    
    function renderSuggestions(event){
        let currentValue = event.target.value.toLowerCase();
        clearList(event.target.id);
        if (currentValue == ''){
            return;
        }
        let suggestions = null
        let suggestionId = event.target.attributes.suggestions.nodeValue
        let url = event.target.attributes.url.nodeValue;
   
    suggestions =  getData(url, {})
    .then(data => {
     return data;
    });

    let relevant = suggestions.filter((value)=>{
     return   value.name.toLowerCase().includes(currentValue)
    })
    .map((value)=>{
        return `<li name="${value.name}" id="${value.id}" suggestions="${suggestionId}" for="${event.target.id}" onclick="setList(event)" class="sug-item list-group-item d-flex justify-content-between align-items-center">
                            <span id="${value.id}" name="${value.name}" suggestions="${suggestionId}" for="${event.target.id}" onclick="setList(event)" class="align-middle">
                                ${value.name}
                            </span>
                        </li>`
    })

    document.querySelector(suggestionId).innerHTML = relevant.join('');


    }

    let supplies = [];
    let draft = '#supplies-draft';
    let supplyName = '#supply-name';
    let supplyQuantity = '#supply-quantity';

    function addSupply(supply){
        let pres = `<li class="list-group-item">
                     <div class="row">
                    <div class="col">
                        Supply Name: ${supply.name}
                   </div>
                    <div class="col">
                        Quantity: ${supply.quantity}
                     </div>
                    </div>
                    </li>`
        document.querySelector(draft).innerHTML = document.querySelector(draft).innerHTML + pres;
    }

    function addSupplyToDraft(event){
        let supply = {
            'name': document.querySelector(supplyName).value,
            'quantity': document.querySelector(supplyQuantity).value
        }

        addSupply(supply);

        supplies.push({
            'id': document.querySelector(supplyName).getAttribute('supply-id'),
            'quantity': document.querySelector(supplyQuantity).value
        })
    }

    function addSuppliesToRequest(event){
        document.querySelector('#supplies').value = JSON.stringify(supplies);
        alert(document.querySelector('#supplies').value);
    }
</script>
@endsection