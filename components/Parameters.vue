<!-- src/components/Parameters.vue -->
<template>
    <section id="parameters" class="mb-12">
      <div class="flex items-center space-x-4 mb-6">
        <div class="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
          <i class="fas fa-cogs text-indigo-400 text-2xl"></i>
        </div>
        <h3 class="text-2xl lg:text-3xl font-bold">Model Parameters</h3>
      </div>
  
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- General Parameters -->
        <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h4 class="text-lg font-medium mb-4">General Parameters</h4>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Learning Rate</label>
              <div class="flex items-center space-x-4">
                <input
                  v-model="parameters.learningRate"
                  type="range"
                  min="0.0001"
                  max="0.1"
                  step="0.0001"
                  class="flex-grow"
                >
                <span class="text-sm bg-gray-700 px-2 py-1 rounded">
                  {{ parameters.learningRate }}
                </span>
              </div>
            </div>
  
            <div>
              <label class="block text-sm text-gray-400 mb-2">Epochs</label>
              <input
                v-model="parameters.epochs"
                type="number"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                min="1"
                max="1000"
              >
            </div>
  
            <div>
              <label class="block text-sm text-gray-400 mb-2">Batch Size</label>
              <select
                v-model="parameters.batchSize"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
              >
                <option v-for="size in [16, 32, 64, 128]" :key="size" :value="size">
                  {{ size }}
                </option>
              </select>
            </div>
          </div>
        </div>
  
        <!-- Model Specific Parameters -->
        <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h4 class="text-lg font-medium mb-4">Model Specific Parameters</h4>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Validation Split</label>
              <div class="flex items-center space-x-4">
                <input
                  v-model="parameters.validationSplit"
                  type="range"
                  min="0.1"
                  max="0.3"
                  step="0.05"
                  class="flex-grow"
                >
                <span class="text-sm bg-gray-700 px-2 py-1 rounded">
                  {{ (parameters.validationSplit * 100).toFixed(0) }}%
                </span>
              </div>
            </div>
  
            <!-- Add more model-specific parameters based on selectedModel -->
            <div v-if="selectedModel === 'Neural Network'" class="space-y-4">
              <div>
                <label class="block text-sm text-gray-400 mb-2">Hidden Layers</label>
                <input
                  v-model="parameters.hiddenLayers"
                  type="number"
                  class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                  min="1"
                  max="10"
                >
              </div>
              
              <div>
                <label class="block text-sm text-gray-400 mb-2">Activation Function</label>
                <select
                  v-model="parameters.activation"
                  class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                >
                  <option value="relu">ReLU</option>
                  <option value="sigmoid">Sigmoid</option>
                  <option value="tanh">Tanh</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Navigation Buttons -->
<div class="flex justify-between items-center mt-8">
  <!-- Back Button -->
  <button
    @click="$emit('navigate', 'model')"
    class="px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-indigo-700 transition"
  >
    <i class="fas fa-arrow-left mr-2"></i>
    Previous: Model Selection
  </button>
  
  <!-- Next Button -->
  <button
    @click="$emit('navigate', 'train')"
    class="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
  >
    Next: Training
    <i class="fas fa-arrow-right ml-2"></i>
  </button>
</div>

    </section>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { useModelTraining } from '../composables/useModelTraining'
  
  const { selectedModel, parameters } = useModelTraining()
  </script>