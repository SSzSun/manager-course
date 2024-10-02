<template>
  <div class="p-6 bg-gray-800 text-gray-300 rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold mb-6 text-white">Feed Courses</h2>
    <ul v-if="courses.length" class="space-y-6">
      <li
        v-for="course in courses"
        :key="course._id"
        class="p-4 bg-gray-900 rounded-lg shadow-md"
      >
        <h3 class="text-2xl font-semibold text-white">{{ course.title }}</h3>
        <p class="mt-2 text-gray-400">{{ course.content }}</p>
        <div class="mt-4 space-x-2">
          <button
            @click="deleteCourse(course._id)"
            class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
          <button
            @click="$emit('editCourse', course)"
            class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Edit
          </button>
        </div>
      </li>
    </ul>
    <p v-else class="text-gray-500">No courses available</p>
  </div>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    async deleteCourse(id) {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        this.$emit("courseDeleted", id);
      } else {
        console.error("Failed to delete course");
      }
    },
  },
};
</script>
