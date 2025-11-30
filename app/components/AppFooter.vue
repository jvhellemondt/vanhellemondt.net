<script setup lang="ts">
const columns = [{
  label: 'Navigation',
  children: [{
    label: 'Skills',
    to: '#skills'
  }, {
    label: 'Experience',
    to: '#experience'
  }, {
    label: 'Projects',
    to: '#projects'
  }]
}, {
  label: 'Connect',
  children: [{
    label: 'Email',
    to: 'mailto:jens@invictus.codes',
    icon: 'i-lucide-mail'
  }, {
    label: 'LinkedIn',
    to: 'https://www.linkedin.com/in/jvhellemondt/',
    target: '_blank',
    icon: 'i-simple-icons-linkedin'
  }, {
    label: 'GitHub',
    to: 'https://github.com/jvhellemondt',
    target: '_blank',
    icon: 'i-simple-icons-github'
  }]
}]

const year = new Date().getFullYear()
</script>

<template>
  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns" />
      </UContainer>
    </template>

    <template #left>
      <p class="text-sm text-muted">
        © {{ year }} Jens van Hellemondt. All rights reserved.
      </p>
    </template>

    <template #right>
      <div class="flex items-center space-x-4">
        <UButton
          to="https://github.com/jvhellemondt"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
        <UButton
          to="https://www.linkedin.com/in/jvhellemondt/"
          target="_blank"
          icon="i-simple-icons-linkedin"
          aria-label="LinkedIn"
          color="neutral"
          variant="ghost"
        />
      </div>
    </template>
  </UFooter>
</template>
