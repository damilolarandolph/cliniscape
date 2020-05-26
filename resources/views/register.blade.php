<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{ asset('css/login.css')}}">
    <link rel="stylesheet" href="{{ asset('css/master.css')}}">
    <title>Register</title>
</head>

<body>
    <div class="container-fluid vh-100"
        style="background-image: url({{asset('/images/login_bg.jpg')}}); background-repeat: no-repeat; background-size: cover;">
        <div class="row p-3">
            <div class="col-4">
                <div class="card  text-primary ">
                    <div class="card-body">
                        <form method="POST" enctype="multipart/form-data">
                            <div class="form-row">

                                <label for="inputTitle">Title</label>
                                <select required id="inputTile" class="form-control" name="title">
                                    <option selected>Choose...</option>
                                    <option>Mr</option>
                                    <option>Mrs</option>
                                    <option>Dr</option>
                                </select>
                                <label for="dob">Date Of Birth</label>
                                <input required type="date" class="form-control" id="dob" name="dob">
                                <label for="inputGender">Gender</label>
                                <select required id="inputGender" class="form-control" name="gender">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>


                            </div>




                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4">Firstname</label>
                                    <input required type="text" class="form-control" id="inputEmail4" name="firstname">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPassword4">Lastname</label>
                                    <input type="text" class="form-control" id="inputPassword4" name="lastname">
                                </div>

                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4">Email</label>
                                    <input required type="email" class="form-control" id="inputEmail4" name="email">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPassword4">Password</label>
                                    <input required type="password" class="form-control" id="inputPassword4"
                                        name="password">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputAddress">Address</label>
                                <input required type="text" class="form-control" id="inputAddress"
                                    placeholder="1234 Main St" name="address1">
                            </div>
                            <div class="form-group">
                                <label for="inputAddress2">Address 2</label>
                                <input type="text" class="form-control" id="inputAddress2"
                                    placeholder="Apartment, studio, or floor" name="address2">
                            </div>
                            <div class="form-group">
                                <label for="inputAddress2">Phone Number</label>
                                <input required type="text" class="form-control" id="inputAddress2"
                                    placeholder="Phone Number" name="phonenumber">
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputCity">City</label>
                                    <input required type="text" class="form-control" id="inputCity" name="city">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="inputState">Region</label>
                                    <select id="inputState" class="form-control" name="Region">
                                        <option>Accra</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="inputZip">Zip</label>
                                    <input type="text" class="form-control" id="inputZip" name="zipcode">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="profile-picture">Choose A Profile Picture</label>
                                <input class="form-control" type="file" name="avatar" />
                            </div>
                            <div class="row d-flex w-100 flex-row justify-content-center">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div class="row">
                        <div class="col text-center">
                            <a href="/login">Have An Account ? Login Here</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col ">
                <div class="d-flex flex-column h-100 align-items-center">
                    <div class="d-flex mt-auto flex-column">
                        <div class="w-25 ml-auto mr-auto">
                            <svg class="bi bi-exclude" width="100%" height="100%" viewBox="0 0 16 16" fill="#FFFFFF"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M1.5 0A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12H4v2.5A1.5 1.5 0 005.5 16h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 4H12V1.5A1.5 1.5 0 0010.5 0h-9zM12 4H5.5A1.5 1.5 0 004 5.5V12h6.5a1.5 1.5 0 001.5-1.5V4z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div class=" mb-auto d-flex flex-column">
                        <div class="ml-auto mr-auto">
                            <h1 class="display-2 text-white">
                                Patient Registeration
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
<script src="{{ asset('js/app.js')}}"></script>
<script src="{{ asset('js/bootstrap.min.js')}}"></script>

</html>