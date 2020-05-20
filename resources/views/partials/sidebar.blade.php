<div class="row p-2 bg-primary" style="height: 10%;">
    <div class="row">
        <div class="col">
           <img class="img-fluid" style="max-width: 70%"  src="{{asset('images/logo.svg')}}">
        </div>
        <div class="col  "> 
            <span style="font-size: 1.5rem;" class="font-weight-bold text-white align-middle"> Hospital Appoint</span>          
        </div>
    </div>
</div>
<div class="row sidebar-link {{Request::path() == 'managedoctors' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'managedoctors' ? 'text-light' : ''}}" href="/managedoctors">Manage Doctors</a>
</div>

<div class="row sidebar-link {{Request::path() == 'patientschedule' ? 'bg-primary text-light' : ''}}" >
    <a class="{{Request::path() == 'patientschedule' ? 'text-light' : ''}}" href="/patientschedule">View Calendar</a>
</div>

<div class="row sidebar-link {{Request::path() == 'makeappointment' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'makeappointment' ? 'text-light' : ''}}" href="/makeappointment">Schedule Appointment</a>
</div>

<div class="row sidebar-link {{Request::path() == 'pastappointments' ? 'bg-primary text-light' : ''}}">
    <a class="{{Request::path() == 'pastappointments' ? 'text-light' : ''}}" href="/pastappointments">Appointment History</a>
</div>