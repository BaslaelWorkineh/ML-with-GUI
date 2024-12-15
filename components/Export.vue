<template>
  <div class="space-y-8">
    <h2
      class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
    >
      Export Model & Results
    </h2>
    <p class="text-gray-400 text-lg">
      Download your trained models and analysis reports for further use.
    </p>

    <!-- Export Options -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div
        class="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col items-center"
      >
        <i class="fas fa-file-code text-indigo-400 text-4xl"></i>
        <h3 class="mt-4 text-lg font-semibold text-gray-300">Export Model</h3>
        <p class="mt-2 text-sm text-gray-400 text-center">
          Download the trained model in a variety of formats (e.g., JSON, ONNX).
        </p>
        <button
          @click="downloadModel"
          class="mt-4 px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Download
        </button>
      </div>

      <div
        class="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col items-center"
      >
        <i class="fas fa-file-alt text-indigo-400 text-4xl"></i>
        <h3 class="mt-4 text-lg font-semibold text-gray-300">Export Report</h3>
        <p class="mt-2 text-sm text-gray-400 text-center">
          Generate and download a detailed performance report.
        </p>
        <button
          class="mt-4 px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Download
        </button>
      </div>
    </div>
    <!-- Navigation Buttons -->
  <div class="flex justify-between items-center mt-8">
    <!-- Back Button -->
    <button
      @click="$emit('navigate', 'metrics')"
      class="px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-indigo-700 transition"
    >
      <i class="fas fa-arrow-left mr-2"></i>
      Previous: Metrics
    </button>
  </div>
  </div>
  
</template>

<script setup>
import axios from 'axios';

const downloadModel = async () => {
  try {
    // Request the model download endpoint
    const response = await axios.get('http://127.0.0.1:8000/api/download_model/', { responseType: 'blob' });

    // Create a URL for the Blob object
    const blob = new Blob([response.data], { type: 'application/octet-stream' });
    const downloadUrl = window.URL.createObjectURL(blob);

    // Create a temporary link to trigger the download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'trained_model.pkl'); // Filename
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error downloading model:', error);
    alert('Failed to download model');
  }
};
</script>
