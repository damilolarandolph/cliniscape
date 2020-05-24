<div class="row p-2 bg-primary" style="height: 5rem;">
    <div class="row align-content-center">
        <div class="col">
            <img class="img-fluid" style="max-width: 70%" src="{{asset('images/logo.svg')}}">
        </div>
        <div class="col  ">
            <span style="font-size: 1.5rem;"
                class="text-capitalize font-weight-bold text-white align-middle">CliniScape</span>
        </div>
    </div>
</div>

@if(!$isDoctor && !$isPharma)
<div class="row sidebar-link {{Request::path() == 'makeappointment' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'makeappointment' ? 'text-light' : ''}}" href="/makeappointment">Schedule
        Appointment
    </a>
</div>
@endif

@if(!$isPharma && !$isAdmin)
<div class="row sidebar-link {{Request::path() == 'patientschedule' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'patientschedule' ? 'text-light' : ''}}" href="/patientschedule">View Calendar</a>
</div>



<div class="row sidebar-link {{Request::path() == 'pastappointments' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'pastappointments' ? 'text-light' : ''}}" href="/pastappointments">Appointment
        History
    </a>
</div>
@endif


@if($isAdmin)
<div class="row sidebar-link {{Request::path() == 'managedoctors' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'managedoctors' ? 'text-light' : ''}}" href="/managedoctors">Manage Doctors</a>
</div>
@endif

@if(($isDoctor && !$isAdmin) && !$isPharma)
<div class="row sidebar-link {{Request::path() == 'addlabresult' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'addlabresult' ? 'text-light' : ''}}" href="/addlabresult">
        Add Lab Result
    </a>
</div>

@endif

@if(($isDoctor || $isPatient) && !$isPharma)
<div class="row sidebar-link {{Request::path() == 'viewresults' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'viewresults' ? 'text-light' : ''}}" href="/viewresults">
        View Results
    </a>
</div>
@endif

@if($isDoctor || $isPatient)

<div class="row sidebar-link {{Request::path() == 'perscriptions' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'viewresults' ? 'perscriptions' : ''}}" href="/perscriptions">
        View Perscriptions
    </a>
</div>
@endif

@if($isPharma)
<div class="row sidebar-link {{Request::path() == 'manageinventory' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'manageinventory' ? 'text-light' : ''}}" href="/manageinventory">
        Manage Inventory
    </a>
</div>
@endif