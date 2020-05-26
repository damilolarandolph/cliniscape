@inject('invoiceItems', 'App\InvoiceItem')

<div class="container-fluid" style="font-family: 'Hammersmith';">

    <div class="row h-50">
        <div class="col-5">
            <div class="card h-100 text-white">
                <div class="card-body"
                    style=" background: background: rgb(0,71,148);
                    background: linear-gradient(0deg, rgba(0,71,148,1) 0%, rgba(10,67,162,1) 12%, rgba(5,96,209,1) 22%, rgba(2,112,236,1) 34%, rgba(0,123,255,1) 100%); ">
                    <div class="row">
                        <div class="col">
                            <h1>

                                Good Day, Dr

                            </h1>

                            <h4 class="">
                                {{$user->fullname()}}.
                            </h4>

                            <h4 class="">
                                {{$user->typeMap->type->title}}
                            </h4>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            Welcome to Cliniscape
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">

            <div class="card h-100">
                <div class="card-body">
                    <div class="row h-50">
                        <div class="col">
                            <div class="row">


                                <div class="col">
                                    Total Payable
                                </div>

                            </div>

                            <div class="row">


                                <div class="col">
                                    <h1 class="text-primary display-3 m-0 p-">
                                        {{$invoiceItems::invoicesPayable()['owing']}}
                                    </h1>
                                    <p class="text-primary">
                                        Total Amount Owed
                                    </p>
                                </div>


                            </div>

                        </div>
                        <div class="col  border-left">
                            <div class="row">


                                <div class="col">
                                    Total Amount Paid
                                </div>

                            </div>

                            <div class="row">
                                <div class="col">

                                    <h1 class="text-primary display-3 m-0 p-">
                                        {{$invoiceItems::invoicesPayable()['paid']}}
                                    </h1>
                                    <p class="text-primary">
                                        Total amount of money paid
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row h-50 border-top">
                        <div class=" p-2 mt-2 col ">
                            <div class="row">
                                <div class="col">
                                    Contact Information
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-1">
                                    <svg class="bi bi-at" width="1em" height="1em" viewBox="0 0 16 16"
                                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                                    </svg>
                                </div>
                                <div class="col">
                                    <p class="text-secondary">
                                        {{$user->email}}
                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-1">
                                    <svg class="bi bi-phone" width="1em" height="1em" viewBox="0 0 16 16"
                                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M11 1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                                        <path fill-rule="evenodd" d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                    </svg>
                                </div>
                                <div class="col">
                                    <p class="text-secondary">
                                        {{$user->userDetails->basic_details['phonenumber'] ?? 'Not Available'}}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="row mt-3 h-50">
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <div class="row">

                        <div class="col">
                            Today's Invoice Items({{count($invoiceItems::todayItems())}})
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-3">

                            <h2 class="display-1 p-0 m-0">
                                {{count($invoiceItems::todayItems())}}
                            </h2>

                        </div>

                        @foreach($invoiceItems::todayItems() as $item)
                        <div class="col  align-self-center">
                            <div class="row bg-primary text-white rounded">
                                <div class="col">
                                    <div class="row">
                                        <div class="col">

                                            Patient

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col ">
                                            <b>

                                                {{$item->appointment->patient->fullName()}}

                                            </b>
                                        </div>
                                    </div>
                                </div>
                                <div class="col align-self-center">
                                    <div class="row">
                                        <div class="col">
                                            {{$item->description}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach

                    </div>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <div class="row mb-4">
                        <div class="col">

                            Top Invoice Items

                        </div>
                    </div>

                    @foreach($invoiceItems::rankItems() as $key=>$value)
                    @if($loop->iteration == 7)
                    @break
                    @endif
                    <div class="row mb-2">
                        <div class="col">
                            <h5>{{"{$loop->iteration}. {$key}"}}</h5>
                        </div>
                    </div>
                    @endforeach

                </div>
            </div>
        </div>
        <div class="col">


            <div class="card h-100">
                <div class="card-body">
                    <div class="row">
                        <div class="col">

                            Total Invoice Items This Month

                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h1 class="display-1">

                                {{$invoiceItems::itemsCount()['month']}}

                            </h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">

                            Total Invoice Items of All Time


                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h1 class="display-1">

                                {{$invoiceItems::itemsCount()['total']}}

                            </h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    </div>
</div>