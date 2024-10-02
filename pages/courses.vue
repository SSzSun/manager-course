<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-900 p-6">
    <div class="w-full max-w-4xl">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-300">Courses</h1>
        <div class="flex gap-2">
          <button
            @click="logoutUser()"
            class="rounded-lg text-white bg-red-600 hover:bg-red-700 py-2 px-4"
          >
            Logout
          </button>
          <button
            @click="toggleForm()"
            class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            {{ showForm ? "Close Form" : isEditing ? "Edit Course" : "Add New Course" }}
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <CourseForm
          v-if="showForm"
          :course="selectedCourse"
          :isEdit="isEditing"
          @courseUpdated="fetchCourses"
          @closeForm="closeForm"
        />
        <CourseList
          :courses="courses"
          @editCourse="handleEditCourse"
          @courseDeleted="fetchCourses"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CourseList from "../components/CourseList.vue";
import CourseForm from "../components/CourseForm.vue";

const showForm = ref(false);
const isEditing = ref(false);
const courses = ref([]);
const selectedCourse = ref(null);

const fetchCourses = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/courses");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    courses.value = await response.json();
  } catch (error) {
    console.error("Failed to fetch courses:", error);
  }
};

onMounted(() => {
  fetchCourses();
});

const handleEditCourse = (course) => {
  selectedCourse.value = course; // Set the selected course for editing
  isEditing.value = true; // Indicate we are in edit mode
  showForm.value = true; // Show the form for editing
};

const toggleForm = () => {
  if (showForm.value) {
    closeForm(); // Reset the form if it's being closed
  } else {
    showForm.value = true; // Open form for adding or editing
  }
};

const closeForm = () => {
  selectedCourse.value = null; // Clear the selected course
  isEditing.value = false; // Reset editing mode
  showForm.value = false; // Close the form
};

const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
</script>
