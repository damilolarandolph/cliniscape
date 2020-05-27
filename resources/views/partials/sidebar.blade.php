<div class="row p-2 bg-primary" style="height: 5rem;">
    <a class="row align-content-center" href="/">

        <div class="col">
            <img class="img-fluid" style="max-width: 70%" src="{{asset('images/logo.svg')}}">
        </div>
        <div class="col  ">
            <span style="font-size: 1.5rem;"
                class="text-capitalize font-weight-bold text-white align-middle">CliniScape</span>
        </div>

    </a>
</div>

<div class="row bg-primary" style="min-height: 4rem;">
    <div style="font-family: 'Hammersmith';" class="col align-self-center text-center text-white">
        <h4>
            @if($isDoctor && !$isFinance && !$isPharma)
            Doctor Portal
            @elseif($isPatient)
            Patient Portal
            @elseif($isPharma)
            Pharamacist Portal
            @elseif($isFinance)
            Finance Portal
            @endif
        </h4>
    </div>
</div>

@if(!$isAdmin)
<div class="row lead" style="min-height: 3rem;font-family: 'Hammersmith';background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), 
    @if($isDoctor && !$isPharma && !$isFinance)
    url({{asset('/images/smiling_doctor.jpg')}})
    @elseif($isPatient)
    url({{asset('/images/smiling_patient.jpg')}})
    @else
    url({{asset('/images/smiling_pharma.jpg')}})
    @endif
    ; background-size: cover;">
    <div class="col text-center p-3 text-white">
        <h4>
            {{$user->fullName()}}
        </h4>
        <hr class="text-white" />
        <h6 class="">
            {{$user->email}}
        </h6>
    </div>
</div>
@endif

@if(!$isDoctor && !$isPharma)
<div class="row sidebar-link {{Request::path() == 'makeappointment' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'makeappointment' ? 'text-light' : ''}}" href="/makeappointment">
        <i class="fas fa-calendar-plus p-2"></i>Schedule
        Appointment
    </a>
</div>
@endif

@if(!$isPharma && !$isAdmin)
<div class="row sidebar-link {{Request::path() == 'patientschedule' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'patientschedule' ? 'text-light' : ''}}" href="/patientschedule">
        <i class="fas fa-calendar-alt p-2"></i>View Calendar</a>
</div>



<div class="row sidebar-link {{Request::path() == 'pastappointments' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'pastappointments' ? 'text-light' : ''}}" href="/pastappointments">
        <i class="fas fa-calendar-check p-2"></i>Manage
        Appointments
    </a>
</div>
@endif


@if($isAdmin)
<div class="row sidebar-link {{Request::path() == 'managedoctors' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'managedoctors' ? 'text-light' : ''}}" href="/managedoctors">
        <i class="fas fa-user-md p-2"></i>Manage Doctors</a>
</div>
@endif

@if(($isDoctor && !$isAdmin) && !$isPharma)
<div class="row sidebar-link {{Request::path() == 'addlabresult' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'addlabresult' ? 'text-light' : ''}}" href="/addlabresult">
        <i class="fas fa-plus p-2"></i> Add Lab Result
    </a>
</div>

@endif

@if(($isDoctor || $isPatient) && !$isPharma)
<div class="row sidebar-link {{Request::path() == 'viewresults' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'viewresults' ? 'text-light' : ''}}" href="/viewresults">
        <i class="fas fa-vials p-2"></i> View Results
    </a>
</div>
@endif

@if($isDoctor || $isPatient)

<div class="row sidebar-link {{Request::path() == 'perscriptions' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'viewresults' ? 'perscriptions' : ''}}" href="/perscriptions">
        <i class="fas fa-file-medical p-2"></i> View Perscriptions
    </a>
</div>
@endif

@if($isPharma)
<div class="row sidebar-link {{Request::path() == 'manageinventory' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'manageinventory' ? 'text-light' : ''}}" href="/manageinventory">
        <i class="fas fa-prescription-bottle-alt p-2"></i> Manage Inventory
    </a>
</div>
@endif

@if(!$isPharma && !$isAdmin)
<div class="row sidebar-link {{Request::path() == 'manageinvoices' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'manageinvoices' ? 'text-light' : ''}}" href="/manageinvoices">
        <i class="fas fa-file-invoice p-2"></i> Manage Invoices
    </a>
</div>
@endif

@if(!$isDoctor)
<div class="row sidebar-link {{Request::path() == 'manageprofile' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'manageprofile' ? 'text-light' : ''}}" href="/manageprofile">
        <i class="fas fa-user p-2"></i> Manage Profile
    </a>
</div>
@endif

@if(!$isAdmin)
<div class="row sidebar-link {{Request::path() == 'chat' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'chat' ? 'text-light' : ''}}" href="/chat">
        <i class="fas fa-comments p-2"></i> Chat
    </a>
</div>
@endif