<?php

namespace Database\Factories;

use App\Models\Categoria;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Producto>
 */
class ProductoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre'=>fake()->text($maxNbChars = 10),
            'cantidad'=>fake()->numberBetween($min=0, $max=400),
            'categoria_id'=> Categoria::factory(),
            'estado'=>'A'
        ];
    }
}
