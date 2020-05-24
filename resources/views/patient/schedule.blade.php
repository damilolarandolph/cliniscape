@extends('master')

@section('routename')
Appointment Schedule
@endsection

@section('title')
Appointment Schedule
@endsection

@section('css')
<link href='https://use.fontawesome.com/releases/v5.0.6/css/all.css' rel='stylesheet'>
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@fullcalendar/core@4.4.0/main.min.css" />
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@fullcalendar/daygrid@4.4.0/main.min.css" />
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@fullcalendar/timegrid@4.4.0/main.min.css" />
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@fullcalendar/bootstrap@4.4.0/main.min.css" />



@endsection

@section('routename')
Schedule Appointment
@endsection

@section('main-content')




<div class="col-md-9">
    <div id="calendar"></div>
</div>


@endsection

@section('js')
<script src="https://unpkg.com/@fullcalendar/core@4.4.0/main.min.js"></script>
<script src="https://unpkg.com/@fullcalendar/interaction@4.4.0/main.min.js"></script>
<script src="https://unpkg.com/@fullcalendar/daygrid@4.4.0/main.min.js"></script>
<script src="https://unpkg.com/@fullcalendar/timegrid@4.4.0/main.min.js"></script>
<script src="https://unpkg.com/@fullcalendar/bootstrap@4.4.0/main.min.js"></script>
<script>
    var calendarEl = document.getElementById('calendar');
    let events = [

    @foreach($user->appointments as $appointment)
   
    @php
    if ($isDoctor){
    $related = $appointment->patient;
    }else{
    $related = $appointment->doctor;
    }
    @endphp
      {
            title: 'Appointment with {{$related->fullName()}}',
            start: '{{$appointment->appointment_details["time"] ?? 0}}T{{$appointment->appointment_details["start-time"] ?? 0}}:00Z',
            end: '{{$appointment->appointment_details["time"] ?? 0}}T{{$appointment->appointment_details["end-time"] ?? 0}}:00Z',
        }@if(!$loop->last),@endif
    @endforeach
    ];
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['interaction', 'dayGrid', 'timeGrid', 'bootstrap'],
        defaultView: 'timeGridWeek',
        themeSystem: 'bootstrap',
        defaultDate: Date.now(),
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        
        events: events
    });

    calendar.render();
</script>

@endsection