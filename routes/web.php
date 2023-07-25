<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use Illuminate\Support\Facades\Route;


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

Route::get('login', function () {
    return view('categorias');
})->name('login');

Route::get('/productos', function(){
    return view('productos');
});
Route::get('/categorias', function(){
    return view('categorias');
});

//Route::get('/inicio/{nombre}', [inicioC::class, "saludar"]);
Route::resource('/producto',ProductoController::class)->only(['index', 'store', 'update', 'destroy'])->middleware('cantidad');
Route::resource('/categoria',CategoriaController::class)->only(['index', 'store', 'update', 'destroy']);
