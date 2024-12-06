<template>
    <div class="testimonial-card bg-gray-900 p-6 rounded-lg shadow-lg">
      <p class="text-gray-400 mb-4">"{{ quote }}"</p>
      <h4 class="font-bold text-lg text-indigo-400">{{ author }}</h4>
    </div>
  </template>
  
  <script setup>
  defineProps(["quote", "author"]);
  </script>
  