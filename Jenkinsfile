pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/Quizzfly/quizzfly.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t quizzfly-client .'
            }
        }
        stage('Deploy Docker Container') {
            steps {
                sh 'docker run -d -p 5000:80 quizzfly-client'
            }
        }
    }
}
