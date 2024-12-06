<template>
  <div class="flex min-h-screen bg-gray-900 text-white">
    <!-- Sidebar -->
    <aside class="hidden lg:flex flex-col w-64 bg-gray-800 p-6">
      <h1 class="text-2xl font-bold text-indigo-400 mb-8">ML Training App</h1>
      <nav class="space-y-4">
        <a href="#data" class="block text-gray-300 hover:text-white transition">
          Insert Data
        </a>
        <a href="#model" class="block text-gray-300 hover:text-white transition">
          Choose Model
        </a>
        <a href="#train" class="block text-gray-300 hover:text-white transition">
          Train Model
        </a>
        <a href="#download" class="block text-gray-300 hover:text-white transition">
          Download Model
        </a>
      </nav>
      <div class="mt-auto text-sm text-gray-500">
        &copy; 2024 ML Training App. All rights reserved.
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-grow px-6 py-12 lg:pl-72">
      <!-- Hero Section -->
      <section class="mb-16">
        <h2 class="text-4xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
          Train ML Models Effortlessly
        </h2>
        <p class="mt-4 text-gray-400">
          Upload your labeled data, select a machine learning model, and get a downloadable trained model in just a few steps.
        </p>
      </section>

      <!-- Data Insertion Section -->
      <section id="data" class="mb-16">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-3xl font-bold">1. Insert Data</h3>
          <p class="text-gray-400">Start by providing your labeled data.</p>
        </div>
        <div class="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Textarea -->
            <div>
              <label class="block text-sm font-medium mb-2">Data Rows</label>
              <textarea
                class="w-full h-48 bg-gray-700 text-gray-200 rounded-lg p-4 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter data row by row (comma-separated for columns)"
              ></textarea>
            </div>

            <!-- File Upload -->
            <div>
              <label class="block text-sm font-medium mb-2">Upload CSV</label>
              <input
                type="file"
                accept=".csv"
                class="block w-full px-4 py-2 bg-gray-800 text-gray-400 file:bg-indigo-600 file:text-white file:font-semibold file:rounded-lg hover:file:bg-indigo-700 transition"
              />
              <div class="mt-4">
                <button
                  class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg shadow-lg transition"
                >
                  Preview Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Model Selection Section -->
      <section id="model" class="mb-16">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-3xl font-bold">2. Choose Model</h3>
          <p class="text-gray-400">Select the best machine learning model for your data.</p>
        </div>
        <div class="bg-gray-800 rounded-lg p-6 shadow-lg">
          <label class="block text-sm font-medium mb-4">Available Models</label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              v-for="model in models"
              :key="model"
              class="bg-gray-700 hover:bg-indigo-600 text-white py-4 px-6 rounded-lg shadow-lg font-medium transition"
            >
              {{ model }}
            </button>
          </div>
        </div>
      </section>

      <!-- Training Section -->
      <section id="train" class="mb-16">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-3xl font-bold">3. Train the Model</h3>
          <p class="text-gray-400">Run the training process with a single click.</p>
        </div>
        <div class="text-center">
          <button
            @click="trainModel"
            class="bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-12 rounded-lg shadow-lg text-lg font-bold transition"
          >
            Train Model
          </button>
          <p v-if="isTraining" class="mt-4 text-gray-400">Training in progress...</p>
        </div>
      </section>

      <!-- Download Section -->
      <section id="download" class="mb-16">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-3xl font-bold">4. Download Your Model</h3>
          <p class="text-gray-400">Get your trained model in a downloadable format.</p>
        </div>
        <div class="text-center">
          <button
            @click="downloadModel"
            :disabled="!isModelReady"
            class="bg-green-600 hover:bg-green-700 text-white py-4 px-12 rounded-lg shadow-lg text-lg font-bold transition disabled:opacity-50"
          >
            Download Model
          </button>
          <p v-if="!isModelReady" class="mt-4 text-gray-400">
            Train your model before downloading.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
const isTraining = ref(false);
const isModelReady = ref(false);
const models = [
  "Linear Regression",
  "Logistic Regression",
  "Decision Tree",
  "Random Forest",
  "Neural Network",
];

const trainModel = () => {
  isTraining.value = true;
  setTimeout(() => {
    isTraining.value = false;
    isModelReady.value = true;
    alert("Training complete!");
  }, 3000);
};

const downloadModel = () => {
  alert("Downloading model...");
};
</script>
