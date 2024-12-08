<template>
    <div class="bg-gradient min-h-screen flex items-center justify-center">
      <!-- Back to Home Button -->
      <button 
        class="absolute top-5 left-5 bg-gray-700 text-teal-300 py-2 px-4 rounded-lg shadow hover:bg-gray-600 transition" 
        @click="goHome">
        Back to Home
      </button>
  
      <!-- Copy Alert -->
      <div
        v-if="showCopyAlert"
        class="fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-teal-500 text-white rounded-lg shadow-lg z-50 transition-opacity duration-300"
      >
        Address copied to clipboard!
      </div>
  
      <!-- Donation Section -->
      <div class="w-full h-full p-8 flex flex-col justify-center items-center rounded-xl">
        <div class="text-center mb-8">
          <h1 class="text-5xl font-extrabold text-teal-500 mb-4 spotlight-text">
            Support My Cause
          </h1>
          <p class="text-lg text-gray-400">
            Your donation helps me continue providing innovative solutions. Every contribution counts, no matter how small!
          </p>
        </div>
  
        <!-- Selected Donation Amount -->
        <div class="text-center mb-6">
          <p class="text-2xl text-teal-300">Please donate using <strong>Ethereum</strong></p>
        </div>
  
        <!-- Ethereum Donation -->
        <div
          class="bg-gray-700 border border-yellow-400 shadow-lg p-6 rounded-md mb-6 relative cursor-pointer"
          @click="copyToClipboard"
        >
          <p class="text-sm text-gray-400">Ethereum Address:</p>
          <p class="text-xl font-semibold text-teal-300 break-all" :title="ethereumAddress">
            {{ ethereumAddress }}
          </p>
          <span class="absolute right-4 top-4 text-teal-300 hover:text-teal-500">Copy</span>
        </div>
  
        <!-- Donation Action -->
        <div class="text-center">
          <button @click="redirectToPayment" class="btn-donate">Go to Binance</button>
        </div>
      </div>
    </div>
  </template>
  
  
  
  
  <script setup>
  import { ref } from 'vue';
  
  // Ethereum address for donation
  const ethereumAddress = '0x4c2d3f445732620d8e5707afc2ff1692836bd163';
  
  // Reactive state for the copy alert
  const showCopyAlert = ref(false);
  
  const redirectToPayment = () => {
    const donationUrl = `https://accounts.binance.com/`;
    window.location.href = donationUrl;
  };
  
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(ethereumAddress)
      .then(() => {
        // Show the alert for 3 seconds
        showCopyAlert.value = true;
        setTimeout(() => {
          showCopyAlert.value = false;
        }, 3000);
      })
      .catch((err) => {
        alert('Failed to copy Ethereum address: ' + err);
      });
  };
  
  const goHome = () => {
    // Replace with your home page URL or routing logic
    window.location.href = '/';
  };
  </script>
  

  
  <style scoped>
  /* Gradient Background */
  .bg-gradient {
    background: linear-gradient(to bottom right, #0e0f23, #191b3f, #0e0f23);
    position: relative;
    overflow: hidden;
  }
  
  /* Button Styling */
  .btn-donate {
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    background: #f3b600;
    color: #000;
    text-align: center;
    width: 100%;
    max-width: 300px;
    position: relative;
    z-index: 1;
  }
  
  .btn-donate:hover {
    background-color: #f2a700;
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(243, 182, 0, 0.8), 0 0 40px rgba(243, 182, 0, 0.8);
  }
  
  .btn-donate::after {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    background: linear-gradient(45deg, #f3b600, #f2a700);
    border-radius: 8px;
    z-index: -1;
    filter: blur(10px);
  }
  
  /* Text Colors */
  .text-teal-500 {
    color: #38b2ac;
  }
  
  .text-teal-300 {
    color: #81e6d9;
  }
  
  .text-gray-400 {
    color: #e2e8f0;
  }

  /* Back to Home Button */
button.absolute {
  z-index: 50; /* Ensure it's above most elements */
}
button.absolute:hover {
  background-color: #374151; /* Slightly lighter gray for hover */
}
  </style>
  