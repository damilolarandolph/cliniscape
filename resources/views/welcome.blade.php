@extends('master')

@section('title')
Account Summary
@endsection

@section('routename')
Account Summary
@endsection

@section('main-content')


@if($isDoctor || $isPatient)
@if($isPharma)
@include('partials.pharma-home')
@elseif($isPatient)
@include('partials.patient-home')
@elseif($isFinance)
@include('partials.finance-home')
@elseif($isDoctor)
@include('partials.doctor-home')
@endif
@endif

@endsection