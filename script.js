
const app = Vue.createApp({
    data() {
        return {
            channelName: "SVT 1",
            program: [],
            loading: false,
            menuOpen: false
        };
    },
    methods: {
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
            const menu = document.querySelector('.menu');
            const icon = document.querySelector('.menu-icon i');
            menu.classList.toggle('menu--show');

            if (menu.classList.contains('menu--show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        },

        async loadChannel(name) {
            this.channelName = name;
            this.loading = true;
            this.program = [];

            try {
                const res = await fetch(`data/${name}.json`);
                this.program = await res.json();
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },

        formatTime(dateStr) {
            const d = new Date(dateStr);
            return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }
    },

    mounted() {
        this.loadChannel("SVT 1");
    }
});

app.mount("#app");
