from core.entities.user import Usuario
from core.interfaces.int_datasource import IntDatasource
from .db_connection import DBConnection

POSTGRES_URL = "postgresql://root:triangolo@localhost/goodconditions2"
postgres_db = DBConnection(POSTGRES_URL)


class DatasourcePostgresImpl(IntDatasource):
    def __init__(self):
        self.db = postgres_db

    def get_user_by_id(self, user_id):
        session = self.db.get_session()
        return session.query(Usuario).filter(Usuario.id == user_id).first()

    def get_user_by_email(self, email):
        session = self.db.get_session()
        return session.query(Usuario).filter(Usuario.email == email).first()

    def create_user(self, user):
        session = self.db.get_session()
        session.add(user)
        session.commit()
        return user

    def update_user(self, user):
        session = self.db.get_session()
        session.update(user)
        session.commit()
        return user

    def delete_user(self, user_id):
        session = self.db.get_session()
        session.delete(user_id)
        session.commit()
        return user_id
