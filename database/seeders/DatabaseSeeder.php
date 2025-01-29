<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Panggil UserSeeder untuk membuat pengguna
        $this->call(UserSeeder::class);

        // Panggil TaskSeeder untuk membuat tugas
        $this->call(TaskSeeder::class);
    }
}
