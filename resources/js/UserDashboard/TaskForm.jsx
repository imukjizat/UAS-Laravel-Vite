import React, { useState, useEffect, useRef } from "react";

const TaskForm = ({ selectedDate, editingTask, onCancel }) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(editingTask?.color || "");
  const [tags, setTags] = useState(editingTask?.tags || []);
  const [newTag, setNewTag] = useState("");
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [taskName, setTaskName] = useState(editingTask?.name || "");


  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  const colors = [
    "bg-green-100",
    "bg-purple-200",
    "bg-orange-100",
    "bg-teal-100",
    "bg-yellow-200",
    "bg-green-300",
    "bg-teal-200",
    "bg-blue-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-rose-300",
    "bg-red-400",
    "bg-gray-200",
    "bg-gray-400",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const taskData = {
      name: taskName,
      description: taskDescription || null,
      date: selectedDate.toLocaleDateString("en-CA"),
      color: selectedColor || null,
      tags: tags.length > 0 ? tags : null,
    };
  
    try {
      const method = editingTask ? "PUT" : "POST";
      const url = editingTask
        ? `http://127.0.0.1:8000/api/tasks/${editingTask.id}`
        : "http://127.0.0.1:8000/api/tasks";
  
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Task successfully added:", data);
  
      // Panggil onSubmit jika tersedia
      // if (onSubmit) {
      //   onSubmit(data); // Fungsi dari parent
      // }
  
      // Refresh browser setelah data berhasil ditambahkan
      window.location.reload();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
  
  const maxTags = 5;

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    setTaskDescription(e.target.value);
  };

  const addTag = () => {
    if (
      newTag &&
      !tags.some((tag) => tag.trim() === newTag.trim()) &&
      tags.length < maxTags
    ) {
      setTags((prevTags) => [...prevTags, newTag]);
    }
    setNewTag("");
    setIsAddingTag(false);
  };

  const removeTag = (indexToRemove) => {
    setTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
  };
  
  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.name || "");
      setTaskDescription(editingTask.description || "");
      setSelectedColor(editingTask.color || "");
      setTags(editingTask.tags || []);
    }
  }, [editingTask]);
  

  return (
    <div className="max-w-4xl mx-auto my-10">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="taskName"
            className="block text-base font-bold text-gray-800 mb-2 cursor-pointer"
          >
            Name
          </label>
          <div
            className="border border-gray-200 rounded-lg bg-gray-50 p-3 cursor-text hover:border-gray-400"
            onClick={() => inputRef.current.focus()}
          >
            <input
              ref={inputRef}
              type="text"
              id="taskName"
              name="taskName"
              placeholder="Name your new task"
              className="w-full border-none bg-gray-50 focus:outline-none focus:ring-0 text-sm"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="taskDescription"
            className="block text-base font-bold text-gray-800 mb-2 cursor-pointer"
          >
            Description
          </label>
          <div
            className="border border-gray-200 rounded-lg bg-gray-50 p-3 cursor-text hover:border-gray-400"
            onClick={() => textareaRef.current.focus()}
          >
            <textarea
              ref={textareaRef}
              id="taskDescription"
              name="taskDescription"
              placeholder="Describe your new task"
              rows="1"
              className="w-full border-none bg-gray-50 focus:outline-none focus:ring-0 text-sm resize-none overflow-y-auto min-h-[40px] max-h-[120px]"
              value={taskDescription}
              onInput={handleInput}
            ></textarea>
          </div>
        </div>

        <div className="rounded-lg">
        <label className="block text-base font-bold text-gray-800">Card Color</label>
          <div className="flex justify-between items-center mt-6">
            {colors.map((color, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color ? "border-gray-600" : "border-gray-300"
                } ${color}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColor(color);
                }}
              ></button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-start space-x-6 mt-8">
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-800">Set a tag for your task</h3>
            <div
              className={`flex flex-wrap items-center mt-4 p-3 rounded-lg bg-transparent overflow-y-auto ${
                tags.length > 4 ? "max-h-36" : ""
              }`}
            >
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="relative px-4 py-1 bg-blue-400 text-white text-sm font-medium rounded-full border mr-2 mb-2 flex items-center"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(index)}
                    className="ml-2 text-gray-500 hover:text-gray-800 focus:outline-none flex items-center justify-center w-4 h-4 bg-gray-200 rounded-full"
                    aria-label="Remove tag"
                  >
                    &times;
                  </button>
                </div>
              ))}

              {isAddingTag ? (
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onBlur={addTag}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Enter a new tag"
                  className="px-4 py-1 bg-white text-gray-800 text-sm font-medium rounded-full border focus:outline-none focus:ring-2 focus:ring-gray-400 mr-2 mb-2"
                />
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAddingTag(true);
                  }}
                  className="px-4 py-1 bg-white text-gray-800 text-sm font-medium rounded-full border mr-2 mb-2"
                  disabled={tags.length >= maxTags}
                >
                  Add +
                </button>
              )}
            </div>
            {tags.length >= maxTags && (
              <p className="text-sm text-red-500 mt-2">
                Maximum of {maxTags} tags allowed.
              </p>
            )}
          </div>
        </div>
        <div className="absolute bottom-12 right-12 flex space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-red-500 transition-all"
            style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          <button
            type="submit"
            className="bg-white text-black w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-gray-100 transition-all"
            style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          >
            <i className="fas fa-check text-xl"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
