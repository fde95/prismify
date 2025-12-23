<script setup>
defineProps({
    format: String,
    quality: Number
})

defineEmits([
    'update:format',
    'update:quality',
    'convert'
])
</script>


<template>
    <div class="controls">
        <label class="controls--format">
            Formato:
            <select :value="format" @change="$emit('update:format', $event.target.value)">
                <option value="webp">WEBP</option>
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
            </select>
        </label>

        <label class="controls--quality">
            Qualidade:
            <input type="range" min="0.1" max="1" step="0.1" :value="quality"
                @input="$emit('update:quality', Number($event.target.value))" />
            {{ quality }}
        </label>

    </div>
    <button @click="$emit('convert')" class="controls--button">
        Converter
    </button>
</template>
<style lang="scss">
.controls {
    color: white;
    margin-bottom: 2rem;

    &--format {
        margin-right: 2rem;
    }

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

        &:hover {
            background-color: #ffffff33;
        }
    }
}

select {
    padding: .3rem .5rem;
    margin-left: .5rem;
    border-radius: 3rem;
    border-radius: 3rem;
    background-color: #ffffff13;
    border: 1px solid #ffffff41;
    color: white;
    cursor: pointer;
}

option {
    background-color: gray;
}

input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
}

input[type="range"]:focus {
    outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
    background-color: #ffffff13;
    border-radius: 0.5rem;
    height: 0.5rem;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    margin-top: -4px;
    background-color: white;
    border-radius: 0.5rem;
    height: 1rem;
    width: 1rem;
}

input[type="range"]:focus::-webkit-slider-thumb {
    outline: 3px solid #818381;
    outline-offset: 0.125rem;
}
</style>