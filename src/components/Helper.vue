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
            <div class="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-600 p-4" role="alert">
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
            <div v-if="shortestPath.length" class="p-4">
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

        <div class="rounded-lg mt-4 shadow">
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6 bg-white rounded-t-lg">
                <h3 class="text-lg leading-6 font-medium text-gray-90">
                    Known Locations
                </h3>
                <p class="mt-1 text-sm leading-5 text-gray-500">
                    Locations added above will appear here.
                </p>
            </div>
            <div class="flex flex-col bg-white">
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
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900 w-2/5">
                                        {{ nodeIndex }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900 w-3/5">
                                        <table class="w-full">
                                            <tr v-for="(node, edgeIndex) in nodes" :key="nodeIndex+'edge'+edgeIndex">
                                                <td class="w-4/5">
                                                    {{ node.name }}
                                                </td>
                                                <td class="flex-1">
                                                    <button class="text-red-500" @click="openModal(edgeIndex, nodeIndex, node.name)">
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
        <DeleteModal :open="showDeleteModal" :location="openedNodeName" @confirm-delete="removeIndexFromAdjacencyList"
            @cancel="resetCloseModal"
        />
    </div>
</template>

<script>
    import SearchLocations from "./SearchLocations";
    import Notification from "./Notification";
    import DeleteModal from "./DeleteModal";

    export default {
        name: "Helper",
        components: {DeleteModal, Notification, SearchLocations},
        data() {
            return {
                openedEdgeIndex: null,
                openedNodeIndex: null,
                openedNodeName: null,
                showDeleteModal: false,
                shortestPath: [],
                selectedNewFrom: {},
                selectedNewTo: {},
                selectedShortestPathFrom: {},
                selectedShortestPathTo: {},
                fromLocations: [
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
                        "alias": "Beneath the Graveyard (Heart Piece)",
                    },
                    {
                        "node": "Beneath the Graveyard (Song of Storms)",
                        "alias": "Beneath the Graveyard (Song of Storms)",
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
                        "node": "Generic Grotto (from Path to the Swamp)",
                        "alias": "Generic Grotto",
                    },
                    {
                        "node": "Generic Grotto (from Southern Swamp)",
                        "alias": "Generic Grotto",
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
                        "node": "Generic Grotto (from Termina Field Grass)",
                        "alias": "Generic Grotto",
                    },
                    {
                        "node": "Hotspring Water Grotto",
                        "alias": "Hotspring Water Grotto",
                    },
                    {
                        "node": "Dodongo Grotto",
                        "alias": "Dodongo Grotto",
                    },
                    {
                        "node": "Bisness Deku Scrub Grotto",
                        "alias": "Bisness Deku Scrub Grotto",
                    },
                    {
                        "node": "Cow Grotto (from Termina Field)",
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
                        "node": "Lone Peak Shrine",
                        "alias": "Lone Peak Shrine",
                    },
                    {
                        "node": "Generic Grotto (from Woods of Mystery)",
                        "alias": "Generic Grotto",
                    },
                    {
                        "node": "Generic Grotto (from Path to Goron Village)",
                        "alias": "Generic Grotto",
                    },
                    {
                        "node": "Generic Grotto (from Path to Snowhead)",
                        "alias": "Generic Grotto",
                    },
                    {
                        "node": "Generic Grotto (from Mountain Village)",
                        "alias": "Generic Grotto",
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
                        "node": "Ikana Canyon (from Twinmold)",
                        "alias": "Ikana Canyon",
                    },
                    {
                        "node": "Ikana Canyon (Generic Grotto)",
                        "alias": "Ikana Canyon (Generic Grotto)",
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Exterior)",
                        "alias": "Pirates' Fortress Interior",
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Hookshot Lower)",
                        "alias": "Pirates' Fortress Interior",
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Hookshot Upper)",
                        "alias": "Pirates' Fortress Interior",
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Purple Pirate entrance)",
                        "alias": "Pirates' Fortress Interior",
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Purple Pirate exit)",
                        "alias": "Pirates' Fortress Interior",
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Green Pirate entrance)",
                        "alias": "Pirates' Fortress Interior",
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Green Pirate exit)",
                        "alias": "Pirates' Fortress Interior",
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Red Pirate entrance)",
                        "alias": "Pirates' Fortress Interior",
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Red Pirate exit)",
                        "alias": "Pirates' Fortress Interior",
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Exiterior balcony)",
                        "alias": "Pirates' Fortress Interior",
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
                        "alias": "Inverted Stone Tower Temple (Boss Door)",
                    },
                    {
                        "node": "Top of the Clock Tower",
                        "alias": "Top of the Clock Tower",
                    },
                    {
                        "node": "Pre Clock Tower (from Clock Tower)",
                        "alias": "Pre Clock Tower",
                    },
                    {
                        "node": "Pre Clock Tower (from Fall to Termina)",
                        "alias": "Pre Clock Tower",
                    },
                    {
                        "node": "Pre Clock Tower (from Void)",
                        "alias": "Pre Clock Tower",
                    },
                    {
                        "node": "Woodfall Temple (from Woodfall)",
                        "alias": "Woodfall Temple",
                    },
                    {
                        "node": "Deku Princess' Room (from Odolwa)",
                        "alias": "Deku Princess' Room",
                    },
                    {
                        "node": "Deku Princess' Room (from Woodfall)",
                        "alias": "Deku Princess' Room",
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
                        "node": "Ancient Castle of Ikana (from Igo's Room)",
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
                        "alias": "Shooting Gallery (Clock Town)",
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
                        "node": "Milk Road (from Gorman Track back)",
                        "alias": "Milk Road",
                    },
                    {
                        "node": "Milk Road (from Gorman Track)",
                        "alias": "Milk Road",
                    },
                    {
                        "node": "Milk Road (from Song of Soaring)",
                        "alias": "Milk Road",
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Hookshot Lower)",
                        "alias": "Pirates' Fortress Rooms (Hookshot Lower)",
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Hookshot Upper)",
                        "alias": "Pirates' Fortress Rooms (Hookshot Upper)",
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Purple Pirate entrance)",
                        "alias": "Pirates' Fortress Rooms (Purple Pirate entrance)",
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Purple Pirate exit)",
                        "alias": "Pirates' Fortress Rooms (Purple Pirate exit)",
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Green Pirate entrance)",
                        "alias": "Pirates' Fortress Rooms (Green Pirate entrance)",
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Green Pirate exit)",
                        "alias": "Pirates' Fortress Rooms (Green Pirate exit)",
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Red Pirate entrance)",
                        "alias": "Pirates' Fortress Rooms (Red Pirate entrance)",
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Red Pirate exit)",
                        "alias": "Pirates' Fortress Rooms (Red Pirate exit)",
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Sewers entrance)",
                        "alias": "Pirates' Fortress Rooms (Sewers entrance)",
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Sewers exit)",
                        "alias": "Pirates' Fortress Rooms (Sewers exit)",
                    },
                    {
                        "node": "Shooting Gallery (Swamp)",
                        "alias": "Shooting Gallery (Swamp)",
                    },
                    {
                        "node": "Pinnacle Rock",
                        "alias": "Pinnacle Rock",
                    },
                    {
                        "node": "Pinnacle Rock (Void)",
                        "alias": "Pinnacle Rock (Void)",
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
                        "node": "Bombers' Hideout",
                        "alias": "Bombers' Hideout",
                    },
                    {
                        "node": "Observatory (from Termina Field)",
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
                        "node": "Deku Palace (from Magic Bean Seller Grotto)",
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
                        "node": "Termina Field (from Path to Southern Swamp)",
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
                        "node": "Termina Field (from Path to Ikana Canyon)",
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
                        "node": "Termina Field (from Cow Grotto)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Milk Road with Cremia)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Skull Kid Cutscene)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Grass Generic Grotto)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Pillar Generic Grotto)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Business Scrub Grotto)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Peahat Grotto)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Dodongo Grotto)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Biobaba Grotto)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Swamp Gossips Grotto)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Mountain Gossips Grotto)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Ocean Gossips Grotto)",
                        "alias": "Termina Field",
                    },
                    {
                        "node": "Termina Field (from Canyon Gossips Grotto)",
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
                        "node": "Beneath the Graveyard (Dampe's Room)",
                        "alias": "Beneath the Graveyard (Dampe's Room)",
                    },
                    {
                        "node": "Generic Grotto (from Great Bay Coast)",
                        "alias": "Generic Grotto",
                    },
                    {
                        "node": "Cow Grotto (from Great Bay Coast)",
                        "alias": "Cow Grotto",
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
                        "node": "Goron Shrine (from Goron Lullaby)",
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
                        "node": "Zora Hall (from Japas' Room)",
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
                        "node": "Romani Ranch (from Barn)",
                        "alias": "Romani Ranch",
                    },
                    {
                        "node": "Romani Ranch (from House)",
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
                        "node": "Romani Ranch (from Failing Cart Ride)",
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
                        "node": "Great Bay Coast (from Pirates' Fortress)",
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
                        "node": "Great Bay Coast (from Oceanside Spider House)",
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
                        "node": "Great Bay Coast (from Pirates' Fortress caught)",
                        "alias": "Great Bay Coast",
                    },
                    {
                        "node": "Great Bay Coast (from Generic Grotto)",
                        "alias": "Great Bay Coast",
                    },
                    {
                        "node": "Great Bay Coast (from Cow Grotto)",
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
                        "node": "Zora Cape (from Fairy's Fountain)",
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
                        "node": "Zora Cape (from Gyorg)",
                        "alias": "Zora Cape",
                    },
                    {
                        "node": "Zora Cape (from Gyorg) (2)",
                        "alias": "Zora Cape",
                    },
                    {
                        "node": "Zora Cape (from Generic Grotto)",
                        "alias": "Zora Cape",
                    },
                    {
                        "node": "Lottery Shop",
                        "alias": "Lottery Shop",
                    },
                    {
                        "node": "Generic Grotto (from Zora Cape)",
                        "alias": "Generic Grotto",
                    },
                    {
                        "node": "Pirates' Fortress Exterior (from Great Bay Coast)",
                        "alias": "Pirates' Fortress Exterior",
                    },
                    {
                        "node": "Pirates' Fortress Exterior (from Interior)",
                        "alias": "Pirates' Fortress Exterior",
                    },
                    {
                        "node": "Pirates' Fortress Exterior (from Water Tunnel)",
                        "alias": "Pirates' Fortress Exterior",
                    },
                    {
                        "node": "Pirates' Fortress Exterior (from Sewers Draft)",
                        "alias": "Pirates' Fortress Exterior",
                    },
                    {
                        "node": "Pirates' Fortress Exterior (from Interior Thrown Out)",
                        "alias": "Pirates' Fortress Exterior",
                    },
                    {
                        "node": "Pirates' Fortress Exterior (from Interior Balcony)",
                        "alias": "Pirates' Fortress Exterior",
                    },
                    {
                        "node": "Pirates' Fortress Exterior (from Telescope)",
                        "alias": "Pirates' Fortress Exterior",
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
                        "node": "Deku King's Chamber (from Returning Deku Princess)",
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
                        "node": "Path to the Swamp (from Shooting Gallery)",
                        "alias": "Path to the Swamp",
                    },
                    {
                        "node": "Path to the Swamp (from Generic Grotto)",
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
                        "node": "Ikana Graveyard (from Generic Grotto)",
                        "alias": "Ikana Graveyard",
                    },
                    {
                        "node": "Goht's Room",
                        "alias": "Goht's Room",
                    },
                    {
                        "node": "Southern Swamp (from Path to Swamp)",
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
                        "node": "Southern Swamp (from Generic Grotto)",
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
                        "node": "Woodfall (from Fairy's Fountain)",
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
                        "node": "Japas' Room (from Zora Hall)",
                        "alias": "Japas' Room",
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
                        "node": "Japas' Room (from Jam Session)",
                        "alias": "Japas' Room",
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
                        "node": "Mountain Village (from Generic Grotto)",
                        "alias": "Mountain Village",
                    },
                    {
                        "node": "Mountain Village (from Path to Mountain Village)",
                        "alias": "Mountain Village",
                    },
                    {
                        "node": "Mountain Village (from Goht)",
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
                        "node": "Path to Ikana (from Generic Grotto)",
                        "alias": "Path to Ikana",
                    },
                    {
                        "node": "Swordsman's School",
                        "alias": "Swordsman's School",
                    },
                    {
                        "node": "Music Box House",
                        "alias": "Music Box House",
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
                        "node": "Tourist Information (from Boat Cruise Picture)",
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
                        "node": "Path to Snowhead (from Generic Grotto)",
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
                        "node": "Snowhead (from Fairy's Fountain)",
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
                        "node": "Path to Goron Village (from Generic Grotto)",
                        "alias": "Path to Goron Village",
                    },
                    {
                        "node": "Path to Goron Village (from Hotspring Grotto)",
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
                        "node": "Stock Pot Inn (from Mother Conversation)",
                        "alias": "Stock Pot Inn",
                    },
                    {
                        "node": "Generic Grotto (from Termina Field Pillar)",
                        "alias": "Generic Grotto",
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
                        "node": "Clock Tower (from Moon Crash)",
                        "alias": "Clock Tower",
                    },
                    {
                        "node": "Clock Tower (from Deku Mask)",
                        "alias": "Clock Tower",
                    },
                    {
                        "node": "Woods of Mystery",
                        "alias": "Woods of Mystery",
                    },
                    {
                        "node": "Woods of Mystery (from Generic Grotto)",
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
                        "node": "Bomb Shop",
                        "alias": "Bomb Shop",
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
                        "node": "East Clock Town (from Bomber's Hideout)",
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
                        "node": "East Clock Town (from Shooting Gallery)",
                        "alias": "East Clock Town",
                    },
                    {
                        "node": "East Clock Town (from Stock Pot Inn)",
                        "alias": "East Clock Town",
                    },
                    {
                        "node": "East Clock Town (from Stokc Pot Inn upper)",
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
                        "node": "West Clock Town (from Bomb Shop)",
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
                        "node": "North Clock Town (from Fairy's Fountain)",
                        "alias": "North Clock Town",
                    },
                    {
                        "node": "North Clock Town (from Deku Playground)",
                        "alias": "North Clock Town",
                    },
                    {
                        "node": "North Clock Town (from Bombers Hide and Seek)",
                        "alias": "North Clock Town",
                    },
                    {
                        "node": "North Clock Town (from Old Lady/Blast Mask)",
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
                    {
                        "node": "Generic Grotto (from Path to Ikana Canyon)",
                        "alias": "Generic Grotto",
                    },
                    {
                        "node": "Generic Grotto (from Ikana Graveyard)",
                        "alias": "Generic Grotto",
                    },
                    {
                        "node": "Generic Grotto (from Ikana Canyon)",
                        "alias": "Generic Grotto",
                    },
                    {
                        "node": "Zora Hall (from Zora Cape back)",
                        "alias": "Zora Hall",
                    },
                ],
                toLocations:[
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
                        "node": "Generic Grotto (from Path to the Swamp)",
                        "alias": "Generic Grotto"
                    },
                    {
                        "node": "Generic Grotto (from Southern Swamp)",
                        "alias": "Generic Grotto"
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
                        "node": "Generic Grotto (from Termina Field Grass)",
                        "alias": "Generic Grotto"
                    },
                    {
                        "node": "Hotspring Water Grotto",
                        "alias": "Hotspring Water Grotto"
                    },
                    {
                        "node": "Dodongo Grotto",
                        "alias": "Dodongo Grotto"
                    },
                    {
                        "node": "Bisness Deku Scrub Grotto",
                        "alias": "Bisness Deku Scrub Grotto"
                    },
                    {
                        "node": "Cow Grotto (from Termina Field)",
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
                        "node": "Lone Peak Shrine",
                        "alias": "Lone Peak Shrine"
                    },
                    {
                        "node": "Generic Grotto (from Woods of Mystery)",
                        "alias": "Generic Grotto"
                    },
                    {
                        "node": "Generic Grotto (from Path to Goron Village)",
                        "alias": "Generic Grotto"
                    },
                    {
                        "node": "Generic Grotto (from Path to Snowhead)",
                        "alias": "Generic Grotto"
                    },
                    {
                        "node": "Generic Grotto (from Mountain Village)",
                        "alias": "Generic Grotto"
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
                        "node": "Ikana Canyon (from Twinmold)",
                        "alias": "Ikana Canyon"
                    },
                    {
                        "node": "Ikana Canyon (Generic Grotto)",
                        "alias": "Ikana Canyon (Generic Grotto)"
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Exterior)",
                        "alias": "Pirates' Fortress Interior"
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Hookshot Lower)",
                        "alias": "Pirates' Fortress Interior"
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Hookshot Upper)",
                        "alias": "Pirates' Fortress Interior"
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Purple Pirate entrance)",
                        "alias": "Pirates' Fortress Interior"
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Purple Pirate exit)",
                        "alias": "Pirates' Fortress Interior"
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Green Pirate entrance)",
                        "alias": "Pirates' Fortress Interior"
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Green Pirate exit)",
                        "alias": "Pirates' Fortress Interior"
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Red Pirate entrance)",
                        "alias": "Pirates' Fortress Interior"
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Red Pirate exit)",
                        "alias": "Pirates' Fortress Interior"
                    },
                    {
                        "node": "Pirates' Fortress Interior (from Exiterior balcony)",
                        "alias": "Pirates' Fortress Interior"
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
                        "node": "Top of the Clock Tower",
                        "alias": "Top of the Clock Tower"
                    },
                    {
                        "node": "Pre Clock Tower (from Clock Tower)",
                        "alias": "Pre Clock Tower"
                    },
                    {
                        "node": "Pre Clock Tower (from Fall to Termina)",
                        "alias": "Pre Clock Tower"
                    },
                    {
                        "node": "Pre Clock Tower (from Void)",
                        "alias": "Pre Clock Tower"
                    },
                    {
                        "node": "Woodfall Temple (from Woodfall)",
                        "alias": "Woodfall Temple"
                    },
                    {
                        "node": "Deku Princess' Room (from Odolwa)",
                        "alias": "Deku Princess' Room"
                    },
                    {
                        "node": "Deku Princess' Room (from Woodfall)",
                        "alias": "Deku Princess' Room"
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
                        "node": "Ancient Castle of Ikana (from Igo's Room)",
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
                        "node": "Milk Road (from Gorman Track back)",
                        "alias": "Milk Road"
                    },
                    {
                        "node": "Milk Road (from Gorman Track)",
                        "alias": "Milk Road"
                    },
                    {
                        "node": "Milk Road (from Song of Soaring)",
                        "alias": "Milk Road"
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Hookshot Lower)",
                        "alias": "Pirates' Fortress Rooms (Hookshot Lower)"
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Hookshot Upper)",
                        "alias": "Pirates' Fortress Rooms (Hookshot Upper)"
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Purple Pirate entrance)",
                        "alias": "Pirates' Fortress Rooms (Purple Pirate entrance)"
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Purple Pirate exit)",
                        "alias": "Pirates' Fortress Rooms (Purple Pirate exit)"
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Green Pirate entrance)",
                        "alias": "Pirates' Fortress Rooms (Green Pirate entrance)"
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Green Pirate exit)",
                        "alias": "Pirates' Fortress Rooms (Green Pirate exit)"
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Red Pirate entrance)",
                        "alias": "Pirates' Fortress Rooms (Red Pirate entrance)"
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Red Pirate exit)",
                        "alias": "Pirates' Fortress Rooms (Red Pirate exit)"
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Sewers entrance)",
                        "alias": "Pirates' Fortress Rooms (Sewers entrance)"
                    },
                    {
                        "node": "Pirates' Fortress Rooms (Sewers exit)",
                        "alias": "Pirates' Fortress Rooms (Sewers exit)"
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
                        "node": "Pinnacle Rock (Void)",
                        "alias": "Pinnacle Rock (Void)"
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
                        "node": "Bombers' Hideout",
                        "alias": "Bombers' Hideout"
                    },
                    {
                        "node": "Observatory (from Termina Field)",
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
                        "node": "Deku Palace (from Magic Bean Seller Grotto)",
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
                        "node": "Termina Field (from Path to Southern Swamp)",
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
                        "node": "Termina Field (from Path to Ikana Canyon)",
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
                        "node": "Termina Field (from Cow Grotto)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Milk Road with Cremia)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Skull Kid Cutscene)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Grass Generic Grotto)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Pillar Generic Grotto)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Business Scrub Grotto)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Peahat Grotto)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Dodongo Grotto)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Biobaba Grotto)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Swamp Gossips Grotto)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Mountain Gossips Grotto)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Ocean Gossips Grotto)",
                        "alias": "Termina Field"
                    },
                    {
                        "node": "Termina Field (from Canyon Gossips Grotto)",
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
                        "node": "Beneath the Graveyard (Dampe's Room)",
                        "alias": "Beneath the Graveyard (Dampe's Room)"
                    },
                    {
                        "node": "Generic Grotto (from Great Bay Coast)",
                        "alias": "Generic Grotto"
                    },
                    {
                        "node": "Cow Grotto (from Great Bay Coast)",
                        "alias": "Cow Grotto"
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
                        "node": "Goron Shrine (from Goron Lullaby)",
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
                        "node": "Zora Hall (from Japas' Room)",
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
                        "node": "Romani Ranch (from Barn)",
                        "alias": "Romani Ranch"
                    },
                    {
                        "node": "Romani Ranch (from House)",
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
                        "node": "Romani Ranch (from Failing Cart Ride)",
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
                        "node": "Great Bay Coast (from Pirates' Fortress)",
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
                        "node": "Great Bay Coast (from Oceanside Spider House)",
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
                        "node": "Great Bay Coast (from Pirates' Fortress caught)",
                        "alias": "Great Bay Coast"
                    },
                    {
                        "node": "Great Bay Coast (from Generic Grotto)",
                        "alias": "Great Bay Coast"
                    },
                    {
                        "node": "Great Bay Coast (from Cow Grotto)",
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
                        "node": "Zora Cape (from Fairy's Fountain)",
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
                        "node": "Zora Cape (from Gyorg)",
                        "alias": "Zora Cape"
                    },
                    {
                        "node": "Zora Cape (from Gyorg) (2)",
                        "alias": "Zora Cape"
                    },
                    {
                        "node": "Zora Cape (from Generic Grotto)",
                        "alias": "Zora Cape"
                    },
                    {
                        "node": "Lottery Shop",
                        "alias": "Lottery Shop"
                    },
                    {
                        "node": "Generic Grotto (from Zora Cape)",
                        "alias": "Generic Grotto"
                    },
                    {
                        "node": "Pirates' Fortress Exterior (from Great Bay Coast)",
                        "alias": "Pirates' Fortress Exterior"
                    },
                    {
                        "node": "Pirates' Fortress Exterior (from Interior)",
                        "alias": "Pirates' Fortress Exterior"
                    },
                    {
                        "node": "Pirates' Fortress Exterior (from Water Tunnel)",
                        "alias": "Pirates' Fortress Exterior"
                    },
                    {
                        "node": "Pirates' Fortress Exterior (from Sewers Draft)",
                        "alias": "Pirates' Fortress Exterior"
                    },
                    {
                        "node": "Pirates' Fortress Exterior (from Interior Thrown Out)",
                        "alias": "Pirates' Fortress Exterior"
                    },
                    {
                        "node": "Pirates' Fortress Exterior (from Interior Balcony)",
                        "alias": "Pirates' Fortress Exterior"
                    },
                    {
                        "node": "Pirates' Fortress Exterior (from Telescope)",
                        "alias": "Pirates' Fortress Exterior"
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
                        "node": "Deku King's Chamber (from Returning Deku Princess)",
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
                        "node": "Path to the Swamp (from Shooting Gallery)",
                        "alias": "Path to the Swamp"
                    },
                    {
                        "node": "Path to the Swamp (from Generic Grotto)",
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
                        "node": "Ikana Graveyard (from Generic Grotto)",
                        "alias": "Ikana Graveyard"
                    },
                    {
                        "node": "Goht's Room",
                        "alias": "Goht's Room"
                    },
                    {
                        "node": "Southern Swamp (from Path to Swamp)",
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
                        "node": "Southern Swamp (from Generic Grotto)",
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
                        "node": "Woodfall (from Fairy's Fountain)",
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
                        "node": "Japas' Room (from Zora Hall)",
                        "alias": "Japas' Room"
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
                        "node": "Japas' Room (from Jam Session)",
                        "alias": "Japas' Room"
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
                        "node": "Mountain Village (from Generic Grotto)",
                        "alias": "Mountain Village"
                    },
                    {
                        "node": "Mountain Village (from Path to Mountain Village)",
                        "alias": "Mountain Village"
                    },
                    {
                        "node": "Mountain Village (from Goht)",
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
                        "node": "Path to Ikana (from Generic Grotto)",
                        "alias": "Path to Ikana"
                    },
                    {
                        "node": "Swordsman's School",
                        "alias": "Swordsman's School"
                    },
                    {
                        "node": "Music Box House",
                        "alias": "Music Box House"
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
                        "node": "Tourist Information (from Boat Cruise Picture)",
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
                        "node": "Path to Snowhead (from Generic Grotto)",
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
                        "node": "Snowhead (from Fairy's Fountain)",
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
                        "node": "Path to Goron Village (from Generic Grotto)",
                        "alias": "Path to Goron Village"
                    },
                    {
                        "node": "Path to Goron Village (from Hotspring Grotto)",
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
                        "node": "Stock Pot Inn (from Mother Conversation)",
                        "alias": "Stock Pot Inn"
                    },
                    {
                        "node": "Generic Grotto (from Termina Field Pillar)",
                        "alias": "Generic Grotto"
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
                        "node": "Clock Tower (from Moon Crash)",
                        "alias": "Clock Tower"
                    },
                    {
                        "node": "Clock Tower (from Deku Mask)",
                        "alias": "Clock Tower"
                    },
                    {
                        "node": "Woods of Mystery",
                        "alias": "Woods of Mystery"
                    },
                    {
                        "node": "Woods of Mystery (from Generic Grotto)",
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
                        "node": "Bomb Shop",
                        "alias": "Bomb Shop"
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
                        "node": "East Clock Town (from Bomber's Hideout)",
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
                        "node": "East Clock Town (from Shooting Gallery)",
                        "alias": "East Clock Town"
                    },
                    {
                        "node": "East Clock Town (from Stock Pot Inn)",
                        "alias": "East Clock Town"
                    },
                    {
                        "node": "East Clock Town (from Stokc Pot Inn upper)",
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
                        "node": "West Clock Town (from Bomb Shop)",
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
                        "node": "North Clock Town (from Fairy's Fountain)",
                        "alias": "North Clock Town"
                    },
                    {
                        "node": "North Clock Town (from Deku Playground)",
                        "alias": "North Clock Town"
                    },
                    {
                        "node": "North Clock Town (from Bombers Hide and Seek)",
                        "alias": "North Clock Town"
                    },
                    {
                        "node": "North Clock Town (from Old Lady/Blast Mask)",
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
                    },
                    {
                        "node": "Generic Grotto (from Path to Ikana Canyon)",
                        "alias": "Generic Grotto"
                    },
                    {
                        "node": "Generic Grotto (from Ikana Graveyard)",
                        "alias": "Generic Grotto"
                    },
                    {
                        "node": "Generic Grotto (from Ikana Canyon)",
                        "alias": "Generic Grotto"
                    },
                    {
                        "node": "Zora Hall (from Zora Cape back)",
                        "alias": "Zora Hall"
                    }
                ],
                nodes: [
                    "Ancient Castle of Ikana",
                    "Back Room",
                    "Beneath the Graveyard (Bottle)",
                    "Beneath the Graveyard (Dampe's Room)",
                    "Beneath the Graveyard (Heart Piece)",
                    "Beneath the Graveyard (Song of Storms)",
                    "Beneath the Well",
                    "Bio Baba Grotto",
                    "Bisness Deku Scrub Grotto",
                    "Bomb Shop",
                    "Bombers' Hideout",
                    "Clock Tower",
                    "Cow Grotto",
                    "Cucco Shack",
                    "Curiosity Shop",
                    "Deku King's Chamber",
                    "Deku Palace",
                    "Deku Playground",
                    "Deku Princess' Room",
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
                    "Ikana Canyon (Generic Grotto)",
                    "Ikana Gossip Stones Grotto",
                    "Ikana Graveyard",
                    "Inverted Stone Tower",
                    "Inverted Stone Tower Temple",
                    "Inverted Stone Tower Temple (Boss Door)",
                    "Japas' Room",
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
                    "Pinnacle Rock (Void)",
                    "Pirates' Fortress Exterior",
                    "Pirates' Fortress Interior",
                    "Pirates' Fortress Rooms (Green Pirate entrance)",
                    "Pirates' Fortress Rooms (Green Pirate exit)",
                    "Pirates' Fortress Rooms (Hookshot Lower)",
                    "Pirates' Fortress Rooms (Hookshot Upper)",
                    "Pirates' Fortress Rooms (Purple Pirate entrance)",
                    "Pirates' Fortress Rooms (Purple Pirate exit)",
                    "Pirates' Fortress Rooms (Red Pirate entrance)",
                    "Pirates' Fortress Rooms (Red Pirate exit)",
                    "Pirates' Fortress Rooms (Sewers entrance)",
                    "Pirates' Fortress Rooms (Sewers exit)",
                    "Post Office",
                    "Pre Clock Tower",
                    "Ranch Barn",
                    "Ranch House",
                    "Romani Ranch",
                    "Sakon's Hideout",
                    "Secret Shrine",
                    "Shooting Gallery (Clock Town)",
                    "Shooting Gallery (Swamp)",
                    "Snowhead",
                    "Snowhead Gossip Stones Grotto",
                    "Snowhead Temple",
                    "Snowhead Trial",
                    "South Clock Town",
                    "Southern Swamp",
                    "Spring Water Cave",
                    "Stock Pot Inn",
                    "Stone Tower",
                    "Stone Tower Temple",
                    "Stone Tower Trial",
                    "Swamp Gossip Stones Grotto",
                    "Swamp Spider House",
                    "Swordsman's School",
                    "Termina Field",
                    "Top of the Clock Tower",
                    "Tourist Information",
                    "Trading Post",
                    "Treasure Chest Shop",
                    "Twinmold's Room",
                    "Waterfall Rapids",
                    "West Clock Town",
                    "Woodfall",
                    "Woodfall Temple",
                    "Woodfall Trial",
                    "Woods of Mystery",
                    "Zora Cape",
                    "Zora Hall",
                    "Zora Shop",
                ],
                // testEdges: [
                //     [
                //         {
                //             "node": "Mayor's Residence (from East Clock Town)",
                //             "alias": "Mayor's Residence",
                //         },
                //         {
                //             "node": "Termina Field (from Cow Grotto)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Majora's Room",
                //             "alias": "Majora's Room",
                //         },
                //         {
                //             "node": "North Clock Town (from Deku Playground)",
                //             "alias": "North Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Magic Hag's Potion Shop (from Southern Swamp)",
                //             "alias": "Magic Hag's Potion Shop",
                //         },
                //         {
                //             "node": "Snowhead (from Path to Snowhead/Void)",
                //             "alias": "Snowhead",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ranch Barn (from Romani Ranch)",
                //             "alias": "Ranch Barn",
                //         },
                //         {
                //             "node": "Pirates' Fortress Exterior (from Interior Thrown Out)",
                //             "alias": "Pirates' Fortress Exterior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ranch House (from Romani Ranch)",
                //             "alias": "Ranch House",
                //         },
                //         {
                //             "node": "Great Bay Coast (from Murky Water Left)",
                //             "alias": "Great Bay Coast",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Honey & Darling",
                //             "alias": "Honey & Darling",
                //         },
                //         {
                //             "node": "North Clock Town (from Old Lady/Blast Mask)",
                //             "alias": "North Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Beneath the Graveyard (Heart Piece)",
                //             "alias": "Beneath the Graveyard (Heart Piece)",
                //         },
                //         {
                //             "node": "Great Bay Coast (from Pirates' Fortress caught)",
                //             "alias": "Great Bay Coast",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Beneath the Graveyard (Song of Storms)",
                //             "alias": "Beneath the Graveyard (Song of Storms)",
                //         },
                //         {
                //             "node": "Ikana Canyon (from Path to Ikana)",
                //             "alias": "Ikana Canyon",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Curiosity Shop (from West Clock Town)",
                //             "alias": "Curiosity Shop",
                //         },
                //         {
                //             "node": "Great Bay Coast (from Pinnacle Rock)",
                //             "alias": "Great Bay Coast",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Back Room (from Laundry Pool)",
                //             "alias": "Back Room",
                //         },
                //         {
                //             "node": "Post Office",
                //             "alias": "Post Office",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Generic Grotto (from Path to the Swamp)",
                //             "alias": "Generic Grotto",
                //         },
                //         {
                //             "node": "Ikana Graveyard (from Beneath the Graveyard (Heart Piece))",
                //             "alias": "Ikana Graveyard",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Generic Grotto (from Southern Swamp)",
                //             "alias": "Generic Grotto",
                //         },
                //         {
                //             "node": "Great Bay Coast (from Zora Mask Cutscene)",
                //             "alias": "Great Bay Coast",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Gossip Stones Grotto",
                //             "alias": "Great Bay Gossip Stones Grotto",
                //         },
                //         {
                //             "node": "Path to Ikana (from Ikana Graveyard)",
                //             "alias": "Path to Ikana",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Swamp Gossip Stones Grotto",
                //             "alias": "Swamp Gossip Stones Grotto",
                //         },
                //         {
                //             "node": "Spring Water Cave (from Farewell to Gibdos)",
                //             "alias": "Spring Water Cave",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Gossip Stones Grotto",
                //             "alias": "Ikana Gossip Stones Grotto",
                //         },
                //         {
                //             "node": "Ancient Castle of Ikana (from Hole under Block)",
                //             "alias": "Ancient Castle of Ikana",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Snowhead Gossip Stones Grotto",
                //             "alias": "Snowhead Gossip Stones Grotto",
                //         },
                //         {
                //             "node": "Generic Grotto (from Ikana Graveyard)",
                //             "alias": "Generic Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Generic Grotto (from Termina Field Grass)",
                //             "alias": "Generic Grotto",
                //         },
                //         {
                //             "node": "Beneath the Graveyard (Song of Storms)",
                //             "alias": "Beneath the Graveyard (Song of Storms)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Hotspring Water Grotto",
                //             "alias": "Hotspring Water Grotto",
                //         },
                //         {
                //             "node": "Mountain Village (from Generic Grotto)",
                //             "alias": "Mountain Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Dodongo Grotto",
                //             "alias": "Dodongo Grotto",
                //         },
                //         {
                //             "node": "Great Bay Temple (from Zora Cape)",
                //             "alias": "Great Bay Temple",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Bisness Deku Scrub Grotto",
                //             "alias": "Bisness Deku Scrub Grotto",
                //         },
                //         {
                //             "node": "Zora Hall (from Band Rehearsal)",
                //             "alias": "Zora Hall",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Cow Grotto (from Termina Field)",
                //             "alias": "Cow Grotto",
                //         },
                //         {
                //             "node": "Marine Research Lab",
                //             "alias": "Marine Research Lab",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Bio Baba Grotto",
                //             "alias": "Bio Baba Grotto",
                //         },
                //         {
                //             "node": "North Clock Town (from Fairy's Fountain)",
                //             "alias": "North Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Magic Bean Seller Grotto",
                //             "alias": "Magic Bean Seller Grotto",
                //         },
                //         {
                //             "node": "West Clock Town (from South Clock Town south)",
                //             "alias": "West Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Peahat Grotto",
                //             "alias": "Peahat Grotto",
                //         },
                //         {
                //             "node": "Zora Cape (from Murky Water)",
                //             "alias": "Zora Cape",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Lone Peak Shrine",
                //             "alias": "Lone Peak Shrine",
                //         },
                //         {
                //             "node": "Southern Swamp (from Song of Soaring)",
                //             "alias": "Southern Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Generic Grotto (from Woods of Mystery)",
                //             "alias": "Generic Grotto",
                //         },
                //         {
                //             "node": "Termina Field (from Mountain Gossips Grotto)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Generic Grotto (from Path to Goron Village)",
                //             "alias": "Generic Grotto",
                //         },
                //         {
                //             "node": "Pre Clock Tower (from Clock Tower)",
                //             "alias": "Pre Clock Tower",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Generic Grotto (from Path to Snowhead)",
                //             "alias": "Generic Grotto",
                //         },
                //         {
                //             "node": "Bomb Shop",
                //             "alias": "Bomb Shop",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Generic Grotto (from Mountain Village)",
                //             "alias": "Generic Grotto",
                //         },
                //         {
                //             "node": "Romani Ranch (from Romani being abducted)",
                //             "alias": "Romani Ranch",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Canyon (from Path to Ikana)",
                //             "alias": "Ikana Canyon",
                //         },
                //         {
                //             "node": "Great Bay Trial (from Murky Water)",
                //             "alias": "Great Bay Trial",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Canyon (from Ghost Hut)",
                //             "alias": "Ikana Canyon",
                //         },
                //         {
                //             "node": "Pirates' Fortress Interior (from Purple Pirate entrance)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Canyon (from Musicbox House)",
                //             "alias": "Ikana Canyon",
                //         },
                //         {
                //             "node": "Milk Road (from Song of Soaring)",
                //             "alias": "Milk Road",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Canyon (from Stone Tower)",
                //             "alias": "Ikana Canyon",
                //         },
                //         {
                //             "node": "Great Bay Coast (from Marine Research Lab)",
                //             "alias": "Great Bay Coast",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Canyon (from Song of Soaring)",
                //             "alias": "Ikana Canyon",
                //         },
                //         {
                //             "node": "Pirates' Fortress Interior (from Hookshot Lower)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Canyon (from Beneath the Well)",
                //             "alias": "Ikana Canyon",
                //         },
                //         {
                //             "node": "Ikana Gossip Stones Grotto",
                //             "alias": "Ikana Gossip Stones Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Canyon (from Sakon's Hideout)",
                //             "alias": "Ikana Canyon",
                //         },
                //         {
                //             "node": "Fairy's Fountain (Clock Town)",
                //             "alias": "Fairy's Fountain (Clock Town)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Canyon (from Clear Cutscene)",
                //             "alias": "Ikana Canyon",
                //         },
                //         {
                //             "node": "Zora Shop",
                //             "alias": "Zora Shop",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Canyon (from Ancient Castle of Ikana)",
                //             "alias": "Ikana Canyon",
                //         },
                //         {
                //             "node": "Great Bay Coast (from Cow Grotto)",
                //             "alias": "Great Bay Coast",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Spring Water Cave (from Farewell to Gibdos)",
                //             "alias": "Spring Water Cave",
                //         },
                //         {
                //             "node": "West Clock Town (from Curiosity Shop)",
                //             "alias": "West Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Canyon (from Fairy Fountain)",
                //             "alias": "Ikana Canyon",
                //         },
                //         {
                //             "node": "Romani Ranch (from House)",
                //             "alias": "Romani Ranch",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Canyon (from Secret Shrine)",
                //             "alias": "Ikana Canyon",
                //         },
                //         {
                //             "node": "Woodfall (from Woodfall Temple back)",
                //             "alias": "Woodfall",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Canyon (from Spring Water Cave)",
                //             "alias": "Ikana Canyon",
                //         },
                //         {
                //             "node": "Zora Hall (from Zora Cape)",
                //             "alias": "Zora Hall",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Spring Water Cave (from Ikana Canyon)",
                //             "alias": "Spring Water Cave",
                //         },
                //         {
                //             "node": "Generic Grotto (from Mountain Village)",
                //             "alias": "Generic Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Canyon (from Twinmold)",
                //             "alias": "Ikana Canyon",
                //         },
                //         {
                //             "node": "East Clock Town (from Mayor's Residence)",
                //             "alias": "East Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Canyon (Generic Grotto)",
                //             "alias": "Ikana Canyon (Generic Grotto)",
                //         },
                //         {
                //             "node": "Snowhead (from Snowhead Temple)",
                //             "alias": "Snowhead",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Interior (from Exterior)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //         {
                //             "node": "Ancient Castle of Ikana (from Castle Exterior)",
                //             "alias": "Ancient Castle of Ikana",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Interior (from Hookshot Lower)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //         {
                //             "node": "South Clock Town (from Laundry Pool)",
                //             "alias": "South Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Interior (from Hookshot Upper)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //         {
                //             "node": "Stock Pot Inn (from East Clock Town upper)",
                //             "alias": "Stock Pot Inn",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Interior (from Purple Pirate entrance)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //         {
                //             "node": "Deku Palace (from Southern Swamp)",
                //             "alias": "Deku Palace",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Interior (from Purple Pirate exit)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //         {
                //             "node": "Milk Bar",
                //             "alias": "Milk Bar",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Interior (from Green Pirate entrance)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //         {
                //             "node": "Curiosity Shop (from West Clock Town)",
                //             "alias": "Curiosity Shop",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Interior (from Green Pirate exit)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //         {
                //             "node": "Snowhead Gossip Stones Grotto",
                //             "alias": "Snowhead Gossip Stones Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Interior (from Red Pirate entrance)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //         {
                //             "node": "Path to Goron Village (from Goron Village)",
                //             "alias": "Path to Goron Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Interior (from Red Pirate exit)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //         {
                //             "node": "South Clock Town (from Termina Field)",
                //             "alias": "South Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Interior (from Exiterior balcony)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //         {
                //             "node": "Deku Shrine",
                //             "alias": "Deku Shrine",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Milk Bar",
                //             "alias": "Milk Bar",
                //         },
                //         {
                //             "node": "Ikana Canyon (from Ancient Castle of Ikana)",
                //             "alias": "Ikana Canyon",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Stone Tower Temple",
                //             "alias": "Stone Tower Temple",
                //         },
                //         {
                //             "node": "Fisherman's Hut",
                //             "alias": "Fisherman's Hut",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Treasure Chest Shop",
                //             "alias": "Treasure Chest Shop",
                //         },
                //         {
                //             "node": "Tourist Information",
                //             "alias": "Tourist Information",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Inverted Stone Tower Temple",
                //             "alias": "Inverted Stone Tower Temple",
                //         },
                //         {
                //             "node": "Odolwa's Room",
                //             "alias": "Odolwa's Room",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Inverted Stone Tower Temple (Boss Door)",
                //             "alias": "Inverted Stone Tower Temple (Boss Door)",
                //         },
                //         {
                //             "node": "East Clock Town (from South Clock Town south)",
                //             "alias": "East Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Top of the Clock Tower",
                //             "alias": "Top of the Clock Tower",
                //         },
                //         {
                //             "node": "Path to Ikana (from Ikana Canyon)",
                //             "alias": "Path to Ikana",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pre Clock Tower (from Clock Tower)",
                //             "alias": "Pre Clock Tower",
                //         },
                //         {
                //             "node": "Southern Swamp (from Deku Palace)",
                //             "alias": "Southern Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pre Clock Tower (from Fall to Termina)",
                //             "alias": "Pre Clock Tower",
                //         },
                //         {
                //             "node": "West Clock Town (from Swordsman's School)",
                //             "alias": "West Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pre Clock Tower (from Void)",
                //             "alias": "Pre Clock Tower",
                //         },
                //         {
                //             "node": "Path to Snowhead (from Generic Grotto)",
                //             "alias": "Path to Snowhead",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Woodfall Temple (from Woodfall)",
                //             "alias": "Woodfall Temple",
                //         },
                //         {
                //             "node": "Pirates' Fortress Interior (from Red Pirate entrance)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Deku Princess' Room (from Odolwa)",
                //             "alias": "Deku Princess' Room",
                //         },
                //         {
                //             "node": "Southern Swamp (from Swamp Spider House)",
                //             "alias": "Southern Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Deku Princess' Room (from Woodfall)",
                //             "alias": "Deku Princess' Room",
                //         },
                //         {
                //             "node": "Generic Grotto (from Path to Goron Village)",
                //             "alias": "Generic Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to Mountain Village (from Termina Field)",
                //             "alias": "Path to Mountain Village",
                //         },
                //         {
                //             "node": "Twinmold's Room",
                //             "alias": "Twinmold's Room",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to Mountain Village (from Mountain Village)",
                //             "alias": "Path to Mountain Village",
                //         },
                //         {
                //             "node": "Ancient Castle of Ikana (from Ikana Canyon)",
                //             "alias": "Ancient Castle of Ikana",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ancient Castle of Ikana (from Beneath the Well)",
                //             "alias": "Ancient Castle of Ikana",
                //         },
                //         {
                //             "node": "Inverted Stone Tower Temple",
                //             "alias": "Inverted Stone Tower Temple",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ancient Castle of Ikana (from Ikana Canyon)",
                //             "alias": "Ancient Castle of Ikana",
                //         },
                //         {
                //             "node": "Woodfall Trial (from Moon)",
                //             "alias": "Woodfall Trial",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ancient Castle of Ikana (from Castle Interior)",
                //             "alias": "Ancient Castle of Ikana",
                //         },
                //         {
                //             "node": "Deku Palace (from being thrown out)",
                //             "alias": "Deku Palace",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ancient Castle of Ikana (from Castle Exterior)",
                //             "alias": "Ancient Castle of Ikana",
                //         },
                //         {
                //             "node": "Clock Tower (from Moon Crash)",
                //             "alias": "Clock Tower",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ancient Castle of Ikana (from Keg Hole)",
                //             "alias": "Ancient Castle of Ikana",
                //         },
                //         {
                //             "node": "North Clock Town (from Termina Field)",
                //             "alias": "North Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ancient Castle of Ikana (from Hole under Block)",
                //             "alias": "Ancient Castle of Ikana",
                //         },
                //         {
                //             "node": "Goron Racetrack (from Path to Goron Village)",
                //             "alias": "Goron Racetrack",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ancient Castle of Ikana (from Igo's Room)",
                //             "alias": "Ancient Castle of Ikana",
                //         },
                //         {
                //             "node": "Termina Field (from Grass Generic Grotto)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Deku Playground",
                //             "alias": "Deku Playground",
                //         },
                //         {
                //             "node": "Great Bay Coast (from Song of Soaring)",
                //             "alias": "Great Bay Coast",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Odolwa's Room",
                //             "alias": "Odolwa's Room",
                //         },
                //         {
                //             "node": "Great Bay Coast (from Murky Water Right)",
                //             "alias": "Great Bay Coast",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Shooting Gallery (Clock Town)",
                //             "alias": "Shooting Gallery (Clock Town)",
                //         },
                //         {
                //             "node": "Zora Hall (from Zora Shop)",
                //             "alias": "Zora Hall",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Snowhead Temple",
                //             "alias": "Snowhead Temple",
                //         },
                //         {
                //             "node": "Great Bay Coast (from Oceanside Spider House)",
                //             "alias": "Great Bay Coast",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Milk Road (from Termina Field)",
                //             "alias": "Milk Road",
                //         },
                //         {
                //             "node": "Snowhead Trial (from Moon)",
                //             "alias": "Snowhead Trial",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Milk Road (from Romani Ranch)",
                //             "alias": "Milk Road",
                //         },
                //         {
                //             "node": "Goron Shop",
                //             "alias": "Goron Shop",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Milk Road (from Gorman Track back)",
                //             "alias": "Milk Road",
                //         },
                //         {
                //             "node": "Japas' Room (from Jam Session)",
                //             "alias": "Japas' Room",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Milk Road (from Gorman Track)",
                //             "alias": "Milk Road",
                //         },
                //         {
                //             "node": "South Clock Town (from East Clock Town north)",
                //             "alias": "South Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Milk Road (from Song of Soaring)",
                //             "alias": "Milk Road",
                //         },
                //         {
                //             "node": "Mayor's Residence (from East Clock Town) ",
                //             "alias": "Mayor's Residence",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Rooms (Hookshot Lower)",
                //             "alias": "Pirates' Fortress Rooms (Hookshot Lower)",
                //         },
                //         {
                //             "node": "Clock Tower (from Pre Clock Tower)",
                //             "alias": "Clock Tower",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Rooms (Hookshot Upper)",
                //             "alias": "Pirates' Fortress Rooms (Hookshot Upper)",
                //         },
                //         {
                //             "node": "Southern Swamp (from Woodfall)",
                //             "alias": "Southern Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Rooms (Purple Pirate entrance)",
                //             "alias": "Pirates' Fortress Rooms (Purple Pirate entrance)",
                //         },
                //         {
                //             "node": "Ikana Canyon (from Ghost Hut)",
                //             "alias": "Ikana Canyon",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Rooms (Purple Pirate exit)",
                //             "alias": "Pirates' Fortress Rooms (Purple Pirate exit)",
                //         },
                //         {
                //             "node": "Snowhead Temple",
                //             "alias": "Snowhead Temple",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Rooms (Green Pirate entrance)",
                //             "alias": "Pirates' Fortress Rooms (Green Pirate entrance)",
                //         },
                //         {
                //             "node": "Generic Grotto (from Path to Snowhead)",
                //             "alias": "Generic Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Rooms (Green Pirate exit)",
                //             "alias": "Pirates' Fortress Rooms (Green Pirate exit)",
                //         },
                //         {
                //             "node": "South Clock Town (from North Clock Town)",
                //             "alias": "South Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Rooms (Red Pirate entrance)",
                //             "alias": "Pirates' Fortress Rooms (Red Pirate entrance)",
                //         },
                //         {
                //             "node": "West Clock Town (from Termina Field)",
                //             "alias": "West Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Rooms (Red Pirate exit)",
                //             "alias": "Pirates' Fortress Rooms (Red Pirate exit)",
                //         },
                //         {
                //             "node": "Mountain Smithy",
                //             "alias": "Mountain Smithy",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Rooms (Sewers entrance)",
                //             "alias": "Pirates' Fortress Rooms (Sewers entrance)",
                //         },
                //         {
                //             "node": "Dodongo Grotto",
                //             "alias": "Dodongo Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Rooms (Sewers exit)",
                //             "alias": "Pirates' Fortress Rooms (Sewers exit)",
                //         },
                //         {
                //             "node": "Southern Swamp (from Magic Hag's Potion Shop)",
                //             "alias": "Southern Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Shooting Gallery (Swamp)",
                //             "alias": "Shooting Gallery (Swamp)",
                //         },
                //         {
                //             "node": "North Clock Town (from Bombers Hide and Seek)",
                //             "alias": "North Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pinnacle Rock",
                //             "alias": "Pinnacle Rock",
                //         },
                //         {
                //             "node": "Goron Village (from Goron Shrine)",
                //             "alias": "Goron Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pinnacle Rock (Void)",
                //             "alias": "Pinnacle Rock (Void)",
                //         },
                //         {
                //             "node": "Swamp Gossip Stones Grotto",
                //             "alias": "Swamp Gossip Stones Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Fairy's Fountain (Clock Town)",
                //             "alias": "Fairy's Fountain (Clock Town)",
                //         },
                //         {
                //             "node": "Ikana Graveyard (from Beneath the Graveyard (Song of Storms))",
                //             "alias": "Ikana Graveyard",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Fairy's Fountain (Woodfall)",
                //             "alias": "Fairy's Fountain (Woodfall)",
                //         },
                //         {
                //             "node": "Great Bay Coast (from Termina Field)",
                //             "alias": "Great Bay Coast",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Fairy's Fountain (Snowhead)",
                //             "alias": "Fairy's Fountain (Snowhead)",
                //         },
                //         {
                //             "node": "Stone Tower Temple",
                //             "alias": "Stone Tower Temple",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Fairy's Fountain (Great Bay)",
                //             "alias": "Fairy's Fountain (Great Bay)",
                //         },
                //         {
                //             "node": "Ocean Spider House",
                //             "alias": "Ocean Spider House",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Fairy's Fountain (Ikana)",
                //             "alias": "Fairy's Fountain (Ikana)",
                //         },
                //         {
                //             "node": "Pirates' Fortress Interior (from Red Pirate exit)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Swamp Spider House",
                //             "alias": "Swamp Spider House",
                //         },
                //         {
                //             "node": "Music Box House",
                //             "alias": "Music Box House",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ocean Spider House",
                //             "alias": "Ocean Spider House",
                //         },
                //         {
                //             "node": "Ranch Barn (from Romani Ranch)",
                //             "alias": "Ranch Barn",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Bombers' Hideout",
                //             "alias": "Bombers' Hideout",
                //         },
                //         {
                //             "node": "Termina Field (from Pillar Generic Grotto)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Observatory (from Termina Field)",
                //             "alias": "Observatory",
                //         },
                //         {
                //             "node": "Pirates' Fortress Rooms (Hookshot Lower)",
                //             "alias": "Pirates' Fortress Rooms (Hookshot Lower)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Woodfall Trial (from Moon)",
                //             "alias": "Woodfall Trial",
                //         },
                //         {
                //             "node": "Swordsman's School",
                //             "alias": "Swordsman's School",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Deku Palace (from Southern Swamp)",
                //             "alias": "Deku Palace",
                //         },
                //         {
                //             "node": "Laundry Pool (from South Clock Town)",
                //             "alias": "Laundry Pool",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Deku Palace (from being thrown out)",
                //             "alias": "Deku Palace",
                //         },
                //         {
                //             "node": "North Clock Town (from East Clock Town)",
                //             "alias": "North Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Deku Palace (from Deku King's Chamber)",
                //             "alias": "Deku Palace",
                //         },
                //         {
                //             "node": "Magic Bean Seller Grotto",
                //             "alias": "Magic Bean Seller Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Deku Palace (from Monkey cage)",
                //             "alias": "Deku Palace",
                //         },
                //         {
                //             "node": "North Clock Town (from South Clock Town)",
                //             "alias": "North Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Deku Palace (from Deku Shrine)",
                //             "alias": "Deku Palace",
                //         },
                //         {
                //             "node": "Clock Tower (from Deku Mask)",
                //             "alias": "Clock Tower",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Deku Palace (from Swamp Shortcut)",
                //             "alias": "Deku Palace",
                //         },
                //         {
                //             "node": "Ancient Castle of Ikana (from Castle Interior)",
                //             "alias": "Ancient Castle of Ikana",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Deku Palace (from Magic Bean Seller Grotto)",
                //             "alias": "Deku Palace",
                //         },
                //         {
                //             "node": "Termina Field (from Great Bay Coast)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Mountain Smithy",
                //             "alias": "Mountain Smithy",
                //         },
                //         {
                //             "node": "Deku King's Chamber (from Returning Deku Princess)",
                //             "alias": "Deku King's Chamber",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from West Clock Town)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Goron Graveyard (from Mountain Village)",
                //             "alias": "Goron Graveyard",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Path to Southern Swamp)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Pirates' Fortress Rooms (Green Pirate entrance)",
                //             "alias": "Pirates' Fortress Rooms (Green Pirate entrance)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Great Bay Coast)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Pirates' Fortress Interior (from Green Pirate entrance)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Path to Mountain Village)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Beneath the Graveyard (Bottle)",
                //             "alias": "Beneath the Graveyard (Bottle)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Path to Ikana Canyon)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Ikana Canyon (from Stone Tower)",
                //             "alias": "Ikana Canyon",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Milk Road)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Deku Princess' Room (from Woodfall)",
                //             "alias": "Deku Princess' Room",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from South Clock Town)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Goht's Room",
                //             "alias": "Goht's Room",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from East Clock Town)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Secret Shrine",
                //             "alias": "Secret Shrine",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from North Clock Town)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Pirates' Fortress Exterior (from Interior)",
                //             "alias": "Pirates' Fortress Exterior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Observatory)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Hotspring Water Grotto",
                //             "alias": "Hotspring Water Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Cow Grotto)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Mountain Village (from Path to Mountain Village)",
                //             "alias": "Mountain Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Milk Road with Cremia)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Great Bay Gossip Stones Grotto",
                //             "alias": "Great Bay Gossip Stones Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Skull Kid Cutscene)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "South Clock Town (from West Clock Town north)",
                //             "alias": "South Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Grass Generic Grotto)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Generic Grotto (from Ikana Canyon)",
                //             "alias": "Generic Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Pillar Generic Grotto)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Termina Field (from Milk Road)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Business Scrub Grotto)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Stock Pot Inn (from Mother Conversation)",
                //             "alias": "Stock Pot Inn",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Peahat Grotto)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Termina Field (from Peahat Grotto)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Dodongo Grotto)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Termina Field (from North Clock Town)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Biobaba Grotto)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Woodfall (from Woodfall Temple)",
                //             "alias": "Woodfall",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Swamp Gossips Grotto)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Tourist Information (from Boat Cruise Picture)",
                //             "alias": "Tourist Information",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Mountain Gossips Grotto)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "South Clock Town (from West Clock Town south)",
                //             "alias": "South Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Ocean Gossips Grotto)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Zora Hall (from Mikau's Room)",
                //             "alias": "Zora Hall",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Termina Field (from Canyon Gossips Grotto)",
                //             "alias": "Termina Field",
                //         },
                //         {
                //             "node": "Ikana Canyon (from Secret Shrine)",
                //             "alias": "Ikana Canyon",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Post Office",
                //             "alias": "Post Office",
                //         },
                //         {
                //             "node": "Lone Peak Shrine",
                //             "alias": "Lone Peak Shrine",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Marine Research Lab",
                //             "alias": "Marine Research Lab",
                //         },
                //         {
                //             "node": "Generic Grotto (from Woods of Mystery)",
                //             "alias": "Generic Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Beneath the Graveyard (Bottle)",
                //             "alias": "Beneath the Graveyard (Bottle)",
                //         },
                //         {
                //             "node": "Zora Cape (from Zora Hall back)",
                //             "alias": "Zora Cape",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Beneath the Graveyard (Dampe's Room)",
                //             "alias": "Beneath the Graveyard (Dampe's Room)",
                //         },
                //         {
                //             "node": "Pirates' Fortress Exterior (from Water Tunnel)",
                //             "alias": "Pirates' Fortress Exterior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Generic Grotto (from Great Bay Coast)",
                //             "alias": "Generic Grotto",
                //         },
                //         {
                //             "node": "Pirates' Fortress Rooms (Green Pirate exit)",
                //             "alias": "Pirates' Fortress Rooms (Green Pirate exit)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Cow Grotto (from Great Bay Coast)",
                //             "alias": "Cow Grotto",
                //         },
                //         {
                //             "node": "West Clock Town (from Trading Post)",
                //             "alias": "West Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Goron Shrine (from Goron Village)",
                //             "alias": "Goron Shrine",
                //         },
                //         {
                //             "node": "Path to Mountain Village (from Termina Field)",
                //             "alias": "Path to Mountain Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Goron Shrine (from Goron Shop)",
                //             "alias": "Goron Shrine",
                //         },
                //         {
                //             "node": "Deku Palace (from Magic Bean Seller Grotto)",
                //             "alias": "Deku Palace",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Goron Shrine (from Goron Lullaby)",
                //             "alias": "Goron Shrine",
                //         },
                //         {
                //             "node": "East Clock Town (from Shooting Gallery)",
                //             "alias": "East Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Hall (from Zora Cape)",
                //             "alias": "Zora Hall",
                //         },
                //         {
                //             "node": "Romani Ranch (from Cucco Shack)",
                //             "alias": "Romani Ranch",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Hall (from Zora Cape back)",
                //             "alias": "Zora Hall",
                //         },
                //         {
                //             "node": "Stone Tower (from Stone Tower Temple)",
                //             "alias": "Stone Tower",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Hall (from Zora Shop)",
                //             "alias": "Zora Hall",
                //         },
                //         {
                //             "node": "Termina Field (from Skull Kid Cutscene)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Hall (from Lulu's Room)",
                //             "alias": "Zora Hall",
                //         },
                //         {
                //             "node": "Fairy's Fountain (Woodfall)",
                //             "alias": "Fairy's Fountain (Woodfall)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Hall (from Evan's Room)",
                //             "alias": "Zora Hall",
                //         },
                //         {
                //             "node": "Top of the Clock Tower",
                //             "alias": "Top of the Clock Tower",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Hall (from Japas' Room)",
                //             "alias": "Zora Hall",
                //         },
                //         {
                //             "node": "East Clock Town (from Stock Pot Inn)",
                //             "alias": "East Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Hall (from Mikau's Room)",
                //             "alias": "Zora Hall",
                //         },
                //         {
                //             "node": "Path to the Swamp (from Shooting Gallery)",
                //             "alias": "Path to the Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Hall (from Band Rehearsal)",
                //             "alias": "Zora Hall",
                //         },
                //         {
                //             "node": "Termina Field (from South Clock Town)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Trading Post",
                //             "alias": "Trading Post",
                //         },
                //         {
                //             "node": "Zora Hall (from Evan's Room)",
                //             "alias": "Zora Hall",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Romani Ranch (from Milk Road)",
                //             "alias": "Romani Ranch",
                //         },
                //         {
                //             "node": "Doggy Racetrack",
                //             "alias": "Doggy Racetrack",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Romani Ranch (from Barn)",
                //             "alias": "Romani Ranch",
                //         },
                //         {
                //             "node": "Fairy's Fountain (Snowhead)",
                //             "alias": "Fairy's Fountain (Snowhead)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Romani Ranch (from House)",
                //             "alias": "Romani Ranch",
                //         },
                //         {
                //             "node": "Pirates' Fortress Rooms (Sewers entrance)",
                //             "alias": "Pirates' Fortress Rooms (Sewers entrance)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Romani Ranch (from Cucco Shack)",
                //             "alias": "Romani Ranch",
                //         },
                //         {
                //             "node": "Stone Tower (from Ikana Canyon)",
                //             "alias": "Stone Tower",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Romani Ranch (from Doggy Racetrack)",
                //             "alias": "Romani Ranch",
                //         },
                //         {
                //             "node": "Milk Road (from Termina Field)",
                //             "alias": "Milk Road",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Romani Ranch (from Receiving Milk Bottle)",
                //             "alias": "Romani Ranch",
                //         },
                //         {
                //             "node": "West Clock Town (from Bomb Shop)",
                //             "alias": "West Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Romani Ranch (from Failing Cart Ride)",
                //             "alias": "Romani Ranch",
                //         },
                //         {
                //             "node": "West Clock Town (from Lottery Shop)",
                //             "alias": "West Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Romani Ranch (from Romani being abducted)",
                //             "alias": "Romani Ranch",
                //         },
                //         {
                //             "node": "Gorman Racetrack (from Milk Road west)",
                //             "alias": "Gorman Racetrack",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Twinmold's Room",
                //             "alias": "Twinmold's Room",
                //         },
                //         {
                //             "node": "Inverted Stone Tower Temple (Boss Door)",
                //             "alias": "Inverted Stone Tower Temple (Boss Door)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Coast (from Termina Field)",
                //             "alias": "Great Bay Coast",
                //         },
                //         {
                //             "node": "Pirates' Fortress Interior (from Exterior)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Coast (from Zora Cape)",
                //             "alias": "Great Bay Coast",
                //         },
                //         {
                //             "node": "Path to Goron Village (from Mountain Village)",
                //             "alias": "Path to Goron Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Coast (from Murky Water Left)",
                //             "alias": "Great Bay Coast",
                //         },
                //         {
                //             "node": "Termina Field (from Path to Southern Swamp)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Coast (from Pinnacle Rock)",
                //             "alias": "Great Bay Coast",
                //         },
                //         {
                //             "node": "Zora Cape (from Gyorg) (2)",
                //             "alias": "Zora Cape",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Coast (from Fisherman's Hut)",
                //             "alias": "Great Bay Coast",
                //         },
                //         {
                //             "node": "Cow Grotto (from Termina Field)",
                //             "alias": "Cow Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Coast (from Pirates' Fortress)",
                //             "alias": "Great Bay Coast",
                //         },
                //         {
                //             "node": "Ikana Canyon (Generic Grotto)",
                //             "alias": "Ikana Canyon (Generic Grotto)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Coast (from Murky Water Right)",
                //             "alias": "Great Bay Coast",
                //         },
                //         {
                //             "node": "Fairy's Fountain (Great Bay)",
                //             "alias": "Fairy's Fountain (Great Bay)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Coast (from Marine Research Lab)",
                //             "alias": "Great Bay Coast",
                //         },
                //         {
                //             "node": "Ranch House (from Romani Ranch)",
                //             "alias": "Ranch House",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Coast (from Oceanside Spider House)",
                //             "alias": "Great Bay Coast",
                //         },
                //         {
                //             "node": "Mountain Village (from Goht)",
                //             "alias": "Mountain Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Coast (from Zora Mask Cutscene)",
                //             "alias": "Great Bay Coast",
                //         },
                //         {
                //             "node": "Path to the Swamp (from Generic Grotto)",
                //             "alias": "Path to the Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Coast (from Song of Soaring)",
                //             "alias": "Great Bay Coast",
                //         },
                //         {
                //             "node": "Treasure Chest Shop",
                //             "alias": "Treasure Chest Shop",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Coast (from Pirates' Fortress caught)",
                //             "alias": "Great Bay Coast",
                //         },
                //         {
                //             "node": "Southern Swamp (from Deku Palace Upper)",
                //             "alias": "Southern Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Coast (from Generic Grotto)",
                //             "alias": "Great Bay Coast",
                //         },
                //         {
                //             "node": "East Clock Town (from Honey & Darling)",
                //             "alias": "East Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Coast (from Cow Grotto)",
                //             "alias": "Great Bay Coast",
                //         },
                //         {
                //             "node": "East Clock Town (from Bomber's Hideout)",
                //             "alias": "East Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Cape (from Great Bay Coast)",
                //             "alias": "Zora Cape",
                //         },
                //         {
                //             "node": "Termina Field (from West Clock Town)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Cape (from Zora Hall)",
                //             "alias": "Zora Cape",
                //         },
                //         {
                //             "node": "Cow Grotto (from Great Bay Coast)",
                //             "alias": "Cow Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Cape (from Zora Hall back)",
                //             "alias": "Zora Cape",
                //         },
                //         {
                //             "node": "Ancient Castle of Ikana (from Keg Hole)",
                //             "alias": "Ancient Castle of Ikana",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Cape (from Murky Water)",
                //             "alias": "Zora Cape",
                //         },
                //         {
                //             "node": "Pirates' Fortress Interior (from Purple Pirate exit)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Cape (from Waterfall Rapids)",
                //             "alias": "Zora Cape",
                //         },
                //         {
                //             "node": "Lulu's Room (from Zora Hall)",
                //             "alias": "Lulu's Room",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Cape (from Fairy's Fountain)",
                //             "alias": "Zora Cape",
                //         },
                //         {
                //             "node": "Woodfall (from Song of Soaring)",
                //             "alias": "Woodfall",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Cape (from Song of Soaring)",
                //             "alias": "Zora Cape",
                //         },
                //         {
                //             "node": "Peahat Grotto",
                //             "alias": "Peahat Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Cape (from Great Bay Temple)",
                //             "alias": "Zora Cape",
                //         },
                //         {
                //             "node": "East Clock Town (from Termina Field)",
                //             "alias": "East Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Cape (from Gyorg)",
                //             "alias": "Zora Cape",
                //         },
                //         {
                //             "node": "Zora Cape (from Song of Soaring)",
                //             "alias": "Zora Cape",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Cape (from Gyorg) (2)",
                //             "alias": "Zora Cape",
                //         },
                //         {
                //             "node": "Ikana Canyon (from Beneath the Well)",
                //             "alias": "Ikana Canyon",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Cape (from Generic Grotto)",
                //             "alias": "Zora Cape",
                //         },
                //         {
                //             "node": "Deku Playground",
                //             "alias": "Deku Playground",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Lottery Shop",
                //             "alias": "Lottery Shop",
                //         },
                //         {
                //             "node": "West Clock Town (from Post Office)",
                //             "alias": "West Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Generic Grotto (from Zora Cape)",
                //             "alias": "Generic Grotto",
                //         },
                //         {
                //             "node": "Termina Field (from East Clock Town)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Exterior (from Great Bay Coast)",
                //             "alias": "Pirates' Fortress Exterior",
                //         },
                //         {
                //             "node": "Inverted Stone Tower (from Inverting)",
                //             "alias": "Inverted Stone Tower",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Exterior (from Interior)",
                //             "alias": "Pirates' Fortress Exterior",
                //         },
                //         {
                //             "node": "Stone Tower Trial (from Moon)",
                //             "alias": "Stone Tower Trial",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Exterior (from Water Tunnel)",
                //             "alias": "Pirates' Fortress Exterior",
                //         },
                //         {
                //             "node": "Snowhead (from Song of Soaring)",
                //             "alias": "Snowhead",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Exterior (from Sewers Draft)",
                //             "alias": "Pirates' Fortress Exterior",
                //         },
                //         {
                //             "node": "Zora Cape (from Gyorg)",
                //             "alias": "Zora Cape",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Exterior (from Interior Thrown Out)",
                //             "alias": "Pirates' Fortress Exterior",
                //         },
                //         {
                //             "node": "Deku Princess' Room (from Odolwa)",
                //             "alias": "Deku Princess' Room",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Exterior (from Interior Balcony)",
                //             "alias": "Pirates' Fortress Exterior",
                //         },
                //         {
                //             "node": "Deku Palace (from Swamp Shortcut)",
                //             "alias": "Deku Palace",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Pirates' Fortress Exterior (from Telescope)",
                //             "alias": "Pirates' Fortress Exterior",
                //         },
                //         {
                //             "node": "Shooting Gallery (Swamp)",
                //             "alias": "Shooting Gallery (Swamp)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Fisherman's Hut",
                //             "alias": "Fisherman's Hut",
                //         },
                //         {
                //             "node": "Mountain Village (from Path to Snowhead)",
                //             "alias": "Mountain Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Goron Shop",
                //             "alias": "Goron Shop",
                //         },
                //         {
                //             "node": "Generic Grotto (from Termina Field Pillar)",
                //             "alias": "Generic Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Deku King's Chamber (from Deku Palace)",
                //             "alias": "Deku King's Chamber",
                //         },
                //         {
                //             "node": "Pirates' Fortress Rooms (Hookshot Upper)",
                //             "alias": "Pirates' Fortress Rooms (Hookshot Upper)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Deku King's Chamber (from Deku Palace upper)",
                //             "alias": "Deku King's Chamber",
                //         },
                //         {
                //             "node": "Ikana Canyon (from Fairy Fountain)",
                //             "alias": "Ikana Canyon",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Deku King's Chamber (from Returning Deku Princess)",
                //             "alias": "Deku King's Chamber",
                //         },
                //         {
                //             "node": "Southern Swamp (from Tourist Information)",
                //             "alias": "Southern Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Snowhead Trial (from Moon)",
                //             "alias": "Snowhead Trial",
                //         },
                //         {
                //             "node": "Ancient Castle of Ikana (from Beneath the Well)",
                //             "alias": "Ancient Castle of Ikana",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to the Swamp (from Termina Field)",
                //             "alias": "Path to the Swamp",
                //         },
                //         {
                //             "node": "Termina Field (from Path to Ikana Canyon)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to the Swamp (from Southern Swamp)",
                //             "alias": "Path to the Swamp",
                //         },
                //         {
                //             "node": "Generic Grotto (from Southern Swamp)",
                //             "alias": "Generic Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to the Swamp (from Shooting Gallery)",
                //             "alias": "Path to the Swamp",
                //         },
                //         {
                //             "node": "Termina Field (from Swamp Gossips Grotto)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to the Swamp (from Generic Grotto)",
                //             "alias": "Path to the Swamp",
                //         },
                //         {
                //             "node": "Southern Swamp (from Woods of Mystery)",
                //             "alias": "Southern Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Doggy Racetrack",
                //             "alias": "Doggy Racetrack",
                //         },
                //         {
                //             "node": "East Clock Town (from Milk Bar)",
                //             "alias": "East Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Cucco Shack",
                //             "alias": "Cucco Shack",
                //         },
                //         {
                //             "node": "East Clock Town (from North Clock Town)",
                //             "alias": "East Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Graveyard (from Path to Ikana)",
                //             "alias": "Ikana Graveyard",
                //         },
                //         {
                //             "node": "Pre Clock Tower (from Fall to Termina)",
                //             "alias": "Pre Clock Tower",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Graveyard (from Beneath the Graveyard (Bottle))",
                //             "alias": "Ikana Graveyard",
                //         },
                //         {
                //             "node": "Great Bay Trial (from Moon)",
                //             "alias": "Great Bay Trial",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Graveyard (from Beneath the Graveyard (Heart Piece))",
                //             "alias": "Ikana Graveyard",
                //         },
                //         {
                //             "node": "Generic Grotto (from Path to the Swamp)",
                //             "alias": "Generic Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Graveyard (from Beneath the Graveyard (Song of Storms))",
                //             "alias": "Ikana Graveyard",
                //         },
                //         {
                //             "node": "Ancient Castle of Ikana (from Igo's Room)",
                //             "alias": "Ancient Castle of Ikana",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Graveyard (from Dampe's Room)",
                //             "alias": "Ikana Graveyard",
                //         },
                //         {
                //             "node": "Path to the Swamp (from Southern Swamp)",
                //             "alias": "Path to the Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ikana Graveyard (from Generic Grotto)",
                //             "alias": "Ikana Graveyard",
                //         },
                //         {
                //             "node": "Zora Cape (from Zora Hall)",
                //             "alias": "Zora Cape",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Goht's Room",
                //             "alias": "Goht's Room",
                //         },
                //         {
                //             "node": "Path to Snowhead (from Mountain Village)",
                //             "alias": "Path to Snowhead",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Southern Swamp (from Path to Swamp)",
                //             "alias": "Southern Swamp",
                //         },
                //         {
                //             "node": "Termina Field (from Observatory)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Southern Swamp (from Tourist Information)",
                //             "alias": "Southern Swamp",
                //         },
                //         {
                //             "node": "Zora Hall (from Lulu's Room)",
                //             "alias": "Zora Hall",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Southern Swamp (from Woodfall)",
                //             "alias": "Southern Swamp",
                //         },
                //         {
                //             "node": "Stock Pot Inn (from Midnight Meeting)",
                //             "alias": "Stock Pot Inn",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Southern Swamp (from Deku Palace)",
                //             "alias": "Southern Swamp",
                //         },
                //         {
                //             "node": "Pirates' Fortress Exterior (from Telescope)",
                //             "alias": "Pirates' Fortress Exterior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Southern Swamp (from Deku Palace Upper)",
                //             "alias": "Southern Swamp",
                //         },
                //         {
                //             "node": "Deku Palace (from Monkey cage)",
                //             "alias": "Deku Palace",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Southern Swamp (from Magic Hag's Potion Shop)",
                //             "alias": "Southern Swamp",
                //         },
                //         {
                //             "node": "Termina Field (from Business Scrub Grotto)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Southern Swamp (from Woods of Mystery)",
                //             "alias": "Southern Swamp",
                //         },
                //         {
                //             "node": "Woodfall Temple (from Woodfall)",
                //             "alias": "Woodfall Temple",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Southern Swamp (from Swamp Spider House)",
                //             "alias": "Southern Swamp",
                //         },
                //         {
                //             "node": "Back Room (from Laundry Pool)",
                //             "alias": "Back Room",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Southern Swamp (from Ikana Canyon)",
                //             "alias": "Southern Swamp",
                //         },
                //         {
                //             "node": "Spring Water Cave (from Ikana Canyon)",
                //             "alias": "Spring Water Cave",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Southern Swamp (from Song of Soaring)",
                //             "alias": "Southern Swamp",
                //         },
                //         {
                //             "node": "Termina Field (from Ocean Gossips Grotto)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Southern Swamp (from Generic Grotto)",
                //             "alias": "Southern Swamp",
                //         },
                //         {
                //             "node": "Ikana Canyon (from Sakon's Hideout)",
                //             "alias": "Ikana Canyon",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Woodfall (from Southern Swamp)",
                //             "alias": "Woodfall",
                //         },
                //         {
                //             "node": "South Clock Town (from Song of Soaring)",
                //             "alias": "South Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Woodfall (from Woodfall Temple)",
                //             "alias": "Woodfall",
                //         },
                //         {
                //             "node": "East Clock Town (from South Clock Town north)",
                //             "alias": "East Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Woodfall (from Fairy's Fountain)",
                //             "alias": "Woodfall",
                //         },
                //         {
                //             "node": "Southern Swamp (from Path to Swamp)",
                //             "alias": "Southern Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Woodfall (from Woodfall Temple back)",
                //             "alias": "Woodfall",
                //         },
                //         {
                //             "node": "Ikana Graveyard (from Generic Grotto)",
                //             "alias": "Ikana Graveyard",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Woodfall (from Song of Soaring)",
                //             "alias": "Woodfall",
                //         },
                //         {
                //             "node": "Inverted Stone Tower (from Inverted Stone Tower Temple)",
                //             "alias": "Inverted Stone Tower",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Trial (from Moon)",
                //             "alias": "Great Bay Trial",
                //         },
                //         {
                //             "node": "Generic Grotto (from Termina Field Grass)",
                //             "alias": "Generic Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Trial (from Murky Water)",
                //             "alias": "Great Bay Trial",
                //         },
                //         {
                //             "node": "Swamp Spider House",
                //             "alias": "Swamp Spider House",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Great Bay Temple (from Zora Cape)",
                //             "alias": "Great Bay Temple",
                //         },
                //         {
                //             "node": "Pirates' Fortress Interior (from Green Pirate exit)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Waterfall Rapids (from Zora Cape)",
                //             "alias": "Waterfall Rapids",
                //         },
                //         {
                //             "node": "Zora Cape (from Fairy's Fountain)",
                //             "alias": "Zora Cape",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Beneath the Well (from Ikana Canyon)",
                //             "alias": "Beneath the Well",
                //         },
                //         {
                //             "node": "Lottery Shop",
                //             "alias": "Lottery Shop",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Beneath the Well (from Ancient Castle of Ikana)",
                //             "alias": "Beneath the Well",
                //         },
                //         {
                //             "node": "Goron Village (from Lone Peak Shrine)",
                //             "alias": "Goron Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Mikau's Room (from Zora Hall)",
                //             "alias": "Mikau's Room",
                //         },
                //         {
                //             "node": "Pinnacle Rock",
                //             "alias": "Pinnacle Rock",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Japas' Room (from Zora Hall)",
                //             "alias": "Japas' Room",
                //         },
                //         {
                //             "node": "Romani Ranch (from Doggy Racetrack)",
                //             "alias": "Romani Ranch",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Lulu's Room (from Zora Hall)",
                //             "alias": "Lulu's Room",
                //         },
                //         {
                //             "node": "Laundry Pool (from Back Room)",
                //             "alias": "Laundry Pool",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Evan's Room (from Zora Hall)",
                //             "alias": "Evan's Room",
                //         },
                //         {
                //             "node": "Majora's Room",
                //             "alias": "Majora's Room",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Japas' Room (from Jam Session)",
                //             "alias": "Japas' Room",
                //         },
                //         {
                //             "node": "Southern Swamp (from Generic Grotto)",
                //             "alias": "Southern Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Zora Shop",
                //             "alias": "Zora Shop",
                //         },
                //         {
                //             "node": "Woods of Mystery",
                //             "alias": "Woods of Mystery",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Goron Village (from Path to Goron Village)",
                //             "alias": "Goron Village",
                //         },
                //         {
                //             "node": "Romani Ranch (from Milk Road)",
                //             "alias": "Romani Ranch",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Goron Village (from Goron Shrine)",
                //             "alias": "Goron Village",
                //         },
                //         {
                //             "node": "East Clock Town (from Stokc Pot Inn upper)",
                //             "alias": "East Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Goron Village (from Lone Peak Shrine)",
                //             "alias": "Goron Village",
                //         },
                //         {
                //             "node": "Path to the Swamp (from Termina Field)",
                //             "alias": "Path to the Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Goron Graveyard (from Mountain Village)",
                //             "alias": "Goron Graveyard",
                //         },
                //         {
                //             "node": "Observatory (from Termina Field)",
                //             "alias": "Observatory",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Sakon's Hideout",
                //             "alias": "Sakon's Hideout",
                //         },
                //         {
                //             "node": "Pirates' Fortress Rooms (Red Pirate exit)",
                //             "alias": "Pirates' Fortress Rooms (Red Pirate exit)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Mountain Village (from Mountain Smithy)",
                //             "alias": "Mountain Village",
                //         },
                //         {
                //             "node": "Pinnacle Rock (Void)",
                //             "alias": "Pinnacle Rock (Void)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Mountain Village (from Path to Goron Village)",
                //             "alias": "Mountain Village",
                //         },
                //         {
                //             "node": "Path to Mountain Village (from Mountain Village)",
                //             "alias": "Path to Mountain Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Mountain Village (from Goron Graveyard)",
                //             "alias": "Mountain Village",
                //         },
                //         {
                //             "node": "Woodfall (from Southern Swamp)",
                //             "alias": "Woodfall",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Mountain Village (from Path to Snowhead)",
                //             "alias": "Mountain Village",
                //         },
                //         {
                //             "node": "Pirates' Fortress Rooms (Red Pirate entrance)",
                //             "alias": "Pirates' Fortress Rooms (Red Pirate entrance)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Mountain Village (from Generic Grotto)",
                //             "alias": "Mountain Village",
                //         },
                //         {
                //             "node": "South Clock Town (from East Clock Town south)",
                //             "alias": "South Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Mountain Village (from Path to Mountain Village)",
                //             "alias": "Mountain Village",
                //         },
                //         {
                //             "node": "Ikana Graveyard (from Dampe's Room)",
                //             "alias": "Ikana Graveyard",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Mountain Village (from Goht)",
                //             "alias": "Mountain Village",
                //         },
                //         {
                //             "node": "Sakon's Hideout",
                //             "alias": "Sakon's Hideout",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Mountain Village (from Song of Soaring)",
                //             "alias": "Mountain Village",
                //         },
                //         {
                //             "node": "Clock Tower (from South Clock Town)",
                //             "alias": "Clock Tower",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Ghost Hut (from Ikana Canyon)",
                //             "alias": "Ghost Hut",
                //         },
                //         {
                //             "node": "Termina Field (from Path to Mountain Village)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Deku Shrine",
                //             "alias": "Deku Shrine",
                //         },
                //         {
                //             "node": "Bio Baba Grotto",
                //             "alias": "Bio Baba Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to Ikana (from Termina Field)",
                //             "alias": "Path to Ikana",
                //         },
                //         {
                //             "node": "Termina Field (from Biobaba Grotto)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to Ikana (from Ikana Graveyard)",
                //             "alias": "Path to Ikana",
                //         },
                //         {
                //             "node": "Stock Pot Inn (from East Clock Town)",
                //             "alias": "Stock Pot Inn",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to Ikana (from Ikana Canyon)",
                //             "alias": "Path to Ikana",
                //         },
                //         {
                //             "node": "Japas' Room (from Zora Hall)",
                //             "alias": "Japas' Room",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to Ikana (from Generic Grotto)",
                //             "alias": "Path to Ikana",
                //         },
                //         {
                //             "node": "Termina Field (from Canyon Gossips Grotto)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Swordsman's School",
                //             "alias": "Swordsman's School",
                //         },
                //         {
                //             "node": "Bombers' Hideout",
                //             "alias": "Bombers' Hideout",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Music Box House",
                //             "alias": "Music Box House",
                //         },
                //         {
                //             "node": "Great Bay Coast (from Fisherman's Hut)",
                //             "alias": "Great Bay Coast",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Igos du Ikana's Room",
                //             "alias": "Igos du Ikana's Room",
                //         },
                //         {
                //             "node": "Mountain Village (from Mountain Smithy)",
                //             "alias": "Mountain Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Tourist Information",
                //             "alias": "Tourist Information",
                //         },
                //         {
                //             "node": "Zora Cape (from Waterfall Rapids)",
                //             "alias": "Zora Cape",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Tourist Information (from Boat Cruise Picture)",
                //             "alias": "Tourist Information",
                //         },
                //         {
                //             "node": "Beneath the Graveyard (Heart Piece)",
                //             "alias": "Beneath the Graveyard (Heart Piece)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Stone Tower (from Ikana Canyon)",
                //             "alias": "Stone Tower",
                //         },
                //         {
                //             "node": "Deku King's Chamber (from Deku Palace)",
                //             "alias": "Deku King's Chamber",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Stone Tower (from Un-inverting)",
                //             "alias": "Stone Tower",
                //         },
                //         {
                //             "node": "Deku King's Chamber (from Deku Palace upper)",
                //             "alias": "Deku King's Chamber",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Stone Tower (from Stone Tower Temple)",
                //             "alias": "Stone Tower",
                //         },
                //         {
                //             "node": "Mountain Village (from Song of Soaring)",
                //             "alias": "Mountain Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Stone Tower (from Song of Soaring)",
                //             "alias": "Stone Tower",
                //         },
                //         {
                //             "node": "Generic Grotto (from Path to Ikana Canyon)",
                //             "alias": "Generic Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Inverted Stone Tower (from Inverting)",
                //             "alias": "Inverted Stone Tower",
                //         },
                //         {
                //             "node": "Generic Grotto (from Zora Cape)",
                //             "alias": "Generic Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Inverted Stone Tower (from Inverted Stone Tower Temple)",
                //             "alias": "Inverted Stone Tower",
                //         },
                //         {
                //             "node": "Beneath the Graveyard (Dampe's Room)",
                //             "alias": "Beneath the Graveyard (Dampe's Room)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to Snowhead (from Mountain Village)",
                //             "alias": "Path to Snowhead",
                //         },
                //         {
                //             "node": "Woodfall (from Fairy's Fountain)",
                //             "alias": "Woodfall",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to Snowhead (from Snowhead)",
                //             "alias": "Path to Snowhead",
                //         },
                //         {
                //             "node": "Romani Ranch (from Barn)",
                //             "alias": "Romani Ranch",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to Snowhead (from Generic Grotto)",
                //             "alias": "Path to Snowhead",
                //         },
                //         {
                //             "node": "Ikana Canyon (from Song of Soaring)",
                //             "alias": "Ikana Canyon",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Snowhead (from Path to Snowhead/Void)",
                //             "alias": "Snowhead",
                //         },
                //         {
                //             "node": "Ikana Graveyard (from Beneath the Graveyard (Bottle))",
                //             "alias": "Ikana Graveyard",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Snowhead (from Snowhead Temple)",
                //             "alias": "Snowhead",
                //         },
                //         {
                //             "node": "Goron Shrine (from Goron Lullaby)",
                //             "alias": "Goron Shrine",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Snowhead (from Fairy's Fountain)",
                //             "alias": "Snowhead",
                //         },
                //         {
                //             "node": "Path to Ikana (from Termina Field)",
                //             "alias": "Path to Ikana",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Snowhead (from Song of Soaring)",
                //             "alias": "Snowhead",
                //         },
                //         {
                //             "node": "Woods of Mystery (from Generic Grotto)",
                //             "alias": "Woods of Mystery",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to Goron Village (from Mountain Village)",
                //             "alias": "Path to Goron Village",
                //         },
                //         {
                //             "node": "Great Bay Coast (from Pirates' Fortress)",
                //             "alias": "Great Bay Coast",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to Goron Village (from Goron Village)",
                //             "alias": "Path to Goron Village",
                //         },
                //         {
                //             "node": "Magic Hag's Potion Shop (from Southern Swamp)",
                //             "alias": "Magic Hag's Potion Shop",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to Goron Village (from Goron Racetrack)",
                //             "alias": "Path to Goron Village",
                //         },
                //         {
                //             "node": "Zora Cape (from Generic Grotto)",
                //             "alias": "Zora Cape",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to Goron Village (from Generic Grotto)",
                //             "alias": "Path to Goron Village",
                //         },
                //         {
                //             "node": "Path to Snowhead (from Snowhead)",
                //             "alias": "Path to Snowhead",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Path to Goron Village (from Hotspring Grotto)",
                //             "alias": "Path to Goron Village",
                //         },
                //         {
                //             "node": "Evan's Room (from Zora Hall)",
                //             "alias": "Evan's Room",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Gyorg's Room",
                //             "alias": "Gyorg's Room",
                //         },
                //         {
                //             "node": "Ghost Hut (from Ikana Canyon)",
                //             "alias": "Ghost Hut",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Secret Shrine",
                //             "alias": "Secret Shrine",
                //         },
                //         {
                //             "node": "Southern Swamp (from Ikana Canyon)",
                //             "alias": "Southern Swamp",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Stock Pot Inn (from East Clock Town)",
                //             "alias": "Stock Pot Inn",
                //         },
                //         {
                //             "node": "Generic Grotto (from Great Bay Coast)",
                //             "alias": "Generic Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Stock Pot Inn (from East Clock Town upper)",
                //             "alias": "Stock Pot Inn",
                //         },
                //         {
                //             "node": "Pirates' Fortress Rooms (Purple Pirate exit)",
                //             "alias": "Pirates' Fortress Rooms (Purple Pirate exit)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Stock Pot Inn (from Midnight Meeting)",
                //             "alias": "Stock Pot Inn",
                //         },
                //         {
                //             "node": "Stone Tower (from Song of Soaring)",
                //             "alias": "Stone Tower",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Stock Pot Inn (from Mother Conversation)",
                //             "alias": "Stock Pot Inn",
                //         },
                //         {
                //             "node": "Cucco Shack",
                //             "alias": "Cucco Shack",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Generic Grotto (from Termina Field Pillar)",
                //             "alias": "Generic Grotto",
                //         },
                //         {
                //             "node": "Path to Ikana (from Generic Grotto)",
                //             "alias": "Path to Ikana",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Clock Tower (from Pre Clock Tower)",
                //             "alias": "Clock Tower",
                //         },
                //         {
                //             "node": "Goron Shrine (from Goron Village)",
                //             "alias": "Goron Shrine",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Clock Tower (from South Clock Town)",
                //             "alias": "Clock Tower",
                //         },
                //         {
                //             "node": "Gorman Racetrack (from Milk Road)",
                //             "alias": "Gorman Racetrack",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Clock Tower (from Moon Crash)",
                //             "alias": "Clock Tower",
                //         },
                //         {
                //             "node": "On the Moon",
                //             "alias": "On the Moon",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Clock Tower (from Deku Mask)",
                //             "alias": "Clock Tower",
                //         },
                //         {
                //             "node": "Pirates' Fortress Exterior (from Sewers Draft)",
                //             "alias": "Pirates' Fortress Exterior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Woods of Mystery",
                //             "alias": "Woods of Mystery",
                //         },
                //         {
                //             "node": "Ikana Canyon (from Spring Water Cave)",
                //             "alias": "Ikana Canyon",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Woods of Mystery (from Generic Grotto)",
                //             "alias": "Woods of Mystery",
                //         },
                //         {
                //             "node": "Snowhead (from Fairy's Fountain)",
                //             "alias": "Snowhead",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Stone Tower Trial (from Moon)",
                //             "alias": "Stone Tower Trial",
                //         },
                //         {
                //             "node": "Termina Field (from Milk Road with Cremia)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "On the Moon",
                //             "alias": "On the Moon",
                //         },
                //         {
                //             "node": "Beneath the Well (from Ikana Canyon)",
                //             "alias": "Beneath the Well",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Bomb Shop",
                //             "alias": "Bomb Shop",
                //         },
                //         {
                //             "node": "Pirates' Fortress Interior (from Exiterior balcony)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Gorman Racetrack (from Milk Road)",
                //             "alias": "Gorman Racetrack",
                //         },
                //         {
                //             "node": "Goron Village (from Path to Goron Village)",
                //             "alias": "Goron Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Gorman Racetrack (from Milk Road west)",
                //             "alias": "Gorman Racetrack",
                //         },
                //         {
                //             "node": "Honey & Darling",
                //             "alias": "Honey & Darling",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Goron Racetrack (from Path to Goron Village)",
                //             "alias": "Goron Racetrack",
                //         },
                //         {
                //             "node": "Goron Shrine (from Goron Shop)",
                //             "alias": "Goron Shrine",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "East Clock Town (from Termina Field)",
                //             "alias": "East Clock Town",
                //         },
                //         {
                //             "node": "Mountain Village (from Goron Graveyard)",
                //             "alias": "Mountain Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "East Clock Town (from South Clock Town south)",
                //             "alias": "East Clock Town",
                //         },
                //         {
                //             "node": "Ikana Canyon (from Musicbox House)",
                //             "alias": "Ikana Canyon",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "East Clock Town (from Bomber's Hideout)",
                //             "alias": "East Clock Town",
                //         },
                //         {
                //             "node": "Ikana Canyon (from Clear Cutscene)",
                //             "alias": "Ikana Canyon",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "East Clock Town (from South Clock Town north)",
                //             "alias": "East Clock Town",
                //         },
                //         {
                //             "node": "Pirates' Fortress Rooms (Sewers exit)",
                //             "alias": "Pirates' Fortress Rooms (Sewers exit)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "East Clock Town (from Treasure Chest Shop)",
                //             "alias": "East Clock Town",
                //         },
                //         {
                //             "node": "Zora Hall (from Japas' Room)",
                //             "alias": "Zora Hall",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "East Clock Town (from North Clock Town)",
                //             "alias": "East Clock Town",
                //         },
                //         {
                //             "node": "Bisness Deku Scrub Grotto",
                //             "alias": "Bisness Deku Scrub Grotto",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "East Clock Town (from Honey & Darling)",
                //             "alias": "East Clock Town",
                //         },
                //         {
                //             "node": "East Clock Town (from Treasure Chest Shop)",
                //             "alias": "East Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "East Clock Town (from Mayor's Residence)",
                //             "alias": "East Clock Town",
                //         },
                //         {
                //             "node": "West Clock Town (from South Clock Town north)",
                //             "alias": "West Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "East Clock Town (from Shooting Gallery)",
                //             "alias": "East Clock Town",
                //         },
                //         {
                //             "node": "Great Bay Coast (from Generic Grotto)",
                //             "alias": "Great Bay Coast",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "East Clock Town (from Stock Pot Inn)",
                //             "alias": "East Clock Town",
                //         },
                //         {
                //             "node": "Pre Clock Tower (from Void)",
                //             "alias": "Pre Clock Tower",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "East Clock Town (from Stokc Pot Inn upper)",
                //             "alias": "East Clock Town",
                //         },
                //         {
                //             "node": "Igos du Ikana's Room",
                //             "alias": "Igos du Ikana's Room",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "East Clock Town (from Milk Bar)",
                //             "alias": "East Clock Town",
                //         },
                //         {
                //             "node": "Romani Ranch (from Failing Cart Ride)",
                //             "alias": "Romani Ranch",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "West Clock Town (from Termina Field)",
                //             "alias": "West Clock Town",
                //         },
                //         {
                //             "node": "Great Bay Coast (from Zora Cape)",
                //             "alias": "Great Bay Coast",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "West Clock Town (from South Clock Town south)",
                //             "alias": "West Clock Town",
                //         },
                //         {
                //             "node": "Zora Cape (from Great Bay Temple)",
                //             "alias": "Zora Cape",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "West Clock Town (from South Clock Town north)",
                //             "alias": "West Clock Town",
                //         },
                //         {
                //             "node": "Pirates' Fortress Exterior (from Interior Balcony)",
                //             "alias": "Pirates' Fortress Exterior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "West Clock Town (from Swordsman's School)",
                //             "alias": "West Clock Town",
                //         },
                //         {
                //             "node": "Path to Goron Village (from Hotspring Grotto)",
                //             "alias": "Path to Goron Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "West Clock Town (from Curiosity Shop)",
                //             "alias": "West Clock Town",
                //         },
                //         {
                //             "node": "Ikana Graveyard (from Path to Ikana)",
                //             "alias": "Ikana Graveyard",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "West Clock Town (from Trading Post)",
                //             "alias": "West Clock Town",
                //         },
                //         {
                //             "node": "Stone Tower (from Un-inverting)",
                //             "alias": "Stone Tower",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "West Clock Town (from Bomb Shop)",
                //             "alias": "West Clock Town",
                //         },
                //         {
                //             "node": "Shooting Gallery (Clock Town)",
                //             "alias": "Shooting Gallery (Clock Town)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "West Clock Town (from Post Office)",
                //             "alias": "West Clock Town",
                //         },
                //         {
                //             "node": "Milk Road (from Gorman Track back)",
                //             "alias": "Milk Road",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "West Clock Town (from Lottery Shop)",
                //             "alias": "West Clock Town",
                //         },
                //         {
                //             "node": "Termina Field (from Dodongo Grotto)",
                //             "alias": "Termina Field",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "North Clock Town (from Termina Field)",
                //             "alias": "North Clock Town",
                //         },
                //         {
                //             "node": "Gyorg's Room",
                //             "alias": "Gyorg's Room",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "North Clock Town (from East Clock Town)",
                //             "alias": "North Clock Town",
                //         },
                //         {
                //             "node": "Zora Hall (from Zora Cape back)",
                //             "alias": "Zora Hall",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "North Clock Town (from South Clock Town)",
                //             "alias": "North Clock Town",
                //         },
                //         {
                //             "node": "Path to Goron Village (from Goron Racetrack)",
                //             "alias": "Path to Goron Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "North Clock Town (from Fairy's Fountain)",
                //             "alias": "North Clock Town",
                //         },
                //         {
                //             "node": "Mountain Village (from Path to Goron Village)",
                //             "alias": "Mountain Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "North Clock Town (from Deku Playground)",
                //             "alias": "North Clock Town",
                //         },
                //         {
                //             "node": "Deku Palace (from Deku King's Chamber)",
                //             "alias": "Deku Palace",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "North Clock Town (from Bombers Hide and Seek)",
                //             "alias": "North Clock Town",
                //         },
                //         {
                //             "node": "Fairy's Fountain (Ikana)",
                //             "alias": "Fairy's Fountain (Ikana)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "North Clock Town (from Old Lady/Blast Mask)",
                //             "alias": "North Clock Town",
                //         },
                //         {
                //             "node": "Zora Cape (from Great Bay Coast)",
                //             "alias": "Zora Cape",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "South Clock Town (from Clock Tower)",
                //             "alias": "South Clock Town",
                //         },
                //         {
                //             "node": "South Clock Town (from Clock Tower)",
                //             "alias": "South Clock Town",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "South Clock Town (from Termina Field)",
                //             "alias": "South Clock Town",
                //         },
                //         {
                //             "node": "Trading Post",
                //             "alias": "Trading Post",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "South Clock Town (from East Clock Town north)",
                //             "alias": "South Clock Town",
                //         },
                //         {
                //             "node": "Mikau's Room (from Zora Hall)",
                //             "alias": "Mikau's Room",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "South Clock Town (from West Clock Town north)",
                //             "alias": "South Clock Town",
                //         },
                //         {
                //             "node": "Path to Goron Village (from Generic Grotto)",
                //             "alias": "Path to Goron Village",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "South Clock Town (from North Clock Town)",
                //             "alias": "South Clock Town",
                //         },
                //         {
                //             "node": "Waterfall Rapids (from Zora Cape)",
                //             "alias": "Waterfall Rapids",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "South Clock Town (from West Clock Town south)",
                //             "alias": "South Clock Town",
                //         },
                //         {
                //             "node": "Pirates' Fortress Exterior (from Great Bay Coast)",
                //             "alias": "Pirates' Fortress Exterior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "South Clock Town (from Laundry Pool)",
                //             "alias": "South Clock Town",
                //         },
                //         {
                //             "node": "Beneath the Well (from Ancient Castle of Ikana)",
                //             "alias": "Beneath the Well",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "South Clock Town (from East Clock Town south)",
                //             "alias": "South Clock Town",
                //         },
                //         {
                //             "node": "Romani Ranch (from Receiving Milk Bottle)",
                //             "alias": "Romani Ranch",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "South Clock Town (from Song of Soaring)",
                //             "alias": "South Clock Town",
                //         },
                //         {
                //             "node": "Milk Road (from Romani Ranch)",
                //             "alias": "Milk Road",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Laundry Pool (from South Clock Town)",
                //             "alias": "Laundry Pool",
                //         },
                //         {
                //             "node": "Pirates' Fortress Interior (from Hookshot Upper)",
                //             "alias": "Pirates' Fortress Interior",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Laundry Pool (from Back Room)",
                //             "alias": "Laundry Pool",
                //         },
                //         {
                //             "node": "Milk Road (from Gorman Track)",
                //             "alias": "Milk Road",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Generic Grotto (from Path to Ikana Canyon)",
                //             "alias": "Generic Grotto",
                //         },
                //         {
                //             "node": "Ikana Canyon (from Twinmold)",
                //             "alias": "Ikana Canyon",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Generic Grotto (from Ikana Graveyard)",
                //             "alias": "Generic Grotto",
                //         },
                //         {
                //             "node": "Pirates' Fortress Rooms (Purple Pirate entrance)",
                //             "alias": "Pirates' Fortress Rooms (Purple Pirate entrance)",
                //         },
                //     ],
                //     [
                //         {
                //             "node": "Generic Grotto (from Ikana Canyon)",
                //             "alias": "Generic Grotto",
                //         },
                //         {
                //             "node": "Deku Palace (from Deku Shrine)",
                //             "alias": "Deku Palace",
                //         },
                //     ],
                // ],
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
            // this.generateTestEdgeAliases();
            // this.generateToAndFromAliases();
            this.setupGraph();
        },
        methods: {
            resetCloseModal() {
                this.openedEdgeIndex = null;
                this.openedNodeIndex = null;
                this.openedNodeName = null;
                this.showDeleteModal = false;
            },
            openModal(edgeIndex, nodeIndex, nodeName) {
                this.openedEdgeIndex = edgeIndex;
                this.openedNodeIndex = nodeIndex;
                this.openedNodeName = nodeName;
                this.showDeleteModal = true;
            },
            // generateToAndFromAliases() {
            //     this.toLocations.forEach(location => {
            //         if (location.node.includes("(from")) {
            //             location.alias = location.node.split(" (")[0].trim();
            //         } else {
            //             location.alias = location.node;
            //         }
            //     });
            //     this.fromLocations.forEach(location => {
            //         if (location.node.includes("(from")) {
            //             location.alias = location.node.split(" (")[0].trim();
            //         } else {
            //             location.alias = location.node;
            //         }
            //     });
            // },
            // generateTestEdgeAliases() {
            //     this.testEdges.forEach(edge => {
            //         if (edge[0].node.includes("(from")) {
            //             edge[0].alias = edge[0].node.split(" (")[0].trim();
            //         } else {
            //             edge[0].alias = edge[0].node;
            //         }
            //         if (edge[1].node.includes("(from")) {
            //             edge[1].alias = edge[1].node.split(" (")[0].trim();
            //         } else {
            //             edge[1].alias = edge[1].node;
            //         }
            //     });
            // },
            findShortestPath() {
                let source = this.selectedShortestPathFrom;
                let target = this.selectedShortestPathTo;
                this.shortestPath = [];

                if (source.alias === target.alias) {
                    this.shortestPath.push({
                        alias: "You are already at " + target.alias,
                        name: "You are already at " + target.alias,
                    });
                    this.selectedShortestPathFrom = {};
                    this.selectedShortestPathTo = {};
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
                            while (node && node.alias !== source.alias) {
                                path.push(node);
                                node = predecessor[node.alias];
                            }
                            path.push(source);
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
                this.shortestPath.push({
                    node: "There is no known path from " + source.alias + " to " + target.alias,
                    alias: "There is no known path from " + source.alias + " to " + target.alias,
                });
                // console.log("There is no path from " + source.alias + " to " + target.alias);
            },
            setupGraph() {
                for (let i = 0; i < this.nodes.length; i++) {
                    this.addNode(this.nodes[i]);
                }
                // for (let i = 0; i < this.testEdges.length; i++) {
                //     this.addEdge(this.testEdges[i][1], this.testEdges[i][0]);
                // }
                this.$forceUpdate();
            },
            handleNotificationClose() {
                this.showNotification = false;
                this.message = null;
                this.timeOutId = null;
            },
            removeIndexFromAdjacencyList() {
                this.graph.adjacencyList[this.openedNodeIndex].splice(this.openedEdgeIndex, 1);
                this.resetCloseModal();
                this.$forceUpdate();
            },
            addNode(node) {
                this.graph.nodes.push(node);
                this.graph.adjacencyList[node] = [];
            },
            handleShortestPathFromUpdate(location) {
                if (Object.entries(location).length === 0) {
                    this.selectedShortestPathFrom = {};
                    return;
                }
                if (location.node) {
                    this.selectedShortestPathFrom = location;
                } else {
                    this.selectedShortestPathFrom = {
                        node: location,
                        alias: location,
                    };
                }
            },
            handleShortestPathToUpdate(location) {
                if (Object.entries(location).length === 0) {
                    this.selectedShortestPathTo = {};
                    return;
                }
                if (location.node) {
                    this.selectedShortestPathTo = location;
                } else {
                    this.selectedShortestPathTo = {
                        node: location,
                        alias: location,
                    };
                }
            },
            handleSearchFromUpdate(location) {
                if (Object.entries(location).length === 0) {
                    this.selectedNewFrom = {};
                    return;
                }
                if (location.node) {
                    this.selectedNewFrom = location;
                } else {
                    this.selectedNewFrom = {
                        node: location,
                        alias: location,
                    };
                }
            },
            handleSearchToUpdate(location) {
                if (Object.entries(location).length === 0) {
                    this.selectedNewTo = {};
                    return;
                }
                if (location.node) {
                    this.selectedNewTo = location;
                } else {
                    this.selectedNewTo = {
                        node: location,
                        alias: location,
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
