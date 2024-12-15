// src/composables/useModelTraining.js
import { ref, reactive, watch, onMounted } from "vue";

export function useModelTraining() {
  const selectedModel = ref(localStorage.getItem("selectedModel") || "Linear Regression");
  const datasetFile = ref(null);
  const previewHeaders = ref(JSON.parse(localStorage.getItem("previewHeaders") || "[]"));
  const previewData = ref(JSON.parse(localStorage.getItem("previewData") || "[]"));

  const parameters = reactive({
    learningRate: parseFloat(localStorage.getItem("learningRate")) || 0.001,
    epochs: parseInt(localStorage.getItem("epochs")) || 100,
    batchSize: parseInt(localStorage.getItem("batchSize")) || 32,
    validationSplit: parseFloat(localStorage.getItem("validationSplit")) || 0.2,
  });

  const trainingStatus = ref(localStorage.getItem("trainingStatus") || "idle");
  const trainingProgress = ref(parseFloat(localStorage.getItem("trainingProgress")) || 0);
  const modelMetrics = reactive({
    accuracy: parseFloat(localStorage.getItem("metrics_accuracy")) || 0,
    loss: parseFloat(localStorage.getItem("metrics_loss")) || 0,
    validationAccuracy: parseFloat(localStorage.getItem("metrics_validationAccuracy")) || 0,
    validationLoss: parseFloat(localStorage.getItem("metrics_validationLoss")) || 0,
  });

  // Watchers for syncing data with localStorage
  watch(selectedModel, (newValue) => localStorage.setItem("selectedModel", newValue));
  watch(previewHeaders, (newValue) => localStorage.setItem("previewHeaders", JSON.stringify(newValue)));
  watch(previewData, (newValue) => localStorage.setItem("previewData", JSON.stringify(newValue)));
  watch(parameters, (newValue) => {
    localStorage.setItem("learningRate", newValue.learningRate);
    localStorage.setItem("epochs", newValue.epochs);
    localStorage.setItem("batchSize", newValue.batchSize);
    localStorage.setItem("validationSplit", newValue.validationSplit);
  }, { deep: true });
  watch(trainingStatus, (newValue) => localStorage.setItem("trainingStatus", newValue));
  watch(trainingProgress, (newValue) => localStorage.setItem("trainingProgress", newValue));
  watch(modelMetrics, (newValue) => {
    localStorage.setItem("metrics_accuracy", newValue.accuracy);
    localStorage.setItem("metrics_loss", newValue.loss);
    localStorage.setItem("metrics_validationAccuracy", newValue.validationAccuracy);
    localStorage.setItem("metrics_validationLoss", newValue.validationLoss);
  }, { deep: true });

  const processFile = async (file) => {
    datasetFile.value = file;

    localStorage.setItem("fileMetadata", JSON.stringify({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));

    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      const content = await file.text();
      const rows = content.split("\n").map(row => row.split(","));
      if (rows.length > 0) {
        previewHeaders.value = rows[0].map(header => header.trim());
        previewData.value = rows.slice(1, 6).map(row => {
          return Object.fromEntries(
            row.map((cell, index) => [previewHeaders.value[index], cell.trim()])
          );
        });
      }
    }
  };

  const removeFile = () => {
    datasetFile.value = null;
    previewHeaders.value = [];
    previewData.value = [];
    localStorage.removeItem("fileMetadata");
  };

  onMounted(() => {
    const fileMetadata = localStorage.getItem("fileMetadata");
    if (fileMetadata) {
      const metadata = JSON.parse(fileMetadata);
      console.log("Restored file metadata from localStorage:", metadata);
    }
  });

  return {
    selectedModel,
    datasetFile,
    previewHeaders,
    previewData,
    parameters,
    trainingStatus,
    trainingProgress,
    modelMetrics,
    processFile,
    removeFile,
  };
}
