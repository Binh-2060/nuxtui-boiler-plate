<script lang="ts" setup>
const { state, onConfirm, onCancel } = useDialog();

// write icon names and classes in full so @nuxt/icon and Tailwind can find them
const iconMap = {
  success: { icon: "i-lucide-circle-check", color: "success", text: "text-success" },
  error: { icon: "i-lucide-circle-x", color: "error", text: "text-error" },
  warning: { icon: "i-lucide-triangle-alert", color: "warning", text: "text-warning" },
  info: { icon: "i-lucide-info", color: "info", text: "text-info" },
  confirm: { icon: "i-lucide-circle-help", color: "primary", text: "text-primary" },
} as const;

const current = computed(() => iconMap[state.type] ?? iconMap.info);

const isInputTouched = ref(false);

const inputError = computed(() => {
  if (!state.input || !state.inputSchema) return undefined;
  const result = state.inputSchema.safeParse(state.inputValue);
  return result.success ? undefined : result.error.issues[0]?.message;
});

function handleConfirm() {
  isInputTouched.value = true;
  if (inputError.value) return;
  onConfirm();
}

// closing with Esc or a click outside counts as cancel, so the promise always resolves
function handleOpenChange(isOpen: boolean) {
  if (!isOpen) onCancel();
}

watch(
  () => state.show,
  (isShown) => {
    if (isShown) isInputTouched.value = false;
  },
);
</script>

<template>
  <UModal
    :open="state.show"
    :title="state.title"
    :description="state.message"
    :dismissible="!(state.persistent || state.input)"
    :ui="{ content: 'max-w-md' }"
    @update:open="handleOpenChange"
  >
    <template #content>
      <div class="flex flex-col items-center gap-4 p-6 text-center">
        <UIcon :name="current.icon" class="size-16" :class="current.text" />

        <h2 class="text-lg font-semibold text-highlighted">{{ state.title }}</h2>

        <p v-if="state.message" class="text-muted">{{ state.message }}</p>

        <UFormField
          v-if="state.input"
          :label="state.inputLabel"
          :error="isInputTouched ? inputError : undefined"
          class="w-full text-left"
        >
          <UInput
            v-model="state.inputValue"
            :placeholder="state.inputPlaceholder"
            autofocus
            class="w-full"
            @update:model-value="isInputTouched = true"
            @keyup.enter="handleConfirm"
          />
        </UFormField>

        <div class="flex justify-center gap-2 pt-2">
          <UButton
            v-if="state.showCancel"
            color="neutral"
            variant="outline"
            class="min-w-24 justify-center"
            @click="onCancel"
          >
            {{ state.cancelText }}
          </UButton>
          <UButton
            :color="current.color"
            class="min-w-24 justify-center"
            :disabled="isInputTouched && !!inputError"
            @click="handleConfirm"
          >
            {{ state.confirmText }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
