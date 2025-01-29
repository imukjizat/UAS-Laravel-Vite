<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\User;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil semua user dengan role 'user'
        $users = User::where('role', 'user')->get();

        foreach ($users as $user) {
            // Buat beberapa task untuk setiap user
            Task::create([
                'name' => 'Task 1 for ' . $user->name,
                'description' => 'This is a sample task description for ' . $user->name,
                'tags' => json_encode(['tag1', 'tag2']),
                'color' => 'bg-yellow-200',
                'date' => now()->addDays(rand(1, 10)),
                'user_id' => $user->id,
            ]);

            Task::create([
                'name' => 'Task 2 for ' . $user->name,
                'description' => 'Another task description for ' . $user->name,
                'tags' => json_encode(['tag3', 'tag4']),
                'color' => 'bg-blue-400',
                'date' => now()->addDays(rand(11, 20)),
                'user_id' => $user->id,
            ]);
        }
    }
}
