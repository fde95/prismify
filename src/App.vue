<script setup>
import { ref } from 'vue';
import ImageUploader from './components/ImageUploader.vue';
import ConverterControls from './components/ConverterControls.vue';
import ImageList from './components/ImageList.vue';
import PrismaticBurst from './components/PrismaticBurst.vue';
import Footer from './components/Footer.vue';


import { convertImage } from './utils/imageConverter'


const images = ref([])
const convertedImages = ref([])

const format = ref('webp')
const quality = ref(0.8)

function setImages(files) {
  images.value = files
}

async function convertImages() {
  convertedImages.value = []

  for (const file of images.value) {
    const converted = await convertImage(file, format.value, quality.value)
    convertedImages.value.push(converted)
  }
}
</script>
<template>
  <main class="app-root">
    <!-- Background -->
    <div class="background-layer">
      <PrismaticBurst animationType="rotate3d" :intensity="2" :speed="0.5" :distort="0" :paused="false"
        :offset="{ x: 0, y: 0 }" :hoverDampness="0.25" :rayCount="0" mixBlendMode="lighten" />
    </div>

    <!-- Conteúdo -->
    <div class="content-layer container">
      <section class="converter">
        <div class="converter--highlight">
          <span class="converter--highlight--text"><img src="./assets/icon/icon-image.png" alt="icone de imagem"
              width="16" style="margin-bottom: -3px;" loading="lazy">
            conversor de imagens
          </span>
        </div>
        <h1 class="converter--title">Onde a criação acompanha o seu ritmo<br />
          com menos barreiras e mais fluxo.</h1>

        <div class="converter--content">
          <ImageUploader @images-selected="setImages" />
          <ConverterControls v-model:format="format" v-model:quality="quality" @convert="convertImages" />

          <ImageList :images="convertedImages" />
        </div>
      </section>
    </div>
  </main>
  <Footer></Footer>
</template>