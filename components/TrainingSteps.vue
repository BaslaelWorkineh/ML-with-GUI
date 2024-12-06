<!-- components/TrainingSteps.vue -->
<template>
    <div class="bg-[#111111] rounded-lg p-6">
      <h3 class="text-xl font-semibold mb-4">Training Steps</h3>
      <ol class="list-decimal list-inside space-y-4 text-gray-300">
        <li v-for="(step, index) in steps" :key="index">
          <span class="font-medium">{{ step.title }}</span>
          <p class="ml-6 mt-1 text-gray-400">{{ step.description }}</p>
        </li>
      </ol>
    </div>
  </template>
  
  <script setup>
  defineProps({
    steps: {
      type: Array,
      required: true
    }
  })
  </script>