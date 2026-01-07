<script>
    import api from '@/services/api.js'

    export default {
        data() {
            return {
                ligas: [],
            };
        },

        mounted() {
            api.get('ligas/')
            .then(response => {
                this.ligas = response.data;
            });
        }
    }
</script>

<template>
    <div>
        <h2>Ligas</h2>
        <ul>
            <li v-for="liga in ligas" :key="liga.id">
                {{ liga.nome }} - {{ liga.epoca }}
            </li>
        </ul>
    </div>
</template>