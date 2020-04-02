<template>
    <div>
        <div v-show="!selectedSearch">
            <label :for="uniqueLabelId1" class="block text-sm font-medium leading-5 text-gray-700">{{ label }}</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input :id="uniqueLabelId1" v-model="search" class="form-input block w-full sm:text-sm sm:leading-5 focus:outline-none"
                    :class="{'rounded-b-none': searchResults.length}"
                    :placeholder="placeholder"
                >
            </div>
            <transition
                enter-class="transform scale-95 opacity-0"
                leave-class="transform scale-100 opacity-100"
                enter-active-class="transition duration-100 ease-out"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-to-class="transform scale-95 opacity-0"
            >
                <div v-show="searchResults.length" class="absolute bg-white border-b border-l border-r shadow-sm rounded-b w-full z-10" v-on-clickaway="away">
                    <ul class="overflow-auto" style="max-height: 500px;">
                        <li v-for="(location, key) in searchResults" :key="key" class="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                            @click="handleSearchSelect(location)"
                        >
                            {{ location }}
                        </li>
                    </ul>
                </div>
            </transition>
        </div>
        <div v-show="selectedSearch !== null">
            <label :for="uniqueLabelId2" class="block text-sm font-medium leading-5 text-gray-700">{{ label }}</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input :id="uniqueLabelId2" v-model="selectedSearch" class="form-input block w-full sm:text-sm sm:leading-5 focus:outline-none focus:shadow-none focus:border-gray-300"
                    disabled
                >
                <button class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-500 focus:outline-none rounded-tr-lg" @click="removeSelected">
                    <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway';
    export default {
        name: 'SearchLocations',
        mixins: [ clickaway ],
        props: {
            options: {type: Array, default: () => []},
            selectedSearch: {type: String, default: null},
            label: {type: String, default: null},
            placeholder: {type: String, default: null},
        },
        data() {
            return {
                search: null,
                searchResults: [],
                uniqueLabelId1: Math.random().toString(36).substring(2) + Date.now().toString(36),
                uniqueLabelId2: Math.random().toString(36).substring(2) + Date.now().toString(36)
            };
        },
        watch: {
            search(search) {
                if (!search) {
                    this.searchResults = [];
                    return;
                }
                let searchStrings = search.split(' ');
                this.searchResults =  this.options.filter(location => {
                    let includes = true;
                    for (let i = 0; i < searchStrings.length; i++) {
                        if (!searchStrings[i]) {
                            continue;
                        }
                        if (!location.toLowerCase().includes(searchStrings[i].toLowerCase())) {
                            includes = false;
                        }
                    }
                    if (includes === true) {
                        return location;
                    }
                });
            },
        },
        methods: {
            away() {
                this.search = null;
                this.searchResults = [];
            },
            removeSelected() {
                this.$emit('selected', null);
            },
            handleSearchSelect(location) {
                this.search = null;
                this.searchResults = [];
                this.$emit('selected', location);
            },
        },
    };
</script>

<style scoped>

</style>
