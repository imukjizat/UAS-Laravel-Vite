import React, { useEffect, useRef } from 'react';
import { Chart, PieController, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Registrasi komponen yang diperlukan
Chart.register(PieController, ArcElement, Tooltip, Legend, Title);

const Dashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/data');
        const data = await response.json();

        const ctx = document.getElementById('userChart').getContext('2d');

        // Hancurkan chart sebelumnya jika ada
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        // Buat chart baru dengan ukuran yang sesuai
        chartRef.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Users', 'Admins'], // Label untuk Users dan Admins
            datasets: [
              {
                label: 'User Distribution',
                data: [data.users, data.admins], // Data Users dan Admins
                backgroundColor: ['#4CAF50', '#FF9800'], // Warna untuk masing-masing kategori
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Nonaktifkan aspek rasio bawaan
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'User and Admin Distribution',
              },
            },
            layout: {
              padding: 10, // Memberikan padding agar lebih rapi
            },
          },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>
      <main>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">User and Admin Distribution</h3>
          <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
            <canvas id="userChart"></canvas>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
