<template>
    <div class="overlay">
      <div class="modal">
        <h2>Insert Data</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="csvFile">Upload CSV File:</label>
            <input type="file" id="csvFile" accept=".csv" @change="handleFileChange" required />
          </div>
          <div class="form-group">
            <label for="columnsToDrop">Columns to Drop (comma-separated):</label>
            <input
              type="text"
              id="columnsToDrop"
              v-model="columnsToDrop"
              placeholder="e.g., column1,column2"
            />
          </div>
          <button class="link" type="submit">Submit</button>
          <button class="link" type="button" @click="$emit('close')">Close</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const csvFile = ref(null);
  const columnsToDrop = ref('');
  
  const handleFileChange = (event) => {
    csvFile.value = event.target.files[0];
  };
  
  const handleSubmit = () => {
    console.log('File:', csvFile.value);
    console.log('Columns to drop:', columnsToDrop.value);
    // Close the modal (emit close event)
    $emit('close');
  };
  </script>
  
  <style scoped>
  /* Add modal and overlay styles */
  </style>
  