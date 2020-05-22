@extends("master")

@section("main-content")

<div class="col-md-9">
    <div class="card">
        <h5 class="card-header">Make An Appointment</h5>
        <div class="card-body">
         
     <form method="POST" class="">
    @csrf
    <h5 class="card-title">Choose a category</h5>
    <div class="col">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            @foreach($doctors as $doctorsOfType)
            <li class="nav-item">
                <a class="nav-link active" id="pills-home-{{$loop->iteration}}" data-toggle="pill" href="#pills-home-{{$loop->iteration}}" role="tab" aria-controls="pills-home" aria-selected="true">
                    {{$doctorsOfType[0]->type->title}}
                </a>
            </li>
            @endforeach
        </ul>

        @foreach($doctors as $doctorsOfType)
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-content-{{$loop->iteration}}" role="tabpanel" aria-labelledby="pills-home-{{$loop->iteration}}">
                <div class="form-group">

                    <h5 class="card-title">Choose an intent</h5>
                    <select class="custom-select mr-sm-2 " id="inlineFormCustomSelect" name=service>
                        @foreach($doctorsOfType[0]->type->services_rendered as $service)
                        <option value="{{$loop->index}}">{{$service}}</option>
                        @endforeach
                    </select>
                </div>
                <h5 class="card-title">Choose a Doctor</h5>
               
                <ul class="list-group">
                    @foreach($doctorsOfType as $doctorTypeMap)
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        {{$doctorTypeMap->doctor->userDetails->basic_details['firstname']}}
                        {{$doctorTypeMap->doctor->userDetails->basic_details['lastname']}}
                      <span class="align-middle">
                          <input  type="radio" name="doctoremail" id="exampleRadios1" value="{{$doctorTypeMap->doctor->email}}">
                        </span>
                    </li>
                    @endforeach
                  </ul>
                
            </div>
        </div>
        @endforeach
    </div>
    <button type="submit" class="btn btn-primary mt-4">Submit</button>
</form>
        </div>
</div>
@endsection