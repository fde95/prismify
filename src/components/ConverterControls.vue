<script setup>
import { useI18n } from "vue-i18n";

defineProps({
  format: String,
  quality: Number,
});

defineEmits(["update:format", "update:quality", "convert"]);

const { t } = useI18n();
</script>

<template>
  <div class="controls">
    <div class="controls--itens">
      <label class="controls--itens--item">
        <span>
          {{ t("controls.formatLabel") }}<br />
          <small class="controls--itens--item--small-text">{{
            t("controls.formatHelp")
          }}</small>
        </span>
        <select
          :value="format"
          @change="$emit('update:format', $event.target.value)"
        >
          <option value="webp">{{ t("controls.formats.webp") }}</option>
          <option value="jpeg">{{ t("controls.formats.jpeg") }}</option>
          <option value="png">{{ t("controls.formats.png") }}</option>
        </select>
      </label>
    </div>

    <div class="controls--itens">
      <label class="controls--itens--item">
        <span>
          {{ t("controls.qualityLabel") }}<br />
          <small class="controls--itens--item--small-text">{{
            t("controls.qualityHelp")
          }}</small>
        </span>
        <div class="controls--itens--item--range">
          <span class="quality-value">{{
            format === "png"
              ? t("controls.originalQuality")
              : Math.round(quality * 100) + "%"
          }}</span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            :value="quality"
            @input="$emit('update:quality', Number($event.target.value))"
            :disabled="format === 'png'"
          />
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

      @media (max-width: 767px) {
        display: block;
        text-align: center;
      }

      &--range {
        @media (max-width: 767px) {
          margin-top: 0.5rem;
        }
      }
    }
  }
}

select {
  padding: 0.3rem 0.8rem;
  border-radius: 0.6rem;
  background-color: #ffffff13;
  border: 1px solid #ffffff41;
  color: white;
  cursor: pointer;

  @media (max-width: 767px) {
    margin-top: 0.5rem;
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
  margin-right: 0.8rem;
}
</style>
