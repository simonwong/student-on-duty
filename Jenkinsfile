def IMG_NAME = 'student_on_duty'
def CONTAINER_NAME = 'student_on_duty'

pipeline {
  agent any

  stages {
    stage('Clear old container') {
      steps {
        script {
          try {
            sh "docker rm -f ${CONTAINER_NAME}"
          } catch (exc) {
            echo "Not Found container:${CONTAINER_NAME} "
            echo "${exc}"
          }
        }
      }
    }
    stage('Build') {
      steps {
        sh "docker build -t ${IMG_NAME} -f Dockerfile ."
        sh "docker run -d \
            -p 7404:3000 \
            --name ${CONTAINER_NAME} \
            ${IMG_NAME}"
      }
    }
  }

  post {
    success {
      echo 'success'
    }
    failure {
      echo 'fail'
    }
  }
}
