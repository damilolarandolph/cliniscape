<?php

namespace App\Http\Middleware;

use App\Doctor;
use App\User;
use Closure;

class AddUserInfo
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $isDoctor = $request->session()->get('role') == 2;
        $isPharma  = false;
        $isAdmin = $request->session()->get('role') == 1;
        $isPatient = $request->session()->get('role') == 3;
        $user = null;

        if ($isDoctor || $isAdmin) {
            $user = Doctor::where('email', $request->session()->get('email'))
                ->first();
        } else {
            $user = User::where('email', $request->session()->get('email'))
                ->first();
        }

        if ($isDoctor) {
            $isPharma = $user->typeMap->type->id == 5;
        }
        view()->share([
            'isPharma' => $isPharma,
            'isDoctor' => $isDoctor,
            'isAdmin' => $isAdmin,
            'isPatient' => $isPatient,
            'user' => $user
        ]);
        return $next($request);
    }
}
