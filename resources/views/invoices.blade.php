@extends('master')

@section('routename')
Manage Invoices
@endsection

@section('routename')
Manage Invoices
@endsection

@section('main-content')
<div class="container-fluid">
    <div class="row">
        <div class="col text-center">
            <h3>Filter Results</h3>
        </div>

    </div>
    <hr />
    <div class="row">
        <div class="col w-100 justify-content-between d-flex flex-row">
            <div class="d-flex  flex-column">
                <div class="mb-2">
                    Search for Invoice by Id
                </div>
                <div>
                    <form class="form-inline">
                        <div class="form-row">
                            <input class="form-control" type="text" name="id" placeholder="Search For Invoice By Id"
                                value="{{old('id')}}" />
                            <button class="ml-3 btn btn-primary">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            @if($isFinance || $isDoctor)
            <div class="d-flex flex-column">

                <div class="mb-2">
                    View All Invoices For Patient
                </div>
                <div>
                    <form class="form-inline">
                        <div class="form-row">
                            <input class="form-control" type="email" name="for"
                                placeholder="Search For Invoice By Patient Email" value="{{old('for')}}" />
                            <button class="ml-3 btn btn-primary">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            @endif

            @if($isFinance || $isPatient)
            <div class="d-flex flex-column">
                <div class="mb-2">
                    View All Invoice With A Consultant
                </div>
                <div>
                    <form class="form-inline">
                        <div class="form-row">
                            <input class="form-control" type="email" name="by"
                                placeholder="Search For Invoice By Consultant Email" value="{{old('by')}}" />
                            <button class="ml-3 btn btn-primary">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            @endif

            <div class="d-flex  flex-column">
                <div class="mb-2">
                    View Invoices From Date
                </div>
                <div>
                    <form class="form-inline">
                        <div class="form-row">
                            <input class="form-control" type="date" name="from"
                                placeholder="Search For Results From Date" value="{{old('by')}}" />
                            <button class="ml-3 btn btn-primary">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>


    </div>
    <hr />
    <div class="row">
        <div class="col">
            <div class="accordion" id="accordionExample">
                @foreach($appointments as $appointment)

                <div class="card">
                    <div class="card-header w-100" id="headingOne">
                        <h2 class="mb-0">
                            <button class="btn btn-link w-100" type="button" data-toggle="collapse"
                                data-target="#collapse{{$loop->iteration}}" aria-expanded="true"
                                aria-controls="collapseOne">
                                <div class="row">
                                    <div class="col">
                                        Invoice #{{"{$appointment->id}"}}
                                    </div>
                                    <div class="col align-self-end">
                                        {{$appointment->appointment_details['time']}}
                                    </div>
                                    <div class="col align-self-end">

                                        @if(!$appointment->getInvoiceDetails()['owing'])
                                        Fully Paid
                                        @elseif($appointment->getInvoiceDetails()['paid'])
                                        Partially Paid
                                        @else
                                        No Payment Done
                                        @endif
                                    </div>
                                </div>
                            </button>
                        </h2>
                    </div>

                    <div id="collapse{{$loop->iteration}}" class="collapse show" aria-labelledby="headingOne"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            <div class="row">
                                <div class="col justify-content-center d-flex flex-column">
                                    <div class="mx-auto w-25">
                                        <svg class="bi bi-exclude" width="100%" height="100%" viewBox="0 0 16 16"
                                            fill="#00000" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M1.5 0A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12H4v2.5A1.5 1.5 0 005.5 16h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 4H12V1.5A1.5 1.5 0 0010.5 0h-9zM12 4H5.5A1.5 1.5 0 004 5.5V12h6.5a1.5 1.5 0 001.5-1.5V4z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div class="mx-auto" style="font-family: 'Hammersmith'">
                                        <h2 class="display-2">
                                            Cliniscape
                                        </h2>
                                    </div>
                                    <div class="mx-auto" style="font-family: 'Hammersmith'">
                                        <p>
                                            <i>Address Line</i>
                                        </p>
                                    </div>
                                    <div class="mx-auto" style="font-family: 'Hammersmith'">
                                        <h5>
                                            Medical Invoice
                                        </h5>
                                    </div>
                                    <div class="mx-auto justify-content-around w-100 d-flex flex-row"
                                        style="font-family: 'Hammersmith'">
                                        <div>Invoice #{{"{$appointment->id}"}}</div>
                                        <div>Date {{$appointment->appointment_details['time']}}</div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div class="row">
                                <div class="col d-flex flex-column">
                                    <div class="font-weight-bold">
                                        <h2>Patient</h2>
                                    </div>
                                    <div class="mx-auto w-100 d-flex flex-column">
                                        <div class="p-2">
                                            <span class="font-weight-bold">
                                                Name: {{$appointment->patient->fullName()}}
                                            </span>
                                        </div>
                                        <div class="p-2">
                                            <span class="font-weight-bold">
                                                Address: Flat 4d bashorun okunsanya
                                            </span>
                                        </div>
                                        <div class="p-2">
                                            <span class="font-weight-bold">
                                                Phone: 07056409899
                                            </span>
                                        </div>
                                        <div class="p-2">
                                            <span class="font-weight-bold">
                                                Email: {{$appointment->patient->email}}
                                            </span>
                                        </div>
                                        <div class="p-2">
                                            <span class="font-weight-bold">
                                                Consultant: Dr. {{$appointment->doctor->fullName()}}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div class="row">
                                <div class="col d-flex flex-column">
                                    <table class="table table-striped">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Unit Price</th>

                                                <th scope="col">Paid</th>
                                                @if($isFinance)

                                                <th scope="col">Pay</th>

                                                @endif
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <form action="/payinvoices" method="POST">
                                                @foreach($appointment->invoiceItems as $invoiceItem)
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td>{{$invoiceItem->description}}</td>

                                                    <td>{{$invoiceItem->description < 1 ? 1 : $invoiceItem->description}}
                                                    </td>
                                                    <td clas>{{$invoiceItem->unit_price}}</td>

                                                    @if($invoiceItem->paid)
                                                    <td class="text-success">YES</td>
                                                    @else
                                                    <td class="text-danger">NO</td>
                                                    @endif
                                                    @if($isFinance)

                                                    <td>

                                                        <div class="form-group">
                                                            <input @if($invoiceItem->paid) disabled @endif
                                                            type="checkbox"
                                                            name="pay{{$invoiceItem->id}}" value="true" />
                                                        </div>

                                                    </td>


                                                    @endif
                                                    <td>{{$invoiceItem->total_price}}</td>
                                                </tr>
                                                @endforeach
                                                <tr>
                                                    <th scope="row"></th>

                                                    <td></td>
                                                    <td></td>
                                                    @if($isFinance)

                                                    <td>
                                                    </td>

                                                    @endif

                                                    <td></td>
                                                    <td class="text-danger"></td>
                                                    <td>
                                                        <table class="w-100 mt-0">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        Subtotal
                                                                    </td>
                                                                    <td class="text-left">
                                                                        {{$appointment->getInvoiceDetails()['total']}}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Tax
                                                                    </td>
                                                                    <td class="text-left">
                                                                        N/A
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Total
                                                                    </td>
                                                                    <td class="text-left">
                                                                        {{$appointment->getInvoiceDetails()['total']}}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Amound Paid
                                                                    </td>
                                                                    <td class="text-left">
                                                                        {{$appointment->getInvoiceDetails()['paid']}}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Total Due
                                                                    </td>
                                                                    <td class="text-left">
                                                                        {{$appointment->getInvoiceDetails()['owing']}}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row rounded p-2">
                                <div class="col text-center font-weight-bold bg-secondary text-white p-3">
                                    Thank You for your patronage !
                                </div>
                            </div>
                            @if($isFinance)
                            @if($appointment->getInvoiceDetails()['owing'])
                            <div class="row justify-content-center d-flex flex-row rounded p-2">
                                <div>
                                    <button type="submit" class="btn btn-primary"> Accept Payment For
                                        Selected</button>
                                </div>
                            </div>
                            @endif
                            @endif

                            <input name="appointment" type="hidden" value="{{$appointment->id}}" type="appointment" />
                            </form>
                            @if($isFinance)
                            @if($appointment->getInvoiceDetails()['owing'])
                            <div class="row justify-content-center d-flex flex-row rounded p-2">
                                <div>
                                    <form action="/payinvoices" method="POST">
                                        <input type="hidden" value="true" name="all" />
                                        <input type="hidden" value="{{$appointment->id}}" name="appointment" />
                                        <button type="submit" class="btn btn-primary"> Accept Payment For Entire
                                            Invoice</button>
                                    </form>
                                </div>
                            </div>
                            @endif
                            @endif


                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
    @endsection