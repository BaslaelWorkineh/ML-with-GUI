<template>
  <div class="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          Choose Your Perfect Plan
        </h2>
        <p class="text-xl text-gray-400">Select the plan that fits your needs</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div
          v-for="(plan, index) in plans"
          :key="plan.title"
          class="pricing-card relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 flex flex-col transform transition-all duration-300 hover:scale-105"
          :class="{ 'popular-plan': index === 1 }"
        >
          <div v-if="index === 1" class="popular-badge">Most Popular</div>

          <h3 class="text-2xl font-bold mb-2">{{ plan.title }}</h3>
          <p class="text-gray-400 mb-6">{{ plan.description }}</p>

          <div class="price-container mb-8">
            <span class="text-5xl font-bold gradient-text">{{ plan.price }}</span>
            <span class="text-gray-400 ml-2">/month</span>
          </div>

          <ul class="mb-8 flex-grow space-y-4">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="flex items-center text-gray-300"
            >
              <div class="feature-icon-wrapper mr-3">
                <i class="fas fa-check-circle"></i>
              </div>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <button
            class="cta-button w-full py-4 rounded-xl font-semibold text-white transform transition-all duration-300"
            :class="index === 1 ? 'primary-button' : 'secondary-button'"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const plans = [
  {
    title: "Basic",
    description: "Perfect for small projects.",
    price: "$10",
    features: ["5 Projects", "Basic Support", "10GB Storage", "Email Support", "Basic Analytics"],
  },
  {
    title: "Pro",
    description: "Ideal for growing teams.",
    price: "$30",
    features: [
      "50 Projects",
      "Priority Support",
      "50GB Storage",
      "24/7 Phone Support",
      "Advanced Analytics",
      "API Access",
    ],
  },
  {
    title: "Enterprise",
    description: "For large-scale operations.",
    price: "$100",
    features: [
      "Unlimited Projects",
      "24/7 Support",
      "1TB Storage",
      "Dedicated Manager",
      "Custom Analytics",
      "White Label Option",
    ],
  },
];
</script>

<style scoped>
.pricing-card {
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.pricing-card:hover {
  box-shadow: 0 12px 48px rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.5);
}

.popular-plan {
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.2);
}

.popular-badge {
  position: absolute;
  top: -15px;
  right: 20px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35);
}

.gradient-text {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.feature-icon-wrapper {
  color: #6366f1;
  font-size: 1.25rem;
}

.primary-button {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35);
}

.primary-button:hover {
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.45);
  transform: translateY(-2px);
}

.secondary-button {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.25);
}

.secondary-button:hover {
  background: rgba(99, 102, 241, 0.2);
  transform: translateY(-2px);
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.pricing-card {
  animation: float 1s ease-in-out infinite;
  animation-play-state: paused;
}

.pricing-card:hover {
  animation-play-state: running;
}
</style>