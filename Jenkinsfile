@Library("test") _

pipeline {
    agent any

    stages {

        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }

        stage('Test Shared Library') {
            steps {
                script {
                    hello.hellofriend()
                }
            }
        }

        stage('Create Folder') {
            steps {
                sh 'mkdir -p devops'
            }
        }
    }
}
