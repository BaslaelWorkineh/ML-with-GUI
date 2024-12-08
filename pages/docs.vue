<template>
  <div class="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ">

    <!-- Sidebar -->
    <aside :class="[
      'fixed md:sticky top-0 left-0 z-40 h-screen transition-transform duration-300 pl-6',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]" class="doc-sidebar backdrop-blur-lg bg-gray-800/30 w-72">
      <div class="py-6">
        <NuxtLink to="/" class="block" aria-label="Go to Homepage">
          <h2 class="text-2xl font-bold gradient-text">ML No-Code Docs</h2>
          <p class="text-sm text-gray-400 mt-2">v1.0.0 Documentation</p>
        </NuxtLink>
      </div>

      <nav class="pr-6 h-[calc(100vh-100px)] overflow-y-auto">
  <ul class="space-y-6">
    <li v-for="(section, index) in navigationSections" :key="index">
      <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        {{ section.title }}
      </p>
      <ul class="space-y-3">
        <li v-for="link in section.links" :key="link.href">
          <NuxtLink
            :to="link.href"
            class="flex items-center transition-colors py-2 px-3 rounded-lg"
            :class="[
              'text-gray-300 hover:text-white hover:bg-gray-700/30',
              { 'bg-gray-700/30 text-white': currentSection === link.href }
            ]"
            @click="handleNavigation(link.href)"
            aria-label="Navigate to {{ link.text }}"
          >
            <!-- Icon component for dynamic icon rendering -->
            <Icon :name="link.icon" class="w-5 h-5 mr-3" />
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>
    </li>
  </ul>
</nav>

    </aside>



    <!-- Main Content -->
    <main class="flex-1 px-5 md:px-5 py-8 overflow-auto">
      <!-- Documentation Content -->
      <section class="max-w-4xl mx-auto">
        <slot />
        <template v-for="section in sections" :key="section.id">
          <article :id="section.id" class="doc-section mb-16">
            <h2 class="text-3xl font-bold text-white mb-6 gradient-text">{{ section.title }}</h2>
            <div class="space-y-6">
              <CodeBlock v-if="section.code" :label="section.codeLabel" :code="section.code"
                :language="section.language" class="bg-gray-800/50 rounded-lg overflow-hidden" />
              <div v-if="section.content" class="text-gray-300 prose prose-invert max-w-none"
                v-html="section.content" />
            </div>
          </article>
        </template>
      </section>
    </main>

    <!-- Table of Contents -->
    <aside class="hidden xl:block w-72 shrink-0 sticky top-0 h-screen overflow-y-auto py-8">
      <div class="backdrop-blur-lg bg-gray-800/30 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-white mb-4">Table of Contents</h3>
        <ul class="space-y-3">
          <li v-for="section in sections" :key="section.id">
            <a :href="`#${section.id}`" class="block py-1 px-2 rounded transition-colors" :class="[
              'text-gray-400 hover:text-white hover:bg-gray-700/30',
              { 'text-white bg-gray-700/30': currentSection === `#${section.id}` }
            ]" aria-label="Go to {{ section.title }}">
              {{ section.title }}
            </a>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isSidebarOpen = ref(false)
const currentSection = ref('')
const selectedPackageManager = ref('npm')

const packageManagers = [
  {
    name: 'npm',
    icon: 'carbon-logo-npm',
    command: 'npm install @ml-nocode/core'
  },
  {
    name: 'pnpm',
    icon: 'carbon-package',
    command: 'pnpm add @ml-nocode/core'
  },
  {
    name: 'yarn',
    icon: 'carbon-logo-yarn',
    command: 'yarn add @ml-nocode/core'
  }
]

const getInstallCommand = () => {
  return packageManagers.find(pm => pm.name === selectedPackageManager.value).command
}

// ... rest of your script remains the same ...


const navigationSections = [
  {
    title: 'Getting Started',
    links: [
      { href: '#introduction', text: 'Introduction', icon: 'heroicons:light-bulb' }, // 'document-text' for Introduction
      { href: '#installation', text: 'Installation', icon: 'heroicons-outline:document-text' }, // 'device-phone' for Installation
      { href: '#quick-start', text: 'Quick Start', icon: 'heroicons-outline:sparkles' }, // 'sparkles' for Quick Start
    ]
  },
  {
    title: 'Core Concepts',
    links: [
      { href: '#architecture', text: 'Architecture', icon: 'heroicons-outline:building-office' }, // 'building-office' for Architecture
      { href: '#data-handling', text: 'Data Handling', icon: 'heroicons-outline:database' }, // 'database' for Data Handling
      { href: '#model-training', text: 'Model Training', icon: 'heroicons-outline:clipboard-check' }, // 'clipboard-check' for Model Training
    ]
  },
  {
    title: 'Advanced',
    links: [
      { href: '#deployment', text: 'Deployment', icon: 'heroicons-outline:cloud-upload' }, // 'cloud-upload' for Deployment
      { href: '#optimization', text: 'Optimization', icon: 'heroicons-outline:adjustments' }, // 'adjustments' for Optimization
      { href: '#monitoring', text: 'Monitoring', icon: 'heroicons-outline:chart-bar' }, // 'chart-bar' for Monitoring
    ]
  }
]


const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `
    <section class="from-gray-900 via-gray-800 to-gray-900 rounded-lg">
      <h1 class="text-4xl font-extrabold text-white mb-6 gradient-text">Welcome to ML No-Code</h1>
      <p class="text-lg text-gray-300 mb-4 leading-relaxed">
        The ML No-Code platform is your gateway to machine learning, eliminating the need for coding. Whether you're a business professional, a researcher, or a tech enthusiast, you can now build and train ML models with your data in just a few clicks.
      </p>
      <p class="text-lg text-gray-300 mb-4 leading-relaxed">
        With an intuitive interface and a robust backend, this platform simplifies the complex tasks of model training, evaluation, and deployment. Leverage the power of state-of-the-art algorithms without worrying about technical complexities.
      </p>
      <div class="bg-gray-800/50 rounded-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold text-indigo-400 mb-3">What You Can Achieve</h2>
        <ul class="list-disc pl-6 text-gray-300 space-y-2">
          <li>Upload your datasets and let the platform handle preprocessing.</li>
          <li>Train models using cutting-edge algorithms with configurable parameters.</li>
          <li>Monitor training progress with interactive visualizations and real-time metrics.</li>
          <li>Deploy your trained models as production-ready APIs.</li>
        </ul>
      </div>
      <p class="text-lg text-gray-300 mb-6 leading-relaxed">
        This documentation is your complete guide to mastering the ML No-Code platform. Here’s how it’s structured:
      </p>
      <ol class="list-decimal pl-6 text-gray-300 space-y-2">
        <li><strong>Setup:</strong> Clone the backend repository, install dependencies, and run the server.</li>
        <li><strong>Usage:</strong> Use the website to upload data, configure training, and evaluate results.</li>
        <li><strong>Deployment:</strong> Deploy trained models as RESTful APIs or download them in multiple formats.</li>
        <li><strong>Optimization:</strong> Fine-tune model parameters and monitor performance post-deployment.</li>
      </ol>
      <div class="py-6 px-4 mt-10 border-l-4 border-indigo-500 bg-gray-800/40 rounded-lg text-gray-300">
        <p class="italic">
          "Transform your data into actionable insights without writing a single line of code."
        </p>
      </div>
      <p class="text-lg text-gray-300 mt-6">
        Start your journey now and unlock the full potential of your data. Follow this guide step-by-step to harness the power of machine learning with ease.
      </p>
    </section>
  `
  }

  ,

  {
    id: 'installation',
    title: 'Insallation',
    code: 'git clone git@github.com:BaslaelWorkineh/LinearRegressionBackend.git',
    language: 'bash',
    content: `
    <h3 class="text-lg font-bold text-white mb-4">Clone the Repository</h3>
    <p>To begin, clone the backend repository to your local machine by running the command provided in the code block.</p>
   
    `
  },
  {
    id: 'install-dependencies',
    title: '',
    code: 'cd board && pip install -r requirements.txt',
    language: 'bash',
    content: `
    <h3 class="text-lg font-bold text-white mb-4">Install Dependencies</h3>
    <p>Navigate into the project directory and install dependencies using the provided command:</p>
    <div class="glass-card overflow-hidden my-4">
   </div>
    `
  },
  {
    id: 'quick-start',
    title: 'Quick Start',
    codeLabel: 'Run the Backend Server',
    code: 'python run.py',
    language: 'bash',
    content: `
    <div class="glass-card p-6">
      <h3 class="text-xl font-bold text-white mb-4">Quick Start Guide</h3>
      <p class="text-gray-400 mb-4">
        Follow these steps to quickly set up and begin using the platform:
      </p>
      <ol class="list-decimal list-outside pl-6 space-y-3 text-gray-300">
        <li class="leading-6">
          <span class="font-semibold">Clone the Backend Repository:</span> Refer to the <a href="#installation" class="text-blue-400 underline">Installation</a> section for detailed steps.
        </li>
        <li class="leading-6">
          <span class="font-semibold">Start the Backend Server:</span> Use the provided command below to get your server running.
        </li>
        <div class="glass-card overflow-hidden my-4">
          <div class="flex justify-between items-center px-4 py-2 border-b border-gray-700/30">
            <span class="text-sm text-gray-400">Run the Backend Server</span>
            <button 
              @click="copyCode('npm start')" 
              class="text-gray-400 hover:text-white transition-colors"
              title="Copy to clipboard"
            >
              <Icon :name="copied ? 'heroicons:check' : 'heroicons:clipboard'" class="w-5 h-5" />
            </button>
          </div>
          <pre class="p-4 overflow-x-auto"><code class="language-bash"></code></pre>
        </div>
        <li class="leading-6">
          <span class="font-semibold">Open the Website:</span> Navigate to the URL specified in this documentation to connect to the backend.
        </li>
        <li class="leading-6">
          <span class="font-semibold">Upload Your Dataset:</span> Go to the "Data Upload" section on the website and add your dataset.
        </li>
        <li class="leading-6">
          <span class="font-semibold">Choose an Algorithm:</span> Select a machine learning algorithm, adjust the parameters as needed, and proceed.
        </li>
        <li class="leading-6">
          <span class="font-semibold">Train Your Model:</span> Click "Train Model" to initiate training. Monitor the progress and review the results on the dashboard.
        </li>
      </ol>
    </div>
  `
  }
  ,
  {
    id: 'architecture',
    title: 'Architecture',
    content: `
    <div class="glass-card p-6">
      <h3 class="text-xl font-bold text-white mb-4">Platform Architecture</h3>
      <p class="text-gray-400 mb-4">
        Our platform leverages a client-server architecture designed for scalability and ease of use. The key components include:
      </p>
      <ul class="list-disc pl-6 space-y-3 text-gray-300">
        <li class="leading-6">
          <span class="font-semibold text-white">Backend Server:</span> 
          Handles data preprocessing, model training, and API integration for seamless performance.
        </li>
        <li class="leading-6">
          <span class="font-semibold text-white">Frontend Website:</span> 
          Offers a user-friendly interface for uploading datasets, training models, and visualizing results intuitively.
        </li>
        <li class="leading-6">
          <span class="font-semibold text-white">Database:</span> 
          Securely stores datasets, trained models, and relevant metadata for efficient data management.
        </li>
      </ul>
    </div>
  `
  }
  ,
  {
    id: 'model-training',
    title: 'Model Training',
    codeLabel: 'Sample Training Script',
    language: 'bash',
    content: `
    <div class="glass-card p-6">
      <h3 class="text-xl font-bold text-white mb-4">Model Training</h3>
      <p class="text-gray-400 mb-4">
        The model training process is streamlined to ensure ease of use and efficiency. Follow these steps:
      </p>
      <ul class="list-disc pl-6 space-y-3 text-gray-300">
        <li class="leading-6">
          <span class="font-semibold text-white">Step 1:</span> Upload your dataset using the web interface.
        </li>
        <li class="leading-6">
          <span class="font-semibold text-white">Step 2:</span> Choose the machine learning algorithm and configure hyperparameters to fit your specific needs.
        </li>
        <li class="leading-6">
          <span class="font-semibold text-white">Step 3:</span> Start the training process and monitor live metrics such as accuracy, loss, and training progress.
        </li>
      </ul>
      <p class="text-gray-400 mt-4">
        The backend system takes care of data preprocessing, training, and evaluating the model automatically, making the process seamless for users.
      </p>
    </div>
  `
  }
  ,
  {
    id: 'deployment',
    title: 'Deployment',
    content: `
    <div class="glass-card p-6">
      <h3 class="text-xl font-bold text-white mb-4">Deployment</h3>
      <p class="text-gray-400 mb-4">
        At present, the platform does not include built-in deployment capabilities. However, deployment functionality is a high-priority feature planned for future updates. This will enable you to:
      </p>
      <ul class="list-disc pl-6 space-y-3 text-gray-300">
        <li class="leading-6">
          Seamlessly deploy trained models as REST API endpoints for integration with other applications.
        </li>
        <li class="leading-6">
          Automate deployment pipelines for production-ready solutions.
        </li>
        <li class="leading-6">
          Ensure scalability and monitoring for deployed models in live environments.
        </li>
      </ul>
      <p class="text-gray-400 mt-4">
        Until deployment features are implemented, you can manually export trained models and integrate them into your preferred frameworks or applications.
      </p>
    </div>
  `
  }
  ,
  {
    id: 'optimization',
    title: 'Optimization',
    content: `
    <div class="glass-card p-6 space-y-4">
      <h3 class="text-xl font-bold text-white">Optimization</h3>
      <p class="text-gray-300">
        Enhance your model's performance using our optimization tools, which allow you to:
      </p>
      <ul class="list-disc pl-6 space-y-3 text-gray-300">
        <li class="leading-6">
          <span class="font-semibold text-gray-100">Tune Hyperparameters:</span> Adjust values such as learning rate, maximum depth, and regularization parameters.
        </li>
        <li class="leading-6">
          <span class="font-semibold text-gray-100">Experiment with Feature Engineering:</span> Modify and create features to improve data representation for better model accuracy.
        </li>
        <li class="leading-6">
          <span class="font-semibold text-gray-100">Visualize Results:</span> Use graphical tools to analyze metrics, spot trends, and identify areas for further refinement.
        </li>
      </ul>
    </div>
  `
  }
  ,
  {
    id: 'monitoring',
    title: 'Monitoring',
    content: `
    <div class="glass-card p-6 space-y-4">
      <h3 class="text-xl font-bold text-white">Monitoring</h3>
      <p class="text-gray-300">
        Keep track of your model's performance in production using the monitoring dashboard. It provides powerful tools to ensure optimal performance and identify issues proactively:
      </p>
      <ul class="list-disc pl-6 space-y-3 text-gray-300">
        <li class="leading-6">
          <span class="font-semibold text-gray-100">Visualize Metrics:</span> Track key performance indicators such as <span class="text-gray-100">precision, recall</span>, and <span class="text-gray-100">latency</span>.
        </li>
        <li class="leading-6">
          <span class="font-semibold text-gray-100">Set Alerts:</span> Receive notifications for anomalies, data drifts, or unexpected behaviors to maintain reliability.
        </li>
        <li class="leading-6">
          <span class="font-semibold text-gray-100">Schedule Retraining:</span> Automate periodic retraining based on performance trends or thresholds for consistent accuracy.
        </li>
      </ul>
    </div>
  `
  }

];



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

.gradient-text {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

:deep(.prose) {
  max-width: none;
}

:deep(.prose a) {
  color: #818cf8;
}

:deep(.prose strong) {
  color: #f3f4f6;
}
</style>