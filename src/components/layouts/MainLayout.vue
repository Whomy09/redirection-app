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
    <div class="w-full p-4 lg:py-6 lg:px-16 h-full">
      <slot />
    </div>
  </div>
</template>
