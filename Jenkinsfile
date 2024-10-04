pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/Quizzfly/quizzfly.git'
            }
        }
        stage('Stop Existing Container') {
            steps {
                script {
                    sh 'docker-compose down || true' // Dừng và xóa các container đang chạy
                }
            }
        }
        stage('Build and Deploy with Docker Compose') {
            steps {
                // Tạo tag cho phiên bản mới
                sh 'docker build -t quizzfly-client:latest .'
                // Cập nhật dịch vụ mới
                sh 'docker-compose up --build -d'
            }
        }
    }
}
