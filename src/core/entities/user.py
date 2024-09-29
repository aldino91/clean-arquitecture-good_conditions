from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from src.infrastructure.database.db_connection import Base


class Usuario(Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True)
    dni = Column(String(9), unique=True, nullable=False)
    nombre = Column(String(80), unique=False, nullable=False)
    apellido = Column(String(80), unique=False, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    telefono = Column(String(80), unique=True, nullable=False)
    contraseña = Column(String(255), unique=False, nullable=False)
    calle = Column(String(255), unique=False, nullable=False)
    ici = relationship("ICI", back_populates="usuario", uselist=False)

    def __repr__(self):
        return f"<User {self.email}>"

    def to_dict(self):
        return {
            "id": self.id,
            "dni": self.dni,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email,
            "telefono": self.telefono,
            "contraseña": self.contraseña,
            "calle": self.calle,
            "ici": self.ici.to_dict() if self.ici else None,
        }
