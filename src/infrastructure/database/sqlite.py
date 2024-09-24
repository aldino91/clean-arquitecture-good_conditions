from src.core.interfaces.user_repository import UserRepository
from src.core.entities.user import User


class DataSourceSQLiteImpl(UserRepository):
    def get_user(self, user_id):
        # Simulación de obtención de usuario de SQLite
        return User(user_id, f"User {user_id}", f"user{user_id}@example.com")
