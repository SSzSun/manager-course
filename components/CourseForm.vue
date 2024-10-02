<template>
  <div class="p-6 bg-gray-800 rounded-lg shadow-lg text-gray-300">
    <h2 class="text-2xl font-semibold mb-4">
      {{ isEdit ? "Edit Course" : "Add Course" }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <input
        v-model="course.title"
        type="text"
        placeholder="Course Title"
        required
        class="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        v-model="course.content"
        placeholder="Course Content"
        required
        class="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {{ isEdit ? "Update Course" : "Add Course" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  course: {
    type: Object,
    default: () => ({ title: "", content: "" }),
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["courseUpdated", "closeForm"]);
const course = ref({ ...props.course });

watch(
  () => props.course,
  (newValue) => {
    course.value = { ...newValue };
  }
);

const handleSubmit = async () => {
  const method = props.isEdit ? "PUT" : "POST";
  const url = props.isEdit
    ? `http://localhost:5000/api/courses/${props.course._id}`
    : "http://localhost:5000/api/courses";

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course.value),
  });

  if (response.ok) {
    course.value = { title: "", content: "" };
    emit("courseUpdated");
    emit("closeForm");
  } else {
    console.error("Failed to save course");
  }
};
</script>
