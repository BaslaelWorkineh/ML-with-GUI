<!-- src/components/DataUpload.vue -->
<template>
    <section id="data" class="mb-12">
      <div class="flex items-center space-x-4 mb-6">
        <div class="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
          <i class="fas fa-file-upload text-indigo-400 text-2xl"></i>
        </div>
        <h3 class="text-2xl lg:text-3xl font-bold">Data Upload</h3>
      </div>
  
      <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <!-- File Drop Zone -->
        <div
          @dragover.prevent="dragOver = true"
          @dragleave.prevent="dragOver = false"
          @drop.prevent="handleFileDrop"
          :class="[
            'border-2 border-dashed rounded-xl p-8 text-center transition-all',
            dragOver ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700 hover:border-gray-600',
            datasetFile ? 'bg-green-500/10' : ''
          ]"
        >
          <div v-if="!datasetFile">
            <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
            <h4 class="text-lg font-medium mb-2">Drag and drop your dataset</h4>
            <p class="text-gray-400 mb-4">or</p>
            <button
              @click="triggerFileInput"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Browse Files
            </button>
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              accept=".csv,.xlsx"
              @change="handleFileSelect"
            >
            <p class="text-sm text-gray-400 mt-4">Supported formats: CSV, XLSX</p>
          </div>
          <div v-else class="text-center">
            <i class="fas fa-check-circle text-4xl text-green-400 mb-4"></i>
            <h4 class="text-lg font-medium text-green-400 mb-2">File Uploaded Successfully</h4>
            <p class="text-gray-400">{{ datasetFile.name }}</p>
            <button
              @click="removeFile"
              class="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Remove File
            </button>
          </div>
        </div>
  
        <!-- Data Preview -->
        <div v-if="datasetFile" class="mt-6">
          <h4 class="text-lg font-medium mb-4">Data Preview</h4>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th v-for="header in previewHeaders" :key="header"
                      class="px-4 py-3 text-left text-sm font-medium text-gray-400 bg-gray-800/50">
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                <tr v-for="(row, index) in previewData" :key="index">
                  <td v-for="(value, key) in row" :key="key"
                      class="px-4 py-3 text-sm text-gray-300">
                    {{ value }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <!-- Navigation Buttons -->
      <div class="flex justify-end mt-8">
        <button
          @click="$emit('navigate', 'model')"
          class="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Next: Model Selection
          <i class="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const dragOver = ref(false)
  const fileInput = ref(null)
  const datasetFile = ref(null)
  const previewHeaders = ref([])
  const previewData = ref([])
  
  const triggerFileInput = () => {
    fileInput.value.click()
  }
  
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      processFile(file)
    }
  }
  
  const handleFileDrop = (event) => {
    dragOver.value = false
    const file = event.dataTransfer.files[0]
    if (file) {
      processFile(file)
    }
  }
  
  const processFile = (file) => {
    datasetFile.value = file
    // Here you would typically parse the CSV/XLSX file and set preview data
    // This is a mock implementation
    previewHeaders.value = ['Column 1', 'Column 2', 'Column 3']
    previewData.value = [
      { col1: 'Data 1', col2: 'Data 2', col3: 'Data 3' },
      { col1: 'Data 4', col2: 'Data 5', col3: 'Data 6' }
    ]
  }
  
  const removeFile = () => {
    datasetFile.value = null
    previewHeaders.value = []
    previewData.value = []
  }
  </script>