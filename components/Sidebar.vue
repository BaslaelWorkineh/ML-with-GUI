<template>
  <aside :class="[
    'fixed lg:sticky top-0 h-screen lg:w-72 bg-gray-800/95 backdrop-blur-sm border-r border-gray-700 transition-all duration-300 z-40',
    isSidebarOpen ? 'w-72 left-0' : '-left-72 lg:left-0'
  ]">
    <div class="h-full flex flex-col">
      <!-- Logo Area -->
      <div class="p-6 border-b border-gray-700">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          ML Training Hub
        </h1>
        <p class="text-sm text-gray-400 mt-2">Advanced Model Training Platform</p>
      </div>

      <!-- Main Navigation -->
      <nav class="flex-1 p-6 space-y-6 overflow-y-auto">
        <div v-for="(section, index) in navigationSections" :key="index" class="space-y-4">
          <h3 class="text-xs uppercase tracking-wider text-gray-400">{{ section.title }}</h3>
          <div class="space-y-2">
            <button
              v-for="item in section.items"
              :key="item.href"
              @click="navigateTo(item.href)"
              class="flex items-center space-x-3 w-full text-left p-3 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-white transition group">
              <!-- Dynamic Icon -->
              <Icon :name="item.icon" class="w-5 h-5 text-gray-400 group-hover:text-indigo-400" />
              <span>{{ item.label }}</span>
            </button>
          </div>
        </div>
      </nav>

      <!-- User Section -->
      <div class="p-6 border-t border-gray-700">
        <div class="flex items-center space-x-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <Icon name="heroicons:user-circle" class="text-white w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium">Project Status</p>
            <p class="text-xs text-gray-400">{{ projectStatus }}</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
// Sidebar state and project status
const isSidebarOpen = ref(false);
const projectStatus = ref("Active Training Session");

// Navigation sections data
const navigationSections = [
  {
    title: "Model Development",
    items: [
      { label: "Data Upload", href: "data", icon: "heroicons-outline:arrow-up-tray"},
      { label: "Model Selection", href: "model", icon: "heroicons:light-bulb" },
      { label: "Parameters", href: "parameters", icon: "heroicons-outline:cog-8-tooth" },
      { label: "Training", href: "train", icon: "heroicons:play" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { label: "Performance", href: "performance", icon: "heroicons:chart-bar" },
      { label: "Metrics", href: "metrics", icon: "heroicons:chart-pie" },
      { label: "Export", href: "download", icon: "heroicons:arrow-down-tray" },
    ],
  },
];

// Emit navigation event
const emit = defineEmits(["navigate"]);
const navigateTo = (section) => {
  emit("navigate", section);
};
</script>
