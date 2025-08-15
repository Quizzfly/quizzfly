pipeline {
    agent any

    stages {
        stage('Stop Existing Container') {
            steps {
                script {
                    sh 'docker compose down || true'
                }
            }
        }
        stage('Build and Deploy with Docker Compose') {
            steps {
                sh 'docker compose up --build -d'
            }
        }
    }
    post {
        always {
            script {
                sh 'docker compose logs'
            }
        }
    }
}
