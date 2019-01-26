<template>
    <div>
        <button v-on:click="tmp">{{temp}}</button>
    </div>
</template>

<script>
    import socket from '~/plugins/socket.io.js';
    export default {
        data(){
            return {
            temp: 'button'
            }
        },
        methods: {
            tmp(){
            console.log('asd');
            socket.emit('click', {message: 'clicked'});
            }
        },
        beforeMount() {
            socket.on('temp', (data) => console.log(data));
            socket.on('click_answer', data => console.log(data));
        },
        mounted: () => {
            console.log('mounted');
            socket.emit('asd', {message: 'asd from client'});
        }
    }
</script>