pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/Quizzfly/quizzfly.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Project') {
            steps {
                sh 'npm run build'
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
