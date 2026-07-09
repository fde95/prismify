<script setup>
import { ref, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  showDropzone: { type: Boolean, default: true },
  converting: { type: Array, default: () => [] },
  resetKey: { type: Number, default: 0 },
});
const emit = defineEmits(["images-selected"]);

const files = ref([]); // { file, url }

function addFiles(newFiles) {
  const arr = Array.from(newFiles);
  for (const f of arr) {
    // avoid duplicate by name+size
    if (
      !files.value.find((x) => x.file.name === f.name && x.file.size === f.size)
    ) {
      const url = URL.createObjectURL(f);
      files.value.push({ file: f, url });
    }
  }
  emit(
    "images-selected",
    files.value.map((x) => x.file),
  );
}

function handleUpload(event) {
  addFiles(event.target.files);
  // reset input so same file can be selected again if needed
  event.target.value = null;
}

function onDrop(e) {
  e.preventDefault();
  if (e.dataTransfer?.files?.length) {
    addFiles(e.dataTransfer.files);
  }
}

function onDragOver(e) {
  e.preventDefault();
}

function removeAt(i) {
  const removed = files.value.splice(i, 1)[0];
  if (removed) {
    URL.revokeObjectURL(removed.url);
  }
  emit(
    "images-selected",
    files.value.map((x) => x.file),
  );
}

onBeforeUnmount(() => {
  files.value.forEach((f) => URL.revokeObjectURL(f.url));
});

// when parent requests reset (clear), revoke and clear our previews and emit empty list
watch(
  () => props.resetKey,
  () => {
    files.value.forEach((f) => URL.revokeObjectURL(f.url));
    files.value = [];
    emit("images-selected", []);
  },
);
</script>

<template>
  <div class="uploader">
    <label
      v-if="showDropzone"
      class="dropzone"
      @drop="onDrop"
      @dragover="onDragOver"
      tabindex="0"
    >
      <input
        type="file"
        multiple
        accept="image/*"
        @change="handleUpload"
        class="visually-hidden"
      />
      <div class="dropzone--content">
        <div class="dropzone--content--icon">
          <img
            class="dropzone--content--icon--img"
            src="../assets/icon/upload.webp"
            alt="Envie suas imagens"
            width="32"
            height="32"
            loading="lazy"
          />
        </div>
        <div class="dropzone--content--description">
          <span><strong>Arraste imagens aqui</strong></span>
          <span
            ><small
              >ou clique para selecionar — PNG, JPG, WEBP, GIF</small
            ></span
          >
        </div>
      </div>
    </label>

    <div class="previews" v-if="files.length">
      <div
        v-for="(f, i) in files"
        :key="f.file.name + f.file.size"
        class="previews--preview"
        title="Clique para remover"
      >
        <img :src="f.url" alt="preview" class="previews--preview--img" />
        <button class="remove" @click="removeAt(i)" aria-label="Remover imagem">
          ✕
        </button>
        <div
          v-if="converting && converting.includes(f.file.name)"
          class="overlay"
        >
          <div class="spinner"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.dropzone {
  border-radius: 1rem;
  border: 2px dashed rgba(255, 255, 255, 0.262);
  padding: 3.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.02);
  cursor: pointer;

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.755);
  }

  &--content {
    text-align: center;

    &--icon {
      font-size: 2rem;
      margin: 0 auto 1rem;
      background-color: rgb(255, 255, 255, 0.1);
      width: 5rem;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3rem;

      &--img {
        max-width: 32px;
        max-height: 32px;
        height: 100%;
        width: 100%;
      }
    }

    &--description {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      color: white;
    }
  }
}

.previews {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
  max-width: 640px;

  &--preview {
    position: relative;
    width: 9rem;
    height: 9rem;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.3);

    &--img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    & .remove {
      position: absolute;
      top: 6px;
      right: 6px;
      background: rgba(0, 0, 0, 0.8);
      border: none;
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: none;
      cursor: pointer;
    }

    &:hover .remove {
      display: block;
    }
  }
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
}

.spinner {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.15);
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
