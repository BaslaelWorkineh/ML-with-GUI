// src/composables/useModelTraining.js
import { ref, reactive } from 'vue'

export function useModelTraining() {
  const selectedModel = ref('Linear Regression')
  const datasetFile = ref(null)
  const parameters = reactive({
    learningRate: 0.001,
    epochs: 100,
    batchSize: 32,
    validationSplit: 0.2
  })
  const trainingStatus = ref('idle') // idle, training, completed, error
  const trainingProgress = ref(0)
  const modelMetrics = reactive({
    accuracy: 0,
    loss: 0,
    validationAccuracy: 0,
    validationLoss: 0
  })

  return {
    selectedModel,
    datasetFile,
    parameters,
    trainingStatus,
    trainingProgress,
    modelMetrics
  }
}