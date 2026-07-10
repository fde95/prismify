<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale, availableLocales, t } = useI18n();
const isOpen = ref(false);

const languages = {
  "pt-BR": { shortName: "PT", flag: "BR" },
  "en-US": { shortName: "EN", flag: "US" },
  "es-ES": { shortName: "ES", flag: "ES" },
};

const currentLanguage = computed(
  () => languages[locale.value] || languages["pt-BR"],
);

function changeLanguage(lang) {
  locale.value = lang;
  localStorage.setItem("preferred-language", lang);
  document.documentElement.setAttribute("lang", lang);
  isOpen.value = false;
}

function toggleDropdown(event) {
  event.stopPropagation();
  isOpen.value = !isOpen.value;
}

function handleClickOutside(event) {
  if (!event.target.closest(".lang-selector")) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="lang-selector">
    <button
      class="lang-btn"
      @click="toggleDropdown"
      :aria-expanded="isOpen"
      :aria-label="t('language.current', { language: t(`language.${locale}`) })"
    >
      <span class="lang-flag">{{ currentLanguage.flag }}</span>
      <span class="lang-name">{{ currentLanguage.shortName }}</span>
      <svg
        class="lang-chevron"
        :class="{ 'is-open': isOpen }"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <div class="lang-dropdown" :class="{ 'is-open': isOpen }" role="menu">
      <button
        v-for="lang in availableLocales"
        :key="lang"
        @click="changeLanguage(lang)"
        class="lang-option"
        :class="{ 'is-active': locale === lang }"
        :aria-label="
          t('language.changeTo', { language: t(`language.${lang}`) })
        "
        role="menuitem"
      >
        <span class="lang-option__flag">{{ languages[lang].flag }}</span>
        <span class="lang-option__name">{{ t(`language.${lang}`) }}</span>
        <span v-if="locale === lang" class="lang-option__check">✓</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lang-selector {
  position: relative;
  display: inline-block;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  font:
    600 0.85rem/1 "Figtree",
    sans-serif;
  cursor: pointer;
  transition: 0.25s ease;
  min-width: 86px;

  &:hover {
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 255, 255, 0.4);
  }
}

.lang-flag {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  opacity: 0.85;
}

.lang-name {
  font-weight: 700;
  letter-spacing: 0.06em;
}

.lang-chevron {
  margin-left: auto;
  transition: transform 0.25s ease;

  &.is-open {
    transform: rotate(180deg);
  }
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 168px;
  background: rgba(18, 18, 18, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.24);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 0.25s ease;
  z-index: 100;
  overflow: hidden;

  &.is-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.85rem 1rem;
  border: 0;
  background: transparent;
  color: white;
  font:
    500 0.9rem/1 "Figtree",
    sans-serif;
  text-align: left;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover,
  &.is-active {
    background: rgba(255, 255, 255, 0.08);
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
}

.lang-option__flag {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  min-width: 22px;
}

.lang-option__name {
  flex: 1;
}

.lang-option__check {
  color: greenyellow;
}
</style>
