@extends('master')

@section('css')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
@endsection

@section('main-content')





<div id="accordion" class="w-100">
    @foreach($user->appointments as $appointment)
    @php
    if ($isDoctor){
    $related = $appointment->patient;
    }else{
    $related = $appointment->doctor;
    }


    @endphp
    <div class="card w-100">

        <div class="card-header" id="heading{{$loop->iteration}}">
            <h5 class="mb-0">
                <button class="btn btn-link w-100" data-toggle="collapse" data-target="#collapse{{$loop->iteration}}" aria-expanded="true" aria-controls="collapse{{$loop->iteration}}">
                    <div class="row">
                        <div class="col">
                            <span>
                                Appointment with {{$isDoctor ? 'patient ' : 'Dr '}}
                                {{$related->userDetails->basic_details['firstname']}}
                                {{$related->userDetails->basic_details['lastname']}}

                            </span>
                        </div>
                        <div class="col">

                            <span class="badge badge-primary {{($appointment->status == 3) ? 'badge-info' : ''}} {{($appointment->status == 1) ? 'badge-success' : ''}}">
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


        <div id="collapse{{$loop->iteration}}" class="collapse show" aria-labelledby="heading{{$loop->iteration}}" data-parent="#accordion">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <div class="list-group" id="list-tab" role="tablist">
                            <a class="list-group-item list-group-item-action active " id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">{{$isDoctor ? 'Patient Info' : 'Doctor Info'}}</a>
                            <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Service Rendered</a>
                            <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Time</a>
                            <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-setting" role="tab" aria-controls="settings">Notes</a>
                            <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#schedule" role="tab" aria-controls="settings">Schedule Appointment</a>
                            <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#finish" role="tab" aria-controls="settings">Finish</a>

                        </div>
                    </div>
                    <div class="col">
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            {{$related->userDetails->basic_details['firstname']}}
                                            {{$related->userDetails->basic_details['lastname']}}
                                        </h5>
                                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    </div>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Service Rendered: {{$appointment->appointment_details['appointmentfor']}}</h5>
                                        <p class="card-text">Cost: 100$</p>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Appointment Date</h5>
                                        @if(isset($appointment->appointment_details['time']))
                                        <p class="card-text">{{$appointment->appointment_details['time']}}</p>
                                        @else
                                        Meeting hasn't been scheduled
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="list-setting" role="tabpanel" aria-labelledby="list-settings-list">
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

                                <div class="card ">
                                    <div class="card-body">
                                        <h5 class="card-title">Add a note</h5>
                                        <form method="post" action="addnote">
                                            @csrf
                                            <div class="form-group">
                                                <input type="hidden" name="appointment" value="{{$appointment->id}}">
                                                <label for="exampleFormControlTextarea1">Type Note Here</label>
                                                <textarea name="note" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                            </div>
                                            <button class="btn btn-primary">Add Note</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="schedule" role="tabpanel" aria-labelledby="list-settings-list">
                                <div class="card mb-3">
                                    <div class="card-body">

                                        <h5 class="card-title">Schedule a date and time for meeting</h5>

                                        <form method="post" action="addschedule">
                                            @csrf
                                            <div class="form-group">
                                                <div class="input-group mb-3">
                                                    <input type="hidden" name="appointment" value="{{$appointment->id}}">
                                                    <input id="date" type="text" class="form-control" placeholder="Choose Date" name="date" aria-label="Recipient's username" aria-describedby="basic-addon2">

                                                </div>

                                                <div class="input-group mb-3">
                                                    <input type="hidden" name="appointment" value="{{$appointment->id}}">
                                                    <input id="start-time" type="text" class="form-control" placeholder="Choose start time" name="start-time" aria-label="Recipient's username" aria-describedby="basic-addon2">

                                                </div>

                                                <div class="input-group mb-3">
                                                    <input type="hidden" name="appointment" value="{{$appointment->id}}">
                                                    <input id="end-time" type="text" class="form-control" placeholder="Choose end time" name="end-time" aria-label="Recipient's username" aria-describedby="basic-addon2">

                                                </div>
                                                <div class="input-group-append">
                                                    <button class="btn btn-outline-secondary" type="submit">Schedule</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="finish" role="tabpanel" aria-labelledby="list-settings-list">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endforeach
</div>
@endsection

@section('js')
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
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
@endsection