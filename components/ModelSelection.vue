<template>
  <section id="model" class="mb-12">
    <div class="flex items-center space-x-4 mb-6">
      <div class="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
        <i class="fas fa-brain text-indigo-400 text-2xl"></i>
      </div>
      <h3 class="text-2xl lg:text-3xl font-bold">Select Model</h3>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <div v-for="model in models" :key="model" 
           :class="['cursor-pointer p-6 rounded-xl border transition-all duration-300',
                   selectedModel === model 
                     ? 'bg-indigo-500/20 border-indigo-500' 
                     : 'bg-gray-800/50 border-gray-700 hover:border-gray-600']"
           @click="selectModel(model)">
        <div class="flex items-center justify-between mb-4">
          <i class="fas fa-check-circle" 
             :class="selectedModel === model ? 'text-indigo-400' : 'text-gray-600'"></i>
          <i class="fas fa-brain text-gray-400"></i>
        </div>
        <h4 class="font-medium" :class="selectedModel === model ? 'text-white' : 'text-gray-300'">
          {{ model }}
        </h4>
        <p class="text-sm text-gray-400 mt-2">{{ getModelDescription(model) }}</p>
      </div>
    </div>

    <div class="flex justify-between items-center mt-8">
      <!-- Back Button -->
      <button
        @click="$emit('navigate', 'data')"
        class="px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-indigo-700 transition"
      >
        <i class="fas fa-arrow-left mr-2"></i>
        Previous: Upload Files
      </button>
      
      <!-- Next Button -->
      <button
        @click="sendModelData"
        class="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        Next: Parameters
        <i class="fas fa-arrow-right ml-2"></i>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { defineEmits } from 'vue';

const emit = defineEmits();

// Models and selection logic
const models = ["Linear Regression", "Logistic Regression", "Decision Tree", "Neural Network"];
const selectedModel = ref(models[0]);

const getModelDescription = (model) => {
  const descriptions = {
    "Linear Regression": "Best for continuous predictions",
    "Logistic Regression": "Ideal for binary classification",
    "Decision Tree": "Perfect for categorical data",
    "Neural Network": "Complex pattern recognition"
  };
  return descriptions[model];
};

const selectModel = (model) => {
  selectedModel.value = model;
};

// Function to send model data to the backend
const sendModelData = async () => {
  try {
    // Send only the model in the request
    const response = await axios.post('http://127.0.0.1:8000/api/modelselected/', {
      model: selectedModel.value, // Only send the model field
    });

    console.log('Response:', response.data);
    // Emit the navigate event after successful data send
    emit('navigate', 'parameters');
  } catch (error) {
    console.error('Error sending model data:', error.response ? error.response.data : error.message);
  }
};

</script>
