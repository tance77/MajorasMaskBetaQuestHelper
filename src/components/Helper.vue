<template>
    <div class="p-4">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
            Majora's Mask Beta Quest (Helper)
        </h2>

        <div class="bg-white shadow rounded-lg mt-4">
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-90">
                    Add Location
                </h3>
                <p class="mt-1 text-sm leading-5 text-gray-500">
                    Start by typing a location in one of the below input fields.
                </p>
            </div>
            <div class="flex mt-4 p-4">
                <div class="flex-1 mr-2 relative">
                    <SearchLocations label="Enter" :options="fromLocations" :selected-search="selectedNewFrom"
                        placeholder="Curiosity Shop (from Back Room)" @selected="handleSearchFromUpdate"
                    />
                </div>

                <div class="flex-1 ml-2 relative">
                    <SearchLocations label="Exit" :options="nodes" :selected-search="selectedNewTo"
                        placeholder="Termina Field" @selected="handleSearchToUpdate"
                    />
                </div>
            </div>
            <div class="text-right mt-4 p-4">
                <span class="ml-3 inline-flex rounded-md shadow-sm">
                    <button type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-25 disabled:cursor-not-allowed"
                        :disabled="Object.entries(selectedNewTo).length === 0 || Object.entries(selectedNewFrom).length === 0" @click="addLocation"
                    >
                        Add
                    </button>
                </span>
            </div>
        </div>

        <div class="bg-white shadow rounded-lg mt-4">
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-90">
                    Shortest Path
                </h3>
                <p class="mt-1 text-sm leading-5 text-gray-500">
                    Are you lost? Maybe we can find a path for you. Type your location below and where you want to go.
                </p>
            </div>
            <div class="bg-orange-50 border-l-4 border-orange-400 text-orange-600 p-4" role="alert">
                <p class="font-bold">
                    Warning
                </p>
                <p>This is an experimental feature and the path provided may be inaccurate.</p>
            </div>
            <div class="flex mt-4 p-4">
                <div class="flex-1 mr-2 relative">
                    <SearchLocations label="From" :options="nodes" :selected-search="selectedShortestPathFrom"
                        placeholder="Zora Cape" @selected="handleShortestPathFromUpdate"
                    />
                </div>

                <div class="flex-1 ml-2 relative">
                    <SearchLocations label="To" :options="nodes" :selected-search="selectedShortestPathTo"
                        placeholder="Termina Field" @selected="handleShortestPathToUpdate"
                    />
                </div>
            </div>
            <div class="text-right mt-4 p-4">
                <span class="ml-3 inline-flex rounded-md shadow-sm">
                    <button type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-25 disabled:cursor-not-allowed"
                        :disabled="Object.entries(selectedShortestPathFrom).length === 0 || Object.entries(selectedShortestPathTo).length === 0" @click="findShortestPath"
                    >
                        Find Shortest Path
                    </button>
                </span>
            </div>
            <div v-if="shortestPath !== null" class="p-4">
                <h3 class="text-lg leading-6 font-medium text-gray-90 mt-4">
                    Shortest Path
                </h3>
                <div class="flex items-center text-sm leading-5 font-medium mt-4">
                    <div v-for="(location, key) in shortestPath" :key="key" class="flex items-center">
                        <span class="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out">{{ location.alias }}</span>
                        <svg v-if="key !== shortestPath.length -1" class="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <div class="rounded-lg mt-4">
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6 bg-white rounded-t-lg">
                <h3 class="text-lg leading-6 font-medium text-gray-90">
                    Known Locations
                </h3>
                <p class="mt-1 text-sm leading-5 text-gray-500">
                    Locations added above will appear here.
                </p>
            </div>
            <div class="flex flex-col">
                <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg-b border-b border-gray-200">
                        <table class="min-w-full">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Enter
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <tr v-for="(nodes, nodeIndex) in graph.adjacencyList" v-if="graph.adjacencyList[nodeIndex].length" :key="nodeIndex">
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900">
                                        {{ nodeIndex }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900">
                                        <table class="w-full">
                                            <tr v-for="(node, edgeIndex) in nodes" :key="nodeIndex+'edge'+edgeIndex">
                                                <td class="w-4/5">
                                                    {{ node.name }}
                                                </td>
                                                <td class="flex-1">
                                                    <button class="text-red-500" @click="removeIndexFromAdjacencyList(edgeIndex, nodeIndex)">
                                                        <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                                                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                clip-rule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Notification :show="showNotification" :message="message" @close="handleNotificationClose"/>
    </div>
</template>

<script>
    import SearchLocations from "./SearchLocations";
    import Notification from "./Notification";

    export default {
        name: "Helper",
        components: {Notification, SearchLocations},
        data() {
            return {
                shortestPath: null,
                selectedNewFrom: {},
                selectedNewTo: {},
                selectedShortestPathFrom: {},
                selectedShortestPathTo: {},
                fromLocations: [
                    {
                        "node": "Mayor's Residence (from East Clock Town)",
                        "alias": "Mayor's Residence"
                    },
                    {
                        "node": "Majora's Room",
                        "alias": "Majora's Room"
                    },
                    {
                        "node": "Magic Hag's Potion Shop (from Southern Swamp)",
                        "alias": "Magic Hag's Potion Shop"
                    },
                    {
                        "node": "Ranch Barn (from Romani Ranch)",
                        "alias": "Ranch Barn"
                    },
                    {
                        "node": "Ranch House (from Romani Ranch)",
                        "alias": "Ranch House"
                    },
                    {
                        "node": "Honey & Darling",
                        "alias": "Honey & Darling"
                    },
                    {
                        "node": "Beneath the Graveyard (Heart Piece)",
                        "alias": "Beneath the Graveyard (Heart Piece)"
                    },
                    {
                        "node": "Beneath the Graveyard (Song of Storms)",
                        "alias": "Beneath the Graveyard (Song of Storms)"
                    },
                    {
                        "node": "Curiosity Shop (from West Clock Town)",
                        "alias": "Curiosity Shop"
                    },
                    {
                        "node": "Back Room (from Laundry Pool)",
                        "alias": "Back Room"
                    },
                    {
                        "node": "Curiosity Shop (from Back Room)",
                        "alias": "Curiosity Shop"
                    },
                    {
                        "node": "Back Room (from Curiosity Shop)",
                        "alias": "Back Room"
                    },
                    {
                        "node": "Great Bay Gossip Stones Grotto",
                        "alias": "Great Bay Gossip Stones Grotto"
                    },
                    {
                        "node": "Swamp Gossip Stones Grotto",
                        "alias": "Swamp Gossip Stones Grotto"
                    },
                    {
                        "node": "Ikana Gossip Stones Grotto",
                        "alias": "Ikana Gossip Stones Grotto"
                    },
                    {
                        "node": "Snowhead Gossip Stones Grotto",
                        "alias": "Snowhead Gossip Stones Grotto"
                    },
                    {
                        "node": "Generic Grotto",
                        "alias": "Generic Grotto"
                    },
                    {
                        "node": "Hotspring Water Grotto",
                        "alias": "Hotspring Water Grotto"
                    },
                    {
                        "node": "Deku Palace Garden Back Grotto",
                        "alias": "Deku Palace Garden Back Grotto"
                    },
                    {
                        "node": "Dodongo Grotto",
                        "alias": "Dodongo Grotto"
                    },
                    {
                        "node": "Deku Palace Garden Front Grotto",
                        "alias": "Deku Palace Garden Front Grotto"
                    },
                    {
                        "node": "Bisness Deku Scrub Grotto",
                        "alias": "Bisness Deku Scrub Grotto"
                    },
                    {
                        "node": "Cow Grotto",
                        "alias": "Cow Grotto"
                    },
                    {
                        "node": "Bio Baba Grotto",
                        "alias": "Bio Baba Grotto"
                    },
                    {
                        "node": "Magic Bean Seller Grotto",
                        "alias": "Magic Bean Seller Grotto"
                    },
                    {
                        "node": "Peahat Grotto",
                        "alias": "Peahat Grotto"
                    },
                    {
                        "node": "Deku Palace Garden Back Grotto",
                        "alias": "Deku Palace Garden Back Grotto"
                    },
                    {
                        "node": "Deku Palace Garden Front Grotto",
                        "alias": "Deku Palace Garden Front Grotto"
                    },
                    {
                        "node": "Lone Peak Shrine",
                        "alias": "Lone Peak Shrine"
                    },
                    {
                        "node": "Ikana Canyon (from Path to Ikana)",
                        "alias": "Ikana Canyon"
                    },
                    {
                        "node": "Ikana Canyon (from Ghost Hut)",
                        "alias": "Ikana Canyon"
                    },
                    {
                        "node": "Ikana Canyon (from Musicbox House)",
                        "alias": "Ikana Canyon"
                    },
                    {
                        "node": "Ikana Canyon (from Stone Tower)",
                        "alias": "Ikana Canyon"
                    },
                    {
                        "node": "Ikana Canyon (from Song of Soaring)",
                        "alias": "Ikana Canyon"
                    },
                    {
                        "node": "Ikana Canyon (from Beneath the Well)",
                        "alias": "Ikana Canyon"
                    },
                    {
                        "node": "Ikana Canyon (from Sakon's Hideout)",
                        "alias": "Ikana Canyon"
                    },
                    {
                        "node": "Ikana Canyon (from Clear Cutscene)",
                        "alias": "Ikana Canyon"
                    },
                    {
                        "node": "Ikana Canyon (from Ancient Castle of Ikana)",
                        "alias": "Ikana Canyon"
                    },
                    {
                        "node": "Spring Water Cave (from Farewell to Gibdos)",
                        "alias": "Spring Water Cave"
                    },
                    {
                        "node": "Ikana Canyon (from Fairy Fountain)",
                        "alias": "Ikana Canyon"
                    },
                    {
                        "node": "Ikana Canyon (from Secret Shrine)",
                        "alias": "Ikana Canyon"
                    },
                    {
                        "node": "Ikana Canyon (from Spring Water Cave)",
                        "alias": "Ikana Canyon"
                    },
                    {
                        "node": "Spring Water Cave (from Ikana Canyon)",
                        "alias": "Spring Water Cave"
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Exterior)",
                        "alias": "Pirates's Fortress Interior"
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Hookshot Lower)",
                        "alias": "Pirates's Fortress Interior"
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Hookshot Upper)",
                        "alias": "Pirates's Fortress Interior"
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Purple Pirate entrance)",
                        "alias": "Pirates's Fortress Interior"
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Purple Pirate exit)",
                        "alias": "Pirates's Fortress Interior"
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Green Pirate entrance)",
                        "alias": "Pirates's Fortress Interior"
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Green Pirate exit)",
                        "alias": "Pirates's Fortress Interior"
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Red Pirate entrance)",
                        "alias": "Pirates's Fortress Interior"
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Red Pirate exit)",
                        "alias": "Pirates's Fortress Interior"
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Telescope)",
                        "alias": "Pirates's Fortress Interior"
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Exterior balcony)",
                        "alias": "Pirates's Fortress Interior"
                    },
                    {
                        "node": "Milk Bar",
                        "alias": "Milk Bar"
                    },
                    {
                        "node": "Stone Tower Temple",
                        "alias": "Stone Tower Temple"
                    },
                    {
                        "node": "Treasure Chest Shop",
                        "alias": "Treasure Chest Shop"
                    },
                    {
                        "node": "Inverted Stone Tower Temple",
                        "alias": "Inverted Stone Tower Temple"
                    },
                    {
                        "node": "Inverted Stone Tower Temple (Boss Door)",
                        "alias": "Inverted Stone Tower Temple (Boss Door)"
                    },
                    {
                        "node": "Woodfall Temple (from Woodfall)",
                        "alias": "Woodfall Temple"
                    },
                    {
                        "node": "Deku Princess's Room (from Clear Cutscene)",
                        "alias": "Deku Princess's Room"
                    },
                    {
                        "node": "Deku Princess's Room (from Woodfall)",
                        "alias": "Deku Princess's Room"
                    },
                    {
                        "node": "Path to Mountain Village (from Termina Field)",
                        "alias": "Path to Mountain Village"
                    },
                    {
                        "node": "Path to Mountain Village (from Mountain Village)",
                        "alias": "Path to Mountain Village"
                    },
                    {
                        "node": "Ancient Castle of Ikana (from Beneath the Well)",
                        "alias": "Ancient Castle of Ikana"
                    },
                    {
                        "node": "Ancient Castle of Ikana (from Ikana Canyon)",
                        "alias": "Ancient Castle of Ikana"
                    },
                    {
                        "node": "Ancient Castle of Ikana (from Castle Interior)",
                        "alias": "Ancient Castle of Ikana"
                    },
                    {
                        "node": "Ancient Castle of Ikana (from Castle Exterior)",
                        "alias": "Ancient Castle of Ikana"
                    },
                    {
                        "node": "Ancient Castle of Ikana (from Keg Hole)",
                        "alias": "Ancient Castle of Ikana"
                    },
                    {
                        "node": "Ancient Castle of Ikana (from Hole under Block)",
                        "alias": "Ancient Castle of Ikana"
                    },
                    {
                        "node": "Ancient Castle of Ikana (from Igos du Ikana's Room)",
                        "alias": "Ancient Castle of Ikana"
                    },
                    {
                        "node": "Deku Playground",
                        "alias": "Deku Playground"
                    },
                    {
                        "node": "Odolwa's Room",
                        "alias": "Odolwa's Room"
                    },
                    {
                        "node": "Shooting Gallery (Clock Town)",
                        "alias": "Shooting Gallery (Clock Town)"
                    },
                    {
                        "node": "Snowhead Temple",
                        "alias": "Snowhead Temple"
                    },
                    {
                        "node": "Milk Road (from Termina Field)",
                        "alias": "Milk Road"
                    },
                    {
                        "node": "Milk Road (from Romani Ranch)",
                        "alias": "Milk Road"
                    },
                    {
                        "node": "Milk Road (from Gorman Racetrack back)",
                        "alias": "Milk Road"
                    },
                    {
                        "node": "Milk Road (from Gorman Racetrack)",
                        "alias": "Milk Road"
                    },
                    {
                        "node": "Milk Road (from Song of Soaring)",
                        "alias": "Milk Road"
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Hookshot Lower)",
                        "alias": "Pirates's Fortress Rooms (Hookshot Lower)"
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Hookshot Upper)",
                        "alias": "Pirates's Fortress Rooms (Hookshot Upper)"
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Purple Pirate entrance)",
                        "alias": "Pirates's Fortress Rooms (Purple Pirate entrance)"
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Purple Pirate exit)",
                        "alias": "Pirates's Fortress Rooms (Purple Pirate exit)"
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Green Pirate entrance)",
                        "alias": "Pirates's Fortress Rooms (Green Pirate entrance)"
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Green Pirate exit)",
                        "alias": "Pirates's Fortress Rooms (Green Pirate exit)"
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Red Pirate entrance)",
                        "alias": "Pirates's Fortress Rooms (Red Pirate entrance)"
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Red Pirate exit)",
                        "alias": "Pirates's Fortress Rooms (Red Pirate exit)"
                    },
                    {
                        "node": "Pirates's Fortress Rooms (from Telescope)",
                        "alias": "Pirates's Fortress Rooms"
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Sewers entrance)",
                        "alias": "Pirates's Fortress Rooms (Sewers entrance)"
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Sewers exit)",
                        "alias": "Pirates's Fortress Rooms (Sewers exit)"
                    },
                    {
                        "node": "Shooting Gallery (Swamp)",
                        "alias": "Shooting Gallery (Swamp)"
                    },
                    {
                        "node": "Pinnacle Rock",
                        "alias": "Pinnacle Rock"
                    },
                    {
                        "node": "Fairy's Fountain (Clock Town)",
                        "alias": "Fairy's Fountain (Clock Town)"
                    },
                    {
                        "node": "Fairy's Fountain (Woodfall)",
                        "alias": "Fairy's Fountain (Woodfall)"
                    },
                    {
                        "node": "Fairy's Fountain (Snowhead)",
                        "alias": "Fairy's Fountain (Snowhead)"
                    },
                    {
                        "node": "Fairy's Fountain (Great Bay)",
                        "alias": "Fairy's Fountain (Great Bay)"
                    },
                    {
                        "node": "Fairy's Fountain (Ikana)",
                        "alias": "Fairy's Fountain (Ikana)"
                    },
                    {
                        "node": "Swamp Spider House",
                        "alias": "Swamp Spider House"
                    },
                    {
                        "node": "Ocean Spider House",
                        "alias": "Ocean Spider House"
                    },
                    {
                        "node": "Bombers's Hideout",
                        "alias": "Bombers's Hideout"
                    },
                    {
                        "node": "Observatory (from Termina Field)",
                        "alias": "Observatory"
                    },
                    {
                        "node": "Observatory (from Telescope)",
                        "alias": "Observatory"
                    },
                    {
                        "node": "Woodfall Trial (from Moon)",
                        "alias": "Woodfall Trial"
                    },
                    {
                        "node": "Deku Palace (from Southern Swamp)",
                        "alias": "Deku Palace"
                    },
                    {
                        "node": "Deku Palace (from being thrown out)",
                        "alias": "Deku Palace"
                    },
                    {
                        "node": "Deku Palace (from Deku King's Chamber)",
                        "alias": "Deku Palace"
                    },
                    {
                        "node": "Deku Palace (from Monkey cage)",
                        "alias": "Deku Palace"
                    },
                    {
                        "node": "Deku Palace (from Deku Shrine)",
                        "alias": "Deku Palace"
                    },
                    {
                        "node": "Deku Palace (from Swamp Shortcut)",
                        "alias": "Deku Palace"
                    },
                    {
                        "node": "Deku Palace (from Deku Palace Garden Front Grotto)",
                        "alias": "Deku Palace"
                    },
                    {
                        "node": "Deku Palace (from Deku Palace Garden Back Grotto)",
                        "alias": "Deku Palace"
                    },
                    {
                        "node": "Deku Palace (from Deku Palace Garden Back Grotto)",
                        "alias": "Deku Palace"
                    },
                    {
                        "node": "Deku Palace (from Magic Bean Seller Grotto)",
                        "alias": "Deku Palace"
                    },
                    {
                        "node": "Deku Palace (from Deku Palace Garden Front Grotto)",
                        "alias": "Deku Palace"
                    },
                    {
                        "node": "Mountain Smithy",
                        "alias": "Mountain Smithy"
                    },
                    {
                        "node": "Termina Field (from West Clock Town)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Path to the Swamp)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Great Bay Coast)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Path to Mountain Village)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Path to Ikana)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Milk Road)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from South Clock Town)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from East Clock Town)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from North Clock Town)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Observatory)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (Telescope)",
                        "alias": "Termina Field (Telescope)"
                    },
                    {
                        "node": "Termina Field (from Milk Road with Cremia)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Post Office",
                        "alias": "Post Office"
                    },
                    {
                        "node": "Marine Research Lab",
                        "alias": "Marine Research Lab"
                    },
                    {
                        "node": "Beneath the Graveyard (Bottle)",
                        "alias": "Beneath the Graveyard (Bottle)"
                    },
                    {
                        "node": "Dampe's Room",
                        "alias": "Dampe's Room"
                    },
                    {
                        "node": "Goron Shrine (from Goron Village)",
                        "alias": "Goron Shrine"
                    },
                    {
                        "node": "Goron Shrine (from Goron Shop)",
                        "alias": "Goron Shrine"
                    },
                    {
                        "node": "Zora Hall (from Zora Cape)",
                        "alias": "Zora Hall"
                    },
                    {
                        "node": "Zora Hall (from Zora Cape back)",
                        "alias": "Zora Hall"
                    },
                    {
                        "node": "Zora Hall (from Zora Shop)",
                        "alias": "Zora Hall"
                    },
                    {
                        "node": "Zora Hall (from Lulu's Room)",
                        "alias": "Zora Hall"
                    },
                    {
                        "node": "Zora Hall (from Evan's Room)",
                        "alias": "Zora Hall"
                    },
                    {
                        "node": "Zora Hall (from Japas's Room)",
                        "alias": "Zora Hall"
                    },
                    {
                        "node": "Zora Hall (from Mikau's Room)",
                        "alias": "Zora Hall"
                    },
                    {
                        "node": "Zora Hall (from Band Rehearsal)",
                        "alias": "Zora Hall"
                    },
                    {
                        "node": "Trading Post",
                        "alias": "Trading Post"
                    },
                    {
                        "node": "Romani Ranch (from Milk Road)",
                        "alias": "Romani Ranch"
                    },
                    {
                        "node": "Romani Ranch (from Ranch Barn)",
                        "alias": "Romani Ranch"
                    },
                    {
                        "node": "Romani Ranch (from Ranch House)",
                        "alias": "Romani Ranch"
                    },
                    {
                        "node": "Romani Ranch (from Cucco Shack)",
                        "alias": "Romani Ranch"
                    },
                    {
                        "node": "Romani Ranch (from Doggy Racetrack)",
                        "alias": "Romani Ranch"
                    },
                    {
                        "node": "Romani Ranch (from Receiving Milk Bottle)",
                        "alias": "Romani Ranch"
                    },
                    {
                        "node": "Romani Ranch (from Romani being abducted)",
                        "alias": "Romani Ranch"
                    },
                    {
                        "node": "Twinmold's Room",
                        "alias": "Twinmold's Room"
                    },
                    {
                        "node": "Great Bay Coast (from Termina Field)",
                        "alias": "Great Bay Coast"
                    },
                    {
                        "node": "Great Bay Coast (from Zora Cape)",
                        "alias": "Great Bay Coast"
                    },
                    {
                        "node": "Great Bay Coast (from Murky Water Left)",
                        "alias": "Great Bay Coast"
                    },
                    {
                        "node": "Great Bay Coast (from Pinnacle Rock)",
                        "alias": "Great Bay Coast"
                    },
                    {
                        "node": "Great Bay Coast (from Fisherman's Hut)",
                        "alias": "Great Bay Coast"
                    },
                    {
                        "node": "Great Bay Coast (from Pirates's Fortress Exterior)",
                        "alias": "Great Bay Coast"
                    },
                    {
                        "node": "Great Bay Coast (from Murky Water Right)",
                        "alias": "Great Bay Coast"
                    },
                    {
                        "node": "Great Bay Coast (from Marine Research Lab)",
                        "alias": "Great Bay Coast"
                    },
                    {
                        "node": "Great Bay Coast (from Ocean Spider House)",
                        "alias": "Great Bay Coast"
                    },
                    {
                        "node": "Great Bay Coast (from Zora Mask Cutscene)",
                        "alias": "Great Bay Coast"
                    },
                    {
                        "node": "Great Bay Coast (from Song of Soaring)",
                        "alias": "Great Bay Coast"
                    },
                    {
                        "node": "Great Bay Coast (from Pirates's Fortress caught)",
                        "alias": "Great Bay Coast"
                    },
                    {
                        "node": "Zora Cape (from Great Bay Coast)",
                        "alias": "Zora Cape"
                    },
                    {
                        "node": "Zora Cape (from Zora Hall)",
                        "alias": "Zora Cape"
                    },
                    {
                        "node": "Zora Cape (from Zora Hall back)",
                        "alias": "Zora Cape"
                    },
                    {
                        "node": "Zora Cape (from Murky Water)",
                        "alias": "Zora Cape"
                    },
                    {
                        "node": "Zora Cape (from Waterfall Rapids)",
                        "alias": "Zora Cape"
                    },
                    {
                        "node": "Zora Cape (from Fairy's Fountain (Great Bay))",
                        "alias": "Zora Cape"
                    },
                    {
                        "node": "Zora Cape (from Song of Soaring)",
                        "alias": "Zora Cape"
                    },
                    {
                        "node": "Zora Cape (from Great Bay Temple)",
                        "alias": "Zora Cape"
                    },
                    {
                        "node": "Lottery Shop",
                        "alias": "Lottery Shop"
                    },
                    {
                        "node": "Pirates's Fortress Exterior (from Great Bay Coast)",
                        "alias": "Pirates's Fortress Exterior"
                    },
                    {
                        "node": "Pirates's Fortress Exterior (from Interior)",
                        "alias": "Pirates's Fortress Exterior"
                    },
                    {
                        "node": "Pirates's Fortress Exterior (from Sewers)",
                        "alias": "Pirates's Fortress Exterior"
                    },
                    {
                        "node": "Pirates's Fortress Exterior (from Sewers Draft)",
                        "alias": "Pirates's Fortress Exterior"
                    },
                    {
                        "node": "Pirates's Fortress Exterior (from Interior caught)",
                        "alias": "Pirates's Fortress Exterior"
                    },
                    {
                        "node": "Pirates's Fortress Exterior (from Interior balcony)",
                        "alias": "Pirates's Fortress Exterior"
                    },
                    {
                        "node": "Pirates's Fortress Exterior (from Sewers end)",
                        "alias": "Pirates's Fortress Exterior"
                    },
                    {
                        "node": "Fisherman's Hut",
                        "alias": "Fisherman's Hut"
                    },
                    {
                        "node": "Goron Shop",
                        "alias": "Goron Shop"
                    },
                    {
                        "node": "Deku King's Chamber (from Deku Palace)",
                        "alias": "Deku King's Chamber"
                    },
                    {
                        "node": "Deku King's Chamber (from Deku Palace upper)",
                        "alias": "Deku King's Chamber"
                    },
                    {
                        "node": "Deku King's Chamber (from Deku Princess's Room)",
                        "alias": "Deku King's Chamber"
                    },
                    {
                        "node": "Deku King's Chamber (from Releasing Monkey)",
                        "alias": "Deku King's Chamber"
                    },
                    {
                        "node": "Snowhead Trial (from Moon)",
                        "alias": "Snowhead Trial"
                    },
                    {
                        "node": "Path to the Swamp (from Termina Field)",
                        "alias": "Path to the Swamp"
                    },
                    {
                        "node": "Path to the Swamp (from Southern Swamp)",
                        "alias": "Path to the Swamp"
                    },
                    {
                        "node": "Path to the Swamp (from Shooting Gallery (Clock Town))",
                        "alias": "Path to the Swamp"
                    },
                    {
                        "node": "Doggy Racetrack",
                        "alias": "Doggy Racetrack"
                    },
                    {
                        "node": "Cucco Shack",
                        "alias": "Cucco Shack"
                    },
                    {
                        "node": "Ikana Graveyard (from Path to Ikana)",
                        "alias": "Ikana Graveyard"
                    },
                    {
                        "node": "Ikana Graveyard (from Beneath the Graveyard (Bottle))",
                        "alias": "Ikana Graveyard"
                    },
                    {
                        "node": "Ikana Graveyard (from Beneath the Graveyard (Heart Piece))",
                        "alias": "Ikana Graveyard"
                    },
                    {
                        "node": "Ikana Graveyard (from Beneath the Graveyard (Song of Storms))",
                        "alias": "Ikana Graveyard"
                    },
                    {
                        "node": "Ikana Graveyard (from Dampe's Room)",
                        "alias": "Ikana Graveyard"
                    },
                    {
                        "node": "Ikana Graveyard (from Defeating Captain Keeta)",
                        "alias": "Ikana Graveyard"
                    },
                    {
                        "node": "Goht's Room",
                        "alias": "Goht's Room"
                    },
                    {
                        "node": "Southern Swamp (from Path to the Swamp)",
                        "alias": "Southern Swamp"
                    },
                    {
                        "node": "Southern Swamp (from Tourist Information)",
                        "alias": "Southern Swamp"
                    },
                    {
                        "node": "Southern Swamp (from Woodfall)",
                        "alias": "Southern Swamp"
                    },
                    {
                        "node": "Southern Swamp (from Deku Palace)",
                        "alias": "Southern Swamp"
                    },
                    {
                        "node": "Southern Swamp (from Deku Palace Upper)",
                        "alias": "Southern Swamp"
                    },
                    {
                        "node": "Southern Swamp (from Magic Hag's Potion Shop)",
                        "alias": "Southern Swamp"
                    },
                    {
                        "node": "Southern Swamp (from Woods of Mystery)",
                        "alias": "Southern Swamp"
                    },
                    {
                        "node": "Southern Swamp (from Swamp Spider House)",
                        "alias": "Southern Swamp"
                    },
                    {
                        "node": "Southern Swamp (from Ikana Canyon)",
                        "alias": "Southern Swamp"
                    },
                    {
                        "node": "Southern Swamp (from Song of Soaring)",
                        "alias": "Southern Swamp"
                    },
                    {
                        "node": "Woodfall (from Southern Swamp)",
                        "alias": "Woodfall"
                    },
                    {
                        "node": "Woodfall (from Woodfall Temple)",
                        "alias": "Woodfall"
                    },
                    {
                        "node": "Woodfall (from Fairy's Fountain (Woodfall))",
                        "alias": "Woodfall"
                    },
                    {
                        "node": "Woodfall (from Woodfall Temple back)",
                        "alias": "Woodfall"
                    },
                    {
                        "node": "Woodfall (from Song of Soaring)",
                        "alias": "Woodfall"
                    },
                    {
                        "node": "Great Bay Trial (from Moon)",
                        "alias": "Great Bay Trial"
                    },
                    {
                        "node": "Great Bay Trial (from Murky Water)",
                        "alias": "Great Bay Trial"
                    },
                    {
                        "node": "Great Bay Temple (from Zora Cape)",
                        "alias": "Great Bay Temple"
                    },
                    {
                        "node": "Great Bay Temple (from Pirate Cutscene)",
                        "alias": "Great Bay Temple"
                    },
                    {
                        "node": "Waterfall Rapids (from Zora Cape)",
                        "alias": "Waterfall Rapids"
                    },
                    {
                        "node": "Beneath the Well (from Ikana Canyon)",
                        "alias": "Beneath the Well"
                    },
                    {
                        "node": "Beneath the Well (from Ancient Castle of Ikana)",
                        "alias": "Beneath the Well"
                    },
                    {
                        "node": "Mikau's Room (from Zora Hall)",
                        "alias": "Mikau's Room"
                    },
                    {
                        "node": "Japas's Room (from Zora Hall)",
                        "alias": "Japas's Room"
                    },
                    {
                        "node": "Lulu's Room (from Zora Hall)",
                        "alias": "Lulu's Room"
                    },
                    {
                        "node": "Evan's Room (from Zora Hall)",
                        "alias": "Evan's Room"
                    },
                    {
                        "node": "Zora Shop",
                        "alias": "Zora Shop"
                    },
                    {
                        "node": "Goron Village (from Path to Goron Village)",
                        "alias": "Goron Village"
                    },
                    {
                        "node": "Goron Village (from Goron Shrine)",
                        "alias": "Goron Village"
                    },
                    {
                        "node": "Goron Village (from Lone Peak Shrine)",
                        "alias": "Goron Village"
                    },
                    {
                        "node": "Goron Graveyard (from Mountain Village)",
                        "alias": "Goron Graveyard"
                    },
                    {
                        "node": "Sakon's Hideout",
                        "alias": "Sakon's Hideout"
                    },
                    {
                        "node": "Mountain Village (from Mountain Smithy)",
                        "alias": "Mountain Village"
                    },
                    {
                        "node": "Mountain Village (from Path to Goron Village)",
                        "alias": "Mountain Village"
                    },
                    {
                        "node": "Mountain Village (from Goron Graveyard)",
                        "alias": "Mountain Village"
                    },
                    {
                        "node": "Mountain Village (from Path to Snowhead)",
                        "alias": "Mountain Village"
                    },
                    {
                        "node": "Mountain Village (from Path to Mountain Village)",
                        "alias": "Mountain Village"
                    },
                    {
                        "node": "Mountain Village (from Clear Cutscene)",
                        "alias": "Mountain Village"
                    },
                    {
                        "node": "Mountain Village (from Song of Soaring)",
                        "alias": "Mountain Village"
                    },
                    {
                        "node": "Ghost Hut (from Ikana Canyon)",
                        "alias": "Ghost Hut"
                    },
                    {
                        "node": "Deku Shrine",
                        "alias": "Deku Shrine"
                    },
                    {
                        "node": "Path to Ikana (from Termina Field)",
                        "alias": "Path to Ikana"
                    },
                    {
                        "node": "Path to Ikana (from Ikana Graveyard)",
                        "alias": "Path to Ikana"
                    },
                    {
                        "node": "Path to Ikana (from Ikana Canyon)",
                        "alias": "Path to Ikana"
                    },
                    {
                        "node": "Swordsman's School",
                        "alias": "Swordsman's School"
                    },
                    {
                        "node": "Musicbox House",
                        "alias": "Musicbox House"
                    },
                    {
                        "node": "Igos du Ikana's Room",
                        "alias": "Igos du Ikana's Room"
                    },
                    {
                        "node": "Tourist Information",
                        "alias": "Tourist Information"
                    },
                    {
                        "node": "Stone Tower (from Ikana Canyon)",
                        "alias": "Stone Tower"
                    },
                    {
                        "node": "Stone Tower (from Un-inverting)",
                        "alias": "Stone Tower"
                    },
                    {
                        "node": "Stone Tower (from Stone Tower Temple)",
                        "alias": "Stone Tower"
                    },
                    {
                        "node": "Stone Tower (from Song of Soaring)",
                        "alias": "Stone Tower"
                    },
                    {
                        "node": "Inverted Stone Tower (from Inverting)",
                        "alias": "Inverted Stone Tower"
                    },
                    {
                        "node": "Inverted Stone Tower (from Inverted Stone Tower Temple)",
                        "alias": "Inverted Stone Tower"
                    },
                    {
                        "node": "Path to Snowhead (from Mountain Village)",
                        "alias": "Path to Snowhead"
                    },
                    {
                        "node": "Path to Snowhead (from Snowhead)",
                        "alias": "Path to Snowhead"
                    },
                    {
                        "node": "Snowhead (from Path to Snowhead/Void)",
                        "alias": "Snowhead"
                    },
                    {
                        "node": "Snowhead (from Snowhead Temple)",
                        "alias": "Snowhead"
                    },
                    {
                        "node": "Snowhead (from Fairy's Fountain (Snowhead)",
                        "alias": "Snowhead"
                    },
                    {
                        "node": "Snowhead (from Song of Soaring)",
                        "alias": "Snowhead"
                    },
                    {
                        "node": "Path to Goron Village (from Mountain Village)",
                        "alias": "Path to Goron Village"
                    },
                    {
                        "node": "Path to Goron Village (from Goron Village)",
                        "alias": "Path to Goron Village"
                    },
                    {
                        "node": "Path to Goron Village (from Goron Racetrack)",
                        "alias": "Path to Goron Village"
                    },
                    {
                        "node": "Gyorg's Room",
                        "alias": "Gyorg's Room"
                    },
                    {
                        "node": "Secret Shrine",
                        "alias": "Secret Shrine"
                    },
                    {
                        "node": "Stock Pot Inn (from East Clock Town)",
                        "alias": "Stock Pot Inn"
                    },
                    {
                        "node": "Stock Pot Inn (from East Clock Town upper)",
                        "alias": "Stock Pot Inn"
                    },
                    {
                        "node": "Stock Pot Inn (from Midnight Meeting)",
                        "alias": "Stock Pot Inn"
                    },
                    {
                        "node": "Clock Tower (from Pre Clock Tower)",
                        "alias": "Clock Tower"
                    },
                    {
                        "node": "Clock Tower (from South Clock Town)",
                        "alias": "Clock Tower"
                    },
                    {
                        "node": "Woods of Mystery",
                        "alias": "Woods of Mystery"
                    },
                    {
                        "node": "Stone Tower Trial (from Moon)",
                        "alias": "Stone Tower Trial"
                    },
                    {
                        "node": "On the Moon",
                        "alias": "On the Moon"
                    },
                    {
                        "node": "Gorman Racetrack (from Milk Road)",
                        "alias": "Gorman Racetrack"
                    },
                    {
                        "node": "Gorman Racetrack (from Milk Road west)",
                        "alias": "Gorman Racetrack"
                    },
                    {
                        "node": "Goron Racetrack (from Path to Goron Village)",
                        "alias": "Goron Racetrack"
                    },
                    {
                        "node": "East Clock Town (from Termina Field)",
                        "alias": "East Clock Town"
                    },
                    {
                        "node": "East Clock Town (from South Clock Town south)",
                        "alias": "East Clock Town"
                    },
                    {
                        "node": "East Clock Town (from Bombers's Hideout)",
                        "alias": "East Clock Town"
                    },
                    {
                        "node": "East Clock Town (from South Clock Town north)",
                        "alias": "East Clock Town"
                    },
                    {
                        "node": "East Clock Town (from Treasure Chest Shop)",
                        "alias": "East Clock Town"
                    },
                    {
                        "node": "East Clock Town (from North Clock Town)",
                        "alias": "East Clock Town"
                    },
                    {
                        "node": "East Clock Town (from Honey & Darling)",
                        "alias": "East Clock Town"
                    },
                    {
                        "node": "East Clock Town (from Mayor's Residence)",
                        "alias": "East Clock Town"
                    },
                    {
                        "node": "East Clock Town (from Shooting Gallery (Clock Town))",
                        "alias": "East Clock Town"
                    },
                    {
                        "node": "East Clock Town (from Stock Pot Inn)",
                        "alias": "East Clock Town"
                    },
                    {
                        "node": "East Clock Town (from Stock Pot Inn upper)",
                        "alias": "East Clock Town"
                    },
                    {
                        "node": "East Clock Town (from Milk Bar)",
                        "alias": "East Clock Town"
                    },
                    {
                        "node": "West Clock Town (from Termina Field)",
                        "alias": "West Clock Town"
                    },
                    {
                        "node": "West Clock Town (from South Clock Town south)",
                        "alias": "West Clock Town"
                    },
                    {
                        "node": "West Clock Town (from South Clock Town north)",
                        "alias": "West Clock Town"
                    },
                    {
                        "node": "West Clock Town (from Swordsman's School)",
                        "alias": "West Clock Town"
                    },
                    {
                        "node": "West Clock Town (from Curiosity Shop)",
                        "alias": "West Clock Town"
                    },
                    {
                        "node": "West Clock Town (from Trading Post)",
                        "alias": "West Clock Town"
                    },
                    {
                        "node": "West Clock Town (from Post Office)",
                        "alias": "West Clock Town"
                    },
                    {
                        "node": "West Clock Town (from Lottery Shop)",
                        "alias": "West Clock Town"
                    },
                    {
                        "node": "North Clock Town (from Termina Field)",
                        "alias": "North Clock Town"
                    },
                    {
                        "node": "North Clock Town (from East Clock Town)",
                        "alias": "North Clock Town"
                    },
                    {
                        "node": "North Clock Town (from South Clock Town)",
                        "alias": "North Clock Town"
                    },
                    {
                        "node": "North Clock Town (from Fairy's Fountain (Clock Town))",
                        "alias": "North Clock Town"
                    },
                    {
                        "node": "North Clock Town (from Deku Playground)",
                        "alias": "North Clock Town"
                    },
                    {
                        "node": "North Clock Town (from Catching all Bombers)",
                        "alias": "North Clock Town"
                    },
                    {
                        "node": "North Clock Town (from Bombers Hide and Seek)",
                        "alias": "North Clock Town"
                    },
                    {
                        "node": "South Clock Town (from Clock Tower)",
                        "alias": "South Clock Town"
                    },
                    {
                        "node": "South Clock Town (from Termina Field)",
                        "alias": "South Clock Town"
                    },
                    {
                        "node": "South Clock Town (from East Clock Town north)",
                        "alias": "South Clock Town"
                    },
                    {
                        "node": "South Clock Town (from West Clock Town north)",
                        "alias": "South Clock Town"
                    },
                    {
                        "node": "South Clock Town (from North Clock Town)",
                        "alias": "South Clock Town"
                    },
                    {
                        "node": "South Clock Town (from West Clock Town south)",
                        "alias": "South Clock Town"
                    },
                    {
                        "node": "South Clock Town (from Laundry Pool)",
                        "alias": "South Clock Town"
                    },
                    {
                        "node": "South Clock Town (from East Clock Town south)",
                        "alias": "South Clock Town"
                    },
                    {
                        "node": "South Clock Town (from Song of Soaring)",
                        "alias": "South Clock Town"
                    },
                    {
                        "node": "Laundry Pool (from South Clock Town)",
                        "alias": "Laundry Pool"
                    },
                    {
                        "node": "Laundry Pool (from Back Room)",
                        "alias": "Laundry Pool"
                    }
                ],
                toLocations: [
                    {
                        "node": "Mayor's Residence (from East Clock Town)",
                        "alias": "Mayor's Residence",
                    },
                    {
                        "node": "Majora's Room",
                        "alias": "Majora's Room",
                    },
                    {
                        "node": "Magic Hag's Potion Shop (from Southern Swamp)",
                        "alias": "Magic Hag's Potion Shop",
                    },
                    {
                        "node": "Ranch Barn (from Romani Ranch)",
                        "alias": "Ranch Barn",
                    },
                    {
                        "node": "Ranch House (from Romani Ranch)",
                        "alias": "Ranch House",
                    },
                    {
                        "node": "Honey & Darling",
                        "alias": "Honey & Darling",
                    },
                    {
                        "node": "Beneath the Graveyard (Heart Piece)",
                        "alias": "Beneath the Graveyard",
                    },
                    {
                        "node": "Beneath the Graveyard (Song of Storms)",
                        "alias": "Beneath the Graveyard",
                    },
                    {
                        "node": "Curiosity Shop (from West Clock Town)",
                        "alias": "Curiosity Shop",
                    },
                    {
                        "node": "Back Room (from Laundry Pool)",
                        "alias": "Back Room",
                    },
                    {
                        "node": "Curiosity Shop (from Back Room)",
                        "alias": "Curiosity Shop",
                    },
                    {
                        "node": "Back Room (from Curiosity Shop)",
                        "alias": "Back Room",
                    },
                    {
                        "node": "Great Bay Gossip Stones Grotto",
                        "alias": "Great Bay Gossip Stones Grotto",
                    },
                    {
                        "node": "Swamp Gossip Stones Grotto",
                        "alias": "Swamp Gossip Stones Grotto",
                    },
                    {
                        "node": "Ikana Gossip Stones Grotto",
                        "alias": "Ikana Gossip Stones Grotto",
                    },
                    {
                        "node": "Snowhead Gossip Stones Grotto",
                        "alias": "Snowhead Gossip Stones Grotto",
                    },
                    {
                        "node": "Generic Grotto",
                        "alias": "Generic Grotto",
                    },
                    {
                        "node": "Hotspring Water Grotto",
                        "alias": "Hotspring Water Grotto",
                    },
                    {
                        "node": "Deku Palace Garden Back Grotto",
                        "alias": "Deku Palace Garden Back Grotto",
                    },
                    {
                        "node": "Dodongo Grotto",
                        "alias": "Dodongo Grotto",
                    },
                    {
                        "node": "Deku Palace Garden Front Grotto",
                        "alias": "Deku Palace Garden Front Grotto",
                    },
                    {
                        "node": "Bisness Deku Scrub Grotto",
                        "alias": "Bisness Deku Scrub Grotto",
                    },
                    {
                        "node": "Cow Grotto",
                        "alias": "Cow Grotto",
                    },
                    {
                        "node": "Bio Baba Grotto",
                        "alias": "Bio Baba Grotto",
                    },
                    {
                        "node": "Magic Bean Seller Grotto",
                        "alias": "Magic Bean Seller Grotto",
                    },
                    {
                        "node": "Peahat Grotto",
                        "alias": "Peahat Grotto",
                    },
                    {
                        "node": "Deku Palace Garden Back Grotto",
                        "alias": "Deku Palace Garden Back Grotto",
                    },
                    {
                        "node": "Deku Palace Garden Front Grotto",
                        "alias": "Deku Palace Garden Front Grotto",
                    },
                    {
                        "node": "Lone Peak Shrine",
                        "alias": "Lone Peak Shrine",
                    },
                    {
                        "node": "Ikana Canyon (from Path to Ikana)",
                        "alias": "Ikana Canyon",
                    },
                    {
                        "node": "Ikana Canyon (from Ghost Hut)",
                        "alias": "Ikana Canyon",
                    },
                    {
                        "node": "Ikana Canyon (from Musicbox House)",
                        "alias": "Ikana Canyon",
                    },
                    {
                        "node": "Ikana Canyon (from Stone Tower)",
                        "alias": "Ikana Canyon",
                    },
                    {
                        "node": "Ikana Canyon (from Song of Soaring)",
                        "alias": "Ikana Canyon",
                    },
                    {
                        "node": "Ikana Canyon (from Beneath the Well)",
                        "alias": "Ikana Canyon",
                    },
                    {
                        "node": "Ikana Canyon (from Sakon's Hideout)",
                        "alias": "Ikana Canyon",
                    },
                    {
                        "node": "Ikana Canyon (from Clear Cutscene)",
                        "alias": "Ikana Canyon",
                    },
                    {
                        "node": "Ikana Canyon (from Ancient Castle of Ikana)",
                        "alias": "Ikana Canyon",
                    },
                    {
                        "node": "Spring Water Cave (from Farewell to Gibdos)",
                        "alias": "Spring Water Cave",
                    },
                    {
                        "node": "Ikana Canyon (from Fairy Fountain)",
                        "alias": "Ikana Canyon",
                    },
                    {
                        "node": "Ikana Canyon (from Secret Shrine)",
                        "alias": "Ikana Canyon",
                    },
                    {
                        "node": "Ikana Canyon (from Spring Water Cave)",
                        "alias": "Ikana Canyon",
                    },
                    {
                        "node": "Spring Water Cave (from Ikana Canyon)",
                        "alias": "Spring Water Cave",
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Exterior)",
                        "alias": "Pirates's Fortress Interior",
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Hookshot Lower)",
                        "alias": "Pirates's Fortress Interior",
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Hookshot Upper)",
                        "alias": "Pirates's Fortress Interior",
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Purple Pirate entrance)",
                        "alias": "Pirates's Fortress Interior",
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Purple Pirate exit)",
                        "alias": "Pirates's Fortress Interior",
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Green Pirate entrance)",
                        "alias": "Pirates's Fortress Interior",
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Green Pirate exit)",
                        "alias": "Pirates's Fortress Interior",
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Red Pirate entrance)",
                        "alias": "Pirates's Fortress Interior",
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Red Pirate exit)",
                        "alias": "Pirates's Fortress Interior",
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Telescope)",
                        "alias": "Pirates's Fortress Interior",
                    },
                    {
                        "node": "Pirates's Fortress Interior (from Exterior balcony)",
                        "alias": "Pirates's Fortress Interior",
                    },
                    {
                        "node": "Milk Bar",
                        "alias": "Milk Bar",
                    },
                    {
                        "node": "Stone Tower Temple",
                        "alias": "Stone Tower Temple",
                    },
                    {
                        "node": "Treasure Chest Shop",
                        "alias": "Treasure Chest Shop",
                    },
                    {
                        "node": "Inverted Stone Tower Temple",
                        "alias": "Inverted Stone Tower Temple",
                    },
                    {
                        "node": "Inverted Stone Tower Temple (Boss Door)",
                        "alias": "Inverted Stone Tower Temple",
                    },
                    {
                        "node": "Woodfall Temple (from Woodfall)",
                        "alias": "Woodfall Temple",
                    },
                    {
                        "node": "Deku Princess's Room (from Clear Cutscene)",
                        "alias": "Deku Princess's Room",
                    },
                    {
                        "node": "Deku Princess's Room (from Woodfall)",
                        "alias": "Deku Princess's Room",
                    },
                    {
                        "node": "Path to Mountain Village (from Termina Field)",
                        "alias": "Path to Mountain Village",
                    },
                    {
                        "node": "Path to Mountain Village (from Mountain Village)",
                        "alias": "Path to Mountain Village",
                    },
                    {
                        "node": "Ancient Castle of Ikana (from Beneath the Well)",
                        "alias": "Ancient Castle of Ikana",
                    },
                    {
                        "node": "Ancient Castle of Ikana (from Ikana Canyon)",
                        "alias": "Ancient Castle of Ikana",
                    },
                    {
                        "node": "Ancient Castle of Ikana (from Castle Interior)",
                        "alias": "Ancient Castle of Ikana",
                    },
                    {
                        "node": "Ancient Castle of Ikana (from Castle Exterior)",
                        "alias": "Ancient Castle of Ikana",
                    },
                    {
                        "node": "Ancient Castle of Ikana (from Keg Hole)",
                        "alias": "Ancient Castle of Ikana",
                    },
                    {
                        "node": "Ancient Castle of Ikana (from Hole under Block)",
                        "alias": "Ancient Castle of Ikana",
                    },
                    {
                        "node": "Ancient Castle of Ikana (from Igos du Ikana's Room)",
                        "alias": "Ancient Castle of Ikana",
                    },
                    {
                        "node": "Deku Playground",
                        "alias": "Deku Playground",
                    },
                    {
                        "node": "Odolwa's Room",
                        "alias": "Odolwa's Room",
                    },
                    {
                        "node": "Shooting Gallery (Clock Town)",
                        "alias": "Shooting Gallery",
                    },
                    {
                        "node": "Snowhead Temple",
                        "alias": "Snowhead Temple",
                    },
                    {
                        "node": "Milk Road (from Termina Field)",
                        "alias": "Milk Road",
                    },
                    {
                        "node": "Milk Road (from Romani Ranch)",
                        "alias": "Milk Road",
                    },
                    {
                        "node": "Milk Road (from Gorman Racetrack back)",
                        "alias": "Milk Road",
                    },
                    {
                        "node": "Milk Road (from Gorman Racetrack)",
                        "alias": "Milk Road",
                    },
                    {
                        "node": "Milk Road (from Song of Soaring)",
                        "alias": "Milk Road",
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Hookshot Lower)",
                        "alias": "Pirates's Fortress Rooms",
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Hookshot Upper)",
                        "alias": "Pirates's Fortress Rooms",
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Purple Pirate entrance)",
                        "alias": "Pirates's Fortress Rooms",
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Purple Pirate exit)",
                        "alias": "Pirates's Fortress Rooms",
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Green Pirate entrance)",
                        "alias": "Pirates's Fortress Rooms",
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Green Pirate exit)",
                        "alias": "Pirates's Fortress Rooms",
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Red Pirate entrance)",
                        "alias": "Pirates's Fortress Rooms",
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Red Pirate exit)",
                        "alias": "Pirates's Fortress Rooms",
                    },
                    {
                        "node": "Pirates's Fortress Rooms (from Telescope)",
                        "alias": "Pirates's Fortress Rooms",
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Sewers entrance)",
                        "alias": "Pirates's Fortress Rooms",
                    },
                    {
                        "node": "Pirates's Fortress Rooms (Sewers exit)",
                        "alias": "Pirates's Fortress Rooms",
                    },
                    {
                        "node": "Shooting Gallery (Swamp)",
                        "alias": "Shooting Gallery",
                    },
                    {
                        "node": "Pinnacle Rock",
                        "alias": "Pinnacle Rock",
                    },
                    {
                        "node": "Fairy's Fountain (Clock Town)",
                        "alias": "Fairy's Fountain (Clock Town)",
                    },
                    {
                        "node": "Fairy's Fountain (Woodfall)",
                        "alias": "Fairy's Fountain (Woodfall)",
                    },
                    {
                        "node": "Fairy's Fountain (Snowhead)",
                        "alias": "Fairy's Fountain (Snowhead)",
                    },
                    {
                        "node": "Fairy's Fountain (Great Bay)",
                        "alias": "Fairy's Fountain (Great Bay)",
                    },
                    {
                        "node": "Fairy's Fountain (Ikana)",
                        "alias": "Fairy's Fountain (Ikana)",
                    },
                    {
                        "node": "Swamp Spider House",
                        "alias": "Swamp Spider House",
                    },
                    {
                        "node": "Ocean Spider House",
                        "alias": "Ocean Spider House",
                    },
                    {
                        "node": "Bombers's Hideout",
                        "alias": "Bombers's Hideout",
                    },
                    {
                        "node": "Observatory (from Termina Field)",
                        "alias": "Observatory",
                    },
                    {
                        "node": "Observatory (from Telescope)",
                        "alias": "Observatory",
                    },
                    {
                        "node": "Woodfall Trial (from Moon)",
                        "alias": "Woodfall Trial",
                    },
                    {
                        "node": "Deku Palace (from Southern Swamp)",
                        "alias": "Deku Palace",
                    },
                    {
                        "node": "Deku Palace (from being thrown out)",
                        "alias": "Deku Palace",
                    },
                    {
                        "node": "Deku Palace (from Deku King's Chamber)",
                        "alias": "Deku Palace",
                    },
                    {
                        "node": "Deku Palace (from Monkey cage)",
                        "alias": "Deku Palace",
                    },
                    {
                        "node": "Deku Palace (from Deku Shrine)",
                        "alias": "Deku Palace",
                    },
                    {
                        "node": "Deku Palace (from Swamp Shortcut)",
                        "alias": "Deku Palace",
                    },
                    {
                        "node": "Deku Palace (from Deku Palace Garden Front Grotto)",
                        "alias": "Deku Palace",
                    },
                    {
                        "node": "Deku Palace (from Deku Palace Garden Back Grotto)",
                        "alias": "Deku Palace",
                    },
                    {
                        "node": "Deku Palace (from Deku Palace Garden Back Grotto)",
                        "alias": "Deku Palace",
                    },
                    {
                        "node": "Deku Palace (from Magic Bean Seller Grotto)",
                        "alias": "Deku Palace",
                    },
                    {
                        "node": "Deku Palace (from Deku Palace Garden Front Grotto)",
                        "alias": "Deku Palace",
                    },
                    {
                        "node": "Mountain Smithy",
                        "alias": "Mountain Smithy",
                    },
                    {
                        "node": "Termina Field (from West Clock Town)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Path to the Swamp)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Great Bay Coast)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Path to Mountain Village)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Path to Ikana)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Milk Road)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from South Clock Town)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from East Clock Town)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from North Clock Town)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Observatory)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (Telescope)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Milk Road with Cremia)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Post Office",
                        "alias": "Post Office",
                    },
                    {
                        "node": "Marine Research Lab",
                        "alias": "Marine Research Lab",
                    },
                    {
                        "node": "Beneath the Graveyard (Bottle)",
                        "alias": "Beneath the Graveyard (Bottle)",
                    },
                    {
                        "node": "Dampe's Room",
                        "alias": "Dampe's Room",
                    },
                    {
                        "node": "Goron Shrine (from Goron Village)",
                        "alias": "Goron Shrine",
                    },
                    {
                        "node": "Goron Shrine (from Goron Shop)",
                        "alias": "Goron Shrine",
                    },
                    {
                        "node": "Zora Hall (from Zora Cape)",
                        "alias": "Zora Hall",
                    },
                    {
                        "node": "Zora Hall (from Zora Cape back)",
                        "alias": "Zora Hall",
                    },
                    {
                        "node": "Zora Hall (from Zora Shop)",
                        "alias": "Zora Hall",
                    },
                    {
                        "node": "Zora Hall (from Lulu's Room)",
                        "alias": "Zora Hall",
                    },
                    {
                        "node": "Zora Hall (from Evan's Room)",
                        "alias": "Zora Hall",
                    },
                    {
                        "node": "Zora Hall (from Japas's Room)",
                        "alias": "Zora Hall",
                    },
                    {
                        "node": "Zora Hall (from Mikau's Room)",
                        "alias": "Zora Hall",
                    },
                    {
                        "node": "Zora Hall (from Band Rehearsal)",
                        "alias": "Zora Hall",
                    },
                    {
                        "node": "Trading Post",
                        "alias": "Trading Post",
                    },
                    {
                        "node": "Romani Ranch (from Milk Road)",
                        "alias": "Romani Ranch",
                    },
                    {
                        "node": "Romani Ranch (from Ranch Barn)",
                        "alias": "Romani Ranch",
                    },
                    {
                        "node": "Romani Ranch (from Ranch House)",
                        "alias": "Romani Ranch",
                    },
                    {
                        "node": "Romani Ranch (from Cucco Shack)",
                        "alias": "Romani Ranch",
                    },
                    {
                        "node": "Romani Ranch (from Doggy Racetrack)",
                        "alias": "Romani Ranch",
                    },
                    {
                        "node": "Romani Ranch (from Receiving Milk Bottle)",
                        "alias": "Romani Ranch",
                    },
                    {
                        "node": "Romani Ranch (from Romani being abducted)",
                        "alias": "Romani Ranch",
                    },
                    {
                        "node": "Twinmold's Room",
                        "alias": "Twinmold's Room",
                    },
                    {
                        "node": "Great Bay Coast (from Termina Field)",
                        "alias": "Great Bay Coast",
                    },
                    {
                        "node": "Great Bay Coast (from Zora Cape)",
                        "alias": "Great Bay Coast",
                    },
                    {
                        "node": "Great Bay Coast (from Murky Water Left)",
                        "alias": "Great Bay Coast",
                    },
                    {
                        "node": "Great Bay Coast (from Pinnacle Rock)",
                        "alias": "Great Bay Coast",
                    },
                    {
                        "node": "Great Bay Coast (from Fisherman's Hut)",
                        "alias": "Great Bay Coast",
                    },
                    {
                        "node": "Great Bay Coast (from Pirates's Fortress Exterior)",
                        "alias": "Great Bay Coast",
                    },
                    {
                        "node": "Great Bay Coast (from Murky Water Right)",
                        "alias": "Great Bay Coast",
                    },
                    {
                        "node": "Great Bay Coast (from Marine Research Lab)",
                        "alias": "Great Bay Coast",
                    },
                    {
                        "node": "Great Bay Coast (from Ocean Spider House)",
                        "alias": "Great Bay Coast",
                    },
                    {
                        "node": "Great Bay Coast (from Zora Mask Cutscene)",
                        "alias": "Great Bay Coast",
                    },
                    {
                        "node": "Great Bay Coast (from Song of Soaring)",
                        "alias": "Great Bay Coast",
                    },
                    {
                        "node": "Great Bay Coast (from Pirates's Fortress caught)",
                        "alias": "Great Bay Coast",
                    },
                    {
                        "node": "Zora Cape (from Great Bay Coast)",
                        "alias": "Zora Cape",
                    },
                    {
                        "node": "Zora Cape (from Zora Hall)",
                        "alias": "Zora Cape",
                    },
                    {
                        "node": "Zora Cape (from Zora Hall back)",
                        "alias": "Zora Cape",
                    },
                    {
                        "node": "Zora Cape (from Murky Water)",
                        "alias": "Zora Cape",
                    },
                    {
                        "node": "Zora Cape (from Waterfall Rapids)",
                        "alias": "Zora Cape",
                    },
                    {
                        "node": "Zora Cape (from Fairy's Fountain (Great Bay))",
                        "alias": "Zora Cape",
                    },
                    {
                        "node": "Zora Cape (from Song of Soaring)",
                        "alias": "Zora Cape",
                    },
                    {
                        "node": "Zora Cape (from Great Bay Temple)",
                        "alias": "Zora Cape",
                    },
                    {
                        "node": "Lottery Shop",
                        "alias": "Lottery Shop",
                    },
                    {
                        "node": "Pirates's Fortress Exterior (from Great Bay Coast)",
                        "alias": "Pirates's Fortress Exterior",
                    },
                    {
                        "node": "Pirates's Fortress Exterior (from Interior)",
                        "alias": "Pirates's Fortress Exterior",
                    },
                    {
                        "node": "Pirates's Fortress Exterior (from Sewers)",
                        "alias": "Pirates's Fortress Exterior",
                    },
                    {
                        "node": "Pirates's Fortress Exterior (from Sewers Draft)",
                        "alias": "Pirates's Fortress Exterior",
                    },
                    {
                        "node": "Pirates's Fortress Exterior (from Interior caught)",
                        "alias": "Pirates's Fortress Exterior",
                    },
                    {
                        "node": "Pirates's Fortress Exterior (from Interior balcony)",
                        "alias": "Pirates's Fortress Exterior",
                    },
                    {
                        "node": "Pirates's Fortress Exterior (from Sewers end)",
                        "alias": "Pirates's Fortress Exterior",
                    },
                    {
                        "node": "Fisherman's Hut",
                        "alias": "Fisherman's Hut",
                    },
                    {
                        "node": "Goron Shop",
                        "alias": "Goron Shop",
                    },
                    {
                        "node": "Deku King's Chamber (from Deku Palace)",
                        "alias": "Deku King's Chamber",
                    },
                    {
                        "node": "Deku King's Chamber (from Deku Palace upper)",
                        "alias": "Deku King's Chamber",
                    },
                    {
                        "node": "Deku King's Chamber (from Deku Princess's Room)",
                        "alias": "Deku King's Chamber",
                    },
                    {
                        "node": "Deku King's Chamber (from Releasing Monkey)",
                        "alias": "Deku King's Chamber",
                    },
                    {
                        "node": "Snowhead Trial (from Moon)",
                        "alias": "Snowhead Trial",
                    },
                    {
                        "node": "Path to the Swamp (from Termina Field)",
                        "alias": "Path to the Swamp",
                    },
                    {
                        "node": "Path to the Swamp (from Southern Swamp)",
                        "alias": "Path to the Swamp",
                    },
                    {
                        "node": "Path to the Swamp (from Shooting Gallery (Clock Town))",
                        "alias": "Path to the Swamp",
                    },
                    {
                        "node": "Doggy Racetrack",
                        "alias": "Doggy Racetrack",
                    },
                    {
                        "node": "Cucco Shack",
                        "alias": "Cucco Shack",
                    },
                    {
                        "node": "Ikana Graveyard (from Path to Ikana)",
                        "alias": "Ikana Graveyard",
                    },
                    {
                        "node": "Ikana Graveyard (from Beneath the Graveyard (Bottle))",
                        "alias": "Ikana Graveyard",
                    },
                    {
                        "node": "Ikana Graveyard (from Beneath the Graveyard (Heart Piece))",
                        "alias": "Ikana Graveyard",
                    },
                    {
                        "node": "Ikana Graveyard (from Beneath the Graveyard (Song of Storms))",
                        "alias": "Ikana Graveyard",
                    },
                    {
                        "node": "Ikana Graveyard (from Dampe's Room)",
                        "alias": "Ikana Graveyard",
                    },
                    {
                        "node": "Ikana Graveyard (from Defeating Captain Keeta)",
                        "alias": "Ikana Graveyard",
                    },
                    {
                        "node": "Goht's Room",
                        "alias": "Goht's Room",
                    },
                    {
                        "node": "Southern Swamp (from Path to the Swamp)",
                        "alias": "Southern Swamp",
                    },
                    {
                        "node": "Southern Swamp (from Tourist Information)",
                        "alias": "Southern Swamp",
                    },
                    {
                        "node": "Southern Swamp (from Woodfall)",
                        "alias": "Southern Swamp",
                    },
                    {
                        "node": "Southern Swamp (from Deku Palace)",
                        "alias": "Southern Swamp",
                    },
                    {
                        "node": "Southern Swamp (from Deku Palace Upper)",
                        "alias": "Southern Swamp",
                    },
                    {
                        "node": "Southern Swamp (from Magic Hag's Potion Shop)",
                        "alias": "Southern Swamp",
                    },
                    {
                        "node": "Southern Swamp (from Woods of Mystery)",
                        "alias": "Southern Swamp",
                    },
                    {
                        "node": "Southern Swamp (from Swamp Spider House)",
                        "alias": "Southern Swamp",
                    },
                    {
                        "node": "Southern Swamp (from Ikana Canyon)",
                        "alias": "Southern Swamp",
                    },
                    {
                        "node": "Southern Swamp (from Song of Soaring)",
                        "alias": "Southern Swamp",
                    },
                    {
                        "node": "Woodfall (from Southern Swamp)",
                        "alias": "Woodfall",
                    },
                    {
                        "node": "Woodfall (from Woodfall Temple)",
                        "alias": "Woodfall",
                    },
                    {
                        "node": "Woodfall (from Fairy's Fountain (Woodfall))",
                        "alias": "Woodfall",
                    },
                    {
                        "node": "Woodfall (from Woodfall Temple back)",
                        "alias": "Woodfall",
                    },
                    {
                        "node": "Woodfall (from Song of Soaring)",
                        "alias": "Woodfall",
                    },
                    {
                        "node": "Great Bay Trial (from Moon)",
                        "alias": "Great Bay Trial",
                    },
                    {
                        "node": "Great Bay Trial (from Murky Water)",
                        "alias": "Great Bay Trial",
                    },
                    {
                        "node": "Great Bay Temple (from Zora Cape)",
                        "alias": "Great Bay Temple",
                    },
                    {
                        "node": "Great Bay Temple (from Pirate Cutscene)",
                        "alias": "Great Bay Temple",
                    },
                    {
                        "node": "Waterfall Rapids (from Zora Cape)",
                        "alias": "Waterfall Rapids",
                    },
                    {
                        "node": "Beneath the Well (from Ikana Canyon)",
                        "alias": "Beneath the Well",
                    },
                    {
                        "node": "Beneath the Well (from Ancient Castle of Ikana)",
                        "alias": "Beneath the Well",
                    },
                    {
                        "node": "Mikau's Room (from Zora Hall)",
                        "alias": "Mikau's Room",
                    },
                    {
                        "node": "Japas's Room (from Zora Hall)",
                        "alias": "Japas's Room",
                    },
                    {
                        "node": "Lulu's Room (from Zora Hall)",
                        "alias": "Lulu's Room",
                    },
                    {
                        "node": "Evan's Room (from Zora Hall)",
                        "alias": "Evan's Room",
                    },
                    {
                        "node": "Zora Shop",
                        "alias": "Zora Shop",
                    },
                    {
                        "node": "Goron Village (from Path to Goron Village)",
                        "alias": "Goron Village",
                    },
                    {
                        "node": "Goron Village (from Goron Shrine)",
                        "alias": "Goron Village",
                    },
                    {
                        "node": "Goron Village (from Lone Peak Shrine)",
                        "alias": "Goron Village",
                    },
                    {
                        "node": "Goron Graveyard (from Mountain Village)",
                        "alias": "Goron Graveyard",
                    },
                    {
                        "node": "Sakon's Hideout",
                        "alias": "Sakon's Hideout",
                    },
                    {
                        "node": "Mountain Village (from Mountain Smithy)",
                        "alias": "Mountain Village",
                    },
                    {
                        "node": "Mountain Village (from Path to Goron Village)",
                        "alias": "Mountain Village",
                    },
                    {
                        "node": "Mountain Village (from Goron Graveyard)",
                        "alias": "Mountain Village",
                    },
                    {
                        "node": "Mountain Village (from Path to Snowhead)",
                        "alias": "Mountain Village",
                    },
                    {
                        "node": "Mountain Village (from Path to Mountain Village)",
                        "alias": "Mountain Village",
                    },
                    {
                        "node": "Mountain Village (from Clear Cutscene)",
                        "alias": "Mountain Village",
                    },
                    {
                        "node": "Mountain Village (from Song of Soaring)",
                        "alias": "Mountain Village",
                    },
                    {
                        "node": "Ghost Hut (from Ikana Canyon)",
                        "alias": "Ghost Hut",
                    },
                    {
                        "node": "Deku Shrine",
                        "alias": "Deku Shrine",
                    },
                    {
                        "node": "Path to Ikana (from Termina Field)",
                        "alias": "Path to Ikana",
                    },
                    {
                        "node": "Path to Ikana (from Ikana Graveyard)",
                        "alias": "Path to Ikana",
                    },
                    {
                        "node": "Path to Ikana (from Ikana Canyon)",
                        "alias": "Path to Ikana",
                    },
                    {
                        "node": "Swordsman's School",
                        "alias": "Swordsman's School",
                    },
                    {
                        "node": "Musicbox House",
                        "alias": "Musicbox House",
                    },
                    {
                        "node": "Igos du Ikana's Room",
                        "alias": "Igos du Ikana's Room",
                    },
                    {
                        "node": "Tourist Information",
                        "alias": "Tourist Information",
                    },
                    {
                        "node": "Stone Tower (from Ikana Canyon)",
                        "alias": "Stone Tower",
                    },
                    {
                        "node": "Stone Tower (from Un-inverting)",
                        "alias": "Stone Tower",
                    },
                    {
                        "node": "Stone Tower (from Stone Tower Temple)",
                        "alias": "Stone Tower",
                    },
                    {
                        "node": "Stone Tower (from Song of Soaring)",
                        "alias": "Stone Tower",
                    },
                    {
                        "node": "Inverted Stone Tower (from Inverting)",
                        "alias": "Inverted Stone Tower",
                    },
                    {
                        "node": "Inverted Stone Tower (from Inverted Stone Tower Temple)",
                        "alias": "Inverted Stone Tower",
                    },
                    {
                        "node": "Path to Snowhead (from Mountain Village)",
                        "alias": "Path to Snowhead",
                    },
                    {
                        "node": "Path to Snowhead (from Snowhead)",
                        "alias": "Path to Snowhead",
                    },
                    {
                        "node": "Snowhead (from Path to Snowhead/Void)",
                        "alias": "Snowhead",
                    },
                    {
                        "node": "Snowhead (from Snowhead Temple)",
                        "alias": "Snowhead",
                    },
                    {
                        "node": "Snowhead (from Fairy's Fountain (Snowhead)",
                        "alias": "Snowhead",
                    },
                    {
                        "node": "Snowhead (from Song of Soaring)",
                        "alias": "Snowhead",
                    },
                    {
                        "node": "Path to Goron Village (from Mountain Village)",
                        "alias": "Path to Goron Village",
                    },
                    {
                        "node": "Path to Goron Village (from Goron Village)",
                        "alias": "Path to Goron Village",
                    },
                    {
                        "node": "Path to Goron Village (from Goron Racetrack)",
                        "alias": "Path to Goron Village",
                    },
                    {
                        "node": "Gyorg's Room",
                        "alias": "Gyorg's Room",
                    },
                    {
                        "node": "Secret Shrine",
                        "alias": "Secret Shrine",
                    },
                    {
                        "node": "Stock Pot Inn (from East Clock Town)",
                        "alias": "Stock Pot Inn",
                    },
                    {
                        "node": "Stock Pot Inn (from East Clock Town upper)",
                        "alias": "Stock Pot Inn",
                    },
                    {
                        "node": "Stock Pot Inn (from Midnight Meeting)",
                        "alias": "Stock Pot Inn",
                    },
                    {
                        "node": "Clock Tower (from Pre Clock Tower)",
                        "alias": "Clock Tower",
                    },
                    {
                        "node": "Clock Tower (from South Clock Town)",
                        "alias": "Clock Tower",
                    },
                    {
                        "node": "Woods of Mystery",
                        "alias": "Woods of Mystery",
                    },
                    {
                        "node": "Stone Tower Trial (from Moon)",
                        "alias": "Stone Tower Trial",
                    },
                    {
                        "node": "On the Moon",
                        "alias": "On the Moon",
                    },
                    {
                        "node": "Gorman Racetrack (from Milk Road)",
                        "alias": "Gorman Racetrack",
                    },
                    {
                        "node": "Gorman Racetrack (from Milk Road west)",
                        "alias": "Gorman Racetrack",
                    },
                    {
                        "node": "Goron Racetrack (from Path to Goron Village)",
                        "alias": "Goron Racetrack",
                    },
                    {
                        "node": "East Clock Town (from Termina Field)",
                        "alias": "East Clock Town",
                    },
                    {
                        "node": "East Clock Town (from South Clock Town south)",
                        "alias": "East Clock Town",
                    },
                    {
                        "node": "East Clock Town (from Bombers's Hideout)",
                        "alias": "East Clock Town",
                    },
                    {
                        "node": "East Clock Town (from South Clock Town north)",
                        "alias": "East Clock Town",
                    },
                    {
                        "node": "East Clock Town (from Treasure Chest Shop)",
                        "alias": "East Clock Town",
                    },
                    {
                        "node": "East Clock Town (from North Clock Town)",
                        "alias": "East Clock Town",
                    },
                    {
                        "node": "East Clock Town (from Honey & Darling)",
                        "alias": "East Clock Town",
                    },
                    {
                        "node": "East Clock Town (from Mayor's Residence)",
                        "alias": "East Clock Town",
                    },
                    {
                        "node": "East Clock Town (from Shooting Gallery (Clock Town))",
                        "alias": "East Clock Town",
                    },
                    {
                        "node": "East Clock Town (from Stock Pot Inn)",
                        "alias": "East Clock Town",
                    },
                    {
                        "node": "East Clock Town (from Stock Pot Inn upper)",
                        "alias": "East Clock Town",
                    },
                    {
                        "node": "East Clock Town (from Milk Bar)",
                        "alias": "East Clock Town",
                    },
                    {
                        "node": "West Clock Town (from Termina Field)",
                        "alias": "West Clock Town",
                    },
                    {
                        "node": "West Clock Town (from South Clock Town south)",
                        "alias": "West Clock Town",
                    },
                    {
                        "node": "West Clock Town (from South Clock Town north)",
                        "alias": "West Clock Town",
                    },
                    {
                        "node": "West Clock Town (from Swordsman's School)",
                        "alias": "West Clock Town",
                    },
                    {
                        "node": "West Clock Town (from Curiosity Shop)",
                        "alias": "West Clock Town",
                    },
                    {
                        "node": "West Clock Town (from Trading Post)",
                        "alias": "West Clock Town",
                    },
                    {
                        "node": "West Clock Town (from Post Office)",
                        "alias": "West Clock Town",
                    },
                    {
                        "node": "West Clock Town (from Lottery Shop)",
                        "alias": "West Clock Town",
                    },
                    {
                        "node": "North Clock Town (from Termina Field)",
                        "alias": "North Clock Town",
                    },
                    {
                        "node": "North Clock Town (from East Clock Town)",
                        "alias": "North Clock Town",
                    },
                    {
                        "node": "North Clock Town (from South Clock Town)",
                        "alias": "North Clock Town",
                    },
                    {
                        "node": "North Clock Town (from Fairy's Fountain (Clock Town))",
                        "alias": "North Clock Town",
                    },
                    {
                        "node": "North Clock Town (from Deku Playground)",
                        "alias": "North Clock Town",
                    },
                    {
                        "node": "North Clock Town (from Catching all Bombers)",
                        "alias": "North Clock Town",
                    },
                    {
                        "node": "North Clock Town (from Bombers Hide and Seek)",
                        "alias": "North Clock Town",
                    },
                    {
                        "node": "South Clock Town (from Clock Tower)",
                        "alias": "South Clock Town",
                    },
                    {
                        "node": "South Clock Town (from Termina Field)",
                        "alias": "South Clock Town",
                    },
                    {
                        "node": "South Clock Town (from East Clock Town north)",
                        "alias": "South Clock Town",
                    },
                    {
                        "node": "South Clock Town (from West Clock Town north)",
                        "alias": "South Clock Town",
                    },
                    {
                        "node": "South Clock Town (from North Clock Town)",
                        "alias": "South Clock Town",
                    },
                    {
                        "node": "South Clock Town (from West Clock Town south)",
                        "alias": "South Clock Town",
                    },
                    {
                        "node": "South Clock Town (from Laundry Pool)",
                        "alias": "South Clock Town",
                    },
                    {
                        "node": "South Clock Town (from East Clock Town south)",
                        "alias": "South Clock Town",
                    },
                    {
                        "node": "South Clock Town (from Song of Soaring)",
                        "alias": "South Clock Town",
                    },
                    {
                        "node": "Laundry Pool (from South Clock Town)",
                        "alias": "Laundry Pool",
                    },
                    {
                        "node": "Laundry Pool (from Back Room)",
                        "alias": "Laundry Pool",
                    },
                ],
                nodes: [
                    "Ancient Castle of Ikana",
                    "Back Room",
                    "Beneath the Graveyard (Bottle)",
                    "Beneath the Graveyard (Heart Piece)",
                    "Beneath the Graveyard (Song of Storms)",
                    "Beneath the Well",
                    "Bio Baba Grotto",
                    "Bisness Deku Scrub Grotto",
                    "Bombers's Hideout",
                    "Clock Tower",
                    "Cow Grotto",
                    "Cucco Shack",
                    "Curiosity Shop",
                    "Dampe's Room",
                    "Deku King's Chamber",
                    "Deku Palace Garden Back Grotto",
                    "Deku Palace Garden Front Grotto",
                    "Deku Palace",
                    "Deku Playground",
                    "Deku Princess's Room",
                    "Deku Shrine",
                    "Dodongo Grotto",
                    "Doggy Racetrack",
                    "East Clock Town",
                    "Evan's Room",
                    "Fairy's Fountain (Clock Town)",
                    "Fairy's Fountain (Great Bay)",
                    "Fairy's Fountain (Ikana)",
                    "Fairy's Fountain (Snowhead)",
                    "Fairy's Fountain (Woodfall)",
                    "Farewell to Gibdos",
                    "Fisherman's Hut",
                    "Generic Grotto",
                    "Ghost Hut",
                    "Goht's Room",
                    "Gorman Racetrack",
                    "Goron Graveyard",
                    "Goron Racetrack",
                    "Goron Shop",
                    "Goron Shrine",
                    "Goron Village",
                    "Great Bay Coast",
                    "Great Bay Gossip Stones Grotto",
                    "Great Bay Temple",
                    "Great Bay Trial",
                    "Gyorg's Room",
                    "Honey & Darling",
                    "Hotspring Water Grotto",
                    "Igos du Ikana's Room",
                    "Ikana Canyon",
                    "Ikana Gossip Stones Grotto",
                    "Ikana Graveyard",
                    "Inverted Stone Tower Temple (Boss Door)",
                    "Inverted Stone Tower Temple",
                    "Inverted Stone Tower",
                    "Japas's Room",
                    "Laundry Pool",
                    "Lone Peak Shrine",
                    "Lottery Shop",
                    "Lulu's Room",
                    "Magic Bean Seller Grotto",
                    "Magic Hag's Potion Shop",
                    "Majora's Room",
                    "Marine Research Lab",
                    "Mayor's Residence",
                    "Mikau's Room",
                    "Milk Bar",
                    "Milk Road",
                    "Mountain Smithy",
                    "Mountain Village",
                    "Music Box House",
                    "North Clock Town",
                    "Observatory",
                    "Ocean Spider House",
                    "Odolwa's Room",
                    "On the Moon",
                    "Path to Goron Village",
                    "Path to Ikana",
                    "Path to Mountain Village",
                    "Path to Snowhead",
                    "Path to the Swamp",
                    "Peahat Grotto",
                    "Pinnacle Rock",
                    "Pirates's Fortress Exterior",
                    "Pirates's Fortress Interior",
                    "Pirates's Fortress Rooms (Green Pirate entrance)",
                    "Pirates's Fortress Rooms (Green Pirate exit)",
                    "Pirates's Fortress Rooms (Hookshot Lower)",
                    "Pirates's Fortress Rooms (Hookshot Upper)",
                    "Pirates's Fortress Rooms (Purple Pirate entrance)",
                    "Pirates's Fortress Rooms (Purple Pirate exit)",
                    "Pirates's Fortress Rooms (Red Pirate entrance)",
                    "Pirates's Fortress Rooms (Red Pirate exit)",
                    "Pirates's Fortress Rooms (Sewers entrance)",
                    "Pirates's Fortress Rooms (Sewers exit)",
                    "Pirates's Fortress Rooms",
                    "Post Office",
                    "Ranch Barn",
                    "Ranch House",
                    "Romani Ranch",
                    "Sakon's Hideout",
                    "Secret Shrine",
                    "Shooting Gallery (Clock Town)",
                    "Shooting Gallery (Swamp)",
                    "Snowhead Gossip Stones Grotto",
                    "Snowhead Temple",
                    "Snowhead Trial",
                    "Snowhead",
                    "South Clock Town",
                    "Southern Swamp",
                    "Spring Water Cave",
                    "Stock Pot Inn",
                    "Stone Tower Temple",
                    "Stone Tower Trial",
                    "Stone Tower",
                    "Swamp Gossip Stones Grotto",
                    "Swamp Spider House",
                    "Swordsman's School",
                    "Termina Field (Telescope)",
                    "Termina Field",
                    "Tourist Information",
                    "Trading Post",
                    "Treasure Chest Shop",
                    "Twinmold's Room",
                    "Waterfall Rapids",
                    "West Clock Town",
                    "Woodfall Temple",
                    "Woodfall Trial",
                    "Woodfall",
                    "Woods of Mystery",
                    "Zora Cape",
                    "Zora Hall",
                    "Zora Shop",
                ],
                testEdges: [
                    [
                        {
                            "node": "Mayor's Residence (from East Clock Town)",
                            "alias": "Mayor's Residence",
                        },
                        {
                            "node": "North Clock Town (from East Clock Town)",
                            "alias": "North Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Majora's Room",
                            "alias": "Majora's Room",
                        },
                        {
                            "node": "Deku Palace (from Deku Shrine)",
                            "alias": "Deku Palace",
                        },
                    ],
                    [
                        {
                            "node": "Magic Hag's Potion Shop (from Southern Swamp)",
                            "alias": "Magic Hag's Potion Shop",
                        },
                        {
                            "node": "Pirates's Fortress Rooms (Red Pirate exit)",
                            "alias": "Pirates's Fortress Rooms (Red Pirate exit)",
                        },
                    ],
                    [
                        {
                            "node": "Ranch Barn (from Romani Ranch)",
                            "alias": "Ranch Barn",
                        },
                        {
                            "node": "Gorman Racetrack (from Milk Road west)",
                            "alias": "Gorman Racetrack",
                        },
                    ],
                    [
                        {
                            "node": "Ranch House (from Romani Ranch)",
                            "alias": "Ranch House",
                        },
                        {
                            "node": "Mikau's Room (from Zora Hall)",
                            "alias": "Mikau's Room",
                        },
                    ],
                    [
                        {
                            "node": "Honey & Darling",
                            "alias": "Honey & Darling",
                        },
                        {
                            "node": "South Clock Town (from Song of Soaring)",
                            "alias": "South Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Beneath the Graveyard (Heart Piece)",
                            "alias": "Beneath the Graveyard (Heart Piece)",
                        },
                        {
                            "node": "East Clock Town (from Treasure Chest Shop)",
                            "alias": "East Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Beneath the Graveyard (Song of Storms)",
                            "alias": "Beneath the Graveyard (Song of Storms)",
                        },
                        {
                            "node": "Magic Hag's Potion Shop (from Southern Swamp)",
                            "alias": "Magic Hag's Potion Shop",
                        },
                    ],
                    [
                        {
                            "node": "Curiosity Shop (from West Clock Town)",
                            "alias": "Curiosity Shop",
                        },
                        {
                            "node": "Peahat Grotto",
                            "alias": "Peahat Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Back Room (from Laundry Pool)",
                            "alias": "Back Room",
                        },
                        {
                            "node": "Fairy's Fountain (Woodfall)",
                            "alias": "Fairy's Fountain (Woodfall)",
                        },
                    ],
                    [
                        {
                            "node": "Curiosity Shop (from Back Room)",
                            "alias": "Curiosity Shop",
                        },
                        {
                            "node": "Termina Field (from Great Bay Coast)",
                            "alias": "Termina Field",
                        },
                    ],
                    [
                        {
                            "node": "Back Room (from Curiosity Shop)",
                            "alias": "Back Room",
                        },
                        {
                            "node": "Deku Palace Garden Back Grotto",
                            "alias": "Deku Palace Garden Back Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Gossip Stones Grotto",
                            "alias": "Great Bay Gossip Stones Grotto",
                        },
                        {
                            "node": "Woodfall (from Fairy's Fountain)",
                            "alias": "Woodfall",
                        },
                    ],
                    [
                        {
                            "node": "Swamp Gossip Stones Grotto",
                            "alias": "Swamp Gossip Stones Grotto",
                        },
                        {
                            "node": "Swordsman's School",
                            "alias": "Swordsman's School",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Gossip Stones Grotto",
                            "alias": "Ikana Gossip Stones Grotto",
                        },
                        {
                            "node": "Doggy Racetrack",
                            "alias": "Doggy Racetrack",
                        },
                    ],
                    [
                        {
                            "node": "Snowhead Gossip Stones Grotto",
                            "alias": "Snowhead Gossip Stones Grotto",
                        },
                        {
                            "node": "Pirates's Fortress Interior (from Hookshot Upper)",
                            "alias": "Pirates's Fortress Interior",
                        },
                    ],
                    [
                        {
                            "node": "Generic Grotto",
                            "alias": "Generic Grotto",
                        },
                        {
                            "node": "East Clock Town (from North Clock Town)",
                            "alias": "East Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Hotspring Water Grotto",
                            "alias": "Hotspring Water Grotto",
                        },
                        {
                            "node": "Dodongo Grotto",
                            "alias": "Dodongo Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace Garden Back Grotto",
                            "alias": "Deku Palace Garden Back Grotto",
                        },
                        {
                            "node": "Goron Shrine (from Goron Shop)",
                            "alias": "Goron Shrine",
                        },
                    ],
                    [
                        {
                            "node": "Dodongo Grotto",
                            "alias": "Dodongo Grotto",
                        },
                        {
                            "node": "Curiosity Shop (from Back Room)",
                            "alias": "Curiosity Shop",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace Garden Front Grotto",
                            "alias": "Deku Palace Garden Front Grotto",
                        },
                        {
                            "node": "Deku Palace (from Deku Palace Garden Back Grotto)",
                            "alias": "Deku Palace",
                        },
                    ],
                    [
                        {
                            "node": "Bisness Deku Scrub Grotto",
                            "alias": "Bisness Deku Scrub Grotto",
                        },
                        {
                            "node": "Zora Cape (from Murky Water)",
                            "alias": "Zora Cape",
                        },
                    ],
                    [
                        {
                            "node": "Cow Grotto",
                            "alias": "Cow Grotto",
                        },
                        {
                            "node": "Path to Snowhead (from Snowhead)",
                            "alias": "Path to Snowhead",
                        },
                    ],
                    [
                        {
                            "node": "Bio Baba Grotto",
                            "alias": "Bio Baba Grotto",
                        },
                        {
                            "node": "Deku King's Chamber (from Deku Princess)",
                            "alias": "Deku King's Chamber",
                        },
                    ],
                    [
                        {
                            "node": "Magic Bean Seller Grotto",
                            "alias": "Magic Bean Seller Grotto",
                        },
                        {
                            "node": "Stone Tower Trial (from Moon)",
                            "alias": "Stone Tower Trial",
                        },
                    ],
                    [
                        {
                            "node": "Peahat Grotto",
                            "alias": "Peahat Grotto",
                        },
                        {
                            "node": "Fisherman's Hut",
                            "alias": "Fisherman's Hut",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace Garden Back Grotto",
                            "alias": "Deku Palace Garden Back Grotto",
                        },
                        {
                            "node": "Path to Ikana (from Termina Field)",
                            "alias": "Path to Ikana",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace Garden Front Grotto",
                            "alias": "Deku Palace Garden Front Grotto",
                        },
                        {
                            "node": "Observatory (from Telescope)",
                            "alias": "Observatory",
                        },
                    ],
                    [
                        {
                            "node": "Lone Peak Shrine",
                            "alias": "Lone Peak Shrine",
                        },
                        {
                            "node": "Treasure Chest Shop",
                            "alias": "Treasure Chest Shop",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Canyon (from Path to Ikana)",
                            "alias": "Ikana Canyon",
                        },
                        {
                            "node": "Fairy's Fountain (Great Bay)",
                            "alias": "Fairy's Fountain (Great Bay)",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Canyon (from Ghost Hut)",
                            "alias": "Ikana Canyon",
                        },
                        {
                            "node": "Ikana Gossip Stones Grotto",
                            "alias": "Ikana Gossip Stones Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Canyon (from Musicbox House)",
                            "alias": "Ikana Canyon",
                        },
                        {
                            "node": "Swamp Gossip Stones Grotto",
                            "alias": "Swamp Gossip Stones Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Canyon (from Stone Tower)",
                            "alias": "Ikana Canyon",
                        },
                        {
                            "node": "Evan's Room (from Zora Hall)",
                            "alias": "Evan's Room",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Canyon (from Song of Soaring)",
                            "alias": "Ikana Canyon",
                        },
                        {
                            "node": "Southern Swamp (from Woods of Mystery)",
                            "alias": "Southern Swamp",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Canyon (from Beneath the Well)",
                            "alias": "Ikana Canyon",
                        },
                        {
                            "node": "Romani Ranch (from Receiving Milk Bottle)",
                            "alias": "Romani Ranch",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Canyon (from Sakon's Hideout)",
                            "alias": "Ikana Canyon",
                        },
                        {
                            "node": "Marine Research Lab",
                            "alias": "Marine Research Lab",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Canyon (from Clear Cutscene)",
                            "alias": "Ikana Canyon",
                        },
                        {
                            "node": "North Clock Town (from Bombers Hide and Seek)",
                            "alias": "North Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Canyon (from Ancient Castle of Ikana)",
                            "alias": "Ikana Canyon",
                        },
                        {
                            "node": "Snowhead Trial (from Moon)",
                            "alias": "Snowhead Trial",
                        },
                    ],
                    [
                        {
                            "node": "Spring Water Cave (from Farewell to Gibdos)",
                            "alias": "Spring Water Cave",
                        },
                        {
                            "node": "Twinmold's Room",
                            "alias": "Twinmold's Room",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Canyon (from Fairy Fountain)",
                            "alias": "Ikana Canyon",
                        },
                        {
                            "node": "East Clock Town (from Shooting Gallery)",
                            "alias": "East Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Canyon (from Secret Shrine)",
                            "alias": "Ikana Canyon",
                        },
                        {
                            "node": "Stone Tower Temple",
                            "alias": "Stone Tower Temple",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Canyon (from Spring Water Cave)",
                            "alias": "Ikana Canyon",
                        },
                        {
                            "node": "Magic Bean Seller Grotto",
                            "alias": "Magic Bean Seller Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Spring Water Cave (from Ikana Canyon)",
                            "alias": "Spring Water Cave",
                        },
                        {
                            "node": "Pirates's Fortress Rooms (Sewers exit)",
                            "alias": "Pirates's Fortress Rooms (Sewers exit)",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Interior (from Exterior)",
                            "alias": "Pirates's Fortress Interior",
                        },
                        {
                            "node": "Pirates's Fortress Exterior (from Interior balcony)",
                            "alias": "Pirates's Fortress Exterior",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Interior (from Hookshot Lower)",
                            "alias": "Pirates's Fortress Interior",
                        },
                        {
                            "node": "Shooting Gallery (Swamp)",
                            "alias": "Shooting Gallery (Swamp)",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Interior (from Hookshot Upper)",
                            "alias": "Pirates's Fortress Interior",
                        },
                        {
                            "node": "Bombers's Hideout",
                            "alias": "Bombers's Hideout",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Interior (from Purple Pirate entrance)",
                            "alias": "Pirates's Fortress Interior",
                        },
                        {
                            "node": "Goron Village (from Lone Peak Shrine)",
                            "alias": "Goron Village",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Interior (from Purple Pirate exit)",
                            "alias": "Pirates's Fortress Interior",
                        },
                        {
                            "node": "Curiosity Shop (from West Clock Town)",
                            "alias": "Curiosity Shop",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Interior (from Green Pirate entrance)",
                            "alias": "Pirates's Fortress Interior",
                        },
                        {
                            "node": "Ikana Canyon (from Musicbox House)",
                            "alias": "Ikana Canyon",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Interior (from Green Pirate exit)",
                            "alias": "Pirates's Fortress Interior",
                        },
                        {
                            "node": "Back Room (from Curiosity Shop)",
                            "alias": "Back Room",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Interior (from Red Pirate entrance)",
                            "alias": "Pirates's Fortress Interior",
                        },
                        {
                            "node": "Stock Pot Inn (from Midnight Meeting)",
                            "alias": "Stock Pot Inn",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Interior (from Red Pirate exit)",
                            "alias": "Pirates's Fortress Interior",
                        },
                        {
                            "node": "Beneath the Graveyard (Bottle)",
                            "alias": "Beneath the Graveyard (Bottle)",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Interior (from Telescope)",
                            "alias": "Pirates's Fortress Interior",
                        },
                        {
                            "node": "Pinnacle Rock",
                            "alias": "Pinnacle Rock",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Interior (from Exiterior balcony)",
                            "alias": "Pirates's Fortress Interior",
                        },
                        {
                            "node": "Lottery Shop",
                            "alias": "Lottery Shop",
                        },
                    ],
                    [
                        {
                            "node": "Milk Bar",
                            "alias": "Milk Bar",
                        },
                        {
                            "node": "Bio Baba Grotto",
                            "alias": "Bio Baba Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Stone Tower Temple",
                            "alias": "Stone Tower Temple",
                        },
                        {
                            "node": "Southern Swamp (from Ikana Canyon)",
                            "alias": "Southern Swamp",
                        },
                    ],
                    [
                        {
                            "node": "Treasure Chest Shop",
                            "alias": "Treasure Chest Shop",
                        },
                        {
                            "node": "Deku Palace (from Deku Palace Garden Front Grotto)",
                            "alias": "Deku Palace",
                        },
                    ],
                    [
                        {
                            "node": "Inverted Stone Tower Temple",
                            "alias": "Inverted Stone Tower Temple",
                        },
                        {
                            "node": "Goron Racetrack (from Path to Goron Village)",
                            "alias": "Goron Racetrack",
                        },
                    ],
                    [
                        {
                            "node": "Inverted Stone Tower Temple (Boss Door)",
                            "alias": "Inverted Stone Tower Temple (Boss Door)",
                        },
                        {
                            "node": "Zora Hall (from Lulu's Room)",
                            "alias": "Zora Hall",
                        },
                    ],
                    [
                        {
                            "node": "Woodfall Temple (from Woodfall)",
                            "alias": "Woodfall Temple",
                        },
                        {
                            "node": "Ranch Barn (from Romani Ranch)",
                            "alias": "Ranch Barn",
                        },
                    ],
                    [
                        {
                            "node": "Deku Princess's Room (from Clear Cutscene)",
                            "alias": "Deku Princess's Room",
                        },
                        {
                            "node": "Pirates's Fortress Interior (from Red Pirate exit)",
                            "alias": "Pirates's Fortress Interior",
                        },
                    ],
                    [
                        {
                            "node": "Deku Princess's Room (from Woodfall)",
                            "alias": "Deku Princess's Room",
                        },
                        {
                            "node": "Path to Snowhead (from Mountain Village)",
                            "alias": "Path to Snowhead",
                        },
                    ],
                    [
                        {
                            "node": "Path to Mountain Village (from Termina Field)",
                            "alias": "Path to Mountain Village",
                        },
                        {
                            "node": "Pirates's Fortress Exterior (from Sewers)",
                            "alias": "Pirates's Fortress Exterior",
                        },
                    ],
                    [
                        {
                            "node": "Path to Mountain Village (from Mountain Village)",
                            "alias": "Path to Mountain Village",
                        },
                        {
                            "node": "South Clock Town (from West Clock Town south)",
                            "alias": "South Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Ancient Castle of Ikana (from Beneath the Well)",
                            "alias": "Ancient Castle of Ikana",
                        },
                        {
                            "node": "Zora Hall (from Mikau's Room)",
                            "alias": "Zora Hall",
                        },
                    ],
                    [
                        {
                            "node": "Ancient Castle of Ikana (from Ikana Canyon)",
                            "alias": "Ancient Castle of Ikana",
                        },
                        {
                            "node": "Path to the Swamp (from Termina Field)",
                            "alias": "Path to the Swamp",
                        },
                    ],
                    [
                        {
                            "node": "Ancient Castle of Ikana (from Castle Interior)",
                            "alias": "Ancient Castle of Ikana",
                        },
                        {
                            "node": "East Clock Town (from Honey & Darling)",
                            "alias": "East Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Ancient Castle of Ikana (from Castle Exterior)",
                            "alias": "Ancient Castle of Ikana",
                        },
                        {
                            "node": "Hotspring Water Grotto",
                            "alias": "Hotspring Water Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Ancient Castle of Ikana (from Keg Hole)",
                            "alias": "Ancient Castle of Ikana",
                        },
                        {
                            "node": "Great Bay Coast (from Zora Cape)",
                            "alias": "Great Bay Coast",
                        },
                    ],
                    [
                        {
                            "node": "Ancient Castle of Ikana (from Hole under Block)",
                            "alias": "Ancient Castle of Ikana",
                        },
                        {
                            "node": "Mountain Village (from Clear Cutscene)",
                            "alias": "Mountain Village",
                        },
                    ],
                    [
                        {
                            "node": "Ancient Castle of Ikana (from Igo's Room)",
                            "alias": "Ancient Castle of Ikana",
                        },
                        {
                            "node": "Romani Ranch (from Romani being abducted)",
                            "alias": "Romani Ranch",
                        },
                    ],
                    [
                        {
                            "node": "Deku Playground",
                            "alias": "Deku Playground",
                        },
                        {
                            "node": "Ikana Canyon (from Beneath the Well)",
                            "alias": "Ikana Canyon",
                        },
                    ],
                    [
                        {
                            "node": "Odolwa's Room",
                            "alias": "Odolwa's Room",
                        },
                        {
                            "node": "Termina Field (from North Clock Town)",
                            "alias": "Termina Field",
                        },
                    ],
                    [
                        {
                            "node": "Shooting Gallery (Clock Town)",
                            "alias": "Shooting Gallery (Clock Town)",
                        },
                        {
                            "node": "Zora Cape (from Waterfall Rapids)",
                            "alias": "Zora Cape",
                        },
                    ],
                    [
                        {
                            "node": "Snowhead Temple",
                            "alias": "Snowhead Temple",
                        },
                        {
                            "node": "Mountain Village (from Mountain Smithy)",
                            "alias": "Mountain Village",
                        },
                    ],
                    [
                        {
                            "node": "Milk Road (from Termina Field)",
                            "alias": "Milk Road",
                        },
                        {
                            "node": "Deku Shrine",
                            "alias": "Deku Shrine",
                        },
                    ],
                    [
                        {
                            "node": "Milk Road (from Romani Ranch)",
                            "alias": "Milk Road",
                        },
                        {
                            "node": "Ikana Graveyard (from Beneath the Graveyard (Heart Piece))",
                            "alias": "Ikana Graveyard",
                        },
                    ],
                    [
                        {
                            "node": "Milk Road (from Gorman Track back)",
                            "alias": "Milk Road",
                        },
                        {
                            "node": "Japas's Room (from Zora Hall)",
                            "alias": "Japas's Room",
                        },
                    ],
                    [
                        {
                            "node": "Milk Road (from Gorman Track)",
                            "alias": "Milk Road",
                        },
                        {
                            "node": "Cow Grotto",
                            "alias": "Cow Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Milk Road (from Song of Soaring)",
                            "alias": "Milk Road",
                        },
                        {
                            "node": "Path to the Swamp (from Shooting Gallery)",
                            "alias": "Path to the Swamp",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Rooms (Hookshot Lower)",
                            "alias": "Pirates's Fortress Rooms (Hookshot Lower)",
                        },
                        {
                            "node": "Stone Tower (from Stone Tower Temple)",
                            "alias": "Stone Tower",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Rooms (Hookshot Upper)",
                            "alias": "Pirates's Fortress Rooms (Hookshot Upper)",
                        },
                        {
                            "node": "West Clock Town (from Trading Post)",
                            "alias": "West Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Rooms (Purple Pirate entrance)",
                            "alias": "Pirates's Fortress Rooms (Purple Pirate entrance)",
                        },
                        {
                            "node": "Fairy's Fountain (Ikana)",
                            "alias": "Fairy's Fountain (Ikana)",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Rooms (Purple Pirate exit)",
                            "alias": "Pirates's Fortress Rooms (Purple Pirate exit)",
                        },
                        {
                            "node": "Zora Hall (from Evan's Room)",
                            "alias": "Zora Hall",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Rooms (Green Pirate entrance)",
                            "alias": "Pirates's Fortress Rooms (Green Pirate entrance)",
                        },
                        {
                            "node": "Southern Swamp (from Swamp Spider House)",
                            "alias": "Southern Swamp",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Rooms (Green Pirate exit)",
                            "alias": "Pirates's Fortress Rooms (Green Pirate exit)",
                        },
                        {
                            "node": "Woodfall (from Song of Soaring)",
                            "alias": "Woodfall",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Rooms (Red Pirate entrance)",
                            "alias": "Pirates's Fortress Rooms (Red Pirate entrance)",
                        },
                        {
                            "node": "Pirates's Fortress Rooms (Sewers entrance)",
                            "alias": "Pirates's Fortress Rooms (Sewers entrance)",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Rooms (Red Pirate exit)",
                            "alias": "Pirates's Fortress Rooms (Red Pirate exit)",
                        },
                        {
                            "node": "North Clock Town (from Termina Field)",
                            "alias": "North Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Rooms (from Telescope)",
                            "alias": "Pirates's Fortress Rooms",
                        },
                        {
                            "node": "Ikana Graveyard (from Path to Ikana)",
                            "alias": "Ikana Graveyard",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Rooms (Sewers entrance)",
                            "alias": "Pirates's Fortress Rooms (Sewers entrance)",
                        },
                        {
                            "node": "Zora Cape (from Zora Hall)",
                            "alias": "Zora Cape",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Rooms (Sewers exit)",
                            "alias": "Pirates's Fortress Rooms (Sewers exit)",
                        },
                        {
                            "node": "Stock Pot Inn (from East Clock Town upper)",
                            "alias": "Stock Pot Inn",
                        },
                    ],
                    [
                        {
                            "node": "Shooting Gallery (Swamp)",
                            "alias": "Shooting Gallery (Swamp)",
                        },
                        {
                            "node": "Milk Road (from Gorman Track back)",
                            "alias": "Milk Road",
                        },
                    ],
                    [
                        {
                            "node": "Pinnacle Rock",
                            "alias": "Pinnacle Rock",
                        },
                        {
                            "node": "Termina Field (from East Clock Town)",
                            "alias": "Termina Field",
                        },
                    ],
                    [
                        {
                            "node": "Fairy's Fountain (Clock Town)",
                            "alias": "Fairy's Fountain (Clock Town)",
                        },
                        {
                            "node": "Path to Goron Village (from Goron Village)",
                            "alias": "Path to Goron Village",
                        },
                    ],
                    [
                        {
                            "node": "Fairy's Fountain (Woodfall)",
                            "alias": "Fairy's Fountain (Woodfall)",
                        },
                        {
                            "node": "Great Bay Temple (from Zora Cape)",
                            "alias": "Great Bay Temple",
                        },
                    ],
                    [
                        {
                            "node": "Fairy's Fountain (Snowhead)",
                            "alias": "Fairy's Fountain (Snowhead)",
                        },
                        {
                            "node": "Zora Cape (from Great Bay Coast)",
                            "alias": "Zora Cape",
                        },
                    ],
                    [
                        {
                            "node": "Fairy's Fountain (Great Bay)",
                            "alias": "Fairy's Fountain (Great Bay)",
                        },
                        {
                            "node": "Deku King's Chamber (from Releasing Monkey)",
                            "alias": "Deku King's Chamber",
                        },
                    ],
                    [
                        {
                            "node": "Fairy's Fountain (Ikana)",
                            "alias": "Fairy's Fountain (Ikana)",
                        },
                        {
                            "node": "Termina Field (from Path to Southern Swamp)",
                            "alias": "Termina Field",
                        },
                    ],
                    [
                        {
                            "node": "Swamp Spider House",
                            "alias": "Swamp Spider House",
                        },
                        {
                            "node": "Goron Village (from Goron Shrine)",
                            "alias": "Goron Village",
                        },
                    ],
                    [
                        {
                            "node": "Ocean Spider House",
                            "alias": "Ocean Spider House",
                        },
                        {
                            "node": "Deku Palace (from Southern Swamp)",
                            "alias": "Deku Palace",
                        },
                    ],
                    [
                        {
                            "node": "Bombers's Hideout",
                            "alias": "Bombers's Hideout",
                        },
                        {
                            "node": "South Clock Town (from Clock Tower)",
                            "alias": "South Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Observatory (from Termina Field)",
                            "alias": "Observatory",
                        },
                        {
                            "node": "East Clock Town (from Termina Field)",
                            "alias": "East Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Observatory (from Telescope)",
                            "alias": "Observatory",
                        },
                        {
                            "node": "Snowhead (from Song of Soaring)",
                            "alias": "Snowhead",
                        },
                    ],
                    [
                        {
                            "node": "Woodfall Trial (from Moon)",
                            "alias": "Woodfall Trial",
                        },
                        {
                            "node": "Great Bay Trial (from Moon)",
                            "alias": "Great Bay Trial",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace (from Southern Swamp)",
                            "alias": "Deku Palace",
                        },
                        {
                            "node": "Fairy's Fountain (Snowhead)",
                            "alias": "Fairy's Fountain (Snowhead)",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace (from being thrown out)",
                            "alias": "Deku Palace",
                        },
                        {
                            "node": "Southern Swamp (from Tourist Information)",
                            "alias": "Southern Swamp",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace (from Deku King's Chamber)",
                            "alias": "Deku Palace",
                        },
                        {
                            "node": "Ikana Canyon (from Song of Soaring)",
                            "alias": "Ikana Canyon",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace (from Monkey cage)",
                            "alias": "Deku Palace",
                        },
                        {
                            "node": "Pirates's Fortress Interior (from Green Pirate entrance)",
                            "alias": "Pirates's Fortress Interior",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace (from Deku Shrine)",
                            "alias": "Deku Palace",
                        },
                        {
                            "node": "Stock Pot Inn (from East Clock Town)",
                            "alias": "Stock Pot Inn",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace (from Swamp Shortcut)",
                            "alias": "Deku Palace",
                        },
                        {
                            "node": "Back Room (from Laundry Pool)",
                            "alias": "Back Room",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace (from Deku Palace Garden Front Grotto)",
                            "alias": "Deku Palace",
                        },
                        {
                            "node": "East Clock Town (from Stokc Pot Inn upper)",
                            "alias": "East Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace (from Deku Palace Garden Back Grotto)",
                            "alias": "Deku Palace",
                        },
                        {
                            "node": "Milk Road (from Termina Field)",
                            "alias": "Milk Road",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace (from Deku Palace Garden Back Grotto)",
                            "alias": "Deku Palace",
                        },
                        {
                            "node": "Pirates's Fortress Exterior (from Sewers end)",
                            "alias": "Pirates's Fortress Exterior",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace (from Magic Bean Seller Grotto)",
                            "alias": "Deku Palace",
                        },
                        {
                            "node": "Pirates's Fortress Rooms (from Telescope)",
                            "alias": "Pirates's Fortress Rooms",
                        },
                    ],
                    [
                        {
                            "node": "Deku Palace (from Deku Palace Garden Front Grotto)",
                            "alias": "Deku Palace",
                        },
                        {
                            "node": "Beneath the Graveyard (Heart Piece)",
                            "alias": "Beneath the Graveyard (Heart Piece)",
                        },
                    ],
                    [
                        {
                            "node": "Mountain Smithy",
                            "alias": "Mountain Smithy",
                        },
                        {
                            "node": "Laundry Pool (from South Clock Town)",
                            "alias": "Laundry Pool",
                        },
                    ],
                    [
                        {
                            "node": "Termina Field (from West Clock Town)",
                            "alias": "Termina Field",
                        },
                        {
                            "node": "Pirates's Fortress Rooms (Purple Pirate exit)",
                            "alias": "Pirates's Fortress Rooms (Purple Pirate exit)",
                        },
                    ],
                    [
                        {
                            "node": "Termina Field (from Path to Southern Swamp)",
                            "alias": "Termina Field",
                        },
                        {
                            "node": "Southern Swamp (from Song of Soaring)",
                            "alias": "Southern Swamp",
                        },
                    ],
                    [
                        {
                            "node": "Termina Field (from Great Bay Coast)",
                            "alias": "Termina Field",
                        },
                        {
                            "node": "Pirates's Fortress Interior (from Purple Pirate entrance)",
                            "alias": "Pirates's Fortress Interior",
                        },
                    ],
                    [
                        {
                            "node": "Termina Field (from Path to Mountain Village)",
                            "alias": "Termina Field",
                        },
                        {
                            "node": "Sakon's Hideout",
                            "alias": "Sakon's Hideout",
                        },
                    ],
                    [
                        {
                            "node": "Termina Field (from Path to Ikana Canyon)",
                            "alias": "Termina Field",
                        },
                        {
                            "node": "Pirates's Fortress Exterior (from Interior)",
                            "alias": "Pirates's Fortress Exterior",
                        },
                    ],
                    [
                        {
                            "node": "Termina Field (from Milk Road)",
                            "alias": "Termina Field",
                        },
                        {
                            "node": "Pirates's Fortress Rooms (Green Pirate exit)",
                            "alias": "Pirates's Fortress Rooms (Green Pirate exit)",
                        },
                    ],
                    [
                        {
                            "node": "Termina Field (from South Clock Town)",
                            "alias": "Termina Field",
                        },
                        {
                            "node": "Beneath the Well (from Ancient Castle of Ikana)",
                            "alias": "Beneath the Well",
                        },
                    ],
                    [
                        {
                            "node": "Termina Field (from East Clock Town)",
                            "alias": "Termina Field",
                        },
                        {
                            "node": "Romani Ranch (from Milk Road)",
                            "alias": "Romani Ranch",
                        },
                    ],
                    [
                        {
                            "node": "Termina Field (from North Clock Town)",
                            "alias": "Termina Field",
                        },
                        {
                            "node": "Termina Field (from Path to Ikana Canyon)",
                            "alias": "Termina Field",
                        },
                    ],
                    [
                        {
                            "node": "Termina Field (from Observatory)",
                            "alias": "Termina Field",
                        },
                        {
                            "node": "Snowhead Gossip Stones Grotto",
                            "alias": "Snowhead Gossip Stones Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Termina Field (Telescope)",
                            "alias": "Termina Field (Telescope)",
                        },
                        {
                            "node": "Path to Goron Village (from Goron Racetrack)",
                            "alias": "Path to Goron Village",
                        },
                    ],
                    [
                        {
                            "node": "Termina Field (from Milk Road with Cremia)",
                            "alias": "Termina Field",
                        },
                        {
                            "node": "Termina Field (from Path to Mountain Village)",
                            "alias": "Termina Field",
                        },
                    ],
                    [
                        {
                            "node": "Post Office",
                            "alias": "Post Office",
                        },
                        {
                            "node": "Snowhead (from Path to Snowhead/Void)",
                            "alias": "Snowhead",
                        },
                    ],
                    [
                        {
                            "node": "Marine Research Lab",
                            "alias": "Marine Research Lab",
                        },
                        {
                            "node": "South Clock Town (from North Clock Town)",
                            "alias": "South Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Beneath the Graveyard (Bottle)",
                            "alias": "Beneath the Graveyard (Bottle)",
                        },
                        {
                            "node": "Ikana Canyon (from Spring Water Cave)",
                            "alias": "Ikana Canyon",
                        },
                    ],
                    [
                        {
                            "node": "Dampe's Room",
                            "alias": "Dampe's Room",
                        },
                        {
                            "node": "Ikana Canyon (from Path to Ikana)",
                            "alias": "Ikana Canyon",
                        },
                    ],
                    [
                        {
                            "node": "Goron Shrine (from Goron Village)",
                            "alias": "Goron Shrine",
                        },
                        {
                            "node": "Great Bay Coast (from Pirates' Fortress caught)",
                            "alias": "Great Bay Coast",
                        },
                    ],
                    [
                        {
                            "node": "Goron Shrine (from Goron Shop)",
                            "alias": "Goron Shrine",
                        },
                        {
                            "node": "Great Bay Coast (from Fisherman's Hut)",
                            "alias": "Great Bay Coast",
                        },
                    ],
                    [
                        {
                            "node": "Zora Hall (from Zora Cape)",
                            "alias": "Zora Hall",
                        },
                        {
                            "node": "Tourist Information",
                            "alias": "Tourist Information",
                        },
                    ],
                    [
                        {
                            "node": "Zora Hall (from Zora Cape back)",
                            "alias": "Zora Hall",
                        },
                        {
                            "node": "East Clock Town (from Bombers's Hideout)",
                            "alias": "East Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Zora Hall (from Zora Shop)",
                            "alias": "Zora Hall",
                        },
                        {
                            "node": "Path to Mountain Village (from Mountain Village)",
                            "alias": "Path to Mountain Village",
                        },
                    ],
                    [
                        {
                            "node": "Zora Hall (from Lulu's Room)",
                            "alias": "Zora Hall",
                        },
                        {
                            "node": "Mountain Village (from Path to Mountain Village)",
                            "alias": "Mountain Village",
                        },
                    ],
                    [
                        {
                            "node": "Zora Hall (from Evan's Room)",
                            "alias": "Zora Hall",
                        },
                        {
                            "node": "Path to Goron Village (from Mountain Village)",
                            "alias": "Path to Goron Village",
                        },
                    ],
                    [
                        {
                            "node": "Zora Hall (from Japas's Room)",
                            "alias": "Zora Hall",
                        },
                        {
                            "node": "Ancient Castle of Ikana (from Castle Exterior)",
                            "alias": "Ancient Castle of Ikana",
                        },
                    ],
                    [
                        {
                            "node": "Zora Hall (from Mikau's Room)",
                            "alias": "Zora Hall",
                        },
                        {
                            "node": "Deku Palace (from being thrown out)",
                            "alias": "Deku Palace",
                        },
                    ],
                    [
                        {
                            "node": "Zora Hall (from Band Rehearsal)",
                            "alias": "Zora Hall",
                        },
                        {
                            "node": "North Clock Town (from South Clock Town)",
                            "alias": "North Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Trading Post",
                            "alias": "Trading Post",
                        },
                        {
                            "node": "Southern Swamp (from Deku Palace Upper)",
                            "alias": "Southern Swamp",
                        },
                    ],
                    [
                        {
                            "node": "Romani Ranch (from Milk Road)",
                            "alias": "Romani Ranch",
                        },
                        {
                            "node": "Pirates's Fortress Rooms (Green Pirate entrance)",
                            "alias": "Pirates's Fortress Rooms (Green Pirate entrance)",
                        },
                    ],
                    [
                        {
                            "node": "Romani Ranch (from Barn)",
                            "alias": "Romani Ranch",
                        },
                        {
                            "node": "Southern Swamp (from Deku Palace)",
                            "alias": "Southern Swamp",
                        },
                    ],
                    [
                        {
                            "node": "Romani Ranch (from House)",
                            "alias": "Romani Ranch",
                        },
                        {
                            "node": "Stone Tower (from Un-inverting)",
                            "alias": "Stone Tower",
                        },
                    ],
                    [
                        {
                            "node": "Romani Ranch (from Cucco Shack)",
                            "alias": "Romani Ranch",
                        },
                        {
                            "node": "Pirates's Fortress Rooms (Red Pirate entrance)",
                            "alias": "Pirates's Fortress Rooms (Red Pirate entrance)",
                        },
                    ],
                    [
                        {
                            "node": "Romani Ranch (from Doggy Racetrack)",
                            "alias": "Romani Ranch",
                        },
                        {
                            "node": "Deku Palace (from Monkey cage)",
                            "alias": "Deku Palace",
                        },
                    ],
                    [
                        {
                            "node": "Romani Ranch (from Receiving Milk Bottle)",
                            "alias": "Romani Ranch",
                        },
                        {
                            "node": "Beneath the Graveyard (Song of Storms)",
                            "alias": "Beneath the Graveyard (Song of Storms)",
                        },
                    ],
                    [
                        {
                            "node": "Romani Ranch (from Romani being abducted)",
                            "alias": "Romani Ranch",
                        },
                        {
                            "node": "Path to the Swamp (from Southern Swamp)",
                            "alias": "Path to the Swamp",
                        },
                    ],
                    [
                        {
                            "node": "Twinmold's Room",
                            "alias": "Twinmold's Room",
                        },
                        {
                            "node": "Pirates's Fortress Interior (from Hookshot Lower)",
                            "alias": "Pirates's Fortress Interior",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Coast (from Termina Field)",
                            "alias": "Great Bay Coast",
                        },
                        {
                            "node": "Observatory (from Termina Field)",
                            "alias": "Observatory",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Coast (from Zora Cape)",
                            "alias": "Great Bay Coast",
                        },
                        {
                            "node": "Goron Graveyard (from Mountain Village)",
                            "alias": "Goron Graveyard",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Coast (from Murky Water Left)",
                            "alias": "Great Bay Coast",
                        },
                        {
                            "node": "Zora Hall (from Zora Cape)",
                            "alias": "Zora Hall",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Coast (from Pinnacle Rock)",
                            "alias": "Great Bay Coast",
                        },
                        {
                            "node": "Waterfall Rapids (from Zora Cape)",
                            "alias": "Waterfall Rapids",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Coast (from Fisherman's Hut)",
                            "alias": "Great Bay Coast",
                        },
                        {
                            "node": "Termina Field (from Milk Road with Cremia)",
                            "alias": "Termina Field",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Coast (from Pirates' Fortress)",
                            "alias": "Great Bay Coast",
                        },
                        {
                            "node": "Spring Water Cave (from Farewell to Gibdos)",
                            "alias": "Spring Water Cave",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Coast (from Murky Water Right)",
                            "alias": "Great Bay Coast",
                        },
                        {
                            "node": "Shooting Gallery (Clock Town)",
                            "alias": "Shooting Gallery (Clock Town)",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Coast (from Marine Research Lab)",
                            "alias": "Great Bay Coast",
                        },
                        {
                            "node": "Ancient Castle of Ikana (from Keg Hole)",
                            "alias": "Ancient Castle of Ikana",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Coast (from Oceanside Spider House)",
                            "alias": "Great Bay Coast",
                        },
                        {
                            "node": "Ikana Canyon (from Stone Tower)",
                            "alias": "Ikana Canyon",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Coast (from Zora Mask Cutscene)",
                            "alias": "Great Bay Coast",
                        },
                        {
                            "node": "Pirates's Fortress Rooms (Purple Pirate entrance)",
                            "alias": "Pirates's Fortress Rooms (Purple Pirate entrance)",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Coast (from Song of Soaring)",
                            "alias": "Great Bay Coast",
                        },
                        {
                            "node": "East Clock Town (from Stock Pot Inn)",
                            "alias": "East Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Coast (from Pirates' Fortress caught)",
                            "alias": "Great Bay Coast",
                        },
                        {
                            "node": "Snowhead (from Fairy's Fountain)",
                            "alias": "Snowhead",
                        },
                    ],
                    [
                        {
                            "node": "Zora Cape (from Great Bay Coast)",
                            "alias": "Zora Cape",
                        },
                        {
                            "node": "Lone Peak Shrine",
                            "alias": "Lone Peak Shrine",
                        },
                    ],
                    [
                        {
                            "node": "Zora Cape (from Zora Hall)",
                            "alias": "Zora Cape",
                        },
                        {
                            "node": "Milk Bar",
                            "alias": "Milk Bar",
                        },
                    ],
                    [
                        {
                            "node": "Zora Cape (from Zora Hall back)",
                            "alias": "Zora Cape",
                        },
                        {
                            "node": "Great Bay Coast (from Song of Soaring)",
                            "alias": "Great Bay Coast",
                        },
                    ],
                    [
                        {
                            "node": "Zora Cape (from Murky Water)",
                            "alias": "Zora Cape",
                        },
                        {
                            "node": "Ancient Castle of Ikana (from Ikana Canyon)",
                            "alias": "Ancient Castle of Ikana",
                        },
                    ],
                    [
                        {
                            "node": "Zora Cape (from Waterfall Rapids)",
                            "alias": "Zora Cape",
                        },
                        {
                            "node": "South Clock Town (from Termina Field)",
                            "alias": "South Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Zora Cape (from Fairy's Fountain)",
                            "alias": "Zora Cape",
                        },
                        {
                            "node": "Southern Swamp (from Woodfall)",
                            "alias": "Southern Swamp",
                        },
                    ],
                    [
                        {
                            "node": "Zora Cape (from Song of Soaring)",
                            "alias": "Zora Cape",
                        },
                        {
                            "node": "Pirates's Fortress Exterior (from Great Bay Coast)",
                            "alias": "Pirates's Fortress Exterior",
                        },
                    ],
                    [
                        {
                            "node": "Zora Cape (from Great Bay Temple)",
                            "alias": "Zora Cape",
                        },
                        {
                            "node": "Post Office",
                            "alias": "Post Office",
                        },
                    ],
                    [
                        {
                            "node": "Lottery Shop",
                            "alias": "Lottery Shop",
                        },
                        {
                            "node": "Great Bay Coast (from Zora Mask Cutscene)",
                            "alias": "Great Bay Coast",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Exterior (from Great Bay Coast)",
                            "alias": "Pirates's Fortress Exterior",
                        },
                        {
                            "node": "Ikana Canyon (from Sakon's Hideout)",
                            "alias": "Ikana Canyon",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Exterior (from Interior)",
                            "alias": "Pirates's Fortress Exterior",
                        },
                        {
                            "node": "South Clock Town (from West Clock Town north)",
                            "alias": "South Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Exterior (from Sewers)",
                            "alias": "Pirates's Fortress Exterior",
                        },
                        {
                            "node": "Great Bay Coast (from Murky Water Left)",
                            "alias": "Great Bay Coast",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Exterior (from Sewers Draft)",
                            "alias": "Pirates's Fortress Exterior",
                        },
                        {
                            "node": "Ancient Castle of Ikana (from Hole under Block)",
                            "alias": "Ancient Castle of Ikana",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Exterior (from Interior caught)",
                            "alias": "Pirates's Fortress Exterior",
                        },
                        {
                            "node": "Deku Princess's Room (from Woodfall)",
                            "alias": "Deku Princess's Room",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Exterior (from Interior balcony)",
                            "alias": "Pirates's Fortress Exterior",
                        },
                        {
                            "node": "Ancient Castle of Ikana (from Igo's Room)",
                            "alias": "Ancient Castle of Ikana",
                        },
                    ],
                    [
                        {
                            "node": "Pirates's Fortress Exterior (from Sewers end)",
                            "alias": "Pirates's Fortress Exterior",
                        },
                        {
                            "node": "Zora Shop",
                            "alias": "Zora Shop",
                        },
                    ],
                    [
                        {
                            "node": "Fisherman's Hut",
                            "alias": "Fisherman's Hut",
                        },
                        {
                            "node": "Milk Road (from Gorman Track)",
                            "alias": "Milk Road",
                        },
                    ],
                    [
                        {
                            "node": "Goron Shop",
                            "alias": "Goron Shop",
                        },
                        {
                            "node": "North Clock Town (from Deku Playground)",
                            "alias": "North Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Deku King's Chamber (from Deku Palace)",
                            "alias": "Deku King's Chamber",
                        },
                        {
                            "node": "Odolwa's Room",
                            "alias": "Odolwa's Room",
                        },
                    ],
                    [
                        {
                            "node": "Deku King's Chamber (from Deku Palace upper)",
                            "alias": "Deku King's Chamber",
                        },
                        {
                            "node": "West Clock Town (from South Clock Town south)",
                            "alias": "West Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Deku King's Chamber (from Deku Princess)",
                            "alias": "Deku King's Chamber",
                        },
                        {
                            "node": "Great Bay Coast (from Marine Research Lab)",
                            "alias": "Great Bay Coast",
                        },
                    ],
                    [
                        {
                            "node": "Deku King's Chamber (from Releasing Monkey)",
                            "alias": "Deku King's Chamber",
                        },
                        {
                            "node": "Woodfall Trial (from Moon)",
                            "alias": "Woodfall Trial",
                        },
                    ],
                    [
                        {
                            "node": "Snowhead Trial (from Moon)",
                            "alias": "Snowhead Trial",
                        },
                        {
                            "node": "Bisness Deku Scrub Grotto",
                            "alias": "Bisness Deku Scrub Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Path to the Swamp (from Termina Field)",
                            "alias": "Path to the Swamp",
                        },
                        {
                            "node": "Woodfall (from Woodfall Temple back)",
                            "alias": "Woodfall",
                        },
                    ],
                    [
                        {
                            "node": "Path to the Swamp (from Southern Swamp)",
                            "alias": "Path to the Swamp",
                        },
                        {
                            "node": "Zora Hall (from Band Rehearsal)",
                            "alias": "Zora Hall",
                        },
                    ],
                    [
                        {
                            "node": "Path to the Swamp (from Shooting Gallery)",
                            "alias": "Path to the Swamp",
                        },
                        {
                            "node": "Laundry Pool (from Back Room)",
                            "alias": "Laundry Pool",
                        },
                    ],
                    [
                        {
                            "node": "Doggy Racetrack",
                            "alias": "Doggy Racetrack",
                        },
                        {
                            "node": "Ikana Canyon (from Fairy Fountain)",
                            "alias": "Ikana Canyon",
                        },
                    ],
                    [
                        {
                            "node": "Cucco Shack",
                            "alias": "Cucco Shack",
                        },
                        {
                            "node": "Deku Palace (from Swamp Shortcut)",
                            "alias": "Deku Palace",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Graveyard (from Path to Ikana)",
                            "alias": "Ikana Graveyard",
                        },
                        {
                            "node": "Pirates's Fortress Interior (from Exiterior balcony)",
                            "alias": "Pirates's Fortress Interior",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Graveyard (from Beneath the Graveyard (Bottle))",
                            "alias": "Ikana Graveyard",
                        },
                        {
                            "node": "West Clock Town (from Lottery Shop)",
                            "alias": "West Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Graveyard (from Beneath the Graveyard (Heart Piece))",
                            "alias": "Ikana Graveyard",
                        },
                        {
                            "node": "Southern Swamp (from Magic Hag's Potion Shop)",
                            "alias": "Southern Swamp",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Graveyard (from Beneath the Graveyard (Song of Storms))",
                            "alias": "Ikana Graveyard",
                        },
                        {
                            "node": "Ancient Castle of Ikana (from Beneath the Well)",
                            "alias": "Ancient Castle of Ikana",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Graveyard (from Dampe's Room)",
                            "alias": "Ikana Graveyard",
                        },
                        {
                            "node": "Pirates's Fortress Interior (from Telescope)",
                            "alias": "Pirates's Fortress Interior",
                        },
                    ],
                    [
                        {
                            "node": "Ikana Graveyard (from Defeating Captain Keeta)",
                            "alias": "Ikana Graveyard",
                        },
                        {
                            "node": "Mountain Village (from Song of Soaring)",
                            "alias": "Mountain Village",
                        },
                    ],
                    [
                        {
                            "node": "Goht's Room",
                            "alias": "Goht's Room",
                        },
                        {
                            "node": "Ikana Graveyard (from Beneath the Graveyard (Bottle))",
                            "alias": "Ikana Graveyard",
                        },
                    ],
                    [
                        {
                            "node": "Southern Swamp (from Path to Swamp)",
                            "alias": "Southern Swamp",
                        },
                        {
                            "node": "Dampe's Room",
                            "alias": "Dampe's Room",
                        },
                    ],
                    [
                        {
                            "node": "Southern Swamp (from Tourist Information)",
                            "alias": "Southern Swamp",
                        },
                        {
                            "node": "Milk Road (from Song of Soaring)",
                            "alias": "Milk Road",
                        },
                    ],
                    [
                        {
                            "node": "Southern Swamp (from Woodfall)",
                            "alias": "Southern Swamp",
                        },
                        {
                            "node": "Ikana Canyon (from Secret Shrine)",
                            "alias": "Ikana Canyon",
                        },
                    ],
                    [
                        {
                            "node": "Southern Swamp (from Deku Palace)",
                            "alias": "Southern Swamp",
                        },
                        {
                            "node": "South Clock Town (from East Clock Town north)",
                            "alias": "South Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Southern Swamp (from Deku Palace Upper)",
                            "alias": "Southern Swamp",
                        },
                        {
                            "node": "Pirates's Fortress Interior (from Green Pirate exit)",
                            "alias": "Pirates's Fortress Interior",
                        },
                    ],
                    [
                        {
                            "node": "Southern Swamp (from Magic Hag's Potion Shop)",
                            "alias": "Southern Swamp",
                        },
                        {
                            "node": "Cucco Shack",
                            "alias": "Cucco Shack",
                        },
                    ],
                    [
                        {
                            "node": "Southern Swamp (from Woods of Mystery)",
                            "alias": "Southern Swamp",
                        },
                        {
                            "node": "Termina Field (from Observatory)",
                            "alias": "Termina Field",
                        },
                    ],
                    [
                        {
                            "node": "Southern Swamp (from Swamp Spider House)",
                            "alias": "Southern Swamp",
                        },
                        {
                            "node": "Great Bay Coast (from Oceanside Spider House)",
                            "alias": "Great Bay Coast",
                        },
                    ],
                    [
                        {
                            "node": "Southern Swamp (from Ikana Canyon)",
                            "alias": "Southern Swamp",
                        },
                        {
                            "node": "Goron Shop",
                            "alias": "Goron Shop",
                        },
                    ],
                    [
                        {
                            "node": "Southern Swamp (from Song of Soaring)",
                            "alias": "Southern Swamp",
                        },
                        {
                            "node": "Inverted Stone Tower (from Inverted Stone Tower Temple)",
                            "alias": "Inverted Stone Tower",
                        },
                    ],
                    [
                        {
                            "node": "Woodfall (from Southern Swamp)",
                            "alias": "Woodfall",
                        },
                        {
                            "node": "Mountain Village (from Goron Graveyard)",
                            "alias": "Mountain Village",
                        },
                    ],
                    [
                        {
                            "node": "Woodfall (from Woodfall Temple)",
                            "alias": "Woodfall",
                        },
                        {
                            "node": "Clock Tower (from Pre Clock Tower)",
                            "alias": "Clock Tower",
                        },
                    ],
                    [
                        {
                            "node": "Woodfall (from Fairy's Fountain)",
                            "alias": "Woodfall",
                        },
                        {
                            "node": "Great Bay Gossip Stones Grotto",
                            "alias": "Great Bay Gossip Stones Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Woodfall (from Woodfall Temple back)",
                            "alias": "Woodfall",
                        },
                        {
                            "node": "Deku Palace (from Deku Palace Garden Front Grotto)",
                            "alias": "Deku Palace",
                        },
                    ],
                    [
                        {
                            "node": "Woodfall (from Song of Soaring)",
                            "alias": "Woodfall",
                        },
                        {
                            "node": "Ocean Spider House",
                            "alias": "Ocean Spider House",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Trial (from Moon)",
                            "alias": "Great Bay Trial",
                        },
                        {
                            "node": "North Clock Town (from Fairy's Fountain)",
                            "alias": "North Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Trial (from Murky Water)",
                            "alias": "Great Bay Trial",
                        },
                        {
                            "node": "Trading Post",
                            "alias": "Trading Post",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Temple (from Zora Cape)",
                            "alias": "Great Bay Temple",
                        },
                        {
                            "node": "Woods of Mystery",
                            "alias": "Woods of Mystery",
                        },
                    ],
                    [
                        {
                            "node": "Great Bay Temple (from Pirate Cutscene)",
                            "alias": "Great Bay Temple",
                        },
                        {
                            "node": "Stone Tower (from Song of Soaring)",
                            "alias": "Stone Tower",
                        },
                    ],
                    [
                        {
                            "node": "Waterfall Rapids (from Zora Cape)",
                            "alias": "Waterfall Rapids",
                        },
                        {
                            "node": "South Clock Town (from East Clock Town south)",
                            "alias": "South Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Beneath the Well (from Ikana Canyon)",
                            "alias": "Beneath the Well",
                        },
                        {
                            "node": "Deku Palace Garden Back Grotto",
                            "alias": "Deku Palace Garden Back Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Beneath the Well (from Ancient Castle of Ikana)",
                            "alias": "Beneath the Well",
                        },
                        {
                            "node": "Deku Palace (from Deku King's Chamber)",
                            "alias": "Deku Palace",
                        },
                    ],
                    [
                        {
                            "node": "Mikau's Room (from Zora Hall)",
                            "alias": "Mikau's Room",
                        },
                        {
                            "node": "Great Bay Coast (from Termina Field)",
                            "alias": "Great Bay Coast",
                        },
                    ],
                    [
                        {
                            "node": "Japas's Room (from Zora Hall)",
                            "alias": "Japas's Room",
                        },
                        {
                            "node": "Zora Cape (from Zora Hall back)",
                            "alias": "Zora Cape",
                        },
                    ],
                    [
                        {
                            "node": "Lulu's Room (from Zora Hall)",
                            "alias": "Lulu's Room",
                        },
                        {
                            "node": "Ikana Graveyard (from Dampe's Room)",
                            "alias": "Ikana Graveyard",
                        },
                    ],
                    [
                        {
                            "node": "Evan's Room (from Zora Hall)",
                            "alias": "Evan's Room",
                        },
                        {
                            "node": "Stone Tower (from Ikana Canyon)",
                            "alias": "Stone Tower",
                        },
                    ],
                    [
                        {
                            "node": "Zora Shop",
                            "alias": "Zora Shop",
                        },
                        {
                            "node": "Great Bay Coast (from Pinnacle Rock)",
                            "alias": "Great Bay Coast",
                        },
                    ],
                    [
                        {
                            "node": "Goron Village (from Path to Goron Village)",
                            "alias": "Goron Village",
                        },
                        {
                            "node": "Path to Mountain Village (from Termina Field)",
                            "alias": "Path to Mountain Village",
                        },
                    ],
                    [
                        {
                            "node": "Goron Village (from Goron Shrine)",
                            "alias": "Goron Village",
                        },
                        {
                            "node": "West Clock Town (from Swordsman's School)",
                            "alias": "West Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Goron Village (from Lone Peak Shrine)",
                            "alias": "Goron Village",
                        },
                        {
                            "node": "Termina Field (from West Clock Town)",
                            "alias": "Termina Field",
                        },
                    ],
                    [
                        {
                            "node": "Goron Graveyard (from Mountain Village)",
                            "alias": "Goron Graveyard",
                        },
                        {
                            "node": "Ikana Graveyard (from Beneath the Graveyard (Song of Storms))",
                            "alias": "Ikana Graveyard",
                        },
                    ],
                    [
                        {
                            "node": "Sakon's Hideout",
                            "alias": "Sakon's Hideout",
                        },
                        {
                            "node": "Ranch House (from Romani Ranch)",
                            "alias": "Ranch House",
                        },
                    ],
                    [
                        {
                            "node": "Mountain Village (from Mountain Smithy)",
                            "alias": "Mountain Village",
                        },
                        {
                            "node": "Milk Road (from Romani Ranch)",
                            "alias": "Milk Road",
                        },
                    ],
                    [
                        {
                            "node": "Mountain Village (from Path to Goron Village)",
                            "alias": "Mountain Village",
                        },
                        {
                            "node": "Path to Ikana (from Ikana Graveyard)",
                            "alias": "Path to Ikana",
                        },
                    ],
                    [
                        {
                            "node": "Mountain Village (from Goron Graveyard)",
                            "alias": "Mountain Village",
                        },
                        {
                            "node": "Great Bay Trial (from Murky Water)",
                            "alias": "Great Bay Trial",
                        },
                    ],
                    [
                        {
                            "node": "Mountain Village (from Path to Snowhead)",
                            "alias": "Mountain Village",
                        },
                        {
                            "node": "Generic Grotto",
                            "alias": "Generic Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Mountain Village (from Path to Mountain Village)",
                            "alias": "Mountain Village",
                        },
                        {
                            "node": "Pirates's Fortress Interior (from Purple Pirate exit)",
                            "alias": "Pirates's Fortress Interior",
                        },
                    ],
                    [
                        {
                            "node": "Mountain Village (from Clear Cutscene)",
                            "alias": "Mountain Village",
                        },
                        {
                            "node": "Deku Palace (from Magic Bean Seller Grotto)",
                            "alias": "Deku Palace",
                        },
                    ],
                    [
                        {
                            "node": "Mountain Village (from Song of Soaring)",
                            "alias": "Mountain Village",
                        },
                        {
                            "node": "Mountain Village (from Path to Snowhead)",
                            "alias": "Mountain Village",
                        },
                    ],
                    [
                        {
                            "node": "Ghost Hut (from Ikana Canyon)",
                            "alias": "Ghost Hut",
                        },
                        {
                            "node": "Goht's Room",
                            "alias": "Goht's Room",
                        },
                    ],
                    [
                        {
                            "node": "Deku Shrine",
                            "alias": "Deku Shrine",
                        },
                        {
                            "node": "Woodfall Temple (from Woodfall)",
                            "alias": "Woodfall Temple",
                        },
                    ],
                    [
                        {
                            "node": "Path to Ikana (from Termina Field)",
                            "alias": "Path to Ikana",
                        },
                        {
                            "node": "Southern Swamp (from Path to Swamp)",
                            "alias": "Southern Swamp",
                        },
                    ],
                    [
                        {
                            "node": "Path to Ikana (from Ikana Graveyard)",
                            "alias": "Path to Ikana",
                        },
                        {
                            "node": "Inverted Stone Tower Temple (Boss Door)",
                            "alias": "Inverted Stone Tower Temple (Boss Door)",
                        },
                    ],
                    [
                        {
                            "node": "Path to Ikana (from Ikana Canyon)",
                            "alias": "Path to Ikana",
                        },
                        {
                            "node": "Goron Shrine (from Goron Village)",
                            "alias": "Goron Shrine",
                        },
                    ],
                    [
                        {
                            "node": "Swordsman's School",
                            "alias": "Swordsman's School",
                        },
                        {
                            "node": "Zora Cape (from Fairy's Fountain)",
                            "alias": "Zora Cape",
                        },
                    ],
                    [
                        {
                            "node": "Music Box House",
                            "alias": "Music Box House",
                        },
                        {
                            "node": "Pirates's Fortress Exterior (from Sewers Draft)",
                            "alias": "Pirates's Fortress Exterior",
                        },
                    ],
                    [
                        {
                            "node": "Igos du Ikana's Room",
                            "alias": "Igos du Ikana's Room",
                        },
                        {
                            "node": "Pirates's Fortress Exterior (from Interior caught)",
                            "alias": "Pirates's Fortress Exterior",
                        },
                    ],
                    [
                        {
                            "node": "Tourist Information",
                            "alias": "Tourist Information",
                        },
                        {
                            "node": "Deku Palace Garden Front Grotto",
                            "alias": "Deku Palace Garden Front Grotto",
                        },
                    ],
                    [
                        {
                            "node": "Stone Tower (from Ikana Canyon)",
                            "alias": "Stone Tower",
                        },
                        {
                            "node": "Inverted Stone Tower (from Inverting)",
                            "alias": "Inverted Stone Tower",
                        },
                    ],
                    [
                        {
                            "node": "Stone Tower (from Un-inverting)",
                            "alias": "Stone Tower",
                        },
                        {
                            "node": "Pirates's Fortress Interior (from Red Pirate entrance)",
                            "alias": "Pirates's Fortress Interior",
                        },
                    ],
                    [
                        {
                            "node": "Stone Tower (from Stone Tower Temple)",
                            "alias": "Stone Tower",
                        },
                        {
                            "node": "Termina Field (from Milk Road)",
                            "alias": "Termina Field",
                        },
                    ],
                    [
                        {
                            "node": "Stone Tower (from Song of Soaring)",
                            "alias": "Stone Tower",
                        },
                        {
                            "node": "Woodfall (from Southern Swamp)",
                            "alias": "Woodfall",
                        },
                    ],
                    [
                        {
                            "node": "Inverted Stone Tower (from Inverting)",
                            "alias": "Inverted Stone Tower",
                        },
                        {
                            "node": "Spring Water Cave (from Ikana Canyon)",
                            "alias": "Spring Water Cave",
                        },
                    ],
                    [
                        {
                            "node": "Inverted Stone Tower (from Inverted Stone Tower Temple)",
                            "alias": "Inverted Stone Tower",
                        },
                        {
                            "node": "West Clock Town (from Termina Field)",
                            "alias": "West Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Path to Snowhead (from Mountain Village)",
                            "alias": "Path to Snowhead",
                        },
                        {
                            "node": "Termina Field (from South Clock Town)",
                            "alias": "Termina Field",
                        },
                    ],
                    [
                        {
                            "node": "Path to Snowhead (from Snowhead)",
                            "alias": "Path to Snowhead",
                        },
                        {
                            "node": "Zora Hall (from Zora Cape back)",
                            "alias": "Zora Hall",
                        },
                    ],
                    [
                        {
                            "node": "Snowhead (from Path to Snowhead/Void)",
                            "alias": "Snowhead",
                        },
                        {
                            "node": "Woodfall (from Woodfall Temple)",
                            "alias": "Woodfall",
                        },
                    ],
                    [
                        {
                            "node": "Snowhead (from Snowhead Temple)",
                            "alias": "Snowhead",
                        },
                        {
                            "node": "Romani Ranch (from Cucco Shack)",
                            "alias": "Romani Ranch",
                        },
                    ],
                    [
                        {
                            "node": "Snowhead (from Fairy's Fountain)",
                            "alias": "Snowhead",
                        },
                        {
                            "node": "North Clock Town (from Catching all Bombers)",
                            "alias": "North Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Snowhead (from Song of Soaring)",
                            "alias": "Snowhead",
                        },
                        {
                            "node": "On the Moon",
                            "alias": "On the Moon",
                        },
                    ],
                    [
                        {
                            "node": "Path to Goron Village (from Mountain Village)",
                            "alias": "Path to Goron Village",
                        },
                        {
                            "node": "Ikana Graveyard (from Defeating Captain Keeta)",
                            "alias": "Ikana Graveyard",
                        },
                    ],
                    [
                        {
                            "node": "Path to Goron Village (from Goron Village)",
                            "alias": "Path to Goron Village",
                        },
                        {
                            "node": "Great Bay Temple (from Pirate Cutscene)",
                            "alias": "Great Bay Temple",
                        },
                    ],
                    [
                        {
                            "node": "Path to Goron Village (from Goron Racetrack)",
                            "alias": "Path to Goron Village",
                        },
                        {
                            "node": "Snowhead Temple",
                            "alias": "Snowhead Temple",
                        },
                    ],
                    [
                        {
                            "node": "Gyorg's Room",
                            "alias": "Gyorg's Room",
                        },
                        {
                            "node": "Mayor's Residence (from East Clock Town)",
                            "alias": "Mayor's Residence",
                        },
                    ],
                    [
                        {
                            "node": "Secret Shrine",
                            "alias": "Secret Shrine",
                        },
                        {
                            "node": "Snowhead (from Snowhead Temple)",
                            "alias": "Snowhead",
                        },
                    ],
                    [
                        {
                            "node": "Stock Pot Inn (from East Clock Town)",
                            "alias": "Stock Pot Inn",
                        },
                        {
                            "node": "Deku Palace (from Deku Palace Garden Back Grotto)",
                            "alias": "Deku Palace",
                        },
                    ],
                    [
                        {
                            "node": "Stock Pot Inn (from East Clock Town upper)",
                            "alias": "Stock Pot Inn",
                        },
                        {
                            "node": "Igos du Ikana's Room",
                            "alias": "Igos du Ikana's Room",
                        },
                    ],
                    [
                        {
                            "node": "Stock Pot Inn (from Midnight Meeting)",
                            "alias": "Stock Pot Inn",
                        },
                        {
                            "node": "East Clock Town (from Milk Bar)",
                            "alias": "East Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Clock Tower (from Pre Clock Tower)",
                            "alias": "Clock Tower",
                        },
                        {
                            "node": "Secret Shrine",
                            "alias": "Secret Shrine",
                        },
                    ],
                    [
                        {
                            "node": "Clock Tower (from South Clock Town)",
                            "alias": "Clock Tower",
                        },
                        {
                            "node": "Path to Ikana (from Ikana Canyon)",
                            "alias": "Path to Ikana",
                        },
                    ],
                    [
                        {
                            "node": "Woods of Mystery",
                            "alias": "Woods of Mystery",
                        },
                        {
                            "node": "Deku Playground",
                            "alias": "Deku Playground",
                        },
                    ],
                    [
                        {
                            "node": "Stone Tower Trial (from Moon)",
                            "alias": "Stone Tower Trial",
                        },
                        {
                            "node": "Mountain Smithy",
                            "alias": "Mountain Smithy",
                        },
                    ],
                    [
                        {
                            "node": "On the Moon",
                            "alias": "On the Moon",
                        },
                        {
                            "node": "Zora Hall (from Zora Shop)",
                            "alias": "Zora Hall",
                        },
                    ],
                    [
                        {
                            "node": "Gorman Racetrack (from Milk Road)",
                            "alias": "Gorman Racetrack",
                        },
                        {
                            "node": "Great Bay Coast (from Murky Water Right)",
                            "alias": "Great Bay Coast",
                        },
                    ],
                    [
                        {
                            "node": "Gorman Racetrack (from Milk Road west)",
                            "alias": "Gorman Racetrack",
                        },
                        {
                            "node": "Zora Hall (from Japas's Room)",
                            "alias": "Zora Hall",
                        },
                    ],
                    [
                        {
                            "node": "Goron Racetrack (from Path to Goron Village)",
                            "alias": "Goron Racetrack",
                        },
                        {
                            "node": "Deku King's Chamber (from Deku Palace)",
                            "alias": "Deku King's Chamber",
                        },
                    ],
                    [
                        {
                            "node": "East Clock Town (from Termina Field)",
                            "alias": "East Clock Town",
                        },
                        {
                            "node": "Pirates's Fortress Rooms (Hookshot Lower)",
                            "alias": "Pirates's Fortress Rooms (Hookshot Lower)",
                        },
                    ],
                    [
                        {
                            "node": "East Clock Town (from South Clock Towe south)",
                            "alias": "East Clock Town",
                        },
                        {
                            "node": "Romani Ranch (from House)",
                            "alias": "Romani Ranch",
                        },
                    ],
                    [
                        {
                            "node": "East Clock Town (from Bombers's Hideout)",
                            "alias": "East Clock Town",
                        },
                        {
                            "node": "Ikana Canyon (from Clear Cutscene)",
                            "alias": "Ikana Canyon",
                        },
                    ],
                    [
                        {
                            "node": "East Clock Town (from South Clock Town north)",
                            "alias": "East Clock Town",
                        },
                        {
                            "node": "Zora Cape (from Great Bay Temple)",
                            "alias": "Zora Cape",
                        },
                    ],
                    [
                        {
                            "node": "East Clock Town (from Treasure Chest Shop)",
                            "alias": "East Clock Town",
                        },
                        {
                            "node": "Lulu's Room (from Zora Hall)",
                            "alias": "Lulu's Room",
                        },
                    ],
                    [
                        {
                            "node": "East Clock Town (from North Clock Town)",
                            "alias": "East Clock Town",
                        },
                        {
                            "node": "Ikana Canyon (from Ghost Hut)",
                            "alias": "Ikana Canyon",
                        },
                    ],
                    [
                        {
                            "node": "East Clock Town (from Honey & Darling)",
                            "alias": "East Clock Town",
                        },
                        {
                            "node": "Deku Palace Garden Front Grotto",
                            "alias": "Deku Palace Garden Front Grotto",
                        },
                    ],
                    [
                        {
                            "node": "East Clock Town (from Mayor's Residence)",
                            "alias": "East Clock Town",
                        },
                        {
                            "node": "West Clock Town (from Curiosity Shop)",
                            "alias": "West Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "East Clock Town (from Shooting Gallery)",
                            "alias": "East Clock Town",
                        },
                        {
                            "node": "Gorman Racetrack (from Milk Road)",
                            "alias": "Gorman Racetrack",
                        },
                    ],
                    [
                        {
                            "node": "East Clock Town (from Stock Pot Inn)",
                            "alias": "East Clock Town",
                        },
                        {
                            "node": "Great Bay Coast (from Pirates' Fortress)",
                            "alias": "Great Bay Coast",
                        },
                    ],
                    [
                        {
                            "node": "East Clock Town (from Stokc Pot Inn upper)",
                            "alias": "East Clock Town",
                        },
                        {
                            "node": "Goron Village (from Path to Goron Village)",
                            "alias": "Goron Village",
                        },
                    ],
                    [
                        {
                            "node": "East Clock Town (from Milk Bar)",
                            "alias": "East Clock Town",
                        },
                        {
                            "node": "East Clock Town (from South Clock Town north)",
                            "alias": "East Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "West Clock Town (from Termina Field)",
                            "alias": "West Clock Town",
                        },
                        {
                            "node": "Ancient Castle of Ikana (from Castle Interior)",
                            "alias": "Ancient Castle of Ikana",
                        },
                    ],
                    [
                        {
                            "node": "West Clock Town (from South Clock Town south)",
                            "alias": "West Clock Town",
                        },
                        {
                            "node": "Deku Princess's Room (from Clear Cutscene)",
                            "alias": "Deku Princess's Room",
                        },
                    ],
                    [
                        {
                            "node": "West Clock Town (from South Clock Town north)",
                            "alias": "West Clock Town",
                        },
                        {
                            "node": "Mountain Village (from Path to Goron Village)",
                            "alias": "Mountain Village",
                        },
                    ],
                    [
                        {
                            "node": "West Clock Town (from Swordsman's School)",
                            "alias": "West Clock Town",
                        },
                        {
                            "node": "East Clock Town (from Mayor's Residence)",
                            "alias": "East Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "West Clock Town (from Curiosity Shop)",
                            "alias": "West Clock Town",
                        },
                        {
                            "node": "Zora Cape (from Song of Soaring)",
                            "alias": "Zora Cape",
                        },
                    ],
                    [
                        {
                            "node": "West Clock Town (from Trading Post)",
                            "alias": "West Clock Town",
                        },
                        {
                            "node": "Majora's Room",
                            "alias": "Majora's Room",
                        },
                    ],
                    [
                        {
                            "node": "West Clock Town (from Post Office)",
                            "alias": "West Clock Town",
                        },
                        {
                            "node": "Fairy's Fountain (Clock Town)",
                            "alias": "Fairy's Fountain (Clock Town)",
                        },
                    ],
                    [
                        {
                            "node": "West Clock Town (from Lottery Shop)",
                            "alias": "West Clock Town",
                        },
                        {
                            "node": "Pirates's Fortress Interior (from Exterior)",
                            "alias": "Pirates's Fortress Interior",
                        },
                    ],
                    [
                        {
                            "node": "North Clock Town (from Termina Field)",
                            "alias": "North Clock Town",
                        },
                        {
                            "node": "Ghost Hut (from Ikana Canyon)",
                            "alias": "Ghost Hut",
                        },
                    ],
                    [
                        {
                            "node": "North Clock Town (from East Clock Town)",
                            "alias": "North Clock Town",
                        },
                        {
                            "node": "Gyorg's Room",
                            "alias": "Gyorg's Room",
                        },
                    ],
                    [
                        {
                            "node": "North Clock Town (from South Clock Town)",
                            "alias": "North Clock Town",
                        },
                        {
                            "node": "Pirates's Fortress Rooms (Hookshot Upper)",
                            "alias": "Pirates's Fortress Rooms (Hookshot Upper)",
                        },
                    ],
                    [
                        {
                            "node": "North Clock Town (from Fairy's Fountain)",
                            "alias": "North Clock Town",
                        },
                        {
                            "node": "Swamp Spider House",
                            "alias": "Swamp Spider House",
                        },
                    ],
                    [
                        {
                            "node": "North Clock Town (from Deku Playground)",
                            "alias": "North Clock Town",
                        },
                        {
                            "node": "Romani Ranch (from Doggy Racetrack)",
                            "alias": "Romani Ranch",
                        },
                    ],
                    [
                        {
                            "node": "North Clock Town (from Catching all Bombers)",
                            "alias": "North Clock Town",
                        },
                        {
                            "node": "Music Box House",
                            "alias": "Music Box House",
                        },
                    ],
                    [
                        {
                            "node": "North Clock Town (from Bombers Hide and Seek)",
                            "alias": "North Clock Town",
                        },
                        {
                            "node": "Ikana Canyon (from Ancient Castle of Ikana)",
                            "alias": "Ikana Canyon",
                        },
                    ],
                    [
                        {
                            "node": "South Clock Town (from Clock Tower)",
                            "alias": "South Clock Town",
                        },
                        {
                            "node": "Romani Ranch (from Barn)",
                            "alias": "Romani Ranch",
                        },
                    ],
                    [
                        {
                            "node": "South Clock Town (from Termina Field)",
                            "alias": "South Clock Town",
                        },
                        {
                            "node": "West Clock Town (from Post Office)",
                            "alias": "West Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "South Clock Town (from East Clock Town north)",
                            "alias": "South Clock Town",
                        },
                        {
                            "node": "Inverted Stone Tower Temple",
                            "alias": "Inverted Stone Tower Temple",
                        },
                    ],
                    [
                        {
                            "node": "South Clock Town (from West Clock Town north)",
                            "alias": "South Clock Town",
                        },
                        {
                            "node": "Clock Tower (from South Clock Town)",
                            "alias": "Clock Tower",
                        },
                    ],
                    [
                        {
                            "node": "South Clock Town (from North Clock Town)",
                            "alias": "South Clock Town",
                        },
                        {
                            "node": "Beneath the Well (from Ikana Canyon)",
                            "alias": "Beneath the Well",
                        },
                    ],
                    [
                        {
                            "node": "South Clock Town (from West Clock Town south)",
                            "alias": "South Clock Town",
                        },
                        {
                            "node": "Honey & Darling",
                            "alias": "Honey & Darling",
                        },
                    ],
                    [
                        {
                            "node": "South Clock Town (from Laundry Pool)",
                            "alias": "South Clock Town",
                        },
                        {
                            "node": "Deku King's Chamber (from Deku Palace upper)",
                            "alias": "Deku King's Chamber",
                        },
                    ],
                    [
                        {
                            "node": "South Clock Town (from East Clock Town south)",
                            "alias": "South Clock Town",
                        },
                        {
                            "node": "South Clock Town (from Laundry Pool)",
                            "alias": "South Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "South Clock Town (from Song of Soaring)",
                            "alias": "South Clock Town",
                        },
                        {
                            "node": "West Clock Town (from South Clock Town north)",
                            "alias": "West Clock Town",
                        },
                    ],
                    [
                        {
                            "node": "Laundry Pool (from South Clock Town)",
                            "alias": "Laundry Pool",
                        },
                        {
                            "node": "Termina Field (Telescope)",
                            "alias": "Termina Field (Telescope)",
                        },
                    ],
                    [
                        {
                            "node": "Laundry Pool (from Back Room)",
                            "alias": "Laundry Pool",
                        },
                        {
                            "node": "East Clock Town (from South Clock Towe south)",
                            "alias": "East Clock Town",
                        },
                    ],
                ],
                showNotification: false,
                message: null,
                graph: {
                    nodes: [],
                    adjacencyList: {},
                },
                timeOutId: null,
            };
        },
        mounted() {
            this.setupGraph();
        },
        methods: {
            generateToAndFromAliases() {
                this.toLocations.forEach(location => {
                    if (location.node.includes("(from")) {
                        location.alias = location.node.split(" (")[0].trim();
                    } else {
                        location.alias = location.node;
                    }
                });
                this.fromLocations.forEach(location => {
                    if (location.node.includes("(from")) {
                        location.alias = location.node.split(" (")[0].trim();
                    } else {
                        location.alias = location.node;
                    }
                });
            },
            generateTestEdgeAliases() {
                this.testEdges.forEach(edge => {
                    if (edge[0].node.includes("(from")) {
                        edge[0].alias = edge[0].node.split(" (")[0].trim();
                    } else {
                        edge[0].alias = edge[0].node;
                    }
                    if (edge[1].node.includes("(from")) {
                        edge[1].alias = edge[1].node.split(" (")[0].trim();
                    } else {
                        edge[1].alias = edge[1].node;
                    }
                });
            },
            findShortestPath() {
                let source = this.selectedShortestPathFrom;
                let target=this.selectedShortestPathTo;

                if (source.alias === target.alias) {
                    this.shortestPath = ["You are here."];
                    this.selectedShortestPathFrom = null;
                    this.selectedShortestPathTo = null;
                    return;
                }
                let queue = [source],
                    visited = {source: true},
                    predecessor = {},
                    tail = 0;
                while (tail < queue.length) {
                    let node = queue[tail++],  // Pop a vertex off the queue.
                        neighbors = this.graph.adjacencyList[node.alias];
                    // console.log(node)
                    // console.log({node: node});
                    // console.log({neighbors: neighbors});
                    for (let i = 0; i < neighbors.length; ++i) {
                        const edgeNode = neighbors[i];
                        // console.log({edgeNode: edgeNode});
                        if (visited[edgeNode.name]) {
                            continue;
                        }
                        visited[edgeNode.name] = true;
                        if (edgeNode.alias === target.alias) {   // Check if the path is complete.
                            const path = [edgeNode];   // If so, backtrack through the path.
                            while (node  && node.alias !== source.alias) {
                                path.push(node);
                                node = predecessor[node.alias];
                            }
                            path.push(source)
                            path.reverse();
                            // console.log(path);
                            this.shortestPath = path;
                            this.selectedShortestPathTo = {};
                            this.selectedShortestPathFrom = {};
                            return;
                        }
                        predecessor[edgeNode.name] = node;
                        // console.log("Edge " + edgeNode + " came from " + node);
                        queue.push(edgeNode);
                    }
                }
                this.shortestPath = [];
                this.shortestPath.push({
                    node: "There is no known path from " + source.alias + " to " + target.alias,
                    alias: "There is no known path from " + source.alias + " to " + target.alias
                });
                console.log("There is no path from " + source.alias + " to " + target.alias);
            },
            setupGraph() {
                this.nodes.forEach(node => {
                    this.addNode(node);
                });
                this.testEdges.forEach(pair => {
                    this.addEdge(pair[1], pair[0]);
                });
                this.$forceUpdate();
            },
            handleNotificationClose() {
                this.showNotification = false;
                this.message = null;
                this.timeOutId = null;
            },
            removeIndexFromAdjacencyList(edgeIndex, nodeIndex) {
                this.graph.adjacencyList[nodeIndex].splice(edgeIndex, 1);
                this.$forceUpdate();
            },
            addNode(node) {
                this.graph.nodes.push(node);
                this.graph.adjacencyList[node] = [];
            },
            handleShortestPathFromUpdate(location) {
                if(Object.entries(location).length === 0){
                    this.selectedShortestPathFrom = {};
                    return;
                }
                if(location.node){
                    this.selectedShortestPathFrom = location;
                }
                else {
                    this.selectedShortestPathFrom = {
                        node: location,
                        alias: location
                    };
                }
            },
            handleShortestPathToUpdate(location) {
                if(Object.entries(location).length === 0){
                    this.selectedShortestPathTo = {};
                    return;
                }
                if(location.node){
                    this.selectedShortestPathTo = location;
                }
                else {
                    this.selectedShortestPathTo = {
                        node: location,
                        alias: location
                    };
                }
            },
            handleSearchFromUpdate(location) {
                if(Object.entries(location).length === 0){
                    this.selectedNewFrom = {};
                    return;
                }
                if(location.node){
                    this.selectedNewFrom = location;
                }
                else {
                    this.selectedNewFrom = {
                        node: location,
                        alias: location
                    };
                }
            },
            handleSearchToUpdate(location) {
                if(Object.entries(location).length === 0){
                    this.selectedNewTo = {};
                    return;
                }
                if(location.node){
                    this.selectedNewTo = location;
                }
                else {
                    this.selectedNewTo = {
                        node: location,
                        alias: location
                    };
                }
            },
            addEdge(node1, node2, weight = 1) {
                if (this.graph.adjacencyList[node1.alias] === undefined) {
                    console.log(node1.alias);
                }
                for (let i = 0; i < this.graph.adjacencyList[node1.alias].length; i++) {
                    if (this.graph.adjacencyList[node1.alias][i].node === node2) {
                        return false;
                    }
                }
                this.graph.adjacencyList[node1.alias].push({alias: node2.alias, name: node2.node, weight: weight});
                return true;
            },
            getAliasName(name) {
                return name.split("(from")[0].trim();
            },
            addLocation() {
                let result = this.addEdge(this.selectedNewTo, this.selectedNewFrom);
                this.showNotification = true;
                if (result) {
                    this.message = "Added New Location. Enter " + this.selectedNewFrom.node + " goes to " + this.selectedNewTo.alias;
                }
                if (this.timeOutId !== null) {
                    clearTimeout(this.timeOutId);
                    this.timeOutId = null;
                }
                this.timeOutId = setTimeout(() => {
                    this.showNotification = false;
                    this.message = null;
                }, 5000);
                // this.vertices.forEach(node => {
                //     if (this.getAliasName(node.name) === this.selectedNewTo) {
                //         this.addEdge(node, this.selectedNewFrom);
                //     }
                // });
                this.selectedNewFrom = {};
                this.selectedNewTo = {};
            },
        },
    };
</script>

<style scoped>

</style>
