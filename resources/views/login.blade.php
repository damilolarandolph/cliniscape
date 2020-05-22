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
    <div class="container-fluid d-flex login-box">
        <form method="POST" class="form-box">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input required type="email" class="form-control" id="email" value="{{old('email')}}" name="email"
                    aria-describedby="emailHelp">
                @error('email')
                <div class="alert alert-danger">{{ $message }}</div>
                @enderror
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
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
</body>
<script src="{{ asset('js/app.js')}}">
</script>

</html>