<script setup>
import { downloadImagesAsZip } from '../utils/zipDownloader'

const props = defineProps({
    images: Array
})

function downloadZip() {
    downloadImagesAsZip(props.images)
}
</script>

<template>
    <div v-if="images.length">
        <div class="imageList">
            <button @click="downloadZip" class="imageList--zipBtn ">
                Baixar todas em ZIP
            </button>
        </div>

        <ol class="imageList--list">
            <li v-for="img in images" :key="img.name" class="imageList--list--item">
                {{ img.name }}
                <a :href="img.url" :download="img.name" class="imageList--list--item--btn">Download</a>
            </li>
        </ol>
    </div>
</template>
<style lang="scss">
.imageList {
    text-align: end;

    &--zipBtn {
        padding: .3rem 1.5rem;
        border-radius: 3rem;
        background-color: rgba(0, 0, 0, 0.608);
        border: 1px solid black;
        color: white;
        cursor: pointer;
        box-shadow: 2px 2px 16px black;
        transition: .5s ease-in-out;

        &:hover {
            scale: 1.05;
        }
    }

    &--list {
        padding: 0 2rem;
        margin-top: 1rem;
        color: white;
        font-weight: 300;

        max-height: 100px;
        overflow-y: auto;
        overflow-x: hidden;

        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.636) transparent;

        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.636);
            border-radius: 4px;
        }

        &::-webkit-scrollbar-track {
            background: transparent;
        }

        &--item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255, 255, 255, 0.242);
            padding: .5rem 0;

            &--btn {
                border-radius: 3rem;
                padding: .2rem 1rem;
                background-color: #ffffff13;
                border: 1px solid #ffffff41;
                color: white;
                cursor: pointer;
                transition: .5s ease-in-out;

                &:hover {
                    background-color: white;
                    border: 1px solid white;
                    color: black;
                }
            }
        }
    }
}

::marker {
    font-weight: 900;
}
</style>