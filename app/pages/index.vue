<script setup lang="ts">
// Minimal default structure to prevent runtime errors
const defaultPage = {}

// Fetch page data from YAML
const { data: page } = await useAsyncData('index', async () => {
  try {
    const data = await queryCollection('content').first()
    if (!data) {
      console.warn('No content found in YAML, using empty structure')
      return {}
    }
    console.log('Loaded page data:', { skills: data.skills, experience: data.experience, projects: data.projects })
    return data
  } catch (error) {
    console.error('Error loading page data from YAML:', error)
    return {}
  }
})

// Ensure page has the expected structure with fallbacks
const safePage = computed(() => {
  // Deep merge to ensure nested objects are properly handled
  // eslint-disable-next-line
  const deepMerge = (target: any, source: any) => {
    const result = { ...target }
    if (!source) return result

    Object.keys(source).forEach((key) => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(result[key] || {}, source[key])
      } else {
        result[key] = source[key] !== undefined ? source[key] : target[key]
      }
    })

    return result
  }

  return deepMerge(defaultPage, page.value || {})
})

// Set SEO meta tags with fallbacks
useSeoMeta({
  title: safePage.value.title || 'Jens van Hellemondt | Portfolio',
  ogTitle: safePage.value.seo?.title || safePage.value.title || 'Jens van Hellemondt | Portfolio',
  description: safePage.value.seo?.description || safePage.value.description || 'Personal portfolio and professional information',
  ogDescription: safePage.value.seo?.description || safePage.value.description || 'Personal portfolio and professional information'
})
</script>

<template>
  <div class="relative">
    <div class="hidden lg:block">
      <UColorModeImage
        light="/images/light/line-1.svg"
        dark="/images/dark/line-1.svg"
        class="absolute pointer-events-none pb-10 left-0 top-0 object-cover h-[650px]"
      />
    </div>

    <UPageHero
      v-if="safePage.title || safePage.description || safePage.hero?.links?.length"
      :description="safePage.description"
      :title="safePage.title"
      :links="safePage.hero?.links"
      :ui="{
        title: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
        description: 'text-lg md:text-xl text-muted',
        links: 'flex flex-col sm:flex-row gap-3'
      }"
    >
      <template #headline>
        <UColorModeImage
          light="/images/light/line-2.svg"
          dark="/images/dark/line-2.svg"
          class="absolute right-0 top-1/7 h-64 -translate-y-1/2"
        />
      </template>
      <template #title>
        <MDC
          :value="safePage.title"
          unwrap="p"
          class="sm:text-5xl text-pretty tracking-tight font-bold text-highlighted text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
        />
      </template>
    </UPageHero>

    <UPageSection
      v-if="safePage.section?.title || safePage.section?.description || safePage.section?.features?.length"
      :description="safePage.section?.description"
      :features="safePage.section?.features"
      orientation="horizontal"
      :ui="{
        container: 'lg:px-0 2xl:px-20 mx-0 max-w-none md:mr-10',
        features: 'gap-0'
      }"
      reverse
    >
      <template #title>
        <MDC
          :value="safePage.section?.title"
          class="sm:*:leading-11"
        />
      </template>
      <img
        :src="safePage.section?.images?.desktop"
        :alt="safePage.section?.title"
        class="hidden lg:block 2xl:hidden left-0 w-full max-w-2xl"
      >
      <img
        :src="safePage.section?.images?.mobile"
        :alt="safePage.section?.title"
        class="block lg:hidden 2xl:block 2xl:w-full 2xl:max-w-2xl"
      >
    </UPageSection>

    <USeparator :ui="{ border: 'border-primary/30' }" />

    <UPageSection
      v-if="safePage.skills?.title || safePage.skills?.description || safePage.skills?.features?.length"
      id="skills"
      :description="safePage.skills?.description"
      :features="safePage.skills?.features || []"
      :ui="{
        title: 'text-left @container relative flex',
        description: 'text-left',
        container: 'relative z-20',
        features: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      }"
      class="relative overflow-hidden"
    >
      <div class="absolute rounded-full -left-10 top-10 size-[300px] z-10 bg-primary opacity-30 blur-[200px]" />
      <div class="absolute rounded-full -right-10 -bottom-10 size-[300px] z-10 bg-primary opacity-30 blur-[200px]" />
      <template #title>
        <MDC
          :value="safePage.skills?.title || 'Skills'"
          class="*:leading-9"
        />
        <div class="hidden @min-[1020px]:block">
          <UColorModeImage
            light="/images/light/line-2.svg"
            dark="/images/dark/line-2.svg"
            class="absolute top-0 right-0 size-full transform scale-95 translate-x-[70%]"
          />
        </div>
      </template>
      <template #feature="{ feature }">
        <div class="flex flex-col space-y-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div class="flex items-center space-x-3">
            <div :class="feature.ui?.leading">
              <UIcon
                :name="feature.icon"
                class="w-6 h-6 text-primary"
              />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ feature.title }}
            </h3>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ feature.description }}
          </p>
        </div>
      </template>
    </UPageSection>

    <template v-if="safePage.experience?.items?.length">
      <USeparator :ui="{ border: 'border-primary/30' }" />

      <UPageSection
        id="experience"
        :description="safePage.experience?.description"
        class="relative overflow-hidden"
        :ui="{
          title: 'text-left @container relative',
          description: 'text-left',
          container: 'relative z-20',
          features: 'grid grid-cols-1 md:grid-cols-3 gap-6'
        }"
      >
        <template #headline>
          <UColorModeImage
            light="/images/light/line-3.svg"
            dark="/images/dark/line-3.svg"
            class="absolute -top-10 sm:top-0 right-1/2 h-24"
          />
        </template>
        <template #title>
          <MDC :value="safePage.experience?.title || 'Experience'" />
        </template>

        <template #features>
          <UPageCard
            v-for="(item, index) in safePage.experience?.items || []"
            :key="index"
            class="group hover:shadow-lg transition-shadow duration-200 h-full"
            :ui="{
              container: 'p-6 h-full flex flex-col',
              title: 'text-lg font-semibold mb-2',
              description: 'text-sm text-gray-600 dark:text-gray-300 mt-2 flex-grow'
            }"
          >
            <div class="flex items-center justify-center mb-4 w-16 h-16 rounded-full bg-primary/10 text-primary">
              <UColorModeImage
                :light="item.image?.light"
                :dark="item.image?.dark"
                :alt="item.title"
                class="w-8 h-8"
              />
            </div>

            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ item.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {{ item.description }}
            </p>
          </UPageCard>
        </template>
      </UPageSection>
    </template>

    <template v-if="safePage.projects?.items?.length">
      <USeparator :ui="{ border: 'border-primary/30' }" />

      <UPageSection
        id="projects"
        :title="safePage.projects?.title || 'Projects'"
        :description="safePage.projects?.description"
        :ui="{
          title: 'text-left @container relative',
          description: 'text-left',
          container: 'relative z-20',
          features: 'grid grid-cols-1 md:grid-cols-3 gap-8'
        }"
        class="relative overflow-hidden"
      >
        <template #title>
          <MDC :value="safePage.projects?.title || 'Projects'" />
        </template>
        <div class="absolute rounded-full -left-10 top-10 size-[300px] z-10 bg-primary opacity-30 blur-[200px] pointer-events-none" />
        <div class="absolute rounded-full -right-10 -bottom-10 size-[300px] z-1 bg-primary opacity-30 blur-[200px] pointer-events-none" />

        <template #features>
          <UCard
            v-for="(project, index) in safePage.projects?.items || []"
            :key="index"
            class="h-full group hover:shadow-lg transition-shadow duration-200 flex flex-col"
            :ui="{
              body: 'flex-grow p-6',
              footer: 'pt-0 mt-4 p-6 pt-0',
              header: 'p-6 pb-0'
            }"
          >
            <template #header>
              <div class="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary">
                <UColorModeImage
                  :light="project.image?.light"
                  :dark="project.image?.dark"
                  :alt="project.title"
                  class="w-8 h-8"
                />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                <MDC
                  :value="project.title"
                  class="*:leading-9"
                />
              </h3>
            </template>

            <p class="text-gray-600 dark:text-gray-300">
              {{ project.description }}
            </p>

            <template #footer>
              <div class="space-y-3">
                <div class="flex flex-wrap gap-2">
                  <UBadge
                    v-for="(tech, i) in project.technologies.split(', ')"
                    :key="i"
                    variant="outline"
                    size="sm"
                    class="text-xs font-medium"
                  >
                    {{ tech }}
                  </UBadge>
                </div>
                <div
                  v-if="project.links?.length"
                  class="flex flex-wrap gap-2"
                >
                  <UButton
                    v-for="(link, i) in project.links"
                    :key="i"
                    :to="link.to"
                    :target="link.target || '_blank'"
                    size="xs"
                    variant="ghost"
                    color="primary"
                    class="text-xs"
                  >
                    {{ link.label }}
                  </UButton>
                </div>
              </div>
            </template>
          </UCard>
        </template>
      </UPageSection>
    </template>

    <template v-if="safePage.testimonials?.items?.length">
      <USeparator :ui="{ border: 'border-primary/30' }" />

      <UPageSection
        id="testimonials"
        :title="safePage.testimonials?.title || 'Testimonials'"
        :description="safePage.testimonials?.description"
        :ui="{
          title: 'text-left @container relative',
          description: 'text-left',
          container: 'relative z-20',
          features: 'grid grid-cols-1 md:grid-cols-3 gap-8'
        }"
        class="relative overflow-hidden"
      >
        <div class="absolute rounded-full -left-10 top-10 size-[300px] z-10 bg-primary opacity-30 blur-[200px]" />
        <div class="absolute rounded-full -right-10 -bottom-10 size-[300px] z-10 bg-primary opacity-30 blur-[200px]" />

        <template #features>
          <UCard
            v-for="(testimonial, index) in safePage.testimonials?.items || []"
            :key="index"
            class="h-full group hover:shadow-lg transition-shadow duration-200"
            :ui="{
              body: 'flex flex-col h-full p-6 flex-grow',
              header: 'p-6 pb-0',
              footer: 'p-6 pt-0'
            }"
          >
            <p class="text-gray-600 dark:text-gray-300 italic">
              "{{ testimonial.quote }}"
            </p>

            <template #footer>
              <div class="flex items-center gap-3">
                <div class="flex-1">
                  <p class="font-medium text-gray-900 dark:text-white">
                    {{ testimonial.user?.name || 'Anonymous' }}
                  </p>
                  <p
                    v-if="testimonial.user?.description"
                    class="text-sm text-gray-500 dark:text-gray-400"
                  >
                    {{ testimonial.user.description }}
                  </p>
                </div>
              </div>
            </template>
          </UCard>
        </template>
      </UPageSection>
    </template>

    <UPageSection
      v-if="safePage.pricing"
      id="pricing"
      class="mb-32 overflow-hidden"
      :title="safePage.pricing?.title"
      :description="safePage.pricing?.description"
      :ui="{
        title: 'text-left @container relative',
        description: 'text-left',
        container: 'relative z-20',
        features: 'grid grid-cols-1 md:grid-cols-3 gap-8'
      }"
    >
      <template #title>
        <MDC :value="safePage.pricing?.title || 'Pricing'" />

        <div class="hidden @min-[1120px]:block">
          <UColorModeImage
            light="/images/light/line-4.svg"
            dark="/images/dark/line-4.svg"
            class="absolute top-0 right-0 size-full transform translate-x-[60%]"
          />
        </div>
      </template>

      <UPricingPlans
        v-if="safePage.pricing?.plans?.length"
        scale
      >
        <UPricingPlan
          v-for="(plan, index) in safePage.pricing.plans"
          :key="index"
          :title="plan?.title || 'Custom Plan'"
          :description="plan?.description"
          :price="plan?.price"
          :billing-period="plan.billing_period"
          :billing-cycle="plan.billing_cycle"
          :highlight="plan.highlight"
          :scale="plan.highlight"
          variant="soft"
          :features="plan.features"
          :button="plan.button"
        />
      </UPricingPlans>
    </UPageSection>

    <USeparator />

    <UPageCTA
      v-if="safePage.cta"
      id="contact"
      v-bind="safePage.cta"
      variant="naked"
      class="overflow-hidden @container"
    >
      <template #title>
        <MDC :value="safePage.cta?.title" />

        <div class="@max-[1280px]:hidden">
          <UColorModeImage
            light="/images/light/line-6.svg"
            dark="/images/dark/line-6.svg"
            class="absolute left-10 -top-10 sm:top-0 h-full"
          />
          <UColorModeImage
            light="/images/light/line-7.svg"
            dark="/images/dark/line-7.svg"
            class="absolute right-0 bottom-0 h-full"
          />
        </div>
      </template>

      <LazyStarsBg />
    </UPageCTA>
  </div>
</template>
