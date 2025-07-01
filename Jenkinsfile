pipeline {
    agent any

    environment {
        HEROKU_APP_NAME = 'nodejsrc'
        HEROKU_EMAIL = 'rchanda@heroku.com'
        HEROKU_API_KEY = credentials('HEROKU_API_KEY')
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your/repo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install' // or `bundle install`, `pip install`, etc.
            }
        }

        stage('Heroku Deploy') {
            steps {
                sh '''
                    echo "$HEROKU_API_KEY" | heroku auth:token
                    echo $HEROKU_API_KEY | heroku login --interactive
                    heroku git:remote -a $HEROKU_APP_NAME
                    git push https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP_NAME.git HEAD:master
                '''
            }
        }
    }
}
