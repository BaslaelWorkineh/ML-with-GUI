<template>
    <div class="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <!-- Mobile Menu Button -->
      <button 
        @click="isSidebarOpen = !isSidebarOpen" 
        class="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm"
      >
        <Icon :name="isSidebarOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-6 h-6 text-white" />
      </button>
  
      <!-- Sidebar -->
      <aside 
        :class="[
          'fixed md:sticky top-0 left-0 z-40 h-screen transition-transform duration-300',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]"
        class="doc-sidebar backdrop-blur-lg bg-gray-800/30 border-r border-gray-700/30 w-72"
      >
        <div class="p-6 border-b border-gray-700/30">
          <NuxtLink to="/" class="block" @click="isSidebarOpen = false">
            <h2 class="text-2xl font-bold gradient-text">ML No-Code Docs</h2>
            <p class="text-sm text-gray-400 mt-2">v1.0.0 Documentation</p>
          </NuxtLink>
        </div>
        
        <nav class="p-6 h-[calc(100vh-100px)] overflow-y-auto">
          <ul class="space-y-6">
            <li v-for="(section, index) in navigationSections" :key="index">
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {{ section.title }}
              </p>
              <ul class="space-y-3">
                <li v-for="link in section.links" :key="link.href">
                  <NuxtLink 
                    :to="link.href" 
                    class="text-gray-300 hover:text-white block transition-colors py-1 px-2 rounded-lg hover:bg-gray-700/30"
                    :class="{ 'bg-gray-700/30 text-white': currentSection === link.href }"
                    @click="handleNavigation(link.href)"
                  >
                    {{ link.text }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
  
      <!-- Backdrop -->
      <div 
        v-if="isSidebarOpen" 
        class="fixed inset-0 bg-black/50 z-30 md:hidden"
        @click="isSidebarOpen = false"
      ></div>
  
      <!-- Main Content -->
      <main class="flex-1 p-6 md:p-12 overflow-auto">
        <div class="max-w-4xl mx-auto">
          <slot />
          
          <!-- Documentation Content Sections -->
          <template v-for="section in sections" :key="section.id">
            <section :id="section.id" class="doc-section mb-16">
              <h2 class="text-3xl font-bold text-white mb-6 gradient-text">{{ section.title }}</h2>
              <div class="space-y-6">
                <CodeBlock 
                  v-if="section.code" 
                  :label="section.codeLabel" 
                  :code="section.code"
                  :language="section.language"
                />
                <div 
                  v-if="section.content" 
                  class="glass-card p-6 rounded-xl text-gray-300"
                  v-html="section.content"
                />
              </div>
            </section>
          </template>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  const isSidebarOpen = ref(false)
  const currentSection = ref('')
  
  const navigationSections = [
    {
      title: 'Getting Started',
      links: [
        { href: '#introduction', text: 'Introduction' },
        { href: '#installation', text: 'Installation' },
        { href: '#quick-start', text: 'Quick Start' },
      ]
    },
    {
      title: 'Core Concepts',
      links: [
        { href: '#architecture', text: 'Architecture' },
        { href: '#data-handling', text: 'Data Handling' },
        { href: '#model-training', text: 'Model Training' },
      ]
    },
    {
      title: 'Advanced',
      links: [
        { href: '#deployment', text: 'Deployment' },
        { href: '#optimization', text: 'Optimization' },
        { href: '#monitoring', text: 'Monitoring' },
      ]
    }
  ]
  
  const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `
      <p>
        Welcome to the ML No-Code documentation! This guide provides a comprehensive overview of how to set up, run, and optimize your machine learning projects with our platform. 
      </p>
      <p>
        Whether you're new to machine learning or an experienced professional, our no-code solution empowers you to build, train, and deploy ML models efficiently.
      </p>
    `
  },
  {
    id: 'installation',
    title: 'Installation',
    codeLabel: 'Install via npm',
    code: 'npm install @ml-nocode/core',
    language: 'bash',
    content: `
      <p>
        To start using the ML No-Code platform, install the core library via npm:
      </p>
      <pre><code>npm install @ml-nocode/core</code></pre>
      <p>
        After installation, import the library into your project to access all core functionalities.
      </p>
    `
  },
  {
    id: 'quick-start',
    title: 'Quick Start',
    content: `
      <ol class="list-decimal pl-6">
        <li>Go to the platform and log in with your credentials.</li>
        <li>Create a new project by selecting a template or starting from scratch.</li>
        <li>Upload your dataset using the drag-and-drop interface.</li>
        <li>Configure model settings such as the algorithm, parameters, and metrics.</li>
        <li>Click "Run" to train your model and monitor its performance.</li>
      </ol>
      <p>
        Within minutes, you'll have a trained model ready for deployment or further analysis.
      </p>
    `
  },
  {
    id: 'architecture',
    title: 'Architecture',
    content: `
      <p>
        Our platform uses a modular architecture designed to scale with your needs. It includes the following components:
      </p>
      <ul class="list-disc pl-6">
        <li><strong>Data Preprocessor:</strong> Cleans and formats raw data for training.</li>
        <li><strong>Model Trainer:</strong> Provides state-of-the-art machine learning algorithms.</li>
        <li><strong>Deployment Engine:</strong> Deploys trained models as RESTful APIs.</li>
      </ul>
    `
  },
  {
    id: 'model-training',
    title: 'Model Training',
    content: `
      <p>
        Training a model involves selecting the dataset, configuring parameters, and running the training process. Here's a breakdown:
      </p>
      <ul class="list-disc pl-6">
        <li>Choose a supervised or unsupervised algorithm based on your problem.</li>
        <li>Specify hyperparameters like learning rate and epochs.</li>
        <li>Run the training and monitor live metrics on the dashboard.</li>
      </ul>
    `
  },
  {
    id: 'deployment',
    title: 'Deployment',
    content: `
      <p>
        Once your model is trained, deploy it seamlessly via the platform. Deployment options include:
      </p>
      <ul class="list-disc pl-6">
        <li><strong>REST API:</strong> Generate an API endpoint for integration.</li>
        <li><strong>Export:</strong> Download the trained model in various formats (e.g., ONNX, TensorFlow).</li>
      </ul>
    `
  },
  {
    id: 'optimization',
    title: 'Optimization',
    content: `
      <p>
        To achieve better performance, optimize your models by:
      </p>
      <ul class="list-disc pl-6">
        <li>Performing hyperparameter tuning using grid or random search.</li>
        <li>Using advanced optimization techniques like learning rate schedulers.</li>
        <li>Analyzing feature importance and reducing redundant data.</li>
      </ul>
    `
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    content: `
      <p>
        Monitor deployed models in real-time to ensure reliability and performance. Features include:
      </p>
      <ul class="list-disc pl-6">
        <li>Live metrics like accuracy, precision, and recall.</li>
        <li>Error logging and alerts for anomalies.</li>
        <li>Automatic retraining triggers based on drift detection.</li>
      </ul>
    `
  }
]

  
  const handleNavigation = (href) => {
    currentSection.value = href
    isSidebarOpen.value = false
  }
  
  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            currentSection.value = `#${entry.target.id}`
          }
        })
      },
      { threshold: 0.5 }
    )
  
    document.querySelectorAll('.doc-section').forEach(section => {
      observer.observe(section)
    })
  })
  </script>
  
  <style scoped>
  .doc-sidebar {
    backdrop-filter: blur(8px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  .glass-card {
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  .glass-card:hover {
    box-shadow: 0 12px 48px rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.5);
  }
  
  .gradient-text {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  </style>
  