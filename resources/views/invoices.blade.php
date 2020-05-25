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
        <div class="col">
            <form class="form-inline">
                <div class="form-row">
                    <input class="form-control" type="text" name="filterid" placeholder="Search For Invoice By Id" />
                    <button class="ml-3 btn btn-primary">
                        Search
                    </button>
                </div>
            </form>
        </div>
        <div class="col">
            <form class="form-inline">
                <div class="form-row">
                    <input class="form-control" type="email" name="filterid"
                        placeholder="Search For Invoice By Patient Email" />
                    <button class="ml-3 btn btn-primary">
                        Search
                    </button>
                </div>
            </form>
        </div>
        <div class="col">
            <form class="form-inline">
                <div class="form-row">
                    <input class="form-control" type="date" name="filterid"
                        placeholder="Search For Results From Date" />
                    <button class="ml-3 btn btn-primary">
                        Search
                    </button>
                </div>
            </form>
        </div>
    </div>
    <hr />
    <div class="row">
        <div class="col">
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header w-100" id="headingOne">
                        <h2 class="mb-0">
                            <button class="btn btn-link w-100" type="button" data-toggle="collapse"
                                data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <div class="row">
                                    <div class="col">
                                        Invoice #89348
                                    </div>
                                    <div class="col align-self-end">
                                        Date
                                    </div>
                                    <div class="col align-self-end">
                                        Partially Paid
                                    </div>
                                </div>
                            </button>
                        </h2>
                    </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            <div class="row">
                                <div class="col justify-content-center d-flex flex-column">
                                    <div class="mx-auto">
                                        <h5>Company Logo</h5>
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
                                        <div>Invoice #834984</div>
                                        <div>Date Invoice Date</div>
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
                                                Name: Damilola Randolph
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
                                                Email: damilolarandolph@gmail.com
                                            </span>
                                        </div>
                                        <div class="p-2">
                                            <span class="font-weight-bold">
                                                Consultant: Dr. Whoever
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div class="row">
                                <div class="col d-flex flex-column">
                                    <table class="table">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Unit Price</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Paid</th>
                                                <th scope="col">Pay</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Consultation</td>
                                                <td>1</td>
                                                <td>200</td>
                                                <td>200</td>
                                                <td class="text-danger">NO</td>
                                                <td>
                                                    <form class="form-inline">
                                                        <button type="submit">Accept Payment</button>
                                                    </form>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> @endsection