@extends('master')

@section('title')
Manage User Profile
@endsection

@section('routename')
Manage User Profile
@endsection

@section('main-content')
<div class="container-fluid">
    <div class="row">
        <div class="col d-flex flex-row">
            <div class="pr-5">
                <img src="{{asset($user->userDetails->basic_details['avatar'])}}" />
            </div>
            <div class="d-flex flex-column">

                <h4 class="text-secondary display-4 text-capitalize">
                    {{$user->fullName()}}
                </h4>
                <h4 class="text-secondary mt-5  text-capitalize">
                    Contact Information
                </h4>
                <div class="d-flex flex-row p-2">
                    <div>
                        Address Line 1:
                    </div>
                    <div class="ml-auto">
                        {{$user->userDetails->extended_details['address']}}
                    </div>
                </div>
                <div class="d-flex flex-row p-2">
                    <div>
                        Address Line 2:
                    </div>
                    <div class="ml-auto">
                        {{$user->userDetails->extended_details['address2'] ?? "N/A"}}
                    </div>
                </div>
                <div class="d-flex w-100 flex-row p-2">
                    <div class="w-100">
                        Email:
                    </div>
                    <div class="ml-auto w-100">
                        {{$user->email}}
                    </div>
                </div>
                <div class="d-flex w-100 flex-row p-2">
                    <div class="w-100">
                        Phone:
                    </div>
                    <div class="ml-auto w-100">
                        {{$user->userDetails->extended_details['phonenumber'] ?? "N/A"}}
                    </div>
                </div>
                <div class="d-flex w-100 flex-row p-2">
                    <div class="w-100">
                        City:
                    </div>
                    <div class="ml-auto w-100">
                        {{$user->userDetails->extended_details['city'] ?? "N/A"}}
                    </div>
                </div>
                <div class="d-flex w-100 flex-row p-2">
                    <div class="w-100">
                        Region:
                    </div>
                    <div class="ml-auto w-100">
                        {{$user->userDetails->extended_details['region'] ?? "N/A"}}
                    </div>
                </div>
                <h4 class="text-secondary mt-5  text-capitalize">
                    Personal Information
                </h4>
                <div class="d-flex w-100 flex-row p-2">
                    <div class="w-100">
                        Date of Birth:
                    </div>
                    <div class="ml-auto w-100">
                        {{$user->userDetails->basic_details['dob'] ?? "N/A"}}
                    </div>
                </div>
                <div class="d-flex w-100 flex-row p-2">
                    <div class="w-100">
                        Gender:
                    </div>
                    <div class="ml-auto w-100">
                        {{$user->userDetails->basic_details['gender'] ?? "N/A"}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
@endsection