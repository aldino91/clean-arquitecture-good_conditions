from ...core.entities.user import Usuario
from ...core.interfaces.int_datasource import IntDatasource

# src/infrastructure/database/mysql_config.py
from .db_connection import DBConnection

MYSQL_URL = "mysql+pymysql://root:triangolo@localhost/goodconditions2"
MYSQL_DB = DBConnection(MYSQL_URL)


class DatasourceMysqlImpl(IntDatasource):

    def get_user_by_id(self, user_id):
        return Usuario.to_dict(self)

    def get_user_by_email(self, email):
        return Usuario.to_dict(self)

    def create_user(self, user):
        return Usuario

    def update_user(self, user):
        return Usuario.to_dict(self)

    def delete_user(self, user_id):
        return Usuario.to_dict(self)
