<script lang="ts" setup>
import Navbar from './navigation/Navbar.vue'
import Sidebar from './navigation/Sidebar.vue'
</script>

<template>
  <div class="h-screen flex flex-col lg:flex-row">
    <!-- Mobile -->
    <Navbar />

    <!-- Desktop -->
    <Sidebar />

    <!-- Content -->
    <div class="relative w-full p-4 lg:py-6 lg:px-16 h-full">
      <slot />

      <!-- WhatsApp Icon -->
      <div class="absolute bottom-4 right-4 lg:bottom-6 lg:right-6">
        <a
          class="flex items-center gap-2 animate-bounce"
          href="https://wa.me/573237220514"
          target="_blank"
        >
          <span class="font-bold text-xl text-green-500 hover:text-green-600">¡Ayuda!</span>
          <i
            class="fa-brands fa-square-whatsapp text-[64px] text-green-500 hover:text-green-600 transition-colors duration-300"
          />
        </a>
      </div>
    </div>
  </div>
</template>
