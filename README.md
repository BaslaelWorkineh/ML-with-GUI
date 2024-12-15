# ML No-Code Project

The **ML No-Code** project aims to make machine learning accessible to non-technical users by providing an easy-to-use web interface for training, testing, and deploying machine learning models. No coding experience is necessary – users can simply upload their data, choose a model, and let the system handle the training, evaluation, and prediction process.

## Features

- **File Upload**: Users can upload datasets in CSV format directly to the system.
- **Model Selection**: Choose from a variety of pre-configured machine learning models (e.g., Linear Regression, Logistic Regression, Decision Trees, Neural Networks) for training.
- **Training & Evaluation**: After selecting a model, the system automatically trains the model with the uploaded data, evaluates performance, and displays accuracy, loss, and other important metrics.
- **Interactive Interface**: A no-code, web-based interface makes machine learning accessible to everyone.
- **Export Model**: Once training is complete, users can download the trained model for further use or deployment.
- **Progress Tracking**: The system provides live updates on training progress and status.
- **Model History**: Track and compare previous models with stored training histories.

## Tech Stack

- **Frontend**: Vue.js for creating a user-friendly interface.
- **Backend**: Django with Django REST Framework for handling API requests and model training.
- **Machine Learning**: Scikit-learn for model training and evaluation, Pandas for data manipulation, Joblib for model saving and loading.
- **Database**: PostgreSQL (or SQLite for local development) to store user data and training history.
- **Other Tools**: Docker for containerizing the application, and Celery for background tasks (if necessary).

## Installation

### Prerequisites

Make sure you have the following installed:
- Python 3.x
- Node.js (for the frontend build)
- pip (for installing Python packages)
- npm or yarn (for managing front-end dependencies)
