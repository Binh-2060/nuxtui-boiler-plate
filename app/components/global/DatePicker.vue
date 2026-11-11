<script setup lang="ts">
import { parseDate } from "@internationalized/date";
import type { DateValue } from "@internationalized/date";

defineProps<{
  placeholder?: string;
  disabled?: boolean;
}>();

// value is an ISO date string ("YYYY-MM-DD") or null
const model = defineModel<string | null>({ default: null });

const isOpen = ref(false);

const calendarValue = computed({
  get: () => (model.value ? parseDate(model.value) : undefined),
  set: (value: DateValue | undefined) => {
    model.value = value ? value.toString() : null;
    isOpen.value = false;
  },
});

const displayText = computed(() =>
  model.value ? FormateDate(model.value) : "",
);
</script>

<template>
  <UPopover v-model:open="isOpen">
    <UButton
      color="neutral"
      variant="outline"
      icon="i-lucide-calendar"
      :disabled="disabled"
      block
      class="justify-start"
      :class="displayText ? '' : 'text-dimmed'"
    >
      {{ displayText || placeholder || "DD/MM/YYYY" }}
    </UButton>

    <template #content>
      <UCalendar v-model="calendarValue" class="p-2" />
    </template>
  </UPopover>
</template>
