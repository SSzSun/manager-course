<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      router.push("/courses");
    } else {
      error.value = data.message;
    }
  } catch (err) {
    error.value = "An error occurred";
  }
};
</script>

<template>
  <div
    class="flex-1 flex flex-col justify-center items-center bg-gray-800 p-10 rounded-r-lg"
  >
    <h2 class="text-3xl font-semibold text-white mb-6">Log in</h2>
    <p class="text-gray-400 mb-4">Gateway to paradise of Cybersecurity</p>
    <form @submit.prevent="handleLogin" class="w-full max-w-sm">
      <div class="mb-4">
        <label for="email" class="block text-gray-300 mb-2">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-300 mb-2">Password</label>
        <div class="relative">
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Log in
      </button>
    </form>
    <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>
  </div>
</template>
