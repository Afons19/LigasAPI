from django.db import models

# Create your models here.
class Liga(models.Model):
    nome = models.CharField(max_length=100, blank=False)
    pais = models.CharField(max_length=50, blank=False)
    epoca = models.DateTimeField()
    data_inicio = models.DateField()
    data_fim = models.DateField()

    def __str__(self):
        return f'{self.nome} - {self.pais}'
    
class Equipa(models.Model):
    nome = models.CharField(max_length=100, blank=False)
    treinador = models.CharField(max_length=100, blank=False)
    cidade = models.CharField(max_length=100, blank=False)
    ano_fundacao = models.DateField()
    liga = models.ForeignKey(Liga, help_text='Liga')

    def __str__(self):
        return f'Equipa: {self.nome} - {self.cidade}'
    
class Jogador(models.Model):
    nome = models.CharField(max_length=100)
    
