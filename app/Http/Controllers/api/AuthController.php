<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Handle user login.
     */
    public function login(Request $request)
    {
        // Validasi input
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Cek kredensial
        $credentials = $request->only('email', 'password');
        $remember = $request->has('remember'); // Periksa apakah remember me dicentang

        if (Auth::attempt($credentials, $remember)) {
            // Regenerasi session untuk keamanan
            $request->session()->regenerate();

            // Ambil user yang sedang login
            $user = Auth::user();

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
            ], 200);
        }

        // Jika kredensial salah
        return response()->json([
            'status' => 'error',
            'message' => 'Wrong email or password',
        ], 401);
    }

    /**
     * Handle user logout.
     */
    public function logout(Request $request)
    {
        Auth::logout();

        // Hapus semua sesi
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'status' => 'success',
            'message' => 'Logout successful',
        ], 200);
    }
}
