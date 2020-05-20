<?php

namespace App\Http\Middleware;

use Closure;
use GuzzleHttp\Psr7\Request;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (!$request->expectsJson()) {
            return route('login');
        }
    }

    public function handle($request, Closure $next)
    {

        if (!$request->session()->has('email')) {
            return redirect('login');
        }

        return $next($request);
    }
}
