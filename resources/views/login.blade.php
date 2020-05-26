<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{ asset('css/login.css')}}">
    <title>Login</title>
</head>

<body>
    <div class="container-fluid vh-100"
        style="background-image: url({{asset('/images/login_bg2.jpg')}}); background-repeat: no-repeat; background-size: cover;">
        <div class="row h-100 align-items-center">
            <div class="col-3 h-75">
                <div class="card h-100 p-5 d-flex flex-column">
                    <div class="card-body p-3">
                        <form method="POST" class="form-box">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input required type="email" class="form-control" id="email" value="{{old('email')}}"
                                    name="email" aria-describedby="emailHelp">
                                @error('email')
                                <div class="alert alert-danger">{{ $message }}</div>
                                @enderror
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with
                                    anyone
                                    else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input required type="password" class="form-control" id="password" name="password">
                            </div>
                            @error('password')
                            <div class="alert alert-danger">{{ $message }}</div>
                            @enderror
                            <div class="form-group form-check">
                                <input type="checkbox" class="form-check-input" id="rememberMe">
                                <label class="form-check-label" for="exampleCheck1">Remember me</label>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="d-flex flex-column h-100 ">
                    <div class="d-flex flex-column justify-content-center">
                        <div class="h-25 w-25 ml-auto mr-auto">
                            <svg class="bi bi-exclude" width="100%" height="100%" viewBox="0 0 16 16" fill="#FFFFFF"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M1.5 0A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12H4v2.5A1.5 1.5 0 005.5 16h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 4H12V1.5A1.5 1.5 0 0010.5 0h-9zM12 4H5.5A1.5 1.5 0 004 5.5V12h6.5a1.5 1.5 0 001.5-1.5V4z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="ml-auto mr-auto">
                            <h1 class="display-2 text-white">
                                Patient Login
                            </h1>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</body>
<script src="{{ asset('js/app.js')}}">
</script>

</html>