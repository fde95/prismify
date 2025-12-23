<script setup>
const emit = defineEmits(['images-selected'])

function handleUpload(event) {
    emit('images-selected', [...event.target.files])
}
</script>
<template>
    <label for="file-upload" class="converter--input"> Selecionar imagem(ns)
        <input type="file" multiple accept="image/*" @change="handleUpload" id="file-upload" />
    </label>
</template>

<style lang="scss">
.converter {
    &--input {
        color: white;
    }
}

input[type="file"] {
    margin:0 2rem 2rem;

    &::file-selector-button {
        border-radius: 3rem;
        padding: .5rem 1rem;
        background-color: #ffffff13;
        border: 1px solid #ffffff41;
        color: white;
        cursor: pointer;
    }
}
</style>