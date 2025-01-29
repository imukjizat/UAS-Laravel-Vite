<?php

use Illuminate\Support\Facades\Route;

Route::get('/{patchMatch}', function () {
    return view('welcome');
})->where('patchMatch', ".*");
