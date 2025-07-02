pipeline {
    agent any

    environment {
        HEROKU_APP_NAME = 'nodejsrc'
        HEROKU_API_KEY = credentials('HEROKU_API_KEY')  // Jenkins secret text
        HEROKU_EMAIL = credentials('HEROKU_EMAIL')      // Jenkins secret text
        PATH = "/usr/local/bin:${env.PATH}"             // Make Heroku CLI accessible
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/ramanchanda/nodejs.git', branch: 'main'
            }
        }

        stage('Set Heroku Remote') {
            steps {
                sh '''
                    git remote remove heroku 2>/dev/null || true
                    heroku git:remote -a $HEROKU_APP_NAME
                '''
            }
        }

        // stage('Authenticate Heroku CLI') {
        //     steps {
        //         sh '''
        //             echo "machine api.heroku.com\n  login $HEROKU_EMAIL\n  password $HEROKU_API_KEY\nmachine git.heroku.com\n  login $HEROKU_EMAIL\n  password $HEROKU_API_KEY" > ~/.netrc
        //             chmod 600 ~/.netrc
        //         '''
        //     }
        // }

        stage('Deploy to Heroku') {
            steps {
                sh 'git push heroku HEAD:refs/heads/main --force'
            }
        }

        // stage('Cleanup') {
        //     steps {
        //         sh 'rm -f ~/.netrc'
        //     }
        // }
    }

    post {
        success {
            echo "✅ Successfully deployed to Heroku!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
