<script setup>
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'

// Set your deployed Google Apps Script Web App URL here to enable background capture.
const DEFAULT_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbySavMWZT9nMSAbI_OjAOCjvgkXTNiQ4_icz_K1YOquDKm8i_38fTABIfACPo-TpaWv/exec'
const SCRIPT_URL_STORAGE_KEY = 'agentic_sdlc_self_assessment_script_url'
const SUBMISSION_CACHE_KEY = 'agentic_sdlc_self_assessment_last_submission'

const props = defineProps({
  languageCode: {
    type: String,
    required: true,
  },
  languageLabel: {
    type: String,
    required: true,
  },
  questions: {
    type: Array,
    required: true,
  },
  answers: {
    type: Object,
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  profileName: {
    type: String,
    required: true,
  },
})

let scriptUrl = DEFAULT_SCRIPT_URL
let submitTimer = null
let isMounted = false
let isSubmitting = false

const orderedAnswerEntries = computed(() => props.questions.map((question) => {
  const answerKey = props.answers[question.id] || ''
  const option = question.options.find((candidate) => candidate.key === answerKey)

  return {
    id: question.id,
    key: answerKey,
    text: option?.label || '',
  }
}))

const isComplete = computed(() => orderedAnswerEntries.value.every((entry) => entry.key))

const responseSignature = computed(() => {
  if (!isComplete.value) return ''

  return JSON.stringify({
    languageCode: props.languageCode,
    answers: orderedAnswerEntries.value.map((entry) => entry.key),
    score: props.totalScore,
    profile: props.profileName,
  })
})

const getStoredScriptUrl = () => {
  if (typeof window === 'undefined') return ''

  try {
    return window.localStorage.getItem(SCRIPT_URL_STORAGE_KEY) || ''
  } catch {
    return ''
  }
}

const getLastSubmittedSignature = () => {
  if (typeof window === 'undefined') return ''

  try {
    return window.localStorage.getItem(`${SUBMISSION_CACHE_KEY}:${props.languageCode}`) || ''
  } catch {
    return ''
  }
}

const setLastSubmittedSignature = (signature) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(`${SUBMISSION_CACHE_KEY}:${props.languageCode}`, signature)
  } catch {
    // Ignore localStorage write failures and keep background capture best-effort.
  }
}

const buildPayload = () => {
  const payload = {
    timestamp: new Date().toISOString(),
    languageCode: props.languageCode,
    language: props.languageLabel,
    pageUrl: typeof window === 'undefined' ? '' : window.location.href,
    score: props.totalScore,
    profile: props.profileName,
    submissionMode: 'automatic',
  }

  orderedAnswerEntries.value.forEach((entry, index) => {
    payload[`q${index + 1}`] = entry.key
    payload[`q${index + 1}Text`] = entry.text
  })

  return payload
}

const dispatchPayload = async (payload) => {
  const body = JSON.stringify(payload)

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'text/plain;charset=UTF-8' })
    const accepted = navigator.sendBeacon(scriptUrl, blob)
    if (accepted) {
      return true
    }
  }

  await fetch(scriptUrl, {
    method: 'POST',
    mode: 'no-cors',
    keepalive: true,
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
    body,
  })

  return true
}

const submitInBackground = async () => {
  if (!isMounted || isSubmitting || !scriptUrl || !responseSignature.value) {
    return
  }

  if (getLastSubmittedSignature() === responseSignature.value) {
    return
  }

  isSubmitting = true

  try {
    const dispatched = await dispatchPayload(buildPayload())
    if (dispatched) {
      setLastSubmittedSignature(responseSignature.value)
    }
  } catch (error) {
    console.error('Automatic self-assessment capture failed.', error)
  } finally {
    isSubmitting = false
  }
}

watch(responseSignature, (signature) => {
  if (!signature || !scriptUrl) return

  if (submitTimer) {
    clearTimeout(submitTimer)
  }

  submitTimer = setTimeout(() => {
    submitInBackground()
  }, 800)
})

onMounted(() => {
  isMounted = true
  scriptUrl = DEFAULT_SCRIPT_URL || getStoredScriptUrl()

  if (responseSignature.value && scriptUrl) {
    submitInBackground()
  }
})

onBeforeUnmount(() => {
  isMounted = false

  if (submitTimer) {
    clearTimeout(submitTimer)
  }
})
</script>

<template></template>
