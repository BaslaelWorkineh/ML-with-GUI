<template>
  <section id="train" class="mb-12">
    <div class="flex items-center space-x-4 mb-6">
      <div
        class="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center"
      >
        <i class="fas fa-play-circle text-indigo-400 text-2xl"></i>
      </div>
      <h3 class="text-2xl lg:text-3xl font-bold">Model Training</h3>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Training Controls -->
      <div
        class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
      >
        <h4 class="text-lg font-medium mb-4">Training Controls</h4>

        <div class="space-y-6">
          <!-- Status Display -->
          <div class="flex items-center space-x-4">
            <div
              :class="[
                'w-3 h-3 rounded-full',
                {
                  'bg-yellow-400': trainingStatus === 'training',
                  'bg-green-400': trainingStatus === 'completed',
                  'bg-red-400': trainingStatus === 'error',
                  'bg-gray-400': trainingStatus === 'idle',
                },
              ]"
            ></div>
            <span class="text-sm capitalize">{{ trainingStatus }}</span>
          </div>

          <!-- Progress Bar -->
          <div>
            <div class="flex justify-between text-sm text-gray-400 mb-2">
              <span>Training Progress</span>
              <span>{{ Math.round(trainingProgress) }}%</span>
            </div>
            <div class="h-2 bg-gray-700 rounded-full">
              <div
                class="h-full bg-indigo-500 rounded-full transition-all duration-300"
                :style="{ width: `${trainingProgress}%` }"
              ></div>
            </div>
          </div>

          <!-- Control Buttons -->
          <div class="flex space-x-4">
            <button
              @click="startTraining"
              :disabled="trainingStatus === 'training'"
              :class="[
                'flex-1 px-4 py-2 rounded-lg transition',
                trainingStatus === 'training'
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700',
              ]"
            >
              <i class="fas fa-play mr-2"></i>
              Start Training
            </button>
            <button
              @click="stopTraining"
              :disabled="trainingStatus !== 'training'"
              :class="[
                'px-4 py-2 rounded-lg transition',
                trainingStatus !== 'training'
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700',
              ]"
            >
              <i class="fas fa-stop"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Training Metrics -->
      <div
        class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
      >
        <h4 class="text-lg font-medium mb-4">Training Metrics</h4>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-700/50 rounded-lg p-4">
            <p class="text-sm text-gray-400">Accuracy</p>
            <p class="text-2xl font-bold">
              {{ (modelMetrics.accuracy * 100).toFixed(1) }}%
            </p>
          </div>

          <div class="bg-gray-700/50 rounded-lg p-4">
            <p class="text-sm text-gray-400">Loss</p>
            <p class="text-2xl font-bold">{{ modelMetrics.loss.toFixed(4) }}</p>
          </div>

          <div class="bg-gray-700/50 rounded-lg p-4">
            <p class="text-sm text-gray-400">Validation Accuracy</p>
            <p class="text-2xl font-bold">
              {{ (modelMetrics.validationAccuracy * 100).toFixed(1) }}%
            </p>
          </div>

          <div class="bg-gray-700/50 rounded-lg p-4">
            <p class="text-sm text-gray-400">Validation Loss</p>
            <p class="text-2xl font-bold">
              {{ modelMetrics.validationLoss.toFixed(4) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center mt-8">
      <!-- Back Button -->
      <button
        @click="$emit('navigate', 'parameters')"
        class="px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-indigo-700 transition"
      >
        <i class="fas fa-arrow-left mr-2"></i>
        Previous: Parameter
      </button>

      <!-- Next Button -->
      <button
        @click="$emit('navigate', 'performance')"
        class="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        Next: Performance
        <i class="fas fa-arrow-right ml-2"></i>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Define state variables
const trainingStatus = ref('idle');
const trainingProgress = ref(0);
const modelMetrics = ref({
  accuracy: 0,
  loss: 0,
  validationAccuracy: 0,
  validationLoss: 0,
});

const startTraining = async () => {
  trainingStatus.value = 'training'; // Set the status to 'training' when training starts
  trainingProgress.value = 0; // Reset progress bar

  try {
    // Call the backend API to start training
    const response = await axios.post('http://127.0.0.1:8000/api/train/');

    // Check if the API response contains the expected metrics
    if (response.data && response.data.metrics && response.data.metrics.accuracy !== undefined && response.data.metrics.loss !== undefined) {
      // Handle success
      modelMetrics.value.accuracy = response.data.metrics.accuracy;
      modelMetrics.value.loss = response.data.metrics.loss;
      console.log(`Accuracy: ${modelMetrics.value.accuracy}, Loss: ${modelMetrics.value.loss}`);
    } else {
      console.error('Error: Response does not include accuracy or loss.');
      alert('Training failed. Please check the server logs.');
      return;
    }

    // Simulate training response with progress and metrics from the API
    const { metrics, progress } = response.data;

    // Update the model metrics and training progress
    modelMetrics.value = {
      accuracy: metrics.accuracy,
      loss: metrics.loss,
      validationAccuracy: metrics.validationAccuracy,
      validationLoss: metrics.validationLoss,
    };

    trainingProgress.value = progress;

    // Update the status to completed once training is done
    if (progress >= 100) {
      trainingStatus.value = 'completed';
    }

    console.log('Training started successfully:', response.data);

  } catch (error) {
    trainingStatus.value = 'error'; // Update status on error
    if (error.response) {
      // The server responded with a status code outside 2xx range
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something else caused the error
      console.error('Error message:', error.message);
    }
  }
};



// Method to stop training (optional functionality)
const stopTraining = () => {
  trainingStatus.value = 'idle'; // Change status back to idle
  trainingProgress.value = 0; // Reset progress
};
</script>
