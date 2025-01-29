<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    /**
     * Kolom yang dapat diisi secara massal.
     */
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'tags',
        'color',
        'date',
    ];

    /**
     * Kolom yang harus dikonversi ke tipe data tertentu.
     */
    protected $casts = [
        'tags' => 'array', // Secara otomatis decode JSON ke array
        'date' => 'date',  // Konversi ke objek date
    ];

    /**
     * Relasi ke model User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
