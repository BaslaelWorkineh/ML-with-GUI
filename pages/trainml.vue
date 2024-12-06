<template>
  <div class="relative min-h-screen bg-gray-900 text-white flex overflow-hidden">
    <!-- Sidebar -->
    <Sidebar @navigate="setActiveSection" />

    <!-- Main Content -->
    <main class="flex-grow px-4 py-8 lg:px-8 lg:py-12 overflow-auto">
      <component :is="activeComponent" @navigate="setActiveSection" />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Import components
import Sidebar from "@/components/Sidebar.vue";
import DataUpload from "@/components/DataUpload.vue";
import ModelSelection from "@/components/ModelSelection.vue";
import Parameters from "@/components/Parameters.vue";
import Training from "@/components/Training.vue";
import Performance from "@/components/Performance.vue";
import Metrics from "@/components/Metrics.vue";
import Export from "@/components/Export.vue";

// Map for section components
const componentMap = {
  data: DataUpload,
  model: ModelSelection,
  parameters: Parameters,
  train: Training,
  performance: Performance,
  metrics: Metrics,
  download: Export,
};

// State for active component
const activeComponent = ref(componentMap.data); // Default to "Data Upload"

// Function to set active component
const setActiveSection = (section) => {
  activeComponent.value = componentMap[section];
};
</script>
