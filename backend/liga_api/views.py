from rest_framework import viewsets, permissions
from .models import (
    Liga, 
    Equipa,
    Jogador, 
    Jogo
)
from .serializer import (
    LigaSerializer,
    EquipaSerializer,
    JogadorSerializer,
    JogoSerializer
)

# Create your views here.
class LigaViewSet(viewsets.ModelViewSet):
    queryset = Liga.objects.all()
    serializer_class = LigaSerializer
    permission_classes = [permissions.AllowAny]

class EquipaViewSet(viewsets.ModelViewSet):
    queryset = Equipa.objects.all()
    serializer_class = EquipaSerializer
    permission_classes = [permissions.AllowAny]

class JogadorViewSet(viewsets.ModelViewSet):
    queryset = Jogador.objects.all()
    serializer_class = JogadorSerializer
    permission_classes = [permissions.AllowAny]

class JogoViewSet(viewsets.ModelViewSet):
    queryset = Jogo.objects.all()
    serializer_class = JogoSerializer
    permission_classes = [permissions.AllowAny]