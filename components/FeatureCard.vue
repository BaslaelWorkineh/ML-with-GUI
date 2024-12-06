<template>
    <div class="feature-card bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      <i :class="`fas fa-${icon} text-indigo-400 text-4xl`"></i>
      <h3 class="text-xl font-bold mt-4">{{ title }}</h3>
      <p class="text-gray-400 mt-2">{{ description }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps(["title", "description", "icon"]);
  </script>
  