<script>
    import api from '@/services/api.js';

    export default {
        data() {
            return { equipas: [] };
        },

        mounted() {
            api.get('equipas/')
            .then(r => this.equipas = r.data);
        },
    };
</script>
<template>
    <div>
        <h2>Equipas</h2>
        <ul>
            <li v-for="equipa in equipas" :key="equipa.id">
                {{ equipa.nome }} - {{ equipa.treinador }}
            </li>
        </ul>
    </div>
</template>