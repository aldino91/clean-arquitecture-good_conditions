from flask import Flask, render_template
from src.infrastructure.database.sqlite import DataSourceSQLiteImpl
from src.core.use_cases.user_use_cases import UserUseCases

app = Flask(__name__, template_folder="../../../infrastructure/templates")

user_repository = DataSourceSQLiteImpl()
user_use_cases = UserUseCases(user_repository)


@app.route("/user/<int:user_id>")
def get_user(user_id):
    user = user_use_cases.get_user(user_id)
    return render_template("user.html", user=user, message="Hello World from Flask")
