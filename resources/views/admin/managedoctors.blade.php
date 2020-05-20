@extends('master')

@section('title')
Manage Doctors
@endsection

@section('routename')
Manage Doctors
@endsection


@section('main-content')
<div class="col-md-6">
<div class="card">
    <h5 class="card-header">Add A Doctor</h5>
    <div class="card-body">
      <h5 class="card-title">Enter</h5>
      <form method="POST">
        @csrf
        <div class="form-row align-items-center">
            <div class="col">
                <div class="form-group">
                    <label for="exampleInputEmail1">First Name</label>
                    <input type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="firstname">
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="exampleInputEmail1">Last Name</label>
                    <input type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="lastname">
                </div>
            </div>
        </div>
        <div class="form-row align-items-center">
            <div class="col">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email">
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="exampleInputEmail1">Phone Number</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="phoneHelp" name="phonenumber">
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" name="password">
        </div>

        <div class="form-row align-items-center">
            <div class="form-group col-md-4">
                <label for="dob">Date Of Birth</label>
                <input type="date" class="form-control" id="dob" name="dob">
            </div>
            <div class="form-group col-md-4">
                <label for="inputGender">Gender</label>
                <select id="inputGender" class="form-control" name="gender">
                    <option selected>Choose...</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
            <div class="form-group col-md-4">
                <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Type Of Doctor</label>
                <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" name="doctortype">
                    <option selected>Choose Type Of Doctor</option>
                    @foreach ($doctorTypes as $doctorType)
                    <option value="{{$loop->iteration}}">{{$doctorType->title}}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
     </form>
    </div>
  </div>
</div>

@endsection