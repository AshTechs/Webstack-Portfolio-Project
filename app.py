from flask import Flask
from auth import auth_blueprint
from models import db
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Register Blueprints
app.register_blueprint(auth_blueprint)

# Initialize database
db.init_app(app)

if __name__ == '__main__':
    app.run()
