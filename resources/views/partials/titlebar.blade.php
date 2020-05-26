<div class="p-2 bg-primary row align-items-center" style="height: 5rem;">
        <div class="col align-self-center">
                <span class="text-capitalize font-weight-bold text-white align-middle"
                        style="font-size: 2rem;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">
                        @yield('routename', 'dummy route')
                </span>
        </div>

        <div class="col-2 d-flex flex-row">

                <div>
                        <img src="{{asset($user->userDetails->basic_details['avatar'])}}"
                                class="img-fluid w-50 circle rounded" alt="...">
                </div>
                <div>
                        <a href="/logout">
                                <button class="btn btn-primary">
                                        Logout
                                </button>
                        </a>
                </div>
        </div>
</div>