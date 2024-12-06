<!-- components/CodeBlock.vue -->
<template>
    <div class="glass-card overflow-hidden">
      <div class="flex justify-between items-center px-4 py-2 border-b border-gray-700/30">
        <span class="text-sm text-gray-400">{{ label }}</span>
        <button 
          @click="copyCode" 
          class="text-gray-400 hover:text-white transition-colors"
          :title="copied ? 'Copied!' : 'Copy to clipboard'"
        >
          <Icon 
            :name="copied ? 'heroicons:check' : 'heroicons:clipboard'" 
            class="w-5 h-5"
          />
        </button>
      </div>
      <pre class="p-4 overflow-x-auto"><code :class="language">{{ code }}</code></pre>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    label: String,
    code: String,
    language: {
      type: String,
      default: 'plaintext'
    }
  })
  
  const copied = ref(false)
  
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(props.code)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  </script>
  
  <style scoped>
  .glass-card {
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  pre {
    background: rgba(0, 0, 0, 0.2);
    margin: 0;
  }
  </style>