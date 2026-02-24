<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

const items = computed(() => [{
  label: 'Skills',
  to: '#skills',
  active: activeHeadings.value.includes('skills')
}, {
  label: 'Experience',
  to: '#experience',
  active: activeHeadings.value.includes('experience')
}, {
  label: 'Projects',
  to: '#projects',
  active: activeHeadings.value.includes('projects')
}])

nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#about'),
    document.querySelector('#skills'),
    document.querySelector('#experience'),
    document.querySelector('#projects')
  ].filter(Boolean) as Element[])
})
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <template #right>
      <UNavigationMenu
        :items="items"
        variant="link"
        class="hidden lg:block"
      />

      <UButton
        to="#contact"
        label="Contact Me"
        color="primary"
        class="hidden lg:flex px-4 items-center justify-center"
        trailing-icon="i-lucide-arrow-right"
      />

      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
