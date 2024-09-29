from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()  # Define Base como la base de tus modelos


class DBConnection:
    def __init__(self, db_url):
        # Crea el motor de conexión a la base de datos
        self.engine = create_engine(db_url, echo=True)  # Usa echo=True para ver las consultas SQL
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

    def create_tables(self):
        # Aquí debería estar presente el modelo Usuario y otros modelos que uses
        from ...core.entities.user import Usuario  # Importar tus modelos

        Base.metadata.create_all(bind=self.engine)  # Esto crea todas las tablas
        print(f"Tablas creadas exitosamente")

    def get_session(self):
        return self.SessionLocal()
