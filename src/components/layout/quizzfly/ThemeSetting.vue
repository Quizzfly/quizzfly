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
      <Button variant="outline"> Theme </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Theme</SheetTitle>
        <SheetDescription>
          This is the theme setting for your quizzfly. You can choose the theme that you like for
          each quiz.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
