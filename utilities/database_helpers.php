<?php

namespace Utilities;

use App\User;

use Illuminate\Support\Facades\Hash;

/**
 * Checks if an email exists in the database
 */
function emailExists($email)
{
    return User::where("email", "=", $email)->exists();
}

/**
 * Checks if a password is correct for a given user
 */
function isCorrectPassword($email, $password)
{
    $user = User::where("email", "=", $email)->first();

    return Hash::check($password, $user->password);
}
