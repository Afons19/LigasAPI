<script>
import api from '@/services/api';

    export default {
        data() {
            return {
                jogadores: [],
            };
        },

        mounted() {
            api.get('jogadores/')
            .then(r => this.jogadores = r.data);
        },
    };
</script>

<template>
    <div>
        <h2>Jogadores</h2>
        <ul>
            <li v-for="jogador in jogadores" :key="jogador.id">
                {{ jogador.nome }} ({{ jogador.numero}}) - {{ jogador.posicao }} - {{ jogador.equipa_nome }}
            </li>
        </ul>
    </div>
</template>