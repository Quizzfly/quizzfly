<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
</script>

<template>
  <Sheet>
    <SheetTrigger>
      <Button variant="outline"> {{ $t('quizzfly.create.theme.theme') }} </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{{ $t('quizzfly.create.theme.theme_title') }}</SheetTitle>
        <SheetDescription>
          {{ $t('quizzfly.create.theme.theme_description') }}
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
