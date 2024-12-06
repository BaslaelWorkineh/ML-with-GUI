<template>
    <div class="space-y-8">
      <h2 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        Performance Overview
      </h2>
      <p class="text-gray-400 text-lg">
        Monitor the performance of your trained models with detailed metrics and visualizations.
      </p>
  
      <!-- Performance Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-gray-300">Accuracy Over Time</h3>
          <div class="mt-4 h-48 flex items-center justify-center text-gray-500">
            <i class="fas fa-chart-line text-4xl"></i>
            <span class="ml-2">Chart Placeholder</span>
          </div>
        </div>
  
        <div class="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-gray-300">Training Loss</h3>
          <div class="mt-4 h-48 flex items-center justify-center text-gray-500">
            <i class="fas fa-chart-area text-4xl"></i>
            <span class="ml-2">Chart Placeholder</span>
          </div>
        </div>
      </div>
    </div>
      <!-- Navigation Buttons -->
      <div class="flex justify-between items-center mt-8">
  <!-- Back Button -->
  <button
    @click="$emit('navigate', 'train')"
    class="px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-indigo-700 transition"
  >
    <i class="fas fa-arrow-left mr-2"></i>
    Previous: Training
  </button>
  
  <!-- Next Button -->
  <button
    @click="$emit('navigate', 'metrics')"
    class="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
  >
    Next: Metrics
    <i class="fas fa-arrow-right ml-2"></i>
  </button>
</div>
    
  </template>
  
  <script setup>
  </script>
  