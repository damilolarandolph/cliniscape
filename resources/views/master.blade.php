<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/master.css')}}">
    @yield('css')
    <title>@yield('title', 'default')</title>
</head>

<body>
    <div class="container-fluid" style="height: 100vh">
        <div class="row" style="height: 100vh">
            <div class="col-sm-2">
                @include('partials.sidebar')
            </div>
            <div class="col">
                @include('partials.titlebar')
                <div class="row justify-content-center p-4 h-100">
                    @yield('main-content')
                </div>
            </div>
        </div>
    </div>
</body>
<script src="{{ asset('js/app.js')}}"></script>
<script src="{{asset('js/bootstrap.min.js')}}"></script>
<script src="{{asset('js/custom-file-input.js')}}"></script>
@yield('js')

</html>