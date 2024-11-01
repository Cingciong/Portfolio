<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PhotoController;

Route::get('/api/count-files', [PhotoController::class, 'countFiles']);


Route::get('/{pathMatch}', function () {
    return view('welcome');
})->where('pathMatch', '.*');

