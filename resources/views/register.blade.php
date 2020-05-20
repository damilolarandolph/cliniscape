<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{ asset('css/login.css')}}">
    <title>Register</title>
</head>

<body>
    <form method="POST">

        <div id="carouselExampleControls" class="carousel slide" data-pause=false>

            <div class="carousel-inner ">
                <div class=" carousel-item  w-50 active " style="margin-left: auto" data-interval=false>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputTitle">Title</label>
                            <select id="inputTile" class="form-control" name="title">
                                <option selected>Choose...</option>
                                <option>Mr</option>
                                <option>Mrs</option>
                                <option>Dr</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="dob">Date Of Birth</label>
                            <input type="date" class="form-control" id="dob" name="dob">
                        </div>
                    </div>




                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Firstname</label>
                            <input type="text" class="form-control" id="inputEmail4" name="firstname">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Lastname</label>
                            <input type="text" class="form-control" id="inputPassword4" name="lastname">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputGender">Gender</label>
                            <select id="inputGender" class="form-control" name="gender">
                                <option selected>Choose...</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Email</label>
                            <input type="email" class="form-control" id="inputEmail4" name="email">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Password</label>
                            <input type="password" class="form-control" id="inputPassword4" name="password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputAddress">Address</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" name="address1">
                    </div>
                    <div class="form-group">
                        <label for="inputAddress2">Address 2</label>
                        <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" name="address2">
                    </div>
                    <div class="form-group">
                        <label for="inputAddress2">Phone Number</label>
                        <input type="text" class="form-control" id="inputAddress2" placeholder="Phone Number" name="phonenumber">
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputCity">City</label>
                            <input type="text" class="form-control" id="inputCity" name="city">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputState">Region</label>
                            <select id="inputState" class="form-control" name="Region">
                                <option selected>Choose...</option>
                                <option>Accra</option>
                            </select>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputZip">Zip</label>
                            <input type="text" class="form-control" id="inputZip" name="zipcode">
                        </div>
                    </div>
                </div>
            </div>

            <div class="carousel-item" data-interval=false>
                <img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(46).jpg" alt="Second slide">
            </div>
            <div class="carousel-item" data-interval=false>
                <p>Hello</p>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        </div>
        </div>
        <button type="submit" style="margin-left: 50vw;" class="btn btn-primary">Submit</button>
    </form>

</body>
<script src="{{ asset('js/app.js')}}"></script>
<script src="{{ asset('js/bootstrap.min.js')}}"></script>

</html>