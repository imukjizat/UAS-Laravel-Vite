<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Get all tasks for authenticated user.
     */
    public function index()
    {
        $tasks = Task::where('user_id', Auth::id())->get();

        return response()->json([
            'status' => 'success',
            'tasks' => $tasks
        ]);
    }

    /**
     * Store a newly created task.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'tags' => 'nullable|array',
            'color' => 'nullable|string|max:7', // Format warna (contoh: #FFFFFF)
            'date' => 'required|date',
        ]);

        $task = Task::create([
            'name' => $request->name,
            'description' => $request->description,
            'tags' => json_encode($request->tags),
            'color' => $request->color,
            'date' => $request->date,
            'user_id' => Auth::id(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Task created successfully',
            'task' => $task
        ], 201);
    }

    /**
     * Show a specific task.
     */
    public function show($id)
    {
        $task = Task::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$task) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'task' => $task
        ]);
    }

    /**
     * Update a task.
     */
    public function update(Request $request, $id)
    {
        $task = Task::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$task) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'tags' => 'nullable|array',
            'color' => 'nullable|string|max:7',
            'date' => 'required|date',
        ]);

        $task->update([
            'name' => $request->name,
            'description' => $request->description,
            'tags' => json_encode($request->tags),
            'color' => $request->color,
            'date' => $request->date,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Task updated successfully',
            'task' => $task
        ]);
    }

    /**
     * Delete a task.
     */
    public function destroy($id)
    {
        $task = Task::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$task) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], 404);
        }

        $task->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Task deleted successfully'
        ]);
    }
}
