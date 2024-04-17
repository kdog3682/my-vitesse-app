<script setup lang="ts">

import { availableLocales, loadLanguageAsync } from '~/modules/i18n'
const { t, locale } = useI18n()

const user = useUserStore()
const name = ref(user.savedName)
const langs = ['en', 'zh-CN', 'vi', 'fr']

for (let lang of langs) {
     loadLanguageAsync(lang)
}
const router = useRouter()
async function languageLoader(value) {
    await loadLanguageAsync(value)

    locale.value = newLocale
}
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

</script>

<template>
    <div bg-amber>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <TheInput
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      autocomplete="false"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        m-3 text-sm btn
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>

  <div class="locale-changer" bg-red>
    <select v-model="locale">
      <option px-5 v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
    <pre> {{locale}}</pre>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
