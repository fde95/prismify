<script setup>
import { computed } from 'vue'
import { downloadImagesAsZip } from '../utils/zipDownloader'

const props = defineProps({
    images: Array
})

const emit = defineEmits(['clear'])

function downloadZip() {
    downloadImagesAsZip(props.images)
}

function clearAll() {
    emit('clear')
}

function formatSize(bytes) {
    if (!bytes) return '0 KB'
    const kb = bytes / 1024
    if (kb < 1024) return Math.round(kb) + ' KB'
    const mb = kb / 1024
    return mb.toFixed(2) + ' MB'
}

const totals = computed(() => {
    const imgs = props.images || []
    let original = 0
    let generated = 0
    for (const img of imgs) {
        original += img.originalSize ?? img.size ?? 0
        generated += img.size ?? 0
    }
    const diff = Math.max(0, original - generated)
    const percent = original > 0 ? Math.round((diff / original) * 100) : 0
    return { original, generated, diff, percent }
})
</script>

<template>
    <div v-if="images?.length">
        <div class="imageList">
            <div class="imageList--header">
                <div class="imageList--header--highlight">
                    <img src="../assets/icon/check.webp" alt="icone de sucesso"
                        class="imageList--header--highlight--icon" width="32">
                    <span class="imageList--header--highlight--title">{{ images.length }} imagens convertidas<br />
                        <small class="imageList--header--summary">Economizou {{ formatSize(totals.diff) }} {{
                            totals.percent }}%</small>
                    </span>

                </div>
                <div>
                    <button @click="clearAll" class="imageList--clear btn">
                        <img src="../assets/icon/rotate-right.webp" alt="icone de lixo" width="16" class="btn--icon">
                        Enviar novamente
                    </button>
                    <button @click="downloadZip" class="imageList--zipBtn btn">
                        <img src="../assets/icon/download.webp" alt="icone de download" width="16" class="btn--icon">
                        Baixar Todos</button>
                </div>
            </div>
        </div>

        <ol class="imageList--list">
            <li v-for="img in images" :key="img.name" class="imageList--list--item">
                <div class="item--meta">
                    <div class="item--title">{{ img.name }}</div>
                    <div class="item--sub">
                        <template v-if="img.originalSize && img.size && img.size !== img.originalSize">
                            <small class="imageList--list--item--reduction">{{ formatSize(img.originalSize) }} → {{
                                formatSize(img.size) }}
                                <div class="reduction">({{ Math.round((1 - img.size / img.originalSize) * 100) }}%
                                    menor)</div>
                            </small>
                        </template>
                        <template v-else>
                            {{ formatSize(img.size ?? 0) }}
                        </template>
                    </div>
                </div>

                <a :href="img.url" :download="img.name" class="imageList--list--item--btn">Download</a>
            </li>
        </ol>
    </div>
</template>
<style lang="scss">
.imageList {
    margin-top: 2rem;
    &--header {
        display: flex;
        justify-content: space-between;

        @media (max-width:767px) {
            display: block;
            text-align: center;
        }

        &--highlight {
            display: flex;
            align-items: center;
            gap: 1rem;

            &--icon {
                padding: .5rem;
                background-color: rgb(255, 255, 255, 0.1);
                border-radius: 3rem;
            }

            &--title {
                color: white;
            }
        }

        &--summary {
            display: block;
            color: greenyellow;
            margin-top: .25rem;
        }
    }

    &--clear {
        padding: .3rem 1.5rem;
        border-radius: 3rem;
        border: 1px solid red;
        background-color: rgba(255, 0, 0, 0.262);
        color: white;
        margin-right: .5rem;
        cursor: pointer;
        transition: .3s ease-in-out;

        &:hover {
            background-color: red;
        }

        @media (max-width:767px) {
            margin-top: .5rem;
        }
    }

    &--zipBtn {
        padding: .3rem 1.5rem;
        border-radius: 3rem;
        background-color: rgb(255, 255, 255, 0.1);
        border: 1px solid transparent;
        color: white;
        cursor: pointer;
        transition: .3s ease-in-out;

        &:hover {
            background-color: black;
        }

        @media (max-width:767px) {
            margin-top: .5rem;
        }
    }

    &--list {
        padding: .5rem 2rem;
        margin-top: 1rem;
        color: white;
        font-weight: 300;
        background-color: rgb(255, 255, 255, 0.2);
        border-radius: 1rem;

        max-height: 300px;
        overflow-y: auto;
        overflow-x: hidden;

        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.636) transparent;

        @media (max-width:767px) {
            max-height: 200px;
        }

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

            @media (max-width:767px) {
                padding: 1rem 0;
            }

            @media (max-width:767px) {
                display: block;
                text-align: center;
            }

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

            &--reduction {
                display: inline-flex;
                margin-top: .3rem;

                @media (max-width:767px) {
                    display: block;
                }

                .reduction {
                    margin-left: .5rem;
                    color: greenyellow;
                }
            }
        }
    }
}

.item {
    &--meta {
        @media (max-width:767px) {
            margin-bottom: 1rem;
        }
    }
}

.btn {
    display: inline-flex;
    align-items: center;

    &--icon {
        margin-right: .3rem;
    }
}

::marker {
    font-weight: 900;
}
</style>
