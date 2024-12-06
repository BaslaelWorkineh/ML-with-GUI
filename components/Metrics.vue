<template>
    <div class="space-y-8">
      <h2 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        Model Metrics
      </h2>
      <p class="text-gray-400 text-lg">
        Review key performance metrics of your model to ensure optimal functionality.
      </p>
  
      <!-- Metrics Table -->
      <div class="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 class="text-lg font-semibold text-gray-300 mb-4">Metrics Summary</h3>
        <table class="w-full text-gray-300">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="py-2 text-left">Metric</th>
              <th class="py-2 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-700">
              <td class="py-2">Accuracy</td>
              <td class="py-2">92.5%</td>
            </tr>
            <tr class="border-b border-gray-700">
              <td class="py-2">Precision</td>
              <td class="py-2">89.3%</td>
            </tr>
            <tr class="border-b border-gray-700">
              <td class="py-2">Recall</td>
              <td class="py-2">88.1%</td>
            </tr>
            <tr class="border-b border-gray-700">
              <td class="py-2">F1-Score</td>
              <td class="py-2">88.7%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
          <!-- Navigation Buttons -->
<div class="flex justify-between items-center mt-8">
  <!-- Back Button -->
  <button
    @click="$emit('navigate', 'performance')"
    class="px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-indigo-700 transition"
  >
    <i class="fas fa-arrow-left mr-2"></i>
    Previous: Performance
  </button>
  
  <!-- Next Button -->
  <button
    @click="$emit('navigate', 'download')"
    class="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
  >
    Next: Export
    <i class="fas fa-arrow-right ml-2"></i>
  </button>
</div>
  </template>
  
  <script setup>
  </script>
  