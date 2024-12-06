<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
    <!-- Sticky Sidebar -->
    <aside class="sticky top-0 h-screen w-64 bg-gray-800 p-6 hidden lg:block">
      <h1 class="text-2xl font-bold text-indigo-400 mb-8">ML Training Platform</h1>
      <nav class="space-y-6">
        <a href="#data" class="flex items-center space-x-2 text-gray-300 hover:text-white transition">
          <i class="fas fa-file-upload"></i>
          <span>Insert Data</span>
        </a>
        <a href="#model" class="flex items-center space-x-2 text-gray-300 hover:text-white transition">
          <i class="fas fa-brain"></i>
          <span>Select Model</span>
        </a>
        <a href="#parameters" class="flex items-center space-x-2 text-gray-300 hover:text-white transition">
          <i class="fas fa-cogs"></i>
          <span>Model Parameters</span>
        </a>
        <a href="#train" class="flex items-center space-x-2 text-gray-300 hover:text-white transition">
          <i class="fas fa-play-circle"></i>
          <span>Train Model</span>
        </a>
        <a href="#download" class="flex items-center space-x-2 text-gray-300 hover:text-white transition">
          <i class="fas fa-download"></i>
          <span>Download</span>
        </a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-grow px-4 py-6 lg:px-6 lg:py-12">
      <!-- Hero Section -->
      <section class="mb-12">
        <h2 class="text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
          Intuitive Machine Learning Platform
        </h2>
        <p class="mt-4 text-gray-400 text-sm lg:text-base">
          Upload your dataset, choose a model, and train it—all without writing a single line of code!
        </p>
      </section>

      <!-- Model Selection Section -->
      <section id="model" class="mb-12">
        <div class="flex items-center space-x-4 mb-6">
          <i class="fas fa-brain text-indigo-400 text-2xl"></i>
          <h3 class="text-2xl lg:text-3xl font-bold">Select Your Model</h3>
        </div>
        <div class="bg-gray-800 rounded-lg p-4 lg:p-6 shadow-lg">
          <label class="block text-sm font-medium mb-4">Available Models</label>
          <select
            v-model="selectedModel"
            @change="updateFields"
            class="w-full bg-gray-700 text-gray-200 rounded-lg p-3 lg:p-4 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
          >
            <option v-for="model in models" :key="model">{{ model }}</option>
          </select>
        </div>
      </section>

      <!-- CSV Upload Section -->
      <section id="data" class="mb-12">
        <div class="flex items-center space-x-4 mb-6">
          <i class="fas fa-file-upload text-indigo-400 text-2xl"></i>
          <h3 class="text-2xl lg:text-3xl font-bold">Upload Your Dataset</h3>
        </div>
        <div class="bg-gray-800 rounded-lg p-4 lg:p-6 shadow-lg">
          <label for="csvFile" class="block text-sm font-medium mb-4">Upload CSV File</label>
          <div class="relative flex flex-col lg:flex-row items-center lg:space-x-4">
            <input
              type="file"
              id="csvFile"
              accept=".csv"
              class="hidden"
              @change="handleFileUpload"
            />
            <label
              for="csvFile"
              class="cursor-pointer w-full lg:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg shadow-lg text-center hover:from-indigo-400 hover:to-purple-500 transition"
            >
              <i class="fas fa-upload"></i> Choose File
            </label>
            <p v-if="csvFileName" class="mt-4 lg:mt-0 text-sm text-gray-400">
              <i class="fas fa-file-alt"></i> {{ csvFileName }}
            </p>
          </div>
        </div>
      </section>

      <!-- Dynamic Fields Section -->
      <section id="parameters" class="mb-12">
        <div class="flex items-center space-x-4 mb-6">
          <i class="fas fa-cogs text-indigo-400 text-2xl"></i>
          <h3 class="text-2xl lg:text-3xl font-bold">Set Model Parameters</h3>
        </div>
        <div class="bg-gray-800 rounded-lg p-4 lg:p-6 shadow-lg">
          <div v-for="field in modelFields" :key="field.name" class="mb-6">
            <label :for="field.name" class="block text-sm font-medium mb-2">{{ field.label }}</label>
            <input
              v-if="field.type === 'text'"
              :id="field.name"
              :type="field.type"
              v-model="field.value"
              :placeholder="field.placeholder"
              class="w-full bg-gray-700 text-gray-200 rounded-lg p-3 lg:p-4 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
            />
            <select
              v-else-if="field.type === 'dropdown'"
              :id="field.name"
              v-model="field.value"
              class="w-full bg-gray-700 text-gray-200 rounded-lg p-3 lg:p-4 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
            >
              <option v-for="option in field.options" :key="option">{{ option }}</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Training and Download Buttons -->
      <section id="train">
        <div class="flex items-center space-x-4 mb-6">
          <i class="fas fa-play-circle text-indigo-400 text-2xl"></i>
          <h3 class="text-2xl lg:text-3xl font-bold">Train & Download</h3>
        </div>
        <div class="bg-gray-800 rounded-lg p-4 lg:p-6 shadow-lg flex flex-col lg:flex-row items-center justify-between">
          <button
            @click="trainModel"
            class="bg-green-600 hover:bg-green-700 text-white py-3 px-6 lg:px-8 rounded-lg shadow-lg transition w-full lg:w-auto mb-4 lg:mb-0"
          >
            <i class="fas fa-play"></i> Train Model
          </button>
          <button
            @click="downloadModel"
            class="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 lg:px-8 rounded-lg shadow-lg transition w-full lg:w-auto"
          >
            <i class="fas fa-download"></i> Download Model
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const models = ["Linear Regression", "Logistic Regression", "Decision Tree", "Neural Network"];
const selectedModel = ref(models[0]);
const modelFields = reactive([]);
const csvFileName = ref("");

const modelConfig = {
  "Linear Regression": [{ name: "target", label: "Target Column", type: "text", placeholder: "e.g., price" }],
  "Logistic Regression": [{ name: "target", label: "Target Column", type: "text", placeholder: "e.g., is_purchased" }],
  "Decision Tree": [{ name: "maxDepth", label: "Max Depth", type: "text", placeholder: "e.g., 5" }],
  "Neural Network": [
    { name: "hiddenLayers", label: "Hidden Layers (comma-separated)", type: "text", placeholder: "e.g., 64,32,16" },
    { name: "activation", label: "Activation Function", type: "dropdown", options: ["relu", "sigmoid", "tanh", "softmax"] },
  ],
};

const updateFields = () => {
  const fields = modelConfig[selectedModel.value] || [];
  modelFields.splice(0, modelFields.length, ...fields.map((field) => ({ ...field, value: "" })));
};

const trainModel = () => alert("Training started!");
const downloadModel = () => alert("Model downloaded!");
const handleFileUpload = (e) => (csvFileName.value = e.target.files[0]?.name || "");

// Initialize fields for the default model
updateFields();
</script>
