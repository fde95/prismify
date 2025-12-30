<script setup>
import { ref } from 'vue';
import ImageUploader from './components/ImageUploader.vue';
import ConverterControls from './components/ConverterControls.vue';
import ImageList from './components/ImageList.vue';
import PrismaticBurst from './components/PrismaticBurst.vue';
import Footer from './components/Footer.vue';


import { convertImage } from './utils/imageConverter'


const images = ref([]) // array of File
const convertedImages = ref([])

const format = ref('webp')
const quality = ref(0.8)

const isConverting = ref(false)
const progress = ref(0)
const convertingNames = ref([])
const resetKey = ref(0)

function setImages(files) {
  // files is the full current list from uploader - replace local reference
  images.value = files || []
}

function clearAll() {
  // revoke converted image URLs to free memory
  convertedImages.value.forEach(ci => {
    try { URL.revokeObjectURL(ci.url) } catch (e) { /* ignore */ }
  })
  convertedImages.value = []
  images.value = []
  // notify uploader to reset previews
  resetKey.value++
}

async function convertImages() {
  if (!images.value.length) return

  convertedImages.value = []
  isConverting.value = true
  progress.value = 0

  const total = images.value.length

  for (let i = 0; i < total; i++) {
    const file = images.value[i]
    // show spinner on this file
    convertingNames.value = [file.name]

    // small artificial delay so spinner is visible
    await new Promise(r => setTimeout(r, 100))

    const converted = await convertImage(file, format.value, format.value === 'png' ? undefined : quality.value)

    convertedImages.value.push(converted)

    // update progress
    progress.value = Math.round(((i + 1) / total) * 100)

    // small delay to make progress visually smoother
    await new Promise(r => setTimeout(r, 120))
  }

  // done
  isConverting.value = false
  convertingNames.value = []
  // after conversion we may keep original images list as-is
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
          <span class="converter--highlight--text"><img src="./assets/icon/icon-image.webp" alt="icone de imagem"
              width="16" style="margin-bottom: -3px;" loading="lazy">
            conversor de imagens
          </span>
        </div>
        <h1 class="converter--title">Onde a criação acompanha o seu ritmo<br />
          com menos barreiras e mais fluxo.</h1>

        <div class="converter--content">
          <ImageUploader :converting="convertingNames" :reset-key="resetKey" @images-selected="setImages" />

          <!-- Show controls and convert button only when there are images selected -->
          <div v-if="images.length" class="controls-area">
            <ConverterControls v-model:format="format" v-model:quality="quality" />

            <div class="convert-action">
              <!-- show convert button only when not converting and there are no converted images yet -->
              <div v-if="!isConverting && convertedImages.length === 0">
                <button class="controls--button" @click="convertImages">
                  <img src="../src/assets/icon/convert.webp" alt="Icone de conversão de imagem" width="20" class="controls--button--img">
                  Converter <span class="counter">{{ images.length }} {{ images.length === 1 ? 'imagem' : 'imagens' }}</span>
                </button>
              </div>

              <!-- progress shown while converting -->
              <div v-if="isConverting" class="progress-wrap">
                <div class="progress-bar">
                  <div class="progress" :style="{ width: progress + '%' }"></div>
                </div>
                <div class="progress-label">{{ progress }}%</div>
              </div>
            </div>
          </div>

          <ImageList :images="convertedImages" @clear="clearAll" />
        </div>
      </section>
    </div>
  </main>
  <Footer></Footer>
</template>
<style lang="scss">
.controls{
  &--button {
        width: 100%;
        border-radius: 3rem;
        padding: .5rem;
        background-color: #ffffff13;
        border: 1px solid #ffffff41;
        color: white;
        cursor: pointer;
        transition: ease-in-out .5s;
        margin-bottom: 2rem;
        font-size: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;

        &--img{
            margin-right: .5rem;
        }
        &:hover {
            background-color: #ffffff33;
        }
    }
}
.counter{
  margin-left: .3rem;
}
.progress-wrap{ position: relative; width: 100%; max-width: 640px; margin: 0.5rem auto 0 }
.progress-bar{ width:100%; height: 44px; background: rgba(255,255,255,0.06); border-radius: 999px; overflow: hidden; border:1px solid rgba(255,255,255,0.06) }
.progress{ height:100%; background: linear-gradient(90deg,rgba(172, 255, 47, 0.036),rgba(172, 255, 47, 0.556)); width:0%; transition: width 350ms ease; display:block }
.progress-label{ position:absolute; left:50%; top:50%; transform: translate(-50%,-50%); color: white; font-weight: 700; z-index: 2 }

.progress-bar .progress { z-index: 1 }

/* make sure the percentage text remains readable even when the filled part is small */
.progress-bar .progress { display:flex; align-items:center; justify-content:flex-start }

</style>