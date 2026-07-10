<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const currentDate = ref(new Date());
const { t, locale } = useI18n();

const currentYear = computed(() =>
  new Intl.DateTimeFormat(locale.value, { year: "numeric" }).format(
    currentDate.value,
  ),
);
</script>

<template>
  <footer class="footer">
    <div class="footer--content">
      <p class="footer--copyright">
        <time :datetime="currentDate.toISOString()">
          {{ currentYear }}
        </time>
        {{ t("footer.copyright") }}
      </p>

      <div class="footer--links">
        <a
          href="https://portfolio.devfe.com.br/"
          class="footer--link"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="t('footer.visitPortfolio')"
        >
          <span>{{ t("footer.portfolio") }}</span>
        </a>
        <a
          href="https://github.com/fde95"
          class="footer--link"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="t('footer.visitGithub')"
        >
          <span>GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/fde95/"
          class="footer--link"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="t('footer.visitLinkedin')"
        >
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  position: relative;
  bottom: 1rem;
  width: 100%;
  z-index: 99999;

  &--content {
    color: #ffffff;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #ffffff25;
    border-radius: 3rem;
    max-width: 1024px;
    margin: 0 auto;
  }

  &--copyright {
    font-size: 0.8rem;
    font-weight: 400;
    opacity: 0.95;
    margin: 0;
  }

  &--links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  &--link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #ffffff;
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  &--icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
    padding: 0;

    &--content {
      flex-direction: column;
      text-align: center;
      gap: 0;
    }

    &--links {
      width: 90%;
      justify-content: center;
      display: flex;
      justify-content: space-around;
    }
    &--copyright {
      font-size: 0.9rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.39);
      padding-bottom: 0.5rem;
    }
  }
}

// // Responsividade
// @media (max-width: 768px) {
//     .footer {
//         padding: 0;

//         &--content {
//             flex-direction: column;
//             text-align: center;
//             gap: 1.25rem;
//         }

//         &--links {
//             width: 90%;
//             justify-content: center;
//             display: flex;
//             justify-content: space-around;
//         }
//     }
// }
</style>
