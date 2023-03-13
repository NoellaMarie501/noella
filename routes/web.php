<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/companies', [CompanyController::class, "index"])->name("companies.index");
Route::get('/company', [CompanyController::class, "create"])->name("companies.create");
Route::post('/new/company', [CompanyController::class, "store"])->name("companies.store");
Route::get('/company/{company}', [CompanyController::class, "edit"])->name("companies.edit");
Route::put('/company/{company}/update', [CompanyController::class, "update"])->name("companies.update");
Route::delete('/company/{company}/delete', [CompanyController::class, "destroy"])->name("companies.destroy");

//Route::resource('companies', CompanyController::class);
