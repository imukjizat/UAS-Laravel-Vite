<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), // Pastikan mengganti dengan password yang aman
            'profile_pic' => null,
            'role' => 'admin',
        ]);

        // Create Sample Users
        User::create([
            'name' => 'User One',
            'email' => 'user1@example.com',
            'password' => Hash::make('password'), // Pastikan mengganti dengan password yang aman
            'profile_pic' => null,
            'role' => 'user',
        ]);

        User::create([
            'name' => 'User Two',
            'email' => 'user2@example.com',
            'password' => Hash::make('password'), // Pastikan mengganti dengan password yang aman
            'profile_pic' => null,
            'role' => 'user',
        ]);
    }
}
