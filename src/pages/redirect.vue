<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const links = ref([
  'https://www.facebook.com/',
  'https://www.instagram.com/',
  'https://twitter.com/home'
])

function getRandomLink() {
    // Obtener un índice aleatorio dentro del rango de la longitud del arreglo
    const randomIndex = Math.floor(Math.random() * links.value.length);
    // Devolver el elemento del arreglo en el índice aleatorio
    return links.value[randomIndex];
}

function redirectUser() {
  const link = getRandomLink()
  const linkElement = document.createElement('a');
  linkElement.href = link;
  linkElement.click();
}

onMounted(() => {
  redirectUser()
})
</script>

<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <h1>Redirecting...</h1>
  </div>
</template>