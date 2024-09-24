from abc import ABC, abstractmethod


class UserRepository(ABC):
    @abstractmethod
    def get_user(self, user_id):
        pass
