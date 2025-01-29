import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TaskForm from "./TaskForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTag, setSelectedTag] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/tasks");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
  
        // Memformat ulang tanggal ke format konsisten jika perlu
        const formattedData = data.map((task) => ({
          ...task,
          tags: task.tags || [], // Jika tags null, berikan default array kosong
          date: new Date(task.date).toLocaleDateString(),
        }));
        
  
        setTasks(formattedData); // Menyimpan data dari API ke state tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    fetchTasks();
  }, []); // Akan dijalankan sekali saat komponen pertama kali dimuat
  
  const [selectedTasks, setSelectedTasks] = useState([]);
  const dropdownRef = useRef(null);
  const handleDropdownToggle = (event) => {
    event.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };


  const handleSelectTask = (id) => {
    setSelectedTasks((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((taskId) => taskId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    // Ambil ID tugas yang hanya ada pada tanggal yang dipilih
    const filteredTaskIds = filteredTasks.map((task) => task.id);
    
    if (filteredTaskIds.every((id) => selectedTasks.includes(id))) {
      // Jika semua tugas di tanggal terpilih sudah terseleksi, hapus mereka dari seleksi
      setSelectedTasks((prev) => prev.filter((id) => !filteredTaskIds.includes(id)));
    } else {
      // Jika ada tugas di tanggal terpilih yang belum terseleksi, tambahkan mereka ke seleksi
      setSelectedTasks((prev) => Array.from(new Set([...prev, ...filteredTaskIds])));
    }
  };
  
  const handleLogout = () => {
  fetch("http://127.0.0.1:8000/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Pastikan cookie session dikirim
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        // Hapus semua data di localStorage/sessionStorage
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_role");
        sessionStorage.clear();

        // Redirect ke halaman login
        navigate("/login");
      } else {
        console.error("Logout failed:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error during logout:", error);
    });
};


  const handleDeleteSelected = async () => {
    if (selectedTasks.length === 0) {
      Swal.fire("No task selected", "Please select at least one task to delete", "info");
      return;
    }
  
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${selectedTasks.length} task(s). This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      try {
        // Delete selected tasks via API
        const deleteRequests = selectedTasks.map((taskId) =>
          fetch(`http://127.0.0.1:8000/api/tasks/${taskId}`, { method: "DELETE" })
        );
  
        await Promise.all(deleteRequests);
  
        Swal.fire("Deleted!", "Your task(s) have been deleted.", "success");
  
        // Filter out deleted tasks locally
        setTasks((prevTasks) =>
          prevTasks.filter((task) => !selectedTasks.includes(task.id))
        );
  
        setSelectedTasks([]); // Reset selected tasks
      } catch (error) {
        console.error("Error deleting tasks:", error);
        Swal.fire("Error", "Failed to delete task(s). Please try again later.", "error");
      }
    }
  };
  

  useEffect(() => {
    setShowTaskForm(false);
  }, [selectedDate]);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const isSameDate = task.date === selectedDate.toLocaleDateString();
    const isMatchingTag = selectedTag
      ? task.tags && Array.isArray(task.tags) && task.tags.includes(selectedTag)
      : true;
    return isSameDate && isMatchingTag;
  }) || [];  

  const uniqueTagsForSelectedDate = Array.from(
    new Set(
      tasks
        .filter((task) => task.date === selectedDate.toLocaleDateString())
        .flatMap((task) => (task.tags && Array.isArray(task.tags) ? task.tags : []))
    )
  );
  

  const getTaskCountForDate = (date) => {
    const formattedDate = date.toLocaleDateString();
    return tasks.filter((task) => task.date === formattedDate).length;
  };

  const renderTileContent = ({ date, view }) => {
    if (view === "month") {
      const taskCount = getTaskCountForDate(date);
      if (taskCount > 0) {
        return (
          <div className="relative">
            <div className="absolute top-[-25px] left-[30px] transform -translate-x-1/2 bg-red-500 text-white text-[9px] rounded-full w-3 h-3 flex items-center justify-center">
              {taskCount}
            </div>
          </div>
        );
      }
    }
    return null;
  };

  const getHeaderText = () => {
    const today = new Date().toLocaleDateString();
    const selected = selectedDate.toLocaleDateString();

    if (today === selected) {
      return `Today`;
    } else {
      const options = { day: "numeric", month: "short", year: "numeric" };
      return `${selectedDate.toLocaleDateString("en-US", options)}`;
    }
  };
  
  return (
    <div className="relative flex h-screen bg-gray-100 overflow-hidden">
      <div className="w-1/4 bg-white shadow-md p-6 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-100">
        <div className="mb-8 flex items-center justify-center">
          <img src="./Landing Page/logo.png" alt="logo" className="w-8 h-8 mr-2" />
          <h1 className="text-3xl font-bold">TaskMaster</h1>
        </div>

        <Calendar
          className="rounded-lg shadow-md border border-gray-300 w-full"
          locale="en-US"
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedTag(null);
            setSelectedTag(null); // Reset tag setiap kali tanggal berubah
          }}
          tileContent={renderTileContent}
        />

        <div className="mt-8 w-full">
          <h2 className="text-lg font-semibold mb-4">Tasks</h2>
          <button
            onClick={() => setSelectedTag(null)}
            className={`flex justify-between items-center p-4 rounded-lg shadow-sm w-full ${
              selectedDate.toLocaleDateString() === new Date().toLocaleDateString() && !selectedTag
                ? "bg-blue-100 text-blue-800 font-semibold"
                : selectedDate && !selectedTag
                ? "bg-blue-100 text-blue-800 font-semibold"
                : "bg-gray-50 text-gray-800 hover:bg-gray-100"
            }`}
          >
            <span>
              {selectedDate.toLocaleDateString() === new Date().toLocaleDateString()
                ? "Today"
                : selectedDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
            </span>
            <span>{getTaskCountForDate(selectedDate)}</span>
          </button>
        </div>

        {uniqueTagsForSelectedDate.length > 0 && (
          <div className="mt-8 w-full">
            <h2 className="text-lg font-semibold mb-4">Tags</h2>
            <ul className="space-y-2">
              {uniqueTagsForSelectedDate.map((tag) => (
                <li key={tag}>
                  <button
                    onClick={() => !showTaskForm && setSelectedTag(tag)}
                    className={`flex justify-between items-center p-4 rounded-lg shadow-sm w-full ${
                      selectedTag === tag
                        ? "bg-blue-100 text-blue-800 font-semibold"
                        : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                    } ${
                      showTaskForm ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={showTaskForm}
                  >
                      <span>{tag}</span>
                    <span>
                      {
                        tasks.filter(
                          (task) =>
                            task.tags.includes(tag) &&
                            task.date === selectedDate.toLocaleDateString()
                        ).length
                      }
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{getHeaderText()}</h2>

          <div className="relative" ref={dropdownRef}>
            <img
              src="./Landing Page/profilepic.png"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onClick={handleDropdownToggle}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border z-50">
                <ul>
                  <li
                    className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <i className="fas fa-user mr-3 text-gray-600"></i>
                    <span className="text-gray-800">Profile</span>
                  </li>
                  <hr className="border-gray-200" />
                  <li
                    className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleLogout(); // Panggil fungsi logout
                    }}
                  >
                    <i className="fas fa-sign-out-alt mr-3 text-red-600"></i>
                    <span className="text-red-600">Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {!showTaskForm && filteredTasks.length > 0 && (
        <div className="flex justify-between items-center mb-4">
        <label className="flex items-center space-x-1 cursor-pointer">
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={filteredTasks.every((task) => selectedTasks.includes(task.id))}
            className="h-4 w-4 cursor-pointer accent-blue-500"
          />
          <span className="text-gray-700 text-m">Select All</span>
        </label>
        <div className="flex space-x-3">
          {/* Tampilkan tombol edit jika tidak ada task yang dipilih */}
          {selectedTasks.length <= 1 && (
            <button
              onClick={() => {
                const taskToEdit = tasks.find((task) => task.id === selectedTasks[0]);
                setEditingTask(taskToEdit); // Set task yang akan diedit
                setShowTaskForm(true); // Tampilkan form edit
              }}
              className="text-blue-500 hover:text-blue-700"
            >
              <i className="fas fa-pencil-alt text-lg"></i>
            </button>
          )}
          <button
            onClick={handleDeleteSelected}
            className="text-red-500 hover:text-red-700"
            disabled={selectedTasks.length === 0}
          >
            <i className="fas fa-trash text-lg"></i>
          </button>
        </div>
      </div>      
      )}

        {!showTaskForm ? (
          <div className="flex-1 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-100">
            {filteredTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-20">
                <img
                  src="./Landing Page/nothing.png"
                  alt="Nothing here"
                  className="mb-4 max-w-xl object-contain"
                />
                <p className="text-gray-800 font-bold text-xl">
                  Nothing her yet...
                </p>
              </div>
            ) : (
              <ul className="mt-4 space-y-4">
              {Array.isArray(filteredTasks) && filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition relative ${task.color}`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task.id)}
                      onChange={() => handleSelectTask(task.id)}
                      className="h-4 w-4 mr-4"
                    />
                    <div className="relative w-full">
                      <div className="absolute top-0 right-0 flex space-x-2">
                        {/* Validasi `task.tags` sebelum menggunakan `.map()` */}
                        {Array.isArray(task.tags) &&
                          task.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                      <h4 className="font-semibold text-gray-800">{task.name}</h4>
                      <p className="mt-2 text-sm text-gray-600">{task.description}</p>
                    </div>
                  </div>
                </li>
              ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-100">
            <TaskForm
              selectedDate={selectedDate}
              editingTask={editingTask} // Tambahkan prop ini
              onCancel={() => {
                setShowTaskForm(false);
                setEditingTask(null); // Reset editingTask saat form ditutup
              }}
              onSubmit={(updatedTask) => {
                setTasks((prevTasks) =>
                  prevTasks.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                  )
                ); // Perbarui task di daftar
                setShowTaskForm(false);
                setEditingTask(null);
              }}
            />
          </div>
        )}
      </div>

      {!showTaskForm && (
        <button
          onClick={() => setShowTaskForm(true)}
          className="absolute bottom-12 right-12 bg-white text-black w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-gray-100 transition-all"
          style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <i className="fas fa-plus text-xl"></i>
        </button>
      )}
    </div>
  );
};

export default Dashboard;
