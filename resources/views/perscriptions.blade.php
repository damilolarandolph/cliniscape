@extends('master')

@section('routename')
Manage Prescriptions
@endsection

@section('main-content')

<div class="container-fluid">
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header bg-primary text-white font-weight-bold">
                    Perscriptions
                </div>

                @foreach ($appointments as $appointment)
                @if(count($appointment->prescriptions) != 0)
                <div class="card-body">
                    <div class="accordion" id="accordionExample">

                        <div class="card">
                            <div class="card-header" id="headingOne">
                                <h2 class="mb-0">
                                    <button class="btn btn-link w-100" type="button" data-toggle="collapse"
                                        data-target="#collapse{{$loop->iteration}}" aria-expanded="true"
                                        aria-controls="collapseOne">
                                        <div class="row">
                                            <div class="col">
                                                Perscriptions for appointment with {{$appointment->doctor->fullName()}}
                                                for {{$appointment->patient->fullName()}}
                                            </div>
                                            <div class="col">
                                                Other Details
                                            </div>
                                        </div>
                                    </button>
                                </h2>
                            </div>

                            <div id="collapse{{$loop->iteration}}" class="collapse show" aria-labelledby="headingOne"
                                data-parent="#accordionExample">
                                <form action="dispenseprescriptions" method="POST">
                                    <input type="hidden" name="appointment" value="{{$appointment->id}}" />
                                    <div class="card-body">

                                        <ul class="list-group">
                                            @foreach($appointment->prescriptions as $prescription)
                                            <li class="list-group-item">
                                                <div class="container-fluid">
                                                    <div class="row p-3">
                                                        <div class="col">
                                                            {{$prescription->medicine_name}}
                                                        </div>
                                                        <div class="col">
                                                            {{$prescription->dosage}}
                                                        </div>
                                                        <div class="col">
                                                            x{{$prescription->quantity}}
                                                        </div>

                                                        <div class="col">
                                                            @if($prescription->collected)
                                                            <span class="badge badge-success align-self-end">
                                                                Dispensed
                                                            </span>
                                                            @else
                                                            <span class="badge badge-info align-self-end">
                                                                Not Dispensed
                                                            </span>
                                                            @endif
                                                        </div>

                                                        @if($isPharma)
                                                        @if(!$prescription->collected)
                                                        @if($prescription->isAvailable())
                                                        <div class="col">
                                                            <div class="form-row align-items-center">
                                                                <div class="col-auto my-1">
                                                                    <div class="custom-control custom-checkbox mr-sm-2">
                                                                        <input type="checkbox"
                                                                            class="custom-control-input"
                                                                            name="dispense{{$prescription->id}}"
                                                                            value="true"
                                                                            id="customControlAutosizing{{$loop->iteration}}">
                                                                        <label class="custom-control-label"
                                                                            for="customControlAutosizing{{$loop->iteration}}">Dispense</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        @else
                                                        <span class="badge badge-danger align-self-end">
                                                            Not In Stock
                                                        </span>

                                                        @endif
                                                        @endif
                                                        @endif

                                                    </div>
                                                    <div class="row p-3">
                                                        <div class="col">
                                                            <div class="card">
                                                                <div class="card-header">
                                                                    Instructions
                                                                </div>
                                                                <div class="card-body">
                                                                    {{$prescription->instructions}}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            @endforeach
                                        </ul>
                                        @if($isPharma)
                                        <div class="row align-middle p-1 mb-3 mx-auto">
                                            <div class="col mx-auto">
                                                <button class="btn btn-primary w-75" type="submit">
                                                    Dispense Selected
                                                </button>
                                            </div>
                                        </div>
                                        @endif
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                @endif
                @endforeach
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
                            <input suggestions="patientsuggestions" id="patient" class="form-control"
                                value="{{old('for')}}" name="for" placeholder="Show results for patient" />
                            <ul id="patientsuggestions" class="list-group mt-1">

                            </ul>
                        </div>
                        <div class="form-group">
                            <label>Show results by doctor </label>
                            <input value="{{old('by')}}" id="doctor" suggestions="doctorsuggestions"
                                class="form-control" name="by" placeholder="Show results by doctor" />
                            <ul id="doctorsuggestions" class="list-group mt-1">

                            </ul>
                        </div>
                        <div class="form-row">

                        </div>
                        <button class="btn btn-primary" type="submit">Filter</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection