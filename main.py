# from src.infrastructure.web.flask.app_flask import app as flask_app

#     if __name__ == "__main__":
#         flask_app.run(debug=True)


# main.py
import uvicorn
from src.infrastructure.web.fastApi.app_fast_api import app as fastapi_app

if __name__ == "__main__":
    uvicorn.run(fastapi_app, host="0.0.0.0", port=8000)
