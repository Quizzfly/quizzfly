<template>
  <NavBar />
  <IntroduceSection />
  <FlashCardSection />
  <FeaturesSection />
  <FlowSection />
  <PricingSection />
  <TrialSection />
  <Footer />
</template>

<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/sidebar/Footer.vue'
import IntroduceSection from '@/components/landing/IntroduceSection.vue'
import FlashCardSection from '@/components/landing/FlashCardSection.vue'
import FeaturesSection from '@/components/landing/FeaturesSection.vue'
import FlowSection from '@/components/landing/FlowSection.vue'
import PricingSection from '@/components/landing/PricingSection.vue'
import TrialSection from '@/components/landing/TrialSection.vue'
</script>
