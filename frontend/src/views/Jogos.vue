<script>
    import api from '@/services/api';

    export default {
        data() {
            return {
                jogos: [],
            };
        },

        mounted() {
            api.get('jogos/')
            .then(r => this.jogos = r.data);
        },
    };
</script>

<template>
    <div>
        <h2>Jogos</h2>
        <ul>
            <li v-for="jogo in jogos" :key="jogo.id">
                {{ jogo.equipa_casa }} x {{ jogo.equipa_visitante }}
            </li>
        </ul>
    </div>
</template>