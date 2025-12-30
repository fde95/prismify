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
        <div class="controls--itens">
            <label class="controls--itens--item">
                <span>
                    Formato<br />
                    <small class="controls--itens--item--small-text">Escolha o formato de saída</small>
                </span>
                <select :value="format" @change="$emit('update:format', $event.target.value)">
                    <option value="webp">WEBP - Melhor Compressão
                    </option>
                    <option value="jpeg">JPEG - Maior Compatibilidade
                    </option>
                    <option value="png">PNG - Sem Perda</option>
                </select>
            </label>
        </div>

        <div class="controls--itens">
            <label class="controls--itens--item">
                <span>
                    Qualidade<br />
                    <small class="controls--itens--item--small-text">Menor = menor arquivo</small>
                </span>
                <div class="controls--itens--item--range">
                    <span class="quality-value">{{ format === 'png' ? 'Original' : Math.round(quality * 100) + '%'
                    }}</span>
                    <input type="range" min="0.1" max="1" step="0.1" :value="quality"
                        @input="$emit('update:quality', Number($event.target.value))" :disabled="format === 'png'" />
                </div>
            </label>
        </div>

    </div>
</template>
<style lang="scss">
.controls {
    color: white;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    border: 2px solid #ffffff41;
    border-radius: 1rem;
    background-color: #ffffff2a;

    &--itens {

        &--item {
            display: flex;
            justify-content: space-between;
            align-items: center;

            @media (max-width:767px) {
                display: block;
                text-align: center;
            }

            &--range {
                @media (max-width:767px) {
                    margin-top: .5rem;
                }
            }
        }
    }
}

select {
    padding: .3rem .8rem;
    border-radius: .6rem;
    background-color: #ffffff13;
    border: 1px solid #ffffff41;
    color: white;
    cursor: pointer;

    @media (max-width:767px) {
        margin-top: .5rem;
    }
}

option {
    background-color: gray;
}

input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 168px;
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

.quality-value {
    margin-right: .8rem;
}
</style>